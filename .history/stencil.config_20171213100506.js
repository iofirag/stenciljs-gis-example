exports.config = {
  bundles: [
    { components: ['cc-gis-viewer', 'gis-viewer','dev-component'] },

  ],
  collections: [
     { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
