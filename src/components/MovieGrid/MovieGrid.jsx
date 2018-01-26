import React from 'react';
import MovieRow from '../MovieRow/MovieRow';
import styles from './MovieGrid.scss'

class MovieGrid extends React.Component {  
  render() {
    return (
      <div className={styles.movieGrid}>
        <div className={styles.title}>{this.props.title}</div>
        {this.props.moviesRows.length ?
          this.props.moviesRows.map((moviesRow, moviesRowIndex) => {
            return (
              <div className={styles.group} key={moviesRowIndex}>
                <MovieRow movies={moviesRow} />
              </div>
            )
          })
          : null
        }
        {this.props.showNoElementsFound ?
          <div className={styles.moviesNotFound}>
              Sorry! Your search: '{this.props.searchQuery}' didn't produce any results. Please change your search term.
          </div>
          : null
        }
      </div>
    )
  }
}

export default MovieGrid;