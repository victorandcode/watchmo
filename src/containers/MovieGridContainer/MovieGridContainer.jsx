import { connect } from 'react-redux';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { MOVIES_PER_ROW } from '../../constants';

function getMoviesRows(searchedMovies) {
  let result = [];
  for(let i = 0; i < searchedMovies.length; i += MOVIES_PER_ROW) {
    let row = searchedMovies.slice(i, i + MOVIES_PER_ROW);
    result.push(row);
  }
  return result;
}

const mapStateToProps = state => {
  let moviesRows = state.searchedMovies.movies 
                    ? getMoviesRows(state.searchedMovies.movies) 
                    : [];
  return {
    moviesRows,
    searchQuery: state.searchQuery,
    showNoElementsFound: moviesRows.length === 0 && state.searchedMovies.searchHasTriggered,
    title: state.searchedMovies.searchTitle
  }
}

const MovieGridContainer = connect(
  mapStateToProps
)(MovieGrid);

export default MovieGridContainer;