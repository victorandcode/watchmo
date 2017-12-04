import React from 'react';
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
      "headerStyle": styles.AppHeader
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    if(window.scrollY > 0) {
      this.setState({
        "headerStyle": styles.AppHeaderScrolled
      })
    } else {
      this.setState({
        "headerStyle": styles.AppHeader
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    return(
      <header className={this.state.headerStyle}>
        <Logo />
        <AppNav />
        <ul className={styles.userActions}>
          <li><SearchBarContainer/></li>
          <li><NotificationsContainer /></li>
          <li><ProfileContainer /></li>
        </ul>
      </header>
    );
  }
}

export default AppHeader;