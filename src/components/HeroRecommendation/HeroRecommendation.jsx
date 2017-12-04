import React from 'react';
import styles from './HeroRecommendation.scss';
import recommendationLogo from './recommendation-logo.webp';

const HeroRecommendation = ({ recommendedMovie }) => (
  <div className={styles.HeroRecommendation}>
    <div className={styles.heroInfo}>
      <img src={recommendationLogo} alt="Recommendationlogo" className={styles.recommendationLogo}/>
      <div className={styles.recommendationBtns}>
        <a href="/" className={styles.recommendationBtn}>
          <div className={[styles.recommendationBtnLogo, styles.playLogo].join(' ')}/>
          Play
        </a>
        <a href="/" className={styles.recommendationBtn}>
          <div className={[styles.recommendationBtnLogo, styles.addLogo].join(' ')}/>
          My List
        </a>
      </div>
      <div className={styles.recommendationSynopsis}>
        {recommendedMovie.synopsis}
      </div>
      <div className={styles.ageRestriction}>
        {recommendedMovie.ageRestriction}
      </div>
    </div>
  </div>
);

export default HeroRecommendation;