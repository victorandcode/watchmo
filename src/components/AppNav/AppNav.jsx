import React from 'react';
import NavLinksContainer from '../../containers/NavLinksContainer/NavLinksContainer';
import styles from './AppNav.scss';

class AppNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewSearchClick = this.handleNewSearchClick.bind(this);
    this.handleUpcomingClick = this.handleUpcomingClick.bind(this);
  }

  handleNewSearchClick(e) {
    e.preventDefault();
    this.props.triggerNewSearch();
  }

  handleUpcomingClick(e) {
    e.preventDefault();
    this.props.triggerUpcomingSearch();
  }

  render() {
    return (
      <nav className={styles.AppNav}>
        <ul className={styles.linkList}>
          <li className={styles.linkItem}><NavLinksContainer /></li>
          <li className={styles.linkItem}>
            <a className="navLink" href="/" onClick={this.handleNewSearchClick}>New</a>
          </li>
          <li className={styles.linkItem}>
            <a className="navLink" href="/" onClick={this.handleUpcomingClick}>Upcoming</a>
          </li>
        </ul>
      </nav>
    );
  }
};

export default AppNav;