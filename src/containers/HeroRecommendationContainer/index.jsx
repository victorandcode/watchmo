import { connect } from 'react-redux';
import HeroRecommendation from '../../components/HeroRecommendation';
import { triggerMovieAction } from '../../actions';

const mapStateToProps = state => {
  return {
    recommendedMovie: state.featuredMovie
  }
};

const mapDispatchToLinkProps = dispatch => {
  return {
    triggerMovieAction: (movie) => {
      dispatch(triggerMovieAction(movie));
    }
  }
};

const HeroRecommendationContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps
)(HeroRecommendation);

export default HeroRecommendationContainer;