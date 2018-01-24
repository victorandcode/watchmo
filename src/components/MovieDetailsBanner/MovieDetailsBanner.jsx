import React from 'react';
import styles from './MovieDetailsBanner.scss';
import closeIcon from './close-icon.png';
import playIcon from './play-icon.png';

class MovieDetailsBanner extends React.Component {
  render() {
    let movie = this.props.movie;
    return (
      <div>
        {(this.props.containerKey !== undefined) && (this.props.containerKey === this.props.selectedContainerKey) ?
          <div className={styles.contentWrapper}>
            <div className={styles.movieImgWrapper}>
              <img 
                className={styles.movieImg}
                src={movie.backdropUrl}
                alt="Movie backdrop"/>
            </div>
            <div className={styles.textContent}>
              <div className={styles.title}>{movie.title}</div>
              <div className={styles.groupedAttributes}>
                <span className={styles.voteAverage}>{movie.voteAverage}</span>
                <span className={styles.year}>{movie.year}</span>
                <span className={styles.duration}>{movie.duration}</span>
                {this.props.isLoadingDetails ?
                  <div>
                    Loading movie trailer...
                  </div>
                  : null
                }
              </div>
              <div className={styles.overview}>{movie.overview}</div>
            </div>
            <div 
              className={styles.playActionContainer}
              onClick={this.props.triggerMovieAction}>
              <button className={styles.playBtnWrapper}>
                <img
                  className={styles.playBtn}
                  src={playIcon}
                  alt="Play button"/>
              </button>
            </div>
            {!this.props.isLoadingDetails ?
              <div className={styles.closeIconWrapper}
                  onClick={this.props.clearSelectedMovie}>
                <img
                  src={closeIcon}
                  alt="Close Icon"/>
              </div>
              : null
            }
          </div>
          : null
        }
      </div>
    )
  }
};

export default MovieDetailsBanner;