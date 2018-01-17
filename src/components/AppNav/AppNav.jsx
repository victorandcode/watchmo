import React from 'react';
import NavLinksContainer from '../../containers/NavLinksContainer/NavLinksContainer';
import styles from './AppNav.scss';

class AppNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleBestOf2016Click = this.handleBestOf2016Click.bind(this);
    this.handleBestOf2017Click = this.handleBestOf2017Click.bind(this);
  }

  handleBestOf2017Click(e) {
    e.preventDefault();
    this.props.triggerBestOf2017();
  }

  handleBestOf2016Click(e) {
    e.preventDefault();
    this.props.triggerBestOf2016();
  }

  render() {
    return (
      <nav className={styles.AppNav}>
        <ul className={styles.linkList}>
          <li className={styles.linkItem}><NavLinksContainer /></li>
          <li className={styles.linkItem}>
            <a className="navLink" href="/" onClick={this.handleBestOf2017Click}>Best of 2017</a>
          </li>
          <li className={styles.linkItem}>
            <a className="navLink" href="/" onClick={this.handleBestOf2016Click}>Best of 2016</a>
          </li>
        </ul>
      </nav>
    );
  }
};

export default AppNav;