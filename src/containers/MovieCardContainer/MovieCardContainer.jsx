import MovieCard from '../../components/MovieCard/MovieCard';
import { connect } from 'react-redux';
import { 
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
  return {
    movie,
    isClickable: detailsExist,
    isLoadingDetails: !detailsExist
  }
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    fetchMovieDetails: (movieId) => {
      fetchMovieDetails(dispatch, movieId);
    },
    triggerMovieAction: (movie) => {
      dispatch(triggerMovieAction(movie));
    },
    openMovieDetailsBanner: (movie) => {
      dispatch(selectMovie(movie, ownProps.detailsBannerKey));
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
  openMovieDetailsBanner: () => {
    actions.openMovieDetailsBanner(state.movie);
  }
});

const MovieCardContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps,
  mergeProps
)(MovieCard);

export default MovieCardContainer;