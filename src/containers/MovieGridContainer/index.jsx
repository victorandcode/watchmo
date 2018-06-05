import { connect } from 'react-redux';
import MovieGrid from '../../components/MovieGrid';
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
  let offsetCorrection = 2; /*Without this, sometimes the next inequality sum fails because of some small value*/
  return (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - offsetCorrection;
};

const mapStateToProps = state => {
  let moviesRows = state.searchedMovies.movies 
                    ? getMoviesRows(state.searchedMovies.movies, state.browser) 
                    : [];
  return {
    moviesRows,
    noMorePages: state.searchedMovies.noMorePages,
    searchQuery: state.searchQuery,
    searchInProgress: state.searchedMovies.searchInProgress,
    showNoElementsFound: state.searchedMovies.searchHasNoResults,
    title: state.searchedMovies.searchTitle
  }
}

const mapDispatchToLinkProps = dispatch => {
  return {
    handleInfinitePaging: (event) => {
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