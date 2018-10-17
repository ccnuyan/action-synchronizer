module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 3 versions',
        'Firefox ESR',
        'not ie < 10' // React doesn't support IE8 anyway
      ]
    }),
    require('cssnano')({ zindex: false, reduceIdents: false })
  ]
};
