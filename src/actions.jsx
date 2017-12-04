export const RECEIVE_DISCOVER_MOVIES = "RECEIVE_DISCOVER_MOVIES";
export const REQUEST_QUERY = "REQUEST_QUERY";
export const RECEIVE_QUERY = "RECEIVE_QUERY";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

const apiKey = "60bab434a5295afc1c82c16e3a8dcc83"
const discoverMoviesUrl = `https://api.themoviedb.org/3/discover/movie?page=1&api_key=${apiKey}`;
const categoriesUrl = `https://api.themoviedb.org/3/genre/movie/list?page=1&api_key=${apiKey}&language=en-US`;


export function receiveDiscoverMovies(json) {
  return {
    type: RECEIVE_DISCOVER_MOVIES,
    movies: json.results
  }
}

export function requestQuery(query) {
  return {
    type: REQUEST_QUERY
  }
}

export function receiveQuery() {
  return {
    tye: RECEIVE_QUERY
  }
}

export function receiveGenres(json) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: json.genres
  }
}

export function fetchDiscoverMovies(dispatch) {
  fetch(discoverMoviesUrl)
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveDiscoverMovies(json)))
}

export function fetchCategories(dispatch) {
  fetch(categoriesUrl)
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveGenres(json)))
}