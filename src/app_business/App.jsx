import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RepoList from './RepoList';

export class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <h2>This is Business WebView</h2>
          <RepoList />
        </div>
      </Provider>
    );
  }
}

export default App;
