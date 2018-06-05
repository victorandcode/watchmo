import { connect } from 'react-redux';
import MovieDetailsBanner from '../../components/MovieDetailsBanner';
import { 
  clearSelectedMovie,
  triggerMovieAction
} from '../../actions';
import { getMovieData } from '../../parsing';

const mapStateToProps = (state, ownProps) => {
  let movie = state.selectedMovie.movie !== undefined ? getMovieData(
      state.selectedMovie.movie,
      state.movieDetails[state.selectedMovie.movie.id],
  ) : undefined;
  let isLoadingDetails = movie !== undefined && movie.detailsFetched === undefined;
  return {
    movie,
    selectedContainerKey: state.selectedMovie.containerKey,
    containerKey: ownProps.containerKey,
    isLoadingDetails
  }
};

const mapDispatchToLinkProps = dispatch => {
  return { 
    clearSelectedMovie: () => {
      dispatch(clearSelectedMovie());
    },
    triggerMovieAction: (movie) => {
      dispatch(triggerMovieAction(movie));
    }
  }
};

const mergeProps = (state, actions) => ({
  ...state,
  ...actions,
  triggerMovieAction: () => {
    if(state.movie.detailsFetched !== undefined) {
      actions.triggerMovieAction(state.movie);
    }
  }
});

const MovieDetailsBannerContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps,
  mergeProps
)(MovieDetailsBanner);

export default MovieDetailsBannerContainer;