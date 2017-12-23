import React from 'react';
import styles from './MovieCard.scss';
import thumbsUp from './thumbs-up.png';
import thumbsDown from './thumbs-down.png';
import plusSign from './plus-sign.png';
import notFoundPlaceholder from './not-found-placeholder.png';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingDetails: false
    }
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnMouseEnter() {
    this.setState({ showingDetails: true});
    this.props.fetchMovieDetails(this.props.movie.id);
  }

  handleOnClick() {
    this.props.openModalVideo(this.props.movie.videoUrl);
  }

  render() {
    return (
      <div 
        className={styles.MovieCard}
        style={{"backgroundImage": `url(${this.props.movie.backdropUrl || notFoundPlaceholder})`}}
        onClick={this.handleOnClick}
        onMouseEnter={() => this.handleOnMouseEnter()}
        onMouseLeave={() => this.setState({ showingDetails: false})}>
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