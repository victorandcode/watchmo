import { connect } from 'react-redux';
import LayoutDispatcher from '../../components/LayoutDispatcher/LayoutDispatcher';

const mapStateToProps = state => {
  return {
    searchQuery: state.searchQuery
  }
};

const LayoutDispatcherContainer = connect(
  mapStateToProps
)(LayoutDispatcher);

export default LayoutDispatcherContainer;