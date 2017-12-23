import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    movies: state.movies || []
  }
}

const MovieGridContainer = connect(
  mapStateToProps
)(MovieGrid);

export default MovieGridContainer;