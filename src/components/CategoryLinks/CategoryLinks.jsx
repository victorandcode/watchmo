import React from 'react';
import downArrow from './down-arrow.png';
import styles from './CategoryLinks.scss';
import { CSSTransitionGroup } from 'react-transition-group';

const itemsPerColumn = 6;

class CategoryLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "showingLinkContainer": false
    }
    this.props.onLoad();
  }

  getRow(key, item) {
    return (
      <li key={key} className={styles.linksRow}>
        <a href="/">{item}</a>
      </li>
    );
  }

  getCategoryColumn(key, rows) {
    return (<ul key={key} className={styles.linksColumn}>{rows}</ul>);
  }

  getUserLinkColumn(key, rows) {
    return (<ul key={key} className={[styles.linksColumn, styles.userLinks].join(' ')}>{rows}</ul>);
  }

  indexRequiresNewColumn(index) {
    return index !== 0 && (index + 1) % itemsPerColumn === 0;
  }

  getColumns(items, getColumnFn) {
    let columns = [];
    let currentRows = [];
    let i = 0;
    for (i = 0; i < items.length; i++) {
      currentRows.push(this.getRow(i, items[i]));
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

  render() {
    return (
      <div 
        className={styles.CategoryLinks} 
        onMouseEnter={() => this.setState({ showingLinkContainer: true})}
        onMouseLeave={() => this.setState({ showingLinkContainer: false})}>
        <a className={styles.mainLink} href="/">
          Browse
          <img src={downArrow} alt="DownArrow" className={styles.downArrowIcon} />
        </a>
        
        <CSSTransitionGroup
          transitionName={{
            enter: styles.linkContainerEnter,
            enterActive: styles.linkContainerEnterActive,
            leave: styles.linkContainerLeave,
            leaveActive: styles.linkContainerLeaveActive,
          }}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.state.showingLinkContainer ?
            <div className={styles.linkContainer}> 
              <div className={styles.topBar}></div>
              <div className={styles.linksArrow}></div>
              {this.getColumns(this.props.userLinks, this.getUserLinkColumn)}
              {this.getColumns(this.props.categories, this.getCategoryColumn)}
            </div>
          : null}
        </CSSTransitionGroup>
      </div>
    );
  }
} 

export default CategoryLinks;