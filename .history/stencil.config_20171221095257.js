exports.config = {
  bundles: [
    { components: ['gis-viewer'] },
    // { components: ['dev-component', 'gis-viewer'] },
  ],
  collections: [
     { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
