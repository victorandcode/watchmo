import React from 'react';
import styles from './MovieCard.scss';
import notFoundPlaceholder from './not-found-placeholder.png';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "showingDetails": false
    }
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.getMovieCardClassName = this.getMovieCardClassName.bind(this);
  }

  handleOnMouseEnter() {
    this.setState({ showingDetails: true});
    this.props.fetchMovieDetails(this.props.movie.id);
  }

  handleOnClick() {
    if(this.props.isClickable) {
      this.props.triggerMovieAction(this.props.movie);
    }
  }

  setClickableState() {
    this.setState({ 
      "movieCardClassName": [styles.MovieCard, styles.hoverable].join(" "),
    })
  }

  getMovieCardClassName() {
    if(this.props.isClickable) {
      return [styles.MovieCard, styles.hoverable].join(" ");
    } else {
      return styles.MovieCard;
    }
  }

  render() {
    return (
      <div 
        className={this.getMovieCardClassName()}
        onClick={this.handleOnClick}
        onMouseEnter={() => this.handleOnMouseEnter()}
        onMouseLeave={() => this.setState({ showingDetails: false})}>
        <div 
          className={styles.movieCardInner}
          style={{"backgroundImage": `url(${this.props.movie.backdropUrl || notFoundPlaceholder})`}}>
            {this.state.showingDetails ? <div className={styles.overlay}/> : null}
            {this.state.showingDetails ?
              <div className={styles.content}>
                <div className={styles.detailsContainer}>
                  <div className={styles.title}>{this.props.movie.title}</div>
                  <div className={styles.generalInfoContainer}>
                    <span className={styles.voteAverage}>{this.props.movie.voteAverage}</span>
                    <span className={styles.year}>{this.props.movie.year}</span>
                    {this.props.movie.adultFilm
                      ? <span className={styles.adultFilm}>18+</span>
                      : null
                    }
                    <span className={styles.duration}>{this.props.movie.duration}</span>
                  </div>
                  <div className={styles.overview}>{this.props.movie.overview}</div>
                </div>
              </div>
              : null
            }
        </div>
      </div>
    );
  }
} 

export default MovieCard;