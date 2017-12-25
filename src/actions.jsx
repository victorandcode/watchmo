export const RECEIVE_MOVIES = "RECEIVE_MOVIES";
export const RECEIVE_QUERY_MOVIES = "RECEIVE_QUERY_MOVIES";
export const REQUEST_SEARCH_QUERY = "REQUEST_SEARCH_QUERY";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_MOVIE_DETAILS = "RECEIVE_MOVIE_DETAILS";
export const OPEN_MODAL_VIDEO = "OPEN_MODAL_VIDEO";
export const CLOSE_MODAL_VIDEO = "CLOSE_MODAL_VIDEO";
export const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";

const apiKey = "60bab434a5295afc1c82c16e3a8dcc83"
const apiBaseUrl = "https://api.themoviedb.org/3"
const discoverMoviesUrl = `${apiBaseUrl}/discover/movie?page=1&api_key=${apiKey}`;
const searchMoviesUrl = `${apiBaseUrl}/search/movie?api_key=${apiKey}&query={searchQuery}`;
const categoriesUrl = `${apiBaseUrl}/genre/movie/list?page=1&api_key=${apiKey}&language=en-US`;
const movieDetailsUrl = `${apiBaseUrl}/movie/{movieId}?api_key=${apiKey}&append_to_response=videos`;

export function receiveMovies(json) {
  return {
    type: RECEIVE_MOVIES,
    movies: json.results
  }
}

export function receiveQueryMovies(json) {
  return {
    type: RECEIVE_QUERY_MOVIES,
    movies: json.results
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

export function openModalVideo(videoId) {
  return {
    type: OPEN_MODAL_VIDEO,
    videoId
  }
}

export function closeModalVideo() {
  return {
    type: CLOSE_MODAL_VIDEO
  }
}

function updateSearchQuery(searchQuery) {
  return {
    type: UPDATE_SEARCH_QUERY,
    searchQuery
  }
}

export function fetchDiscoverMovies(dispatch) {
  fetch(discoverMoviesUrl)
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveMovies(json)))
}

export function fetchCategories(dispatch) {
  fetch(categoriesUrl)
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveGenres(json)))
}

export function fetchMovieDetails(dispatch, movieId) {
  const url = movieDetailsUrl.replace("{movieId}", movieId);
  fetch(url)
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveMovieDetails(json)))
}

export function updateAndFetchSearchQuery(dispatch, searchQueryRaw) {
  let searchQuery = searchQueryRaw.trim();
  dispatch(updateSearchQuery(searchQuery));
  if(searchQuery) {
    const url = searchMoviesUrl.replace("{searchQuery}", searchQuery);
    fetch(url)
      .then(
        response => response.json(),
        error => console.log("An error ocurred.", error)
      )
      .then(json => dispatch(receiveQueryMovies(json)))
  }
}