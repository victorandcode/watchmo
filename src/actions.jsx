import {
  get80sMoviesUrl,
  get90sMoviesUrl,
  getBestOf2016Url,
  getBestOf2017Url,
  getDiscoverMoviesUrl,
  getGenresUrl,
  getHighlyRatedMoviesUrl,
  getLongMoviesUrl,
  getMoviesByGenreUrl,
  getMovieDetailsUrl,
  getMoviesNowPlayingUrl,
  getNewMoviesUrl,
  getPoorlyRatedMoviesUrl,
  getSearchMoviesUrl,
  getShortMoviesUrl,
  getUpcomingMoviesUrl
} from './utils/url-builders';

export const CLEAR_SEARCHED_MOVIES = "CLEAR_SEARCHED_MOVIES";
export const CLOSE_MODAL_VIDEO = "CLOSE_MODAL_VIDEO";
export const CLOSE_LIGHTBOX = "CLOSE_LIGHTBOX";
export const OPEN_LIGHTBOX = "OPEN_LIGHTBOX";
export const OPEN_MODAL_VIDEO = "OPEN_MODAL_VIDEO";
export const RECEIVE_DISCOVER_MOVIES = "RECEIVE_DISCOVER_MOVIES";
export const RECEIVE_MOVIES_NOW_PLAYING = "RECEIVE_MOVIES_NOW_PLAYING";
export const RECEIVE_SEARCHED_MOVIES = "RECEIVE_SEARCHED_MOVIES";
export const REQUEST_SEARCH_QUERY = "REQUEST_SEARCH_QUERY";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_MOVIE_DETAILS = "RECEIVE_MOVIE_DETAILS";
export const RECEIVE_NEW_MOVIES = "RECEIVE_NEW_MOVIES";
export const RECEIVE_UPCOMING_MOVIES = "RECEIVE_UPCOMING_MOVIES";
export const SET_LIGHTBOX_INDEX = "SET_LIGHTBOX_INDEX";
export const SET_SEARCHED_MOVIES_TITLE = "SET_SEARCHED_MOVIES_TITLE";
export const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";


function filterMoviesOnlyWithBackdrop(movies) {
  return movies.filter((movie) => {
    return movie.backdrop_path !== "" && movie.backdrop_path !== null;
  });
}

export function receiveDiscoverMovies(json) {
  return {
    type: RECEIVE_DISCOVER_MOVIES,
    movies: filterMoviesOnlyWithBackdrop(json.results)
  }
}

export function receiveMoviesNowPlaying(json) {
  return {
    type: RECEIVE_MOVIES_NOW_PLAYING,
    movies: filterMoviesOnlyWithBackdrop(json.results)
  }
}

export function receiveNewMovies(json) {
  return {
    type: RECEIVE_NEW_MOVIES,
    movies: filterMoviesOnlyWithBackdrop(json.results)
  }
}

export function receiveUpcomingMovies(json) {
  return {
    type: RECEIVE_UPCOMING_MOVIES,
    movies: filterMoviesOnlyWithBackdrop(json.results)
  }
}

export function receiveSearchedMovies(json, title) {
  return {
    type: RECEIVE_SEARCHED_MOVIES,
    movies: filterMoviesOnlyWithBackdrop(json.results),
    title
  }
}

export function requestSearchQuery(searchQuery) {
  return {
    type: REQUEST_SEARCH_QUERY,
    searchQuery
  }
}

export function receiveGenres(json) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.genres
  }
}

export function receiveMovieDetails(json) {
  return {
    type: RECEIVE_MOVIE_DETAILS,
    movieDetails: json
  }
}

export function triggerMovieAction(movie) {
  let videos = movie.videos;
  let images = movie.images;
  if(videos.length) {
    return openModalVideo(videos[0].key)
  } else if(images.length) {
    return openLightbox(images);
  } else {
    alert("NO INFORMATION TO SHOW");
  }
}

function openModalVideo(videoId) {
  return {
    type: OPEN_MODAL_VIDEO,
    videoId
  }
}

function openLightbox(images) {
  return {
    type: OPEN_LIGHTBOX,
    images
  }
}

export function closeLightbox() {
  return {
    type: CLOSE_LIGHTBOX
  }
}

export function closeModalVideo() {
  return {
    type: CLOSE_MODAL_VIDEO
  }
}

export function setLightboxIndex(index) {
  return {
    type: SET_LIGHTBOX_INDEX,
    index
  }
}

export function setSearchedMoviesTitle(title) {
  return {
    type: SET_SEARCHED_MOVIES_TITLE,
    title
  }
}

function clearSearchedMovies() {
  return {
    type: CLEAR_SEARCHED_MOVIES
  }
}

function updateSearchQuery(searchQuery) {
  return {
    type: UPDATE_SEARCH_QUERY,
    searchQuery
  }
}

export function fetchDiscoverMovies(dispatch) {
  fetch(getDiscoverMoviesUrl())
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveDiscoverMovies(json)))
}

function processReceiveMoviesNowPlaying(dispatch, json) {
  dispatch(receiveMoviesNowPlaying(json));
  let elements = json.results;
  for (let i = 0; i < elements.length; i++) {
    fetchMovieDetails(dispatch, elements[i].id);
  }
}

export function fetchMoviesNowPlaying(dispatch) {
  fetch(getMoviesNowPlayingUrl())
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => processReceiveMoviesNowPlaying(dispatch, json))
}

export function fetchNewMovies(dispatch) {
  fetch(getNewMoviesUrl())
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveNewMovies(json)))
}

export function fetchUpcomingMovies(dispatch) {
  fetch(getUpcomingMoviesUrl())
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveUpcomingMovies(json))) 
}

export function fetchCategories(dispatch) {
  fetch(getGenresUrl())
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveGenres(json)))
}

export function fetchMovieDetails(dispatch, movieId) {
  fetch(getMovieDetailsUrl(movieId))
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveMovieDetails(json)))
}

function fetchSearchedMovies(dispatch, url, title) {
  dispatch(setSearchedMoviesTitle(title));

  fetch(url)
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveSearchedMovies(json)))
}

export function triggerQuerySearch(dispatch, searchQueryRaw) {
  let searchQuery = searchQueryRaw.trim();
  let title = `Results for '${searchQuery}':`;
  if(!searchQueryRaw.length) {
    dispatch(clearSearchedMovies());
  }
  dispatch(updateSearchQuery(searchQuery));
  if(searchQuery) {
    const url = getSearchMoviesUrl(searchQuery);
    fetchSearchedMovies(dispatch, url, title);
  }
}

export function triggerGenreSearch(dispatch, genreName, genreId) {
  const url = getMoviesByGenreUrl(genreId);
  let title = `Results for genre '${genreName}':`;
  fetchSearchedMovies(dispatch, url, title);
}

export function trigger80sMoviesSearch(dispatch) {
  let title = "80's movies:"
  fetchSearchedMovies(dispatch, get80sMoviesUrl(), title);
}

export function trigger90sMoviesSearch(dispatch) {
  let title = "90's movies:";
  fetchSearchedMovies(dispatch, get90sMoviesUrl(), title);
}

export function triggerHighlyRatedMoviesSearch(dispatch) {
  let title = "Highly rated movies:";
  fetchSearchedMovies(dispatch, getHighlyRatedMoviesUrl(), title);
}

export function triggerPoorlyRatedMoviesSearch(dispatch) {
  let title = "Poorly rated movies:";
  fetchSearchedMovies(dispatch, getPoorlyRatedMoviesUrl(), title);
}

export function triggerLongMoviesSearch(dispatch) {
  let title = "Long movies:";
  fetchSearchedMovies(dispatch, getLongMoviesUrl(), title);
}

export function triggerShortMoviesSearch(dispatch) {
  let title = "Short movies:";
  fetchSearchedMovies(dispatch, getShortMoviesUrl(), title);
}

export function triggerBestOf2017Search(dispatch) {
  let title = "Best of 2017:";
  fetchSearchedMovies(dispatch, getBestOf2017Url(), title); 
}

export function triggerBestOf2016Search(dispatch) {
  let title = "Best of 2016:";
  fetchSearchedMovies(dispatch, getBestOf2016Url(), title); 
}