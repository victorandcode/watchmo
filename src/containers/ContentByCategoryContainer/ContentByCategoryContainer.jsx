import { connect } from 'react-redux';
import ContentByCategory from '../../components/ContentByCategory/ContentByCategory';
import { fetchDiscoverMovies } from '../../actions';

const categories = ["Watchmo picks", "Trending Now", "Recommended for you"]
const getCategoryGroups = (movies) => {
  const moviesPerCategory = parseInt(movies.length / categories.length, 10);
  let result = [];
  let currentGroup = {
    category: "",
    content: []
  };
  for (let i = 0; i < movies.length; i++) {
    currentGroup.content.push(movies[i]);
    if((i + 1) % moviesPerCategory === 0) {
      let categoryIndex = parseInt(i / moviesPerCategory, 10);
      currentGroup.category = categories[categoryIndex];
      result.push(currentGroup);
      currentGroup = {
        category: "",
        content: []
      };
    }
  }
  return result;
}

const mapStateToProps = state => {
  return {
    categoryGroups: getCategoryGroups(state.movies)
  }
};

const mapDispatchToLinkProps = dispatch => {
  return {
    onLoad: () => {
      fetchDiscoverMovies(dispatch);
    }
  }
};

const ContentByCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToLinkProps
)(ContentByCategory);

export default ContentByCategoryContainer;