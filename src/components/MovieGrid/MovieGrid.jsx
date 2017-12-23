import React from 'react';
import MovieCardContainer from '../../containers/MovieCardContainer/MovieCardContainer';
import styles from './MovieGrid.scss'

const MovieGrid = ({ movies }) => (
  <div className={styles.movieGrid}>
    {movies.map((movieItem, movieItemIndex) => {
      return (
        <div className={styles.movieCardWrapper} key={movieItemIndex}>
          <MovieCardContainer movie={movieItem}/>
        </div>
      )
    })}
  </div>
);

export default MovieGrid;