import React from 'react';
import styles from './MovieCard.scss';
import thumbsUp from './thumbs-up.png';
import thumbsDown from './thumbs-down.png';
import plusSign from './plus-sign.png';

const baseImageUrl = "http://image.tmdb.org/t/p/w500/";

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.movie = Object.assign({}, 
      props.movie, 
      {
        year: this.getYear(props.movie.release_date),
        backdropUrl: this.getBackdropUrl(props.movie.backdrop_path),
        ageRestriction: this.getAgeRestriction(),
        voteAverage: this.getVoteAverage(props.movie.vote_average),
        duration: this.getDuration()
      }
    );
    this.state = {
      showingDetails: false
    }
  }

  getYear(unformattedDate) {
    if(unformattedDate) {
      return unformattedDate.slice(0, 4);
    } else {
      return "N/A";
    }
  }

  getBackdropUrl(backdropPath) {
    return baseImageUrl + backdropPath;
  }

  getVoteAverage(voteAverageInt) {
    return `${voteAverageInt}/10`;
  }

  getDuration() {
    return "1h 32m";
  }

  getAgeRestriction() {
    const possibleRestrictions = [7, 13, 16];
    const randomIndex = parseInt(Math.random() * possibleRestrictions.length, 10);
    return possibleRestrictions[randomIndex];
  }

  render() {
    return (
      <div 
        className={styles.MovieCard}
        style={{"backgroundImage": `url(${this.movie.backdropUrl})`}}
        onMouseEnter={() => this.setState({ showingDetails: true})}
        onMouseLeave={() => this.setState({ showingDetails: false})}>
        {this.state.showingDetails ? <div className={styles.overlay}/> : null}
        {this.state.showingDetails ?
          <div className={styles.content}>
            <div className={styles.detailsContainer}>
              <div className={styles.title}>{this.movie.title}</div>
              <div className={styles.generalInfoContainer}>
                <span className={styles.voteAverage}>{this.movie.voteAverage}</span>
                <span className={styles.year}>{this.movie.year}</span>
                <span className={styles.ageRestriction}>{this.movie.ageRestriction}+</span>
                <span className={styles.duration}>{this.movie.duration}</span>
              </div>
              <div className={styles.overview}>{this.movie.overview}</div>
            </div>
            <div className={styles.actionsContainer}>
              <div className={styles.action}><img src={thumbsUp} alt="ThumbsUp"/></div>
              <div className={styles.action}><img src={thumbsDown} alt="ThumbsDown"/></div>
              <div className={styles.action}><img src={plusSign} alt="PlusSign"/></div>
            </div>
          </div>
          : null
        }
      </div>
    );
  }
} 

export default MovieCard;