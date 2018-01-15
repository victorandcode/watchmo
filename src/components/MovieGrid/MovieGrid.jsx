import React from 'react';
import MovieSlider from '../MovieSlider/MovieSlider';
import styles from './MovieGrid.scss'

const MovieGrid = ({ moviesRows, searchQuery, showNoElementsFound }) => (
  <div className={styles.movieGrid}>
    <div className={styles.title}>Movies found for '{searchQuery}':</div>
    {moviesRows.length ?
      moviesRows.map((moviesRow, moviesRowIndex) => {
        return (
          <div className={styles.group} key={moviesRowIndex}>
            <MovieSlider movies={moviesRow} />
          </div>
        )
      })
      : null
    }
    {showNoElementsFound ?
      <div className={styles.moviesNotFound}>
          Sorry! Your search: '{searchQuery}' didn't produce any results. Please change your search term.
      </div>
      : null
    }
  </div>
);

export default MovieGrid;