import { connect } from 'react-redux';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { MOVIES_PER_ROW } from '../../constants';

function getMoviesRows(queryMovies) {
  let result = [];
  for(let i = 0; i < queryMovies.length; i += MOVIES_PER_ROW) {
    let row = queryMovies.slice(i, i + MOVIES_PER_ROW);
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