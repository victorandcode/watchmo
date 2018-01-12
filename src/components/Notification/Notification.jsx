import React from 'react';
import styles from './Notification.scss';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.triggerMovieAction(this.props.movie);
  }

  render() {
    return (
      <div 
        className={styles.Notification}
        onClick={this.handleClick}>
        <img src={this.props.movie.backdropUrl} alt="NotificationImg" className={styles.notificationImg}/>
        <div className={styles.notificationText}>
          <div className={styles.notificationHeaders}>
            <div>{this.props.movie.title}</div>
          </div>
          <div className={styles.subheaderText}>Released: {this.props.movie.releasedDate}</div>
        </div>
      </div>
    )
  }
}

export default Notification;