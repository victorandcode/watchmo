import React from 'react';
import MovieRowContainer from '../../containers/MovieRowContainer';
import styles from './MovieGrid.scss'

class MovieGrid extends React.Component {  
  componentDidMount() {
    this.timer = setInterval(this.props.handleInfinitePaging, 200);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className={styles.movieGrid}>
        <div className={styles.title}>{this.props.title}</div>
        {this.props.moviesRows.length ?
          this.props.moviesRows.map((moviesRow, moviesRowIndex) => {
            return (
              <div className={styles.group} key={moviesRowIndex}>
                <MovieRowContainer movies={moviesRow} />
              </div>
            )
          })
          : null
        }
        <div className={styles.infoMessage}>
          {this.props.showNoElementsFound ?
            <span>Sorry! Your search: '{this.props.searchQuery}' didn't produce any results. Please change your search term.</span>
            : null
          }
          {this.props.searchInProgress ?
            <span>Loading more movies ...</span>
            :
              null
          }
          {this.props.noMorePages ?
            <span>No more pages to load</span>
            :
              null
          }
        </div>
      </div>
    )
  }
}

export default MovieGrid;