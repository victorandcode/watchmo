import NavLinks from '../../components/NavLinks/NavLinks';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions';

const mapStateToProps = state => {
  return {
    genres: state.categories
  }
};

const mapDispatchToLinkProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchCategories());
    }
  }
}

const NavLinksContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps
)(NavLinks);

export default NavLinksContainer;