exports.config = {
  bundles: [
    { components: ['cc-gis-viewer'/*, 'app-home'*/] },
    // { components: ['app-profile'] }
    { components: [''gis - viewer'] },
  ],
  collections: [
    // { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
