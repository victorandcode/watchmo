import React from 'react';
import bell from './bell.png';
import styles from './Notifications.scss';
import { CSSTransitionGroup } from 'react-transition-group';
import NotificationContainer from '../../containers/NotificationContainer';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "showingNotificationItems": false
    };
  }

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div
        onMouseLeave={() => this.setState({ showingNotificationItems: false })}>
        <button 
          className={[styles.notificationIconBtn, styles.desktopVersion].join(" ")}
          onMouseEnter={() => this.setState({ showingNotificationItems: true })}>
          <img src={bell} alt="Bell"/>
          {this.state.showingNotificationItems ?
            <div className={styles.itemsContainerArrow}/>
           :null
          }
        </button>

        <button 
          className={[styles.notificationIconBtn, styles.mobileVersion].join(" ")}
          onClick={() => this.setState({ 
            showingNotificationItems: !this.state.showingNotificationItems
          })}>
          <img src={bell} alt="Bell"/>
          {this.state.showingNotificationItems ?
            <div className={styles.itemsContainerArrow}/>
           :null
          }
        </button>
        
        <CSSTransitionGroup
          transitionName={{
            enter: styles.itemsContainerEnter,
            enterActive: styles.itemsContainerEnterActive,
            leave: styles.itemsContainerLeave,
            leaveActive: styles.itemsContainerLeaveActive,
          }}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.state.showingNotificationItems ?
            <div className={styles.itemsContainer}>
              <div className={styles.topBar}/>
              {
                this.props.notificationList.map((item, index) => {
                  return <NotificationContainer movie={item} key={index}/>
                })
              }
            </div>
            : null
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Notifications;