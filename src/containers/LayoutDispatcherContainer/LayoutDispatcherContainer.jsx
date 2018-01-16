import { connect } from 'react-redux';
import LayoutDispatcher from '../../components/LayoutDispatcher/LayoutDispatcher';

const mapStateToProps = state => {
  return {
    showSearchedMovies: state.searchedMovies.searchHasTriggered
  }
};

const LayoutDispatcherContainer = connect(
  mapStateToProps
)(LayoutDispatcher);

export default LayoutDispatcherContainer;