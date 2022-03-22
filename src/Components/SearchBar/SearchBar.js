import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            searchItem: ''
        }

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(event) {
        this.setState({searchItem: event.target.value});
    }

    search () {
        this.props.search(this.state.searchItem);
    }
    
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" 
                        onChange={this.handleTermChange} />
                <button className="SearchButton">SEARCH</button>
            </div>
        )
    }
}
export default SearchBar;