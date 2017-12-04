import Notifications from '../../components/Notifications/Notifications';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    notificationList: state.latestMovies
  }
};

const NotificationsContainer = connect(
  mapStateToProps
)(Notifications);

export default NotificationsContainer;