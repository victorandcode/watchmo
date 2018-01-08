import MovieCard from '../../components/MovieCard/MovieCard';
import { connect } from 'react-redux';
import { 
  fetchMovieDetails,
  openModalVideo
} from '../../actions';

const baseImageUrl = "http://image.tmdb.org/t/p/w500/";

function getBackdropUrl(backdropPath) {
  if(backdropPath) {
    return baseImageUrl + backdropPath;
  } else {
    return "";
  }
}

function getYear(unformattedDate) {
  if(unformattedDate) {
    return unformattedDate.slice(0, 4);
  } else {
    return "N/A";
  }
}

function getVoteAverage(voteAverageInt) {
  return `${voteAverageInt}/10`;
}

function getDuration(runtime) {
  let hours = "";
  let minutes = "";
  if (Math.floor(runtime / 60)) {
    hours = Math.floor(runtime / 60).toString() + "h ";
  }
  if (runtime % 60) {
    minutes = (runtime % 60).toString() + "m";
  }

  return hours + minutes;
}

function getVideoUrl(videos) {
  if(videos.length) {
    return videos[0].key;
  } else {
    return "";
  }
}

function parseMovieDetails(movieDetails) {
  return {
    detailsFetched: 1,
    year: getYear(movieDetails.release_date),
    voteAverage: getVoteAverage(movieDetails.vote_average),
    adultFilm: movieDetails.adult,
    duration: getDuration(movieDetails.runtime),
    videoUrl: getVideoUrl(movieDetails.videos.results)
  };
}

function parseBasicMovieData(basicMovieData) {
  return Object.assign({}, basicMovieData, {
    backdropUrl: getBackdropUrl(basicMovieData.backdrop_path)
  })
}

function getMovieData(basicMovieData, movieDetails) {
  let movie = {};
  Object.assign(movie, parseBasicMovieData(basicMovieData));
  if(movieDetails) {
    Object.assign(movie, parseMovieDetails(movieDetails))
  }
  return movie;
}

function getIsClickable(movie) {
  return movie.videoUrl !== undefined && movie.vieoUrl !== "";
}

const mapStateToProps = (state, ownProps) => {
  let movie = getMovieData(ownProps.movie, state.movieDetails[ownProps.movie.id]);
  return {
    movie,
    isClickable: getIsClickable(movie)
  }
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    fetchMovieDetails: (movieId) => {
      fetchMovieDetails(dispatch, movieId);
    },
    openModalVideo: (videoId) => {
      dispatch(openModalVideo(videoId));
    }
  }
};

const mergeProps = (state, actions) => ({
  ...state,
  ...actions,
  fetchMovieDetails: (movieId) => {
    if(state.movie.detailsFetched === undefined) {
      actions.fetchMovieDetails(movieId);
    }
  }
});

const MovieCardContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps,
  mergeProps
)(MovieCard);

export default MovieCardContainer;