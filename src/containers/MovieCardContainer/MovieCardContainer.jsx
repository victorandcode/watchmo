import MovieCard from '../../components/MovieCard/MovieCard';
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
  let movieIsSelected = state.selectedMovie.movie !== undefined && movie.id === state.selectedMovie.movie.id;
  return {
    movie,
    movieIsSelected,
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
    selectMovie: (movie) => {
      dispatch(selectMovie(movie, ownProps.detailsBannerKey));
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
  selectMovie: () => {
    actions.selectMovie(state.movie);
  }
});

const MovieCardContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps,
  mergeProps
)(MovieCard);

export default MovieCardContainer;