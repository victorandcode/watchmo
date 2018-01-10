import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash/throttle';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { loadState, saveState} from './localStorage';

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState
);

store.subscribe(throttle(() => {
  saveState({
    movieDetails: store.getState().movieDetails
  });
}, 1000));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
