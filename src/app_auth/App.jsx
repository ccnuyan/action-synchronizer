import React, { Component } from "react";
import { Provider } from "react-redux";

export class App extends Component {
  onTitleClicked = () => {
    console.log("titleCilcked");
    window.postMessage(JSON.stringify({
      type: "console",
      message: "Auth title clicked"
    }));
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <button ref={e => (this.button = e)} onClick={this.onTitleClicked}>
          This is Auth Page
        </button>
      </Provider>
    );
  }
}

export default App;
