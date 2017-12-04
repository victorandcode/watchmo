import React, { Component } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import HeroRecommendationContainer from './containers/HeroRecommendationContainer/HeroRecommendationContainer';
import ContentByCategoryContainer from './containers/ContentByCategoryContainer/ContentByCategoryContainer';

class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <HeroRecommendationContainer />
        <ContentByCategoryContainer />
      </div>
    );
  }
}

export default App;