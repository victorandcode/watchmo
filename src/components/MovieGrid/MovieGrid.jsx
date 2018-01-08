import React from 'react';
import MovieSlider from '../MovieSlider/MovieSlider';
import styles from './MovieGrid.scss'

const MovieGrid = ({ moviesRows }) => (
  <div className={styles.movieGrid}>
    {moviesRows.map((moviesRow, moviesRowIndex) => {
      return (
        <div className={styles.group} key={moviesRowIndex}>
          <MovieSlider movies={moviesRow} />
        </div>
      )
    })}
  </div>
);

export default MovieGrid;