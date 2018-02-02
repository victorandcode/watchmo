import React from 'react';
import styles from './Profile.scss';
import { CSSTransitionGroup } from 'react-transition-group';
import Modal from 'react-modal';

const currentUserId = 0;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingLinkContainer: false,
      showingAboutModal: false,
      currentUser: this.props.users.filter((item) => item.id === currentUserId)[0],
      modalStyles: {
        content : {
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '2em',
          textAlign: 'center'
        },
        overlay: {
         zIndex: '9999',
         backgroundColor: 'rgba(0, 0, 0, .6)'
        }
      }
    }
    this.showAboutModal = this.showAboutModal.bind(this);
    this.hideAboutModal = this.hideAboutModal.bind(this);
    this.onAboutModalOpen = this.onAboutModalOpen.bind(this);
    this.getMobileContent = this.getMobileContent.bind(this);
    this.getDesktopContent = this.getDesktopContent.bind(this);
    this.getCommonContent = this.getCommonContent.bind(this);
    this.getProfileContent = this.getProfileContent.bind(this);
  }

  componentDidMount() {
    if(this.props.showModalOnLoad) {
      this.showAboutModal();
    }
  }

  showAboutModal() {
    this.setState({
      showAboutModal: true
    });
  }

  hideAboutModal() {
    this.setState({
      showAboutModal: false
    });
  }

  onAboutModalOpen() {
    this.props.onModalShown();
  }

  getCommonContent() {
    return (
      <div>
        <img src={this.state.currentUser.iconUrl} alt="IconUrl" className={styles.profileIcon}/>
        <div className={styles.userName}>{this.state.currentUser.name}</div>
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
              <div className={[styles.linkGroup, styles.topBorderSeparator].join(' ')}>
                <span
                  className={styles.textLink}
                  onClick={this.showAboutModal}>
                  About Watchmo
                </span>
              </div>
            </div>
            : null
          }
        </CSSTransitionGroup>
      </div>
    )
  }

  getMobileContent() {
    return (
      <div
        className={styles.profileContentWrapper}
        onClick={() => this.setState({ showingLinkContainer: !this.state.showingLinkContainer})}>
        {this.getCommonContent()}
      </div>
    )
  }

  getDesktopContent() {
    return (
      <div
        className={styles.profileContentWrapper}
        onMouseEnter={() => this.setState({ showingLinkContainer: true})}
        onMouseLeave={() => this.setState({ showingLinkContainer: false})}>
        {this.getCommonContent()}
      </div>
    )
  }

  getProfileContent() {
    if(this.props.isMobile) {
      return this.getMobileContent();
    } else {
      return this.getDesktopContent();
    }
  }

  render() {
    return (
      <div 
        className={styles.Profile}>
        {this.getProfileContent()}
        <Modal
          isOpen={this.state.showAboutModal}
          style={this.state.modalStyles}
          onAfterOpen={this.onAboutModalOpen}>
          <div 
            className={styles.modalContentWrapper}
            onClick={this.hideAboutModal}>
            <div className={styles.modalContent}>
              "Discover <span className={styles.popular}>Popular</span> and <span className={styles.bizarre}>Bizzare</span> movies, take a look at their trailer, you like what you see?"
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Profile;