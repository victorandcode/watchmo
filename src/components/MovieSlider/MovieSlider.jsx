import React from 'react';
import MovieCardContainer from '../../containers/MovieCardContainer/MovieCardContainer';
import styles from './MovieSlider.scss';

const maxIndex = 5;

class MovieSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "innerClass": styles.sliderWrapperInner
    }
    this.setHoverClasses = this.setHoverClasses.bind(this);
    this.setFirstHovered = this.setFirstHovered.bind(this);
    this.setLastHovered = this.setLastHovered.bind(this);
    this.setNonBorderHovered = this.setNonBorderHovered.bind(this);
  }

  setHoverClasses(index) {
    if(index === 0) {
      this.setFirstHovered();
    } else if (index % maxIndex === 0) {
      this.setLastHovered();
    } else {
      this.setNonBorderHovered();
    }
  }

  setFirstHovered() {
    this.setState({"innerClass": styles.sliderWrapperInner})
  }

  setLastHovered() {
    this.setState({
      "innerClass": [
        styles.sliderWrapperInner,
        styles.wrapperMoveLeftExtra]
        .join(" ")
    })
  }

  setNonBorderHovered() {
    this.setState({
      "innerClass": [
        styles.sliderWrapperInner, 
        styles.wrapperMoveLeft]
        .join(" ")
    })
  }

  render() {
    return (
      <div className={styles.sliderWrapper}>
        <div className={this.state.innerClass}>
          {this.props.movies.map((movieItem, movieItemIndex) => {
              return (
                <div 
                  className={styles.movieCardWrapper} 
                  key={movieItemIndex} 
                  onMouseEnter={(e) => {this.setHoverClasses(movieItemIndex)}}>
                  <MovieCardContainer movie={movieItem}/>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default MovieSlider;