import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { connect } from 'react-redux';

const moviesPerRow = 6;

function getMoviesRows(queryMovies) {
  let result = [];
  for(let i = 0; i < queryMovies.length; i += moviesPerRow) {
    let row = queryMovies.slice(i, i + moviesPerRow);
    result.push(row)
  }
  return result;
}

const mapStateToProps = state => {
  return {
    moviesRows: state.queryMovies ? getMoviesRows(state.queryMovies) : []
  }
}

const MovieGridContainer = connect(
  mapStateToProps
)(MovieGrid);

export default MovieGridContainer;