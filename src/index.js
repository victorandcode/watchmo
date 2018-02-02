import React from 'react';
import ReactDOM from 'react-dom';
import throttle from 'lodash/throttle';
import { Provider } from 'react-redux';
import { 
  applyMiddleware, 
  createStore, 
  compose 
} from 'redux';
import { responsiveStoreEnhancer } from 'redux-responsive';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { loadState, saveState} from './utils/localStorage';

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  compose(
    responsiveStoreEnhancer,
    applyMiddleware(thunk)
  )
);

store.subscribe(throttle(() => {
  saveState({
    userInteractions: store.getState().userInteractions,
    movieDetails: store.getState().movieDetails
  });
}, 1000));



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
