import { connect } from 'react-redux';
import AppNav from '../../components/AppNav/AppNav';
import {
  triggerNewMoviesSearch,
  triggerUpcomingMoviesSearch
} from '../../actions';

const mapDispatchToLinkProps = dispatch => {
  return {
    triggerNewSearch: () => {
      triggerNewMoviesSearch(dispatch);
    },
    triggerUpcomingSearch: () => {
      triggerUpcomingMoviesSearch(dispatch);
    }
  }
}

const AppNavContainer = connect(
  undefined,
  mapDispatchToLinkProps
)(AppNav)

export default AppNavContainer;