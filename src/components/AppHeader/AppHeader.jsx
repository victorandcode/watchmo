import React from 'react';
import Logo from '../Logo/Logo';
import AppGithubCorner from '../AppGithubCorner/AppGithubCorner';
import AppNavContainer from '../../containers/AppNavContainer/AppNavContainer';
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
          <AppGithubCorner />
          <Logo />
          <AppNavContainer />
          <ul className={styles.userActions}>
            <li className={styles.searchBar}><SearchBarContainer/></li>
            <li className={styles.notificationsContainer}><NotificationsContainer /></li>
            <li><ProfileContainer /></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default AppHeader;