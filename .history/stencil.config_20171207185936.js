exports.config = {
  bundles: [
    { components: ['cc-gis-viewer'/*, 'app-home'*/] },
    // { components: ['app-profile'] }
  ],
  collections: [
    // { name: '@stencil/router' }
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract('css-loader'),
      exclude: /(\.async\.css$|src)/
    }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
