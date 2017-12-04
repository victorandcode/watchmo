import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieSlider.scss';

class MovieSlider extends React.Component {  
  render() {
    return (
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderWrapperInner}>
          {this.props.movies.map((movieItem, movieItemIndex) => {
              return (
                <div className={styles.movieCardWrapper} key={movieItemIndex}>
                  <MovieCard movie={movieItem}/>
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