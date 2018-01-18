import React from 'react';
import GithubCorner from 'react-github-corner';
import styles from './AppGithubCorner.scss';

const commomProperties = {
  direction: "left",
  href: "https://github.com/victor-cordova/watchmo",
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