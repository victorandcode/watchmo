import { 
  IMAGE_BASE_URL_W300,
  IMAGE_BASE_URL_W500
} from './constants';

function getImageBaseUrl(imageIsBig) {
  return imageIsBig ? IMAGE_BASE_URL_W500 : IMAGE_BASE_URL_W300;
}

function getBackdropUrl(backdropPath, imageIsBig) {
  if(backdropPath) {
    return getImageBaseUrl(imageIsBig) + backdropPath;
  } else {
    return "";
  }
}

function getYear(unformattedDate) {
  if(unformattedDate) {
    return unformattedDate.slice(0, 4);
  } else {
    return "N/A";
  }
}

function getVoteAverage(voteAverageInt) {
  return `${voteAverageInt}/10`;
}

function getDuration(runtime) {
  let hours = "";
  let minutes = "";
  if (Math.floor(runtime / 60)) {
    hours = Math.floor(runtime / 60).toString() + "h ";
  }
  if (runtime % 60) {
    minutes = (runtime % 60).toString() + "m";
  }
  return hours + minutes;
}

function parseImages(imagesObjs = []) {
  console.log(imagesObjs);
  return imagesObjs.map((imageObj) => {
    return IMAGE_BASE_URL_W500 + imageObj.file_path;
  })
}

function parseMovieDetails(movieDetails) {
  return {
    detailsFetched: 1,
    year: getYear(movieDetails.release_date),
    voteAverage: getVoteAverage(movieDetails.vote_average),
    adultFilm: movieDetails.adult,
    duration: getDuration(movieDetails.runtime),
    videos: movieDetails.videos.results,
    images: parseImages(movieDetails.images.backdrops)
  };
}

function parseBasicMovieData(basicMovieData, imageIsBig) {
  return Object.assign({}, basicMovieData, {
    id: basicMovieData.id,
    backdropUrl: getBackdropUrl(basicMovieData.backdrop_path, imageIsBig)
  })
}

/*
    options
      imageIsBig: boolean
*/
export function getMovieData(basicMovieData, movieDetails, options = {}) {
  let movie = {};
  let { imageIsBig = undefined } = options;
  Object.assign(movie, parseBasicMovieData(basicMovieData, imageIsBig));
  if(movieDetails) {
    Object.assign(movie, parseMovieDetails(movieDetails, imageIsBig))
  }
  return movie;
}