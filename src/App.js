import React, { Component } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import ContentByCategoryContainer from './containers/ContentByCategoryContainer/ContentByCategoryContainer';
import HeroRecommendationContainer from './containers/HeroRecommendationContainer/HeroRecommendationContainer';
import ModalVideoPlayerContainer from './containers/ModalVideoPlayerContainer/ModalVideoPlayerContainer';


class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <HeroRecommendationContainer />
        <ContentByCategoryContainer />
        <ModalVideoPlayerContainer />
      </div>
    );
  }
}

export default App;