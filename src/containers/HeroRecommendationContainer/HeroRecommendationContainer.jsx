import { connect } from 'react-redux';
import HeroRecommendation from '../../components/HeroRecommendation/HeroRecommendation';
import { openModalVideo } from '../../actions';

const mapStateToProps = state => {
  return {
    recommendedMovie: state.featuredMovie
  }
};

const mapDispatchToLinkProps = dispatch => {
  return {
    openModalVideo: (videoId) => {
      dispatch(openModalVideo(videoId));
    }
  }
};

const HeroRecommendationContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps
)(HeroRecommendation);

export default HeroRecommendationContainer;