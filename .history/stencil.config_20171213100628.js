exports.config = {
  bundles: [
    { components: ['cc-gis-viewer','dev-component','gis-viewer',] },

  ],
  collections: [
     { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
