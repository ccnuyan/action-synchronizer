import "babel-polyfill";
import "../web/web.js";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const { store } = global.state.finalize(global.state.apps);

const root = document.getElementById("root");
ReactDOM.render(<App store={store}/>, root);

if (module.hot) {
  module.hot.accept("./App.jsx", () => ReactDOM.render(<App store={store}/>, root));
}
