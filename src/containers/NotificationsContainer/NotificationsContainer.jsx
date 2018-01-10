import { connect } from 'react-redux';
import Notifications from '../../components/Notifications/Notifications';
import { fetchMoviesNowPlaying } from '../../actions';


const mapStateToProps = state => {
  return {
    notificationList: state.moviesNowPlaying
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      fetchMoviesNowPlaying(dispatch);
    }
  }
};

const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

export default NotificationsContainer;