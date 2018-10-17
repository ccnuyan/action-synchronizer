import React, { Component } from "react";
import { Provider } from "react-redux";

export class App extends Component {
  onTitleClicked = () => {
    console.log("titleCilcked");
    window.postMessage(JSON.stringify({
      type: "console",
      message: "Business title clicked"
    }));
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <button onClick={this.onTitleClicked}>This is Business Page</button>
      </Provider>
    );
  }
}

export default App;
