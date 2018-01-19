import { connect } from 'react-redux';
import MovieDetailsBanner from '../../components/MovieDetailsBanner/MovieDetailsBanner';
import { 
  clearSelectedMovie,
  triggerMovieAction
} from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    movie: state.selectedMovie.movie,
    selectedContainerKey: state.selectedMovie.containerKey,
    containerKey: ownProps.containerKey
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