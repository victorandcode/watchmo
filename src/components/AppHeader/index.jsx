import React from 'react';
import Logo from '../Logo';
import AppGithubCorner from '../AppGithubCorner';
import AppNavContainer from '../../containers/AppNavContainer';
import NotificationsContainer from '../../containers/NotificationsContainer';
import ProfileContainer from '../../containers/ProfileContainer';
import SearchBarContainer from '../../containers/SearchBarContainer';
import styles from './AppHeader.scss';

class AppHeader extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "innerHeaderStyleClass": styles.innerHeader,
      "bigSearchIsActive": false,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.getUserActionClass = this.getUserActionClass.bind(this);
    this.getProfileContainerClass = this.getProfileContainerClass.bind(this);
    this.setSearchIsOpened = this.setSearchIsOpened.bind(this);
  }

  handleScroll() {
    if(window.scrollY > 0) {
      this.setState({
        "innerHeaderStyleClass": styles.innerHeaderScrolled
      })
    } else {
      this.setState({
        "innerHeaderStyleClass": styles.innerHeader
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  getUserActionClass() {
    if(this.state.bigSearchIsActive) {
      return styles.userActions;
    } else {
      return styles.userActions;
    }
  }

  getProfileContainerClass() {
    if(this.state.bigSearchIsActive) {
      return [styles.displayNone].join(" ");
    } else {
      return styles.actionItem
    }
  }

  setSearchIsOpened(isOpened) {
    if(this.props.shouldTriggerBigSearch && isOpened) {
      this.setState({ bigSearchIsActive: true });
    } else {
      this.setState({ bigSearchIsActive: false });
    }
  }

  render() {
    return(
      <header className={styles.AppHeader}>
        <div className={this.state.innerHeaderStyleClass}>
          <AppGithubCorner />
          <Logo />
          <AppNavContainer />
          <ul className={this.getUserActionClass()}>
            <li className={[styles.actionItem, styles.searchBar].join(" ")}><SearchBarContainer searchOpenedCallback={this.setSearchIsOpened}/></li>
            <li className={[styles.actionItem, styles.notificationsContainer].join(" ")}><NotificationsContainer /></li>
            <li className={this.getProfileContainerClass()}><ProfileContainer /></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default AppHeader;