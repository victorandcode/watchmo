import React from 'react';
import bell from './bell.png';
import styles from './Notifications.scss';
import { CSSTransitionGroup } from 'react-transition-group';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "showingNotificationItems": false
    };
  }

  render() {
    return (
      <div
        onMouseEnter={() => this.setState({ showingNotificationItems: true })}
        onMouseLeave={() => this.setState({ showingNotificationItems: false })}>
        <div className={styles.notificationIconContainer}>
          <img src={bell} alt="Bell"/>
          {this.state.showingNotificationItems ?
            <div className={styles.itemsContainerArrow}/>
           :null
          }
        </div>
        
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
                  return (
                    <div key={index} className={styles.item}>
                      <img src={item.imageUrl} alt="NotificationImg" className={styles.itemImg}/>
                      <div className={styles.itemText}>
                        <div className={styles.itemHeaders}>
                          <div>{item.type}</div>
                          <div>{item.title}</div>
                        </div>
                        <div className={styles.subheaderText}>{item.timeSinceFeatured}</div>
                      </div>
                    </div>
                  )
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