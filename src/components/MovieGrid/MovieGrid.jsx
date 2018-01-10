import React from 'react';
import MovieSlider from '../MovieSlider/MovieSlider';
import styles from './MovieGrid.scss'

const MovieGrid = ({ moviesRows }) => (
  <div className={styles.movieGrid}>
    {moviesRows.length ?
      moviesRows.map((moviesRow, moviesRowIndex) => {
        return (
          <div className={styles.group} key={moviesRowIndex}>
            <MovieSlider movies={moviesRow} />
          </div>
        )
      })
      : 
        <div className={styles.moviesNotFound}>
          Sorry! Your search: ... didn't produce any results. Please change your search term.
        </div>
    }
  </div>
);

export default MovieGrid;