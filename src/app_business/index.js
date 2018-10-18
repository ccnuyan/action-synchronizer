import 'babel-polyfill';
import '../utility/consoleOverrides';
import './store';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Synchronizer } from '../../synchronizer';

const getGlobalStore = () => window.store;
export const synchronizer = new Synchronizer('business', getGlobalStore);
synchronizer.registerListener('auth', window);

const { store } = global.state.finalize(global.state.apps, synchronizer);

document.addEventListener('message', event => {
  let data = {};
  try {
    data = JSON.parse(event.data);
  } catch (err) {
    console.log(err);
  }

  if (data.type === 'sync_action') {
    synchronizer.dispatch(data.action);
  }
});

const root = document.getElementById('root');
ReactDOM.render(<App store={store} />, root);

if (module.hot) {
  module.hot.accept('./App.jsx', () => ReactDOM.render(<App store={store} />, root));
}
