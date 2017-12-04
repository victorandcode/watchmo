import React from 'react';
import downArrow from './down-arrow.png';
import styles from './Profile.scss';
import { CSSTransitionGroup } from 'react-transition-group';

const currentUserId = 0;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingLinkContainer: false
    }
    this.currentUser = this.props.users.filter((item) => item.id === currentUserId)[0];
  }

  render() {
    return (
      <div 
        className={styles.Profile}
        onMouseEnter={() => this.setState({ showingLinkContainer: true})}
        onMouseLeave={() => this.setState({ showingLinkContainer: false})}>
        <img src={this.currentUser.iconUrl} alt="IconUrl" className={styles.profileIcon}/>
        <div className={styles.userName}>{this.currentUser.name}</div>
        <img src={downArrow} alt="DownArrow" className={styles.downArrowIcon}/>

        <CSSTransitionGroup
          transitionName={{
            enter: styles.profileLinksEnter,
            enterActive: styles.profileLinksEnterActive,
            leave: styles.profileLinksLeave,
            leaveActive: styles.profileLinksLeaveActive,
          }}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.state.showingLinkContainer ?
            <div className={styles.profileLinks}>
              <div className={styles.linkGroup}>
                {this.props.users.map((user, index) => {
                  if(user.id === currentUserId) {
                    return null;
                  }
                  return (
                    <div className={styles.changeProfileLink} key={index}>
                      <img src={user.iconUrl} alt="IconUrl" className={styles.profileIcon}/>
                      <div className={styles.userName}>{user.name}</div>
                    </div>
                  )
                })}
                <a className={styles.textLink}>Manage Profiles</a>
              </div>
              <div className={[styles.linkGroup, styles.topBorderSeparator].join(' ')}>
                <a className={styles.textLink}>Account</a>
                <a className={styles.textLink}>Help Center</a>
                <a className={styles.textLink}>Sign out of Watchmo</a>
              </div>
            </div>
            : null
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Profile;