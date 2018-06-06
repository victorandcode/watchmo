const apiKey = "60bab434a5295afc1c82c16e3a8dcc83";
const apiBaseUrl = "https://api.themoviedb.org/3";
const discoverMoviesUrl = `${apiBaseUrl}/discover/movie?page=1&api_key=${apiKey}`;
const moviesNowPlayingUrl = `${apiBaseUrl}/movie/now_playing?page=1&api_key=${apiKey}`;
const searchMoviesUrl = `${apiBaseUrl}/search/movie?api_key=${apiKey}&page=1&query={searchQuery}`;
const genresUrl = `${apiBaseUrl}/genre/movie/list?page=1&api_key=${apiKey}&language=en-US`;
const movieDetailsUrl = `${apiBaseUrl}/movie/{movieId}?api_key=${apiKey}&append_to_response=videos,images`;
const moviesByGenreUrl = `${apiBaseUrl}/discover/movie?page=1&api_key=${apiKey}&with_genres={genreId}`;

class DiscoverMoviesUrlBuilder {
  constructor(props) {
    this.url = discoverMoviesUrl;
    this.buildUrl(props);
  }

  buildUrl(props) {
    let {
      genreId,
      releasedDateGt,
      releasedDateLt,
      voteAverageGt,
      voteAverageLt,
      runtimeGt,
      runtimeLt
    } = props;
    if (genreId !== undefined) {
      this.appendGenreSearch(genreId);
    }
    if (releasedDateLt !== undefined) {
      this.appendReleasedDateLt(releasedDateLt);
    }
    if (releasedDateGt !== undefined) {
      this.appendReleasedDateGt(releasedDateGt);
    }
    if (voteAverageGt !== undefined) {
      this.appendVoteAverageGt(voteAverageGt);
    }
    if (voteAverageLt !== undefined) {
      this.appendVoteAverageLt(voteAverageLt);
    }
    if (runtimeGt !== undefined) {
      this.appendRunetimeGt(runtimeGt);
    }
    if (runtimeLt !== undefined) {
      this.appendRunetimeLt(runtimeLt);
    }
  }

  appendGenreSearch(genreId) {
    this.url += `&with_genres=${genreId}`;
  }

  appendReleasedDateGt(releasedDateGt) {
    this.url += `&primary_release_date.gte=${releasedDateGt}`;
  }

  appendReleasedDateLt(releasedDateLt) {
    this.url += `&primary_release_date.lte=${releasedDateLt}`;
  }

  appendVoteAverageGt(voteAverageGt) {
    this.url += `&vote_average.gte=${voteAverageGt}`;
  }

  appendVoteAverageLt(voteAverageLt) {
    this.url += `&vote_average.lte=${voteAverageLt}`;
  }

  appendRunetimeGt(runtimeGt) {
    this.url += `&with_runtime.gte=${runtimeGt}`;
  }

  appendRunetimeLt(runtimeLt) {
    this.url += `&with_runtime.lte=${runtimeLt}`;
  }

  getUrl() {
    return this.url;
  }
}

export function getDiscoverMoviesUrl() {
  return discoverMoviesUrl;
}

export function getMoviesNowPlayingUrl() {
  return moviesNowPlayingUrl;
}

export function getSearchMoviesUrl(searchQuery, page) {
  let result = searchMoviesUrl.replace("{searchQuery}", searchQuery);
  result = result.replace("{page}", page);
  return result;
}

export function getMoviesByGenreUrl(genreId) {
  return moviesByGenreUrl.replace("{genreId}", genreId);
}

export function getMovieDetailsUrl(movieId) {
  return movieDetailsUrl.replace("{movieId}", movieId);
}

export function getGenresUrl() {
  return genresUrl;
}

export function get80sMoviesUrl() {
  let query = {
    releasedDateGt: "1980-01-01",
    releasedDateLt: "1989-12-31"
  };
  let builder = new DiscoverMoviesUrlBuilder(query);
  return builder.getUrl();
}

export function get90sMoviesUrl() {
  let query = {
    releasedDateGt: "1990-01-01",
    releasedDateLt: "1999-12-31"
  };
  let builder = new DiscoverMoviesUrlBuilder(query);
  return builder.getUrl();
}

export function getHighlyRatedMoviesUrl() {
  let query = {
    voteAverageGt: 8
  };
  let builder = new DiscoverMoviesUrlBuilder(query);
  return builder.getUrl();
}

export function getPoorlyRatedMoviesUrl() {
  let query = {
    voteAverageGt: 1,
    voteAverageLt: 3
  };
  let builder = new DiscoverMoviesUrlBuilder(query);
  return builder.getUrl();
}

export function getLongMoviesUrl() {
  let query = {
    runtimeGt: 150
  };
  let builder = new DiscoverMoviesUrlBuilder(query);
  return builder.getUrl();
}

export function getShortMoviesUrl() {
  let query = {
    runtimeGt: 10,
    runtimeLt: 31
  };
  let builder = new DiscoverMoviesUrlBuilder(query);
  return builder.getUrl();
}

function getAsIsoDate(date) {
  let nowString = date.toISOString();
  let dateEndIndex = nowString.indexOf("T");
  return nowString.slice(0, dateEndIndex);
}

function getTwoWeeksAgoIsoDate() {
  let targetDate = new Date();
  let twoWeeksInDays = 14;
  targetDate.setDate(targetDate.getDate() - twoWeeksInDays);
  return getAsIsoDate(targetDate);
}

export function getNewMoviesUrl() {
  let targetDate = getTwoWeeksAgoIsoDate();
  let query = {
    releasedDateGt: targetDate,
    releasedDateLt: getAsIsoDate(new Date())
  };
  let builder = new DiscoverMoviesUrlBuilder(query);
  return builder.getUrl();
}

export function getUpcomingMoviesUrl() {
  let query = {
    releasedDateGt: getAsIsoDate(new Date())
  };
  let builder = new DiscoverMoviesUrlBuilder(query);
  return builder.getUrl();
}

export function getBestOf2016Url() {
  let query = {
    releasedDateGt: "2016-01-01",
    releasedDateLt: "2016-12-31",
    voteAverageGt: 7
  };
  let builder = new DiscoverMoviesUrlBuilder(query);
  return builder.getUrl();
}

export function getBestOf2017Url() {
  let query = {
    releasedDateGt: "2017-01-01",
    releasedDateLt: "2017-12-31",
    voteAverageGt: 7
  };
  let builder = new DiscoverMoviesUrlBuilder(query);
  return builder.getUrl();
}

export function getSearchMoviesNextPageUrl(lastQueryUrl, currentPage) {
  let startPos = lastQueryUrl.indexOf("page=");
  let lastPos = lastQueryUrl.indexOf("&", startPos);
  if (lastPos === -1) {
    lastPos = lastQueryUrl.length - 1;
  }
  return (
    lastQueryUrl.slice(0, startPos) +
    `page=${currentPage}` +
    lastQueryUrl.slice(lastPos)
  );
}
