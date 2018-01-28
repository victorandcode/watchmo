import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { MOVIES_PER_ROW } from '../../constants';
import GenreSearchLinkContainer from '../../containers/GenreSearchLinkContainer/GenreSearchLinkContainer';
import DiscoverPreBuiltLinkContainer from '../../containers/DiscoverPreBuiltLinkContainer/DiscoverPreBuiltLinkContainer';
import {
  TYPE_80S,
  TYPE_90S,
  TYPE_HIGHLY_VOTED,
  TYPE_LONG_MOVIES,
  TYPE_POORLY_VOTED,
  TYPE_SHORT_MOVIES
} from '../../containers/DiscoverPreBuiltLinkContainer/DiscoverPreBuiltLinkContainer';
import downArrow from './down-arrow.png';
import styles from './NavLinks.scss';

class NavLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "showingLinkContainer": false
    }
    this.hideContainer = this.hideContainer.bind(this);
    this.getGenreRow = this.getGenreRow.bind(this);
  }

  componentDidMount() {
    this.props.onLoad();
  }

  hideContainer() {
    this.setState({ showingLinkContainer: false});
  }

  getUserLinkRow(key, item) {
    return (
      <li key={key} className={styles.linksRow}>
        <a href="/">{item}</a>
      </li>
    );
  }

  getGenreRow(key, item) {
    return (
      <li key={key} className={styles.linksRow}>
        <GenreSearchLinkContainer genre={item} clickCallback={this.hideContainer}/>
      </li>
    );
  }

  getCategoryColumn(key, rows) {
    return (<ul key={key} className={styles.linksColumn}>{rows}</ul>);
  }

  indexRequiresNewColumn(index) {
    return index !== 0 && (index + 1) % MOVIES_PER_ROW === 0;
  }

  getColumns(items, getColumnFn, getRowFn) {
    let columns = [];
    let currentRows = [];
    let i = 0;
    for (i = 0; i < items.length; i++) {
      currentRows.push(getRowFn(i, items[i]));
      if (this.indexRequiresNewColumn(i)) {
        let columnIndex = columns.length;
        columns.push(getColumnFn(columnIndex, currentRows));
        currentRows = [];
      }
    }
    if (currentRows.length !== 0) {
      let columnIndex = columns.length;
      columns.push(getColumnFn(columnIndex, currentRows));
    }

    return columns;
  }

  getPreBuildLinksColumn() {
    return (
      <ul className={[styles.linksColumn, styles.userLinks].join(' ')}>
        <li className={styles.linksRow}>
          <DiscoverPreBuiltLinkContainer 
            title="Highly voted" 
            type={TYPE_HIGHLY_VOTED} 
            clickCallback={this.hideContainer}/>
        </li>
        <li className={styles.linksRow}>
          <DiscoverPreBuiltLinkContainer 
            title="Poorly voted" 
            type={TYPE_POORLY_VOTED}
            clickCallback={this.hideContainer}/>
        </li>
        <li className={styles.linksRow}>
          <DiscoverPreBuiltLinkContainer 
            title="80's movies" 
            type={TYPE_80S}
            clickCallback={this.hideContainer}/>
        </li>
        <li className={styles.linksRow}>
          <DiscoverPreBuiltLinkContainer 
            title="90's movies" 
            type={TYPE_90S}
            clickCallback={this.hideContainer}/>
        </li>
        <li className={styles.linksRow}>
          <DiscoverPreBuiltLinkContainer 
            title="Long movies" 
            type={TYPE_LONG_MOVIES}
            clickCallback={this.hideContainer}/>
        </li>
        <li className={styles.linksRow}>
          <DiscoverPreBuiltLinkContainer 
            title="Short movies" 
            type={TYPE_SHORT_MOVIES}
            clickCallback={this.hideContainer}/>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div 
        className={styles.NavLinks} 
        onMouseLeave={this.hideContainer}>
        <span className={styles.toggleLinksBtnContainer}>
          <button
            className={[styles.toggleLinksBtn, styles.desktopVersion].join(" ")}
            onMouseEnter={() => this.setState({ showingLinkContainer: true})}>
            Browse
            <img src={downArrow} alt="DownArrow" className={styles.downArrowIcon} />
          </button>

          <button 
            className={[styles.toggleLinksBtn, styles.mobileVersion].join(" ")}
            onClick={() => this.setState({ 
              showingLinkContainer: !this.state.showingLinkContainer
            })}>
            Browse
            <img src={downArrow} alt="DownArrow" className={styles.downArrowIcon} />
          </button>
          
          <CSSTransitionGroup
            transitionName={{
              enter: styles.containerElementEnter,
              enterActive: styles.containerElementEnterActive,
              leave: styles.containerElementLeave,
              leaveActive: styles.containerElementLeaveActive,
            }}
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}>
            {this.state.showingLinkContainer ?
              <div className={styles.linksArrow}></div>
              : null
            }
          </CSSTransitionGroup>

        </span>
        
        <CSSTransitionGroup
          transitionName={{
            enter: styles.containerElementEnter,
            enterActive: styles.containerElementEnterActive,
            leave: styles.containerElementLeave,
            leaveActive: styles.containerElementLeaveActive,
          }}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.state.showingLinkContainer ?
            <div className={styles.linkContainer}> 
              <div className={styles.topBar}></div>
              <div className={styles.links}>
                {this.getPreBuildLinksColumn()}
                {this.getColumns(
                  this.props.genres, 
                  this.getCategoryColumn,
                  this.getGenreRow)}
              </div>
            </div>
          : null}
        </CSSTransitionGroup>
      </div>
    );
  }
} 

export default NavLinks;