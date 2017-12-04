import React from 'react';
import styles from './ContentByCategory.scss';
import MovieSlider from '../MovieSlider/MovieSlider';

class ContentByCategory extends React.Component {
  constructor(props) {
    super(props);
    props.onLoad();
  }

  render() {
    return (
      <div className={styles.ContentByCategory}>
        {this.props.categoryGroups.map((groupItem, groupIndex) => {
          return (
            <div className={styles.group} key={groupIndex}>
              <div className={styles.title}>{groupItem.category}</div>
              <div className={styles.sliderContainer}>
                <MovieSlider movies={groupItem.content}/>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default ContentByCategory;