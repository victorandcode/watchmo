import React from 'react';
import GithubCorner from 'react-github-corner';
import styles from './AppGithubCorner.scss';
import { GITHUB_URL } from '../../constants';

const commomProperties = {
  direction: "left",
  href: GITHUB_URL,
  octoColor: "#fff",
  bannerColor: "#fd6c6c"
};

const AppGithubCorner = () => (
  <span>
    <GithubCorner 
      className={styles.desktopVisible}
      direction={commomProperties.direction}
      href={commomProperties.href}
      octoColor={commomProperties.octoColor}
      bannerColor={commomProperties.bannerColor}
      size={80}/>
    <GithubCorner 
      className={styles.mobileVersion}
      direction={commomProperties.direction}
      href={commomProperties.href}
      octoColor={commomProperties.octoColor}
      bannerColor={commomProperties.bannerColor}
      size={45}/>
  </span>
);

export default AppGithubCorner;