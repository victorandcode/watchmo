import React from 'react';
import searchIcon from './search-icon.png';
import styles from './SearchBar.scss';
import SearchBarUserInput from '../SearchBarUserInput/SearchBarUserInput';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "showSearchBar": false
    }
    this.showSearchBar = this.showSearchBar.bind(this);
    this.hideSearchBar = this.hideSearchBar.bind(this);
  }

  showSearchBar(show) {
    this.setState({ "showSearchBar": true});
  }

  hideSearchBar(show) {
    this.setState({ "showSearchBar": false});
  }

  render() {
    return (
      <div className={styles.SearchBar}>
        {this.state.showSearchBar ? 
          (<SearchBarUserInput hideSearchBar={this.hideSearchBar}/>)
         : 
          (<span className={styles.searchPreview} onClick={this.showSearchBar}>
            <img className={styles.seachIcon} src={searchIcon} alt="SearchIcon"/>
            Search
          </span>)
        }
      </div>
    );
  }
}

export default SearchBar;