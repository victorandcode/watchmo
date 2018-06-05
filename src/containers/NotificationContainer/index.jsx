import { connect } from 'react-redux';
import Notification from '../../components/Notification';
import { getMovieData } from '../../parsing';
import { triggerMovieAction } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  let basicMovieData = ownProps.movie;
  return {
    movie: getMovieData(basicMovieData, state.movieDetails[basicMovieData.id])
  }
};

const mapDispatchToProps = dispatch => {
  return {
    triggerMovieAction: (movie) => {
      dispatch(triggerMovieAction(movie));
    }
  }
};

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default NotificationContainer;