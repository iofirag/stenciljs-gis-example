exports.config = {
  bundles: [
    
    // { components: ['app-profile'] }{ components: ['cc-gis-viewer'/*, 'app-home'*/] },
  ],
  collections: [
    // { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
