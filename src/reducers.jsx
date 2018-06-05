import { combineReducers } from "redux";
import { createResponsiveStateReducer } from "redux-responsive";
import {
  CLEAR_SEARCHED_MOVIES,
  CLEAR_SELECTED_MOVIE,
  CLOSE_LIGHTBOX,
  CLOSE_MODAL_VIDEO,
  OPEN_LIGHTBOX,
  OPEN_MODAL_VIDEO,
  RECEIVE_CATEGORIES,
  RECEIVE_DISCOVER_MOVIES,
  RECEIVE_MOVIES_NOW_PLAYING,
  RECEIVE_NEW_MOVIES,
  RECEIVE_SEARCHED_MOVIES,
  RECEIVE_MOVIE_DETAILS,
  RECEIVE_UPCOMING_MOVIES,
  SET_LIGHTBOX_INDEX,
  SET_SEARCHED_MOVIES_TITLE,
  SELECT_MOVIE,
  START_SEARCHED_MOVIES_REQUEST,
  UPDATE_SEARCH_QUERY
} from "./actions";
import { RESPONSIVE_COLUMN_CONFIG } from "./constants";

function discoverMovies(state = [], action) {
  switch (action.type) {
    case RECEIVE_DISCOVER_MOVIES:
      return action.movies;
    default:
      return state;
  }
}

function newMovies(state = [], action) {
  switch (action.type) {
    case RECEIVE_NEW_MOVIES:
      return action.movies;
    default:
      return state;
  }
}

function upcomingMovies(state = [], action) {
  switch (action.type) {
    case RECEIVE_UPCOMING_MOVIES:
      return action.movies;
    default:
      return state;
  }
}

const searchedMoviesInitialState = {
  lastQueryUrl: "",
  movies: [],
  noMorePages: false,
  page: 1,
  searchInProgress: false,
  searchHasTriggered: false,
  searchHasNoResults: false,
  searchTitle: ""
};

function searchedMovies(state = searchedMoviesInitialState, action) {
  switch (action.type) {
    case START_SEARCHED_MOVIES_REQUEST:
      return Object.assign({}, state, {
        searchHasTriggered: true,
        searchHasNoResults: false,
        searchInProgress: true,
        lastQueryUrl: action.newQueryUrl
      });
    case RECEIVE_SEARCHED_MOVIES:
      let movies = [...state.movies, ...action.movies];
      let noMorePages = action.movies.length === 0;
      let searchHasNoResults = movies.length === 0;
      let page = noMorePages ? state.page : state.page + 1;
      return Object.assign({}, state, {
        movies: movies,
        noMorePages: noMorePages,
        searchHasNoResults: searchHasNoResults,
        searchInProgress: false,
        page: page
      });
    case CLEAR_SEARCHED_MOVIES:
      return searchedMoviesInitialState;
    case SET_SEARCHED_MOVIES_TITLE:
      return Object.assign({}, state, {
        searchTitle: action.title
      });
    default:
      return state;
  }
}

function movieDetails(state = {}, action) {
  switch (action.type) {
    case RECEIVE_MOVIE_DETAILS:
      let result = Object.assign({}, state);
      result[action.movieDetails.id] = action.movieDetails;
      return result;
    default:
      return state;
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}

function featuredMovie(
  state = {
    synopsis:
      "Jake Pentecost, son of Stacker Pentecost, reunites with Mako Mori to lead a new generation of Jaeger pilots",
    releaseDate: new Date(2018, 2, 21).toLocaleDateString(),
    videos: [{ key: "Am-gG-VyXPg" }]
  },
  action
) {
  return state;
}

function moviesNowPlaying(state = [], action) {
  switch (action.type) {
    case RECEIVE_MOVIES_NOW_PLAYING:
      return action.movies;
    default:
      return state;
  }
}

function users(
  state = [
    {
      id: 0,
      name: "John",
      iconUrl:
        "data:image/png;base64,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"
    }
  ],
  action
) {
  return state;
}

function showVideoModal(
  state = {
    showing: false,
    videoId: ""
  },
  action
) {
  switch (action.type) {
    case OPEN_MODAL_VIDEO:
      return {
        showing: true,
        videoId: action.videoId
      };
    case CLOSE_MODAL_VIDEO:
      return {
        showing: false,
        videoId: ""
      };
    default:
      return state;
  }
}

function showLightbox(
  state = {
    showing: false,
    images: [],
    index: 0
  },
  action
) {
  switch (action.type) {
    case OPEN_LIGHTBOX:
      return {
        showing: true,
        images: action.images,
        index: 0
      };
    case CLOSE_LIGHTBOX:
      return {
        showing: false,
        images: [],
        index: 0
      };
    case SET_LIGHTBOX_INDEX:
      return Object.assign({}, state, {
        index: action.index
      });
    default:
      return state;
  }
}

function searchQuery(state = "", action) {
  switch (action.type) {
    case UPDATE_SEARCH_QUERY:
      return action.searchQuery;
    default:
      return state;
  }
}

function selectedMovie(
  state = {
    elementId: undefined,
    movie: undefined,
    containerKey: undefined
  },
  action
) {
  switch (action.type) {
    case SELECT_MOVIE:
      return {
        elementId: action.elementId,
        movie: action.movie,
        containerKey: action.containerKey
      };
    case CLEAR_SELECTED_MOVIE:
      return {
        movie: undefined,
        containerKey: undefined
      };
    default:
      return state;
  }
}

const responsiveReducer = createResponsiveStateReducer({
  smallest: RESPONSIVE_COLUMN_CONFIG["smallest"]["breakpoint"],
  extraSmall: RESPONSIVE_COLUMN_CONFIG["extraSmall"]["breakpoint"],
  small: RESPONSIVE_COLUMN_CONFIG["small"]["breakpoint"],
  medium: RESPONSIVE_COLUMN_CONFIG["medium"]["breakpoint"],
  large: RESPONSIVE_COLUMN_CONFIG["large"]["breakpoint"],
  extraLarge: RESPONSIVE_COLUMN_CONFIG["extraLarge"]["breakpoint"]
});

const rootReducer = combineReducers({
  categories,
  featuredMovie,
  moviesNowPlaying,
  discoverMovies,
  searchedMovies,
  newMovies,
  upcomingMovies,
  movieDetails,
  users,
  showLightbox,
  showVideoModal,
  searchQuery,
  selectedMovie,
  browser: responsiveReducer
});

export default rootReducer;
