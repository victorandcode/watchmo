import { connect } from 'react-redux';
import Notification from '../../components/Notification/Notification';
import { openModalVideo } from '../../actions';
import { IMAGE_BASE_URL_W500 } from '../../constants';

function getVideoUrl(videos) {
  if(videos.length) {
    return videos[0].key;
  } else {
    return "";
  }
}

const getImageUrl = (backdropPath) => {
  return `${IMAGE_BASE_URL_W500}/${backdropPath}`;
}

const parseBasicMovieData = (basicMovieData) => {
  return {
    title: basicMovieData.title,
    imageUrl: getImageUrl(basicMovieData.backdrop_path),
    releasedDate: basicMovieData.release_date
  };
}

const parseMovieDetails = (movieDetails) => {
   return {
     videoUrl: getVideoUrl(movieDetails.videos.results)
   };
}

const getMovieData = (basicMovieData, movieDetails) => {
  let movie = {};
  Object.assign(movie, parseBasicMovieData(basicMovieData));
  if(movieDetails) {
    Object.assign(movie, parseMovieDetails(movieDetails));
  }
  return movie;
}

const mapStateToProps = (state, ownProps) => {
  let basicMovieData = ownProps.movie;
  return {
    movie: getMovieData(basicMovieData, state.movieDetails[basicMovieData.id])
  }
};

const mapDispatchToProps = dispatch => {
  return {
    openModalVideo: (videoUrl) => {
      dispatch(openModalVideo(videoUrl));
    }
  }
};

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default NotificationContainer;