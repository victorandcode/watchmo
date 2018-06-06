import React, { Component } from 'react';
import AppHeaderContainer from './containers/AppHeaderContainer';
import LayoutDispatcherContainer from './containers/LayoutDispatcherContainer';

class App extends Component {
  render() {
    return (
      <div>
        <AppHeaderContainer />
        <LayoutDispatcherContainer />
      </div>
    );
  }
}

export default App;