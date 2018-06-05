import React from "react";
import styles from "./MovieRow.scss";
import MovieDetailsBannerContainer from "../../containers/MovieDetailsBannerContainer";
import MovieCardContainer from "../../containers/MovieCardContainer";
import { v4 } from "node-uuid";

class MovieRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieWrapperClass: styles.moviesWrapper,
      detailsBannerKey: v4()
    };
    this.setHoverClasses = this.setHoverClasses.bind(this);
    this.setFirstHovered = this.setFirstHovered.bind(this);
    this.setLastHovered = this.setLastHovered.bind(this);
    this.setNonBorderHovered = this.setNonBorderHovered.bind(this);
    this.resetHoverClass = this.resetHoverClass.bind(this);
  }

  setHoverClasses(index) {
    let maxIndex = this.props.movies.length - 1;
    if (index === 0) {
      this.setFirstHovered();
    } else if (index % maxIndex === 0) {
      this.setLastHovered();
    } else {
      this.setNonBorderHovered();
    }
  }

  setFirstHovered() {
    this.setState({ movieWrapperClass: styles.moviesWrapper });
  }

  setLastHovered() {
    this.setState({
      movieWrapperClass: [
        styles.moviesWrapper,
        styles.wrapperMoveLeftExtra
      ].join(" ")
    });
  }

  setNonBorderHovered() {
    this.setState({
      movieWrapperClass: [styles.moviesWrapper, styles.wrapperMoveLeft].join(
        " "
      )
    });
  }

  resetHoverClass() {
    this.setState({
      movieWrapperClass: styles.moviesWrapper
    });
  }

  render() {
    return (
      <div className={styles.MovieRow}>
        <div className={this.state.movieWrapperClass}>
          {this.props.movies.map((movieItem, movieItemIndex) => {
            return (
              <div
                className={styles.movieCardWrapper}
                key={movieItem.id}
                onMouseEnter={e => {
                  this.setHoverClasses(movieItemIndex);
                }}
                onMouseLeave={e => {
                  this.resetHoverClass();
                }}
              >
                <MovieCardContainer
                  movie={movieItem}
                  detailsBannerKey={this.state.detailsBannerKey}
                />
              </div>
            );
          })}
        </div>
        {this.props.isMobile ? (
          <MovieDetailsBannerContainer
            containerKey={this.state.detailsBannerKey}
          />
        ) : null}
      </div>
    );
  }
}

export default MovieRow;
