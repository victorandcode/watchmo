import React from 'react';
import styles from './SearchBarUserInput.scss';
import searchIcon from './search-icon.png';
import closeIcon from './close-icon.png';
import { CSSTransitionGroup } from 'react-transition-group';

class SearchBarUserInput extends React.Component {
  constructor(props) {
    super(props);
    this.hideIfNoText = this.hideIfNoText.bind(this);
    this.eraseTextAndHide = this.eraseTextAndHide.bind(this);
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  hideIfNoText() {
    if(!this.searchInput.value) {
      this.props.hideSearchBar();
    }
  }

  eraseTextAndHide() {
    debugger;
    this.searchInput.value = "";
    this.props.hideSearchBar();
  }

  render() {
    return (
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
            placeholder="Titles, people, genres"
            onBlur={this.hideIfNoText}
            ref={(input) => { this.searchInput = input; }}
            />
        </CSSTransitionGroup>
        <img src={closeIcon} alt="CloseIcon" className={styles.closeIcon} onClick={this.eraseTextAndHide}/>
      </div>
    );
  }
}

export default SearchBarUserInput;