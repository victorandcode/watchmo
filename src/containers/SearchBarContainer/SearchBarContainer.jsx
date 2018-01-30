import SearchBar from '../../components/SearchBar/SearchBar';
import { triggerQuerySearch } from '../../actions';
import { connect } from 'react-redux';


const mapDispatchToProps = dispatch => {
  return {
    searchQueryChange: (searchQuery) => {
      dispatch(triggerQuerySearch(searchQuery));
    }
  }
};

const SearchBarContainer = connect(
  undefined,
  mapDispatchToProps
)(SearchBar);

export default SearchBarContainer;
