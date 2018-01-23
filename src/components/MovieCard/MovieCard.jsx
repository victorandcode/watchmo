import React from 'react';
import styles from './MovieCard.scss';
import notFoundPlaceholder from './not-found-placeholder.png';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "showingDetails": false,
      "imageUrl": notFoundPlaceholder,
    }
    
    let movieBackdrop = new Image();
    movieBackdrop.onload = () => {
      this.setState({
        "imageUrl": this.props.movie.backdropUrl
      })
    };
    movieBackdrop.src = this.props.movie.backdropUrl;

    this.getMovieDataIfNecessary = this.getMovieDataIfNecessary.bind(this);
    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
    this.handleOnClickDesktop = this.handleOnClickDesktop.bind(this);
    this.handleOnClickMobile = this.handleOnClickMobile.bind(this);
    this.getMovieCardClassName = this.getMovieCardClassName.bind(this);
  }

  getMovieDataIfNecessary() {
    if(this.state.showingDetails)
      return;
    this.setState({ showingDetails: true});
    this.props.fetchMovieDetails(this.props.movie.id);
  }

  handleOnMouseOver() {
    this.getMovieDataIfNecessary();
  }

  handleOnClickDesktop() {
    if(this.props.isClickable) {
      this.props.triggerMovieAction(this.props.movie);
    }
  }

  handleOnClickMobile() {
    this.getMovieDataIfNecessary();
    this.props.openMovieDetailsBanner();
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
      <div className={this.getMovieCardClassName()}>
        <div 
          className={styles.clickReceiverDesktop} 
          onClick={this.handleOnClickDesktop} 
          onMouseOver={() => this.handleOnMouseOver()}
          onMouseLeave={() => this.setState({ showingDetails: false })}/>
        <div className={styles.clickReceiverMobile} onClick={this.handleOnClickMobile} />
        <div 
          className={styles.movieCardInner}
          style={{"backgroundImage": `url(${this.state.imageUrl})`}}>
            {this.state.showingDetails ? <div className={styles.overlay}/> : null}
            {this.state.showingDetails ?
              <div className={styles.content}>
                <div className={styles.infoContainer}>
                  <div className={styles.title}>{this.props.movie.title}</div>
                  <div className={styles.detailsContainer}>     
                    {this.props.isLoadingDetails ?
                        <span className={styles.loadingMessage}>Loading movie details...</span>
                      :
                        <div>
                          <span className={styles.voteAverage}>{this.props.movie.voteAverage}</span>
                          <span className={styles.year}>{this.props.movie.year}</span>
                          {this.props.movie.adultFilm ? 
                              <span className={styles.adultFilm}>18+</span>
                            : 
                              null
                          }
                          <span className={styles.duration}>{this.props.movie.duration}</span>
                        </div>
                    }                    
                  </div>
                  <div className={styles.overview}>{this.props.movie.overview}</div>
                </div>
              </div>
              : 
                null
            }
        </div>
      </div>
    );
  }
} 

export default MovieCard;