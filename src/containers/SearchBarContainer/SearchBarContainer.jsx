import SearchBar from '../../components/SearchBar/SearchBar';
import { updateAndFetchSearchQuery } from '../../actions';
import { connect } from 'react-redux';


const mapDispatchToProps = dispatch => {
  return {
    searchQueryChange: (searchQuery) => {
      updateAndFetchSearchQuery(dispatch, searchQuery);
    }
  }
};

const SearchBarContainer = connect(
  undefined,
  mapDispatchToProps
)(SearchBar);

export default SearchBarContainer;
