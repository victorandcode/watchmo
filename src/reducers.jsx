import { combineReducers } from 'redux';
import { 
  CLEAR_QUERY_MOVIES,
  CLOSE_LIGHTBOX,
  CLOSE_MODAL_VIDEO,
  OPEN_LIGHTBOX,
  OPEN_MODAL_VIDEO,
  RECEIVE_CATEGORIES,
  RECEIVE_MOVIES,
  RECEIVE_MOVIES_NOW_PLAYING,
  RECEIVE_QUERY_MOVIES,
  RECEIVE_MOVIE_DETAILS,
  SET_LIGHTBOX_INDEX,
  UPDATE_SEARCH_QUERY
} from './actions';

function movies(state = [], action) {
  switch(action.type) {
    case RECEIVE_MOVIES:
      return action.movies;
    default:
      return state;
  }
}

function queryMovies(state = {
  movies: [],
  searchHasTriggered: false
}, action) {
  switch(action.type) {
    case RECEIVE_QUERY_MOVIES:
      return {
        movies: action.movies,
        searchHasTriggered: true
      }
    case CLEAR_QUERY_MOVIES:
      return {
        movies: [],
        searchHasTriggered: false
      }
    default:
      return state;
  }
}

function movieDetails(state = {}, action) {
  switch(action.type) {
    case RECEIVE_MOVIE_DETAILS:
      let result = Object.assign({}, state)
      result[action.movieDetails.id] = action.movieDetails
      return result;
    default:
      return state;
  }
}

function categories(state = [], action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state;
  }
}

function userLinks(state = [
  "Discover",
  "Popular",
  "Latest added",
  "My favorites",
  "Continue watching",
  "I'm feeling lucky"
], action) {
  return state;
}

function featuredMovie(state = {
  "synopsis": "James Bond must get out of retirement to face an old enemy that emerged from the shadows by destroying MI6 from the inside out.",
  "ageRestriction": "16+",
  "videos": [{"key": "6kw1UVovByw"}]
}, action) {
  return state
}

function moviesNowPlaying(state = [], action) {
  switch(action.type) {
    case RECEIVE_MOVIES_NOW_PLAYING:
      return action.movies;
    default:
      return state;
  }
}

function users(state = [
  {
    id: 0,
    name: "John",
    iconUrl: "data:image/png;base64,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"
  },
  {
    id: 1,
    name: "Maria",
    iconUrl: "data:image/png;base64,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"
  },
  {
    id: 2,
    name: "Martin",
    iconUrl: "data:image/png;base64,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"
  }
], action) {
  return state;
}

function showVideoModal(state = {
  showing: false,
  videoId: ''
}, action) {
  switch(action.type) {
    case OPEN_MODAL_VIDEO:
      return {
        showing: true,
        videoId: action.videoId
      }
    case CLOSE_MODAL_VIDEO:
      return {
        showing: false,
        videoId: ''
      }
    default:
      return state;
  }
}

function showLightbox(state = {
  showing: false,
  images: [],
  index: 0
}, action) {
  switch(action.type) {
    case OPEN_LIGHTBOX:
      return {
        showing: true,
        images: action.images,
        index: 0
      }
    case CLOSE_LIGHTBOX:
      return {
        showing: false,
        images: [],
        index: 0
      }
    case SET_LIGHTBOX_INDEX:
      return Object.assign({}, state, {
        index: action.index
      })
    default:
      return state;
  }
}

function searchQuery(state = "", action) {
  switch(action.type) {
    case UPDATE_SEARCH_QUERY:
      return action.searchQuery;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  categories,
  featuredMovie,
  moviesNowPlaying,
  movies,
  queryMovies,
  movieDetails,
  users,
  userLinks,
  showLightbox,
  showVideoModal,
  searchQuery
});

export default rootReducer;