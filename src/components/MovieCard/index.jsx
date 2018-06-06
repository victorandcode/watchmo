import React from "react";
import { v4 } from "node-uuid";
import styles from "./MovieCard.scss";
import imagePlaceholder from "./image-placeholder.png";

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInteractedWithCard: false,
      imageUrl: imagePlaceholder,
      elementId: v4()
    };

    this.loadImage = this.loadImage.bind(this);
    this.getMovieDataIfNecessary = this.getMovieDataIfNecessary.bind(this);
    this.getDataAndSelectMovie = this.getDataAndSelectMovie.bind(this);
    this.handleOnClickDesktop = this.handleOnClickDesktop.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
    this.getMovieCardClassName = this.getMovieCardClassName.bind(this);
    this.getIsSelected = this.getIsSelected.bind(this);
  }

  componentDidMount() {
    this.loadImage();
  }

  loadImage() {
    let movieBackdrop = new Image();
    movieBackdrop.src = this.props.movie.backdropUrl;
    movieBackdrop.onload = () => {
      this.setState({
        imageUrl: this.props.movie.backdropUrl
      });
    };
  }

  getMovieDataIfNecessary() {
    if (this.state.userInteractedWithCard) return;
    this.setState({ userInteractedWithCard: true });
    this.props.fetchMovieDetails(this.props.movie.id);
  }

  getDataAndSelectMovie() {
    this.getMovieDataIfNecessary();
    this.props.selectMovie(this.state.elementId);
  }

  handleOnClickDesktop() {
    if (this.props.isClickable) {
      this.props.triggerMovieAction(this.props.movie);
    }
  }

  handleOnMouseLeave() {
    this.setState({ userInteractedWithCard: false });
    this.props.clearSelectedMovie();
  }

  getMovieCardClassName() {
    let result = [styles.MovieCard];
    if (this.props.isClickable) {
      result.push(styles.hoverable);
    }
    return result.join(" ");
  }

  getIsSelected() {
    return this.props.selectedElementId === this.state.elementId;
  }

  render() {
    return (
      <div className={this.getMovieCardClassName()}>
        {!this.getIsSelected() ? (
          <div className={styles.containerOverlay} />
        ) : null}
        <div
          className={styles.clickReceiverDesktop}
          onClick={this.handleOnClickDesktop}
          onMouseOver={() => this.getDataAndSelectMovie()}
          onMouseLeave={() => this.handleOnMouseLeave()}
        />
        <div
          className={styles.clickReceiverMobile}
          onClick={this.getDataAndSelectMovie}
        />
        {!this.getIsSelected() ? (
          <div className={styles.bigTitleContainer}>
            <div className={styles.bigTitle}>{this.props.movie.title}</div>
          </div>
        ) : null}

        <div className={styles.containerGutter}>
          <div
            className={styles.movieCardInner}
            style={{ backgroundImage: `url(${this.state.imageUrl})` }}
          >
            {this.state.userInteractedWithCard ? (
              <div className={styles.detailsOverlay} />
            ) : null}
            {this.state.userInteractedWithCard ? (
              <div className={styles.content}>
                <div className={styles.infoContainer}>
                  <div className={styles.title}>{this.props.movie.title}</div>
                  <div className={styles.detailsContainer}>
                    <div>
                      <span className={styles.voteAverage}>
                        {this.props.movie.voteAverage}
                      </span>
                      <span className={styles.year}>
                        {this.props.movie.year}
                      </span>
                      {this.props.movie.adultFilm ? (
                        <span className={styles.adultFilm}>18+</span>
                      ) : null}
                      <span className={styles.duration}>
                        {this.props.movie.duration}
                      </span>
                    </div>
                    {this.props.isLoadingDetails ? (
                      <span className={styles.loadingMessage}>
                        Loading trailer...
                      </span>
                    ) : null}
                  </div>
                  <div className={styles.overview}>
                    {this.props.movie.overview}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
