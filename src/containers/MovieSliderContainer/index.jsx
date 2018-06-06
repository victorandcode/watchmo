import { connect } from "react-redux";
import MovieSlider from "../../components/MovieSlider";

const mapStateToProps = state => {
  return {
    isMobile: state.browser.lessThan.medium
  };
};

const MovieSliderContainer = connect(mapStateToProps)(MovieSlider);

export default MovieSliderContainer;
