import React, { Component } from 'react';
import { Provider } from 'react-redux';
import LoginForm from './LoginForm';

export class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <h2>This is Auth WebView</h2>
          <LoginForm />
        </div>
      </Provider>
    );
  }
}

export default App;
