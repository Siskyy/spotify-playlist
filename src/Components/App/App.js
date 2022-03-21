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
      , {name: 'Shape of you', artist: 'Ed Sheeran', album: 'Divide', id: 3}]
    }
  }
  
  render () {
    return (
    <div>
  <h1>Play<span className="highlight">mixer</span></h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} />
      <Playlist />
    </div>
  </div>
</div>
    )
  }
}

export default App;
