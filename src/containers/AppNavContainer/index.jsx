import { connect } from 'react-redux';
import AppNav from '../../components/AppNav';
import {
  triggerBestOf2017Search,
  triggerBestOf2016Search
} from '../../actions';

const mapDispatchToLinkProps = dispatch => {
  return {
    triggerBestOf2017: () => {
      dispatch(triggerBestOf2017Search());
    },
    triggerBestOf2016: () => {
      dispatch(triggerBestOf2016Search());
    }
  }
}

const AppNavContainer = connect(
  undefined,
  mapDispatchToLinkProps
)(AppNav)

export default AppNavContainer;