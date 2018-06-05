import MovieCard from '../../components/MovieCard';
import { connect } from 'react-redux';

import { 
  clearSelectedMovie,
  fetchMovieDetails,
  selectMovie,
  triggerMovieAction
} from '../../actions';
import { getMovieData } from '../../parsing';

const mapStateToProps = (state, ownProps) => {
  let movie = getMovieData(
    ownProps.movie, 
    state.movieDetails[ownProps.movie.id],
    { imageIsBig: true });
  let detailsExist = movie.detailsFetched !== undefined;
  let selectedElementId = state.selectedMovie.elementId;
  return {
    movie,
    selectedElementId,
    isClickable: detailsExist,
    isLoadingDetails: !detailsExist
  }
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    fetchMovieDetails: (movieId) => {
      dispatch(fetchMovieDetails(movieId));
    },
    triggerMovieAction: (movie) => {
      dispatch(triggerMovieAction(movie));
    },
    selectMovie: (elementId, movie) => {
      dispatch(selectMovie(elementId, movie, ownProps.detailsBannerKey));
    },
    clearSelectedMovie: () => {
      dispatch(clearSelectedMovie());
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
  },
  selectMovie: (elementId, ) => {
    actions.selectMovie(elementId, state.movie);
  }
});

const MovieCardContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps,
  mergeProps
)(MovieCard);

export default MovieCardContainer;