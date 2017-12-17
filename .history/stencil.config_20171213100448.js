exports.config = {
  bundles: [
    { components: ['cc-gis-viewer', 'gis-viewer'] },
    { components: [] },
    { components: ['dev-component'] }
  ],
  collections: [
     { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
