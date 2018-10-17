const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = [
  {
    test: /\.js[x]?$/,
    use: [
      {
        loader: 'babel-loader'
      }
    ],
    exclude: /node_modules/
  },
  {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static-assets/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'postcss-loader',
        {
          loader: 'less-loader',
          options: { javascriptEnabled: true }
        }
      ]
    })
  },
  {
    test: /\.html$/,
    exclude: [/node_modules/, path.join(__dirname, './index.template.html')],
    use: { loader: 'html-loader' }
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader']
    })
  }
];