exports.config = {
  bundles: [
    { components: ['gis-viewer'] },
    // { components: ['dev-component', 'gis-viewer'] },
  ],
  collections: [
     { name: '@stencil/router' }
  ],
  serviceWorker: {
    globPatterns: [
      '**/*.{js,css,json,html,ico,png,jpg,jpeg}'
    ]
  }
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};

{ test: /(\.css$)/, loaders: ['style-loader', 'css-loader', 'postcss-loader'] }, { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }