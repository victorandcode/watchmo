import { connect } from 'react-redux';
import MovieRow from '../../components/MovieRow';

const mapStateToProps = state => {
  return {
    isMobile: state.browser.lessThan.medium
  };
}

const MovieRowContainer = connect(
  mapStateToProps
)(MovieRow);

export default MovieRowContainer;