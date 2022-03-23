const client_id = 'hidden for GitHub purposes';
const redirect_uri = 'http://localhost:3000/';


let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        // access token match check
        const accessTokenCheck = window.location.href.match(/access_token=([^&]*)/);
        const expiresInCheck = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenCheck && expiresInCheck) {
            accessToken = accessTokenCheck[1];
            const expiresIn = Number(expiresInCheck[1]);

        // This will allow new access token when previous one expires

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('accessToken', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
            window.location = accessUrl;
        }
        },

    // Allows user to search spotify using spotify fetch method with access token
    search(searchItem) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchItem}`, 
            { headers: {
                Athorization: `Bearer ${accessToken}`
            }}).then(response => {
                // converting response to json 
                return response.json();
            }).then(jsonResponse => {
                if (!jsonResponse.tracks) /* checks if there are no tracks */ {
                    return [];
                } /* else it will convert json to an array of tracks */
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            });
    },

    savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris.length) /* checks if there is a playlistname or any tracks added */ {
            return;
        } 
        const accessToken = Spotify.getAccessToken();
        const headers = { Auhtorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                /* use the userID to make a POST request to create new playlist */
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackUris })
                })
            })
        });

    }

    };

export default Spotify;