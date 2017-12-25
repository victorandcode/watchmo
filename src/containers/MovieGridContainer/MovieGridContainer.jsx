import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    movies: state.queryMovies || []
  }
}

const MovieGridContainer = connect(
  mapStateToProps
)(MovieGrid);

export default MovieGridContainer;