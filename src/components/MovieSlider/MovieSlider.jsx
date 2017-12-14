import React from 'react';
import MovieCardContainer from '../../containers/MovieCardContainer/MovieCardContainer';
import styles from './MovieSlider.scss';

class MovieSlider extends React.Component {  
  render() {
    return (
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderWrapperInner}>
          {this.props.movies.map((movieItem, movieItemIndex) => {
              return (
                <div className={styles.movieCardWrapper} key={movieItemIndex}>
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