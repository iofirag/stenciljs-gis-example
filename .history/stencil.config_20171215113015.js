exports.config = {
  bundles: [
    { components: ['cc-gis-viewer', 'gis-viewer'] },
    { components: ['dev-component', 'cc-gis-viewer'] },
  ],
  collections: [
     { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
