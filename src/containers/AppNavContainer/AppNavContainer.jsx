import { connect } from 'react-redux';
import AppNav from '../../components/AppNav/AppNav';
import {
  triggerBestOf2017Search,
  triggerBestOf2016Search
} from '../../actions';

const mapDispatchToLinkProps = dispatch => {
  return {
    triggerBestOf2017: () => {
      triggerBestOf2017Search(dispatch);
    },
    triggerBestOf2016: () => {
      triggerBestOf2016Search(dispatch);
    }
  }
}

const AppNavContainer = connect(
  undefined,
  mapDispatchToLinkProps
)(AppNav)

export default AppNavContainer;