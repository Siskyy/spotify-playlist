import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = {
      searchResults: [{name: 'Hello', artist: 'Adele', album: 'Goodbye', id: 1} 
      , {name: 'Space bound', artist: 'Eminem', album: 'Revival', id: 2}
      , {name: 'Shape of you', artist: 'Ed Sheeran', album: 'Divide', id: 3}],
      playlistName: 'My Playlist',
      playlistTracks: [{name: 'Black', artist: 'Dave', album: 'Santilations', id: 4}
      , {name: 'WAP', artist: 'Cardi B', album: 'WAP', id: 5}
      , {name: '505', artist: 'Arctic Monkeys', album: 'Favourite Worst Nightmare', id: 6}]
    };
    this.addTrack = this.addTrack.bind(this);
  }
  
  addTrack (track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  render () {
    return (
    <div>
  <h1>Play<span className="highlight">mixer</span></h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
      <Playlist playlistName={this.state.playlistName} 
                playlistTracks={this.state.playlistTracks} />
    </div>
  </div>
</div>
    )
  }
}

export default App;
