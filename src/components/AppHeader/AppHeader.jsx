import React from 'react';
import GithubCorner from 'react-github-corner';
import AppNav from '../AppNav/AppNav';
import Logo from '../Logo/Logo';
import NotificationsContainer from '../../containers/NotificationsContainer/NotificationsContainer';
import ProfileContainer from '../../containers/ProfileContainer/ProfileContainer';
import SearchBarContainer from '../../containers/SearchBarContainer/SearchBarContainer';
import styles from './AppHeader.scss';

class AppHeader extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "innerHeaderStyle": styles.innerHeader
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    if(window.scrollY > 0) {
      this.setState({
        "innerHeaderStyle": styles.innerHeaderScrolled
      })
    } else {
      this.setState({
        "innerHeaderStyle": styles.innerHeader
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    return(
      <header className={styles.AppHeader}>
        <div className={this.state.innerHeaderStyle}>
          <GithubCorner 
            direction="left"
            href="https://github.com/victor-cordova/watchmo" 
            octoColor="#fff"
            bannerColor="#fd6c6c"/>
          <Logo />
          <AppNav />
          <ul className={styles.userActions}>
            <li><SearchBarContainer/></li>
            <li><NotificationsContainer /></li>
            <li><ProfileContainer /></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default AppHeader;