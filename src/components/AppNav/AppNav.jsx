import React from 'react';
import CategoryLinksContainer from '../../containers/CategoryLinksContainer/CategoryLinksContainer';
import styles from './AppNav.scss';

const AppNav = () => (
  <nav className={styles.AppNav}>
    <ul className={styles.linkList}>
      <li className={styles.linkItem}><CategoryLinksContainer /></li>
      <li className={styles.linkItem}><a className="navLink" href="/">New</a></li>
      <li className={styles.linkItem}><a className="navLink" href="/">Random</a></li>
    </ul>
  </nav>
);

export default AppNav;