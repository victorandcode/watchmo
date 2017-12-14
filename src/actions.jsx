export const RECEIVE_DISCOVER_MOVIES = "RECEIVE_DISCOVER_MOVIES";
export const REQUEST_QUERY = "REQUEST_QUERY";
export const RECEIVE_QUERY = "RECEIVE_QUERY";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_MOVIE_DETAILS = "RECEIVE_MOVIE_DETAILS";

const apiKey = "60bab434a5295afc1c82c16e3a8dcc83"
const apiBaseUrl = "https://api.themoviedb.org/3"
const discoverMoviesUrl = `${apiBaseUrl}/discover/movie?page=1&api_key=${apiKey}`;
const categoriesUrl = `${apiBaseUrl}/genre/movie/list?page=1&api_key=${apiKey}&language=en-US`;
const movieDetailsUrl = `${apiBaseUrl}/movie/{movieId}?api_key=${apiKey}`


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

export function receiveMovieDetails(json) {
  return {
    type: RECEIVE_MOVIE_DETAILS,
    movieDetails: json
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

export function fetchMovieDetails(dispatch, movieId) {
  const url = movieDetailsUrl.replace("{movieId}", movieId);
  fetch(url)
    .then(
      response => response.json(),
      error => console.log("An error ocurred.", error)
    )
    .then(json => dispatch(receiveMovieDetails(json)))
}