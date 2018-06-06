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
  getUpcomingMoviesUrl,
  getSearchMoviesNextPageUrl
} from "./utils/url-builders";

export const CLEAR_SEARCHED_MOVIES = "CLEAR_SEARCHED_MOVIES";
export const CLEAR_SELECTED_MOVIE = "CLEAR_SELECTED_MOVIE";
export const CLOSE_MODAL_VIDEO = "CLOSE_MODAL_VIDEO";
export const CLOSE_LIGHTBOX = "CLOSE_LIGHTBOX";
export const OPEN_LIGHTBOX = "OPEN_LIGHTBOX";
export const OPEN_MODAL_VIDEO = "OPEN_MODAL_VIDEO";
export const RECEIVE_DISCOVER_MOVIES = "RECEIVE_DISCOVER_MOVIES";
export const RECEIVE_MOVIES_NOW_PLAYING = "RECEIVE_MOVIES_NOW_PLAYING";
export const RECEIVE_SEARCHED_MOVIES = "RECEIVE_SEARCHED_MOVIES";
export const RECEIVE_SEARCHED_MOVIES_NEXT_PAGE =
  "RECEIVE_SEARCHED_MOVIES_NEXT_PAGE";
export const REQUEST_SEARCH_QUERY = "REQUEST_SEARCH_QUERY";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_MOVIE_DETAILS = "RECEIVE_MOVIE_DETAILS";
export const RECEIVE_NEW_MOVIES = "RECEIVE_NEW_MOVIES";
export const RECEIVE_UPCOMING_MOVIES = "RECEIVE_UPCOMING_MOVIES";
export const SET_LIGHTBOX_INDEX = "SET_LIGHTBOX_INDEX";
export const SET_SEARCHED_MOVIES_TITLE = "SET_SEARCHED_MOVIES_TITLE";
export const SELECT_MOVIE = "SELECT_MOVIE";
export const START_SEARCHED_MOVIES_REQUEST = "START_SEARCHED_MOVIES_REQUEST";
export const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";

function filterMoviesOnlyWithBackdrop(movies) {
  return movies.filter(movie => {
    return movie.backdrop_path !== "" && movie.backdrop_path !== null;
  });
}

export function receiveDiscoverMovies(json) {
  return {
    type: RECEIVE_DISCOVER_MOVIES,
    movies: filterMoviesOnlyWithBackdrop(json.results)
  };
}

export function receiveMoviesNowPlaying(json) {
  return {
    type: RECEIVE_MOVIES_NOW_PLAYING,
    movies: filterMoviesOnlyWithBackdrop(json.results)
  };
}

export function receiveNewMovies(json) {
  return {
    type: RECEIVE_NEW_MOVIES,
    movies: filterMoviesOnlyWithBackdrop(json.results)
  };
}

export function receiveUpcomingMovies(json) {
  return {
    type: RECEIVE_UPCOMING_MOVIES,
    movies: filterMoviesOnlyWithBackdrop(json.results)
  };
}

export function receiveSearchedMovies(json, searchId) {
  let results = json ? json.results : [];
  return {
    type: RECEIVE_SEARCHED_MOVIES,
    movies: filterMoviesOnlyWithBackdrop(results),
    searchId
  };
}

export function requestSearchQuery(searchQuery) {
  return {
    type: REQUEST_SEARCH_QUERY,
    searchQuery
  };
}

export function receiveGenres(json) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.genres
  };
}

export function receiveMovieDetails(json) {
  return {
    type: RECEIVE_MOVIE_DETAILS,
    movieDetails: json
  };
}

export function triggerMovieAction(movie) {
  let videos = movie.videos;
  let images = movie.images;
  if (videos.length) {
    return openModalVideo(videos[0].key);
  } else if (images.length) {
    return openLightbox(images);
  } else {
    alert("NO INFORMATION TO SHOW");
  }
}

function openModalVideo(videoId) {
  return {
    type: OPEN_MODAL_VIDEO,
    videoId
  };
}

function openLightbox(images) {
  return {
    type: OPEN_LIGHTBOX,
    images
  };
}

export function closeLightbox() {
  return {
    type: CLOSE_LIGHTBOX
  };
}

export function closeModalVideo() {
  return {
    type: CLOSE_MODAL_VIDEO
  };
}

export function setLightboxIndex(index) {
  return {
    type: SET_LIGHTBOX_INDEX,
    index
  };
}

export function setSearchedMoviesTitle(title) {
  return {
    type: SET_SEARCHED_MOVIES_TITLE,
    title
  };
}

function clearSearchedMovies() {
  return {
    type: CLEAR_SEARCHED_MOVIES
  };
}

function updateSearchQuery(searchQuery) {
  return {
    type: UPDATE_SEARCH_QUERY,
    searchQuery
  };
}

function startSearchedMoviesRequest(newQueryUrl, searchId) {
  return {
    type: START_SEARCHED_MOVIES_REQUEST,
    newQueryUrl,
    searchId
  };
}

export function fetchDiscoverMovies() {
  return dispatch => {
    fetch(getDiscoverMoviesUrl())
      .then(
        response => response.json(),
        error => console.log("An error ocurred.", error)
      )
      .then(json => dispatch(receiveDiscoverMovies(json)));
  };
}

function processReceiveMoviesNowPlaying(json) {
  return dispatch => {
    dispatch(receiveMoviesNowPlaying(json));
    let elements = json.results;
    for (let i = 0; i < elements.length; i++) {
      dispatch(fetchMovieDetails(elements[i].id));
    }
  };
}

export function fetchMoviesNowPlaying() {
  return dispatch => {
    fetch(getMoviesNowPlayingUrl())
      .then(
        response => response.json(),
        error => console.log("An error ocurred.", error)
      )
      .then(json => dispatch(processReceiveMoviesNowPlaying(json)));
  };
}

export function fetchNewMovies() {
  return dispatch => {
    fetch(getNewMoviesUrl())
      .then(
        response => response.json(),
        error => console.log("An error ocurred.", error)
      )
      .then(json => dispatch(receiveNewMovies(json)));
  };
}

export function fetchUpcomingMovies() {
  return dispatch => {
    fetch(getUpcomingMoviesUrl())
      .then(
        response => response.json(),
        error => console.log("An error ocurred.", error)
      )
      .then(json => dispatch(receiveUpcomingMovies(json)));
  };
}

export function fetchCategories() {
  return dispatch => {
    fetch(getGenresUrl())
      .then(
        response => response.json(),
        error => console.log("An error ocurred.", error)
      )
      .then(json => dispatch(receiveGenres(json)));
  };
}

export function fetchMovieDetails(movieId) {
  return dispatch => {
    fetch(getMovieDetailsUrl(movieId))
      .then(
        response => response.json(),
        error => console.log("An error ocurred.", error)
      )
      .then(json => {
        if (json) {
          dispatch(receiveMovieDetails(json));
        }
      });
  };
}

function fetchSearchedMoviesInitialRequest(url, title) {
  return dispatch => {
    const searchId = Math.random();
    dispatch(clearSearchedMovies());
    dispatch(setSearchedMoviesTitle(title));
    dispatch(startSearchedMoviesRequest(url, searchId));
    fetch(url)
      .then(
        response => response.json(),
        error => console.log("An error ocurred.", error)
      )
      .then(json => dispatch(receiveSearchedMovies(json, searchId)));
  };
}

function fetchSearchedMoviesNextPage(newQueryUrl, searchId) {
  return dispatch => {
    fetch(newQueryUrl)
      .then(
        response => {
          return response.json();
        },
        error => console.log("An error ocurred.", error)
      )
      .then(json => dispatch(receiveSearchedMovies(json, searchId)));
  };
}

export function triggerSearchedMoviesNextPage() {
  return (dispatch, getState) => {
    let { searchedMovies } = getState();
    if (searchedMovies.searchInProgress || searchedMovies.noMorePages) {
      return;
    }
    let newQueryUrl = getSearchMoviesNextPageUrl(
      searchedMovies.lastQueryUrl,
      searchedMovies.page
    );
    const searchId = Math.random();
    dispatch(startSearchedMoviesRequest(newQueryUrl, searchId));
    dispatch(fetchSearchedMoviesNextPage(newQueryUrl, searchId));
  };
}

export function triggerQuerySearch(searchQueryRaw) {
  return dispatch => {
    let searchQuery = searchQueryRaw.trim();
    let title = `Results for '${searchQuery}':`;
    if (!searchQueryRaw.length) {
      dispatch(clearSearchedMovies());
    }
    dispatch(updateSearchQuery(searchQuery));
    if (searchQuery) {
      const url = getSearchMoviesUrl(searchQuery);
      dispatch(fetchSearchedMoviesInitialRequest(url, title));
    }
  };
}

export function triggerGenreSearch(genreName, genreId) {
  return dispatch => {
    const url = getMoviesByGenreUrl(genreId);
    let title = `Results for genre '${genreName}':`;
    dispatch(fetchSearchedMoviesInitialRequest(url, title));
  };
}

export function trigger80sMoviesSearch() {
  return dispatch => {
    let title = "80's movies:";
    dispatch(fetchSearchedMoviesInitialRequest(get80sMoviesUrl(), title));
  };
}

export function trigger90sMoviesSearch() {
  return dispatch => {
    let title = "90's movies:";
    dispatch(fetchSearchedMoviesInitialRequest(get90sMoviesUrl(), title));
  };
}

export function triggerHighlyRatedMoviesSearch() {
  return dispatch => {
    let title = "Highly rated movies:";
    dispatch(
      fetchSearchedMoviesInitialRequest(getHighlyRatedMoviesUrl(), title)
    );
  };
}

export function triggerPoorlyRatedMoviesSearch() {
  return dispatch => {
    let title = "Poorly rated movies:";
    dispatch(
      fetchSearchedMoviesInitialRequest(getPoorlyRatedMoviesUrl(), title)
    );
  };
}

export function triggerLongMoviesSearch() {
  return dispatch => {
    let title = "Long movies:";
    dispatch(fetchSearchedMoviesInitialRequest(getLongMoviesUrl(), title));
  };
}

export function triggerShortMoviesSearch() {
  return dispatch => {
    let title = "Short movies:";
    dispatch(fetchSearchedMoviesInitialRequest(getShortMoviesUrl(), title));
  };
}

export function triggerBestOf2017Search() {
  return dispatch => {
    let title = "Best of 2017:";
    dispatch(fetchSearchedMoviesInitialRequest(getBestOf2017Url(), title));
  };
}

export function triggerBestOf2016Search() {
  return dispatch => {
    let title = "Best of 2016:";
    dispatch(fetchSearchedMoviesInitialRequest(getBestOf2016Url(), title));
  };
}

export function selectMovie(elementId, movie, containerKey) {
  return {
    type: SELECT_MOVIE,
    elementId,
    movie,
    containerKey
  };
}

export function clearSelectedMovie() {
  return {
    type: CLEAR_SELECTED_MOVIE
  };
}
