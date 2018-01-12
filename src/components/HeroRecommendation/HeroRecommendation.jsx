import React from 'react';
import styles from './HeroRecommendation.scss';
import recommendationLogo from './recommendation-logo.webp';

class HeroRecommendation extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.triggerMovieAction(this.props.recommendedMovie);
  }

  render() {
    return (
      <div className={styles.HeroRecommendation}>
        <div className={styles.heroInfo}>
          <img src={recommendationLogo} alt="Recommendationlogo" className={styles.recommendationLogo}/>
          <div className={styles.recommendationBtns}>
            <a 
              href="/"
              className={styles.recommendationBtn}
              onClick={ (e) => {
                e.preventDefault();
                this.handleClick();
              }}>
              <div className={[styles.recommendationBtnLogo, styles.playLogo].join(' ')}/>
              Trailer
            </a>
          </div>
          <div className={styles.recommendationSynopsis}>
            {this.props.recommendedMovie.synopsis}
          </div>
          <div className={styles.ageRestriction}>
            {this.props.recommendedMovie.ageRestriction}
          </div>
        </div>
      </div>
    );
  }
}

export default HeroRecommendation;