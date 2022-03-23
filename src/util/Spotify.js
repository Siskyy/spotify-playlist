const client_id = 'hidden for GitHub purposes';
const redirect_uri = 'http://localhost:3000/';


let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;

        // access token match check
        const accessTokenCheck = window.location.href.match(/access_token=([^&]*)/);
        const expiresInCheck = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenCheck && expiresInCheck) {
            accessToken = accessTokenCheck[1];
            const expiresIn = number(expiresInCheck[1]);

        // This will allow new access token when previous one expires

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('accessToken', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
            window.location = accessUrl;
        }
        }
    }
};

export default Spotify;