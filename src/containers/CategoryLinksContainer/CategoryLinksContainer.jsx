import CategoryLinks from '../../components/CategoryLinks/CategoryLinks';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions';

const getCategories = (categoryObjs) => {
  var result = [];
  for (let i = 0; i < categoryObjs.length; i++) {
    result.push(categoryObjs[i].name)
  }
  return result;
}

const mapStateToProps = state => {
  return {
    categories: getCategories(state.categories),
    userLinks: state.userLinks
  }
};

const mapDispatchToLinkProps = dispatch => {
  return {
    onLoad: () => {
      fetchCategories(dispatch);
    }
  }
}

const CategoryLinksContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps
)(CategoryLinks);

export default CategoryLinksContainer;