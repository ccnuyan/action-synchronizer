import './root';
import React from 'react';
import { Provider } from 'react-redux';

import Home from './src-native/Home.js';

const { store } = global.state.finalize(global.state.apps);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
