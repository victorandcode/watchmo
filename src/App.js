import React, { Component } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import LayoutDispatcherContainer from './containers/LayoutDispatcherContainer/LayoutDispatcherContainer';
import { hotjar } from 'react-hotjar';

hotjar.initialize(745543, 6);

class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <LayoutDispatcherContainer />
      </div>
    );
  }
}

export default App;