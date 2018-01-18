import React from 'react';
import styles from './Profile.scss';

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
      </div>
    );
  }
}

export default Profile;