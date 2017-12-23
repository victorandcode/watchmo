import React from 'react';
import searchIcon from './search-icon.png';
import closeIcon from './close-icon.png';
import styles from './SearchBar.scss';
import { CSSTransitionGroup } from 'react-transition-group';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "showSearchBar": false
    }
    this.showSearchBar = this.showSearchBar.bind(this);
    this.hideSearchBar = this.hideSearchBar.bind(this);
    this.hideIfNoText = this.hideIfNoText.bind(this);
    this.eraseTextAndHide = this.eraseTextAndHide.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  showSearchBar(show) {
    this.setState({ "showSearchBar": true});
  }

  hideSearchBar(show) {
    this.setState({ "showSearchBar": false});
  }

  hideIfNoText() {
    if(!this.searchInput.value) {
      this.hideSearchBar();
    }
  }

  eraseTextAndHide() {
    this.props.searchQueryChange("");
    this.hideSearchBar();
  }

  handleInputChange(e) {
    this.props.searchQueryChange(e.target.value);
  }

  render() {
    return (
      <div className={styles.SearchBar}>
        {this.state.showSearchBar ? 
          <div className={styles.SearchBarUserInput}>
            <img src={searchIcon} alt="SearchIcon" className={styles.searchIcon}/>
            <CSSTransitionGroup
              transitionName={{
                appear: styles.inputAppear,
                appearActive: styles.inputAppearActive,
              }}
              transitionAppearTimeout={300}
              transitionAppear={true}>
              <input 
                type="text" 
                className={styles.searchInput} 
                placeholder="Search by name"
                autoFocus
                onChange={this.handleInputChange}
                onBlur={this.hideIfNoText}
                ref={(input) => { this.searchInput = input; }}
                />
            </CSSTransitionGroup>
            <img 
              src={closeIcon} 
              alt="CloseIcon" 
              className={styles.closeIcon} 
              onClick={this.eraseTextAndHide}/>
          </div>
         : 
          <span className={styles.searchPreview} onClick={this.showSearchBar}>
            <img className={styles.seachIcon} src={searchIcon} alt="SearchIcon"/>
            Search
          </span>
        }
      </div>
    );
  }
}

export default SearchBar;