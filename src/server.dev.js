const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const compression = require("compression");

const app = express();
const configDev = require("../webpack.config.dev.js");
const compiler = webpack(configDev);

app.use(
  compression({
    filter: (req, res) =>
      req.headers["x-no-compression"] ? false : compression.filter(req, res)
  })
);

app.use(
  webpackDevMiddleware(compiler, { publicPath: configDev.output.publicPath })
); // https://github.com/webpack-contrib/webpack-dev-middleware
app.use(webpackHotMiddleware(compiler)); // https://github.com/webpack-contrib/webpack-hot-middleware

app.listen(3000, () => {
  console.log(`Starc Disk App listening on port ${process.env.PORT || 3000}!`);
});
