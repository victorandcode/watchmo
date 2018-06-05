import SearchBar from '../../components/SearchBar';
import { triggerQuerySearch } from '../../actions';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchQueryChange: (searchQuery) => {
      dispatch(triggerQuerySearch(searchQuery));
    },
    searchOpenedCallback: (isOpened) => {
      ownProps.searchOpenedCallback(isOpened);
    }
  }
};


const SearchBarContainer = connect(
  undefined,
  mapDispatchToProps
)(SearchBar);

export default SearchBarContainer;
