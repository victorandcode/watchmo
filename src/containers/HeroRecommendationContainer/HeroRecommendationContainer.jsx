import { connect } from 'react-redux';
import HeroRecommendation from '../../components/HeroRecommendation/HeroRecommendation';

const mapStateToProps = state => {
  return {
    recommendedMovie: state.featuredMovie
  }
};

const mapDispatchToLinkProps = dispatch => {
  return {
    openModalVideo: (videoId) => {
      
    }
  }
};

const HeroRecommendationContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps
)(HeroRecommendation);

export default HeroRecommendationContainer;