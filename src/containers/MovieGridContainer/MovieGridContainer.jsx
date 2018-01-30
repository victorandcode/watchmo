import { connect } from 'react-redux';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import { RESPONSIVE_COLUMN_CONFIG } from '../../constants';
import { triggerSearchedMoviesNextPage } from '../../actions';

function getCols(browserInfo) {
  if(browserInfo.greaterThan.medium) {
    return RESPONSIVE_COLUMN_CONFIG["large"]["cols"];
  } else if(browserInfo.greaterThan.small) {
    return RESPONSIVE_COLUMN_CONFIG["medium"]["cols"];
  } else if(browserInfo.greaterThan.extraSmall) {
    return RESPONSIVE_COLUMN_CONFIG["small"]["cols"];
  } else if(browserInfo.greaterThan.smallest) {
    return RESPONSIVE_COLUMN_CONFIG["extraSmall"]["cols"];
  } else {
    return RESPONSIVE_COLUMN_CONFIG["smallest"]["cols"];
  }
}

function getMoviesRows(searchedMovies, browserInfo) {
  let colsPerRow = getCols(browserInfo);
  let result = [];
  for(let i = 0; i < searchedMovies.length; i += colsPerRow) {
    let row = searchedMovies.slice(i, i + colsPerRow);
    result.push(row);
  }
  return result;
}

const userAtScreenBottom = () => {
  return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
};

const mapStateToProps = state => {
  let moviesRows = state.searchedMovies.movies 
                    ? getMoviesRows(state.searchedMovies.movies, state.browser) 
                    : [];
  return {
    moviesRows,
    searchQuery: state.searchQuery,
    showNoElementsFound: moviesRows.length === 0 && state.searchedMovies.searchHasTriggered,
    title: state.searchedMovies.searchTitle
  }
}

const mapDispatchToLinkProps = dispatch => {
  return {
    handleScroll: (event) => {
      if(userAtScreenBottom()) {
        dispatch(triggerSearchedMoviesNextPage());
      }
    }
  }
};

const MovieGridContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps
)(MovieGrid);

export default MovieGridContainer;