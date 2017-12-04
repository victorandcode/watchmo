import HeroRecommendation from '../../components/HeroRecommendation/HeroRecommendation';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    recommendedMovie: state.featuredMovie
  }
};

const HeroRecommendationContainer = connect(
  mapStateToProps
)(HeroRecommendation);

export default HeroRecommendationContainer;