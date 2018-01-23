import { connect } from 'react-redux';
import SearchLink from '../../components/SearchLink/SearchLink';
import {
  trigger80sMoviesSearch,
  trigger90sMoviesSearch,
  triggerHighlyRatedMoviesSearch,
  triggerLongMoviesSearch,
  triggerPoorlyRatedMoviesSearch,
  triggerShortMoviesSearch
} from '../../actions';


export const TYPE_80S = "TYPE_80S";
export const TYPE_90S = "TYPE_90S";
export const TYPE_HIGHLY_VOTED = "TYPE_HIGHLY_VOTED";
export const TYPE_POORLY_VOTED = "TYPE_POORLY_VOTED";
export const TYPE_LONG_MOVIES = "TYPE_LONG_MOVIES";
export const TYPE_SHORT_MOVIES = "TYPE_SHORT_MOVIES";

function getClickFunction(type) {
  switch(type) {
    case TYPE_80S:
      return trigger80sMoviesSearch;
    case TYPE_90S:
      return trigger90sMoviesSearch;
    case TYPE_HIGHLY_VOTED:
      return triggerHighlyRatedMoviesSearch;
    case TYPE_POORLY_VOTED:
      return triggerPoorlyRatedMoviesSearch;
    case TYPE_LONG_MOVIES:
      return triggerLongMoviesSearch;
    case TYPE_SHORT_MOVIES:
      return triggerShortMoviesSearch;
    default:
      throw new Error("Invalid type received");
  }
}

const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      ownProps.clickCallback();
      let fn = getClickFunction(ownProps.type);
      return fn(dispatch);
    }
  }
};


const DiscoverPreBuiltLinkContainer = connect(
  undefined,
  mapDispatchToLinkProps
)(SearchLink);

export default DiscoverPreBuiltLinkContainer;