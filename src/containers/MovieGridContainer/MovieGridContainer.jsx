import { connect } from 'react-redux';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { MOVIES_PER_ROW } from '../../constants';

function getMoviesRows(queryMovies) {
  let result = [];
  for(let i = 0; i < queryMovies.length; i += MOVIES_PER_ROW) {
    let row = queryMovies.slice(i, i + MOVIES_PER_ROW);
    result.push(row);
  }
  return result;
}

const mapStateToProps = state => {
  let moviesRows = state.queryMovies.movies 
                    ? getMoviesRows(state.queryMovies.movies) 
                    : [];
  return {
    moviesRows,
    searchQuery: state.searchQuery,
    showNoElementsFound: moviesRows.length === 0 && state.queryMovies.searchHasTriggered
  }
}

const MovieGridContainer = connect(
  mapStateToProps
)(MovieGrid);

export default MovieGridContainer;