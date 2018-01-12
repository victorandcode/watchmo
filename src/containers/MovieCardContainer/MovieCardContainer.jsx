import MovieCard from '../../components/MovieCard/MovieCard';
import { connect } from 'react-redux';
import { 
  fetchMovieDetails,
  triggerMovieAction
} from '../../actions';
import { getMovieData } from '../../parsing';

function getIsClickable(movieDetails) {
  return movieDetails !== undefined;
}

const mapStateToProps = (state, ownProps) => {
  let movie = getMovieData(ownProps.movie, state.movieDetails[ownProps.movie.id]);
  return {
    movie,
    isClickable: getIsClickable(state.movieDetails[ownProps.movie.id])
  }
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    fetchMovieDetails: (movieId) => {
      fetchMovieDetails(dispatch, movieId);
    },
    triggerMovieAction: (movie) => {
      dispatch(triggerMovieAction(movie));
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