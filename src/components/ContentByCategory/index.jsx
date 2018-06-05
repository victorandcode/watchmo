import React from 'react';
import styles from './ContentByCategory.scss';
import MovieSliderContainer from '../../containers/MovieSliderContainer';

class ContentByCategory extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div className={styles.ContentByCategory}>
        <div className={styles.group}>
          <div className={styles.title}>Discover</div>
          <div className={styles.sliderContainer}>
            <MovieSliderContainer movies={this.props.discoverMovies}/>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.title}>New Movies</div>
          <div className={styles.sliderContainer}>
            <MovieSliderContainer movies={this.props.newMovies}/>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.title}>Upcoming Movies</div>
          <div className={styles.sliderContainer}>
            <MovieSliderContainer movies={this.props.upcomingMovies}/>
          </div>
        </div>
        <div className={styles.wantMoreMessage}>Want more? Explore our filters at the top of the page</div>
      </div>
    );
  }
}

export default ContentByCategory;