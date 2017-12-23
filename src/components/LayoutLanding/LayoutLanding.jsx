import React from 'react';
import ContentByCategoryContainer from '../../containers/ContentByCategoryContainer/ContentByCategoryContainer';
import HeroRecommendationContainer from '../../containers/HeroRecommendationContainer/HeroRecommendationContainer';

class LayoutLanding extends React.Component {
  render() {
    return (
      <div>
        <HeroRecommendationContainer />
        <ContentByCategoryContainer />
      </div>
    )
  }
}

export default LayoutLanding;