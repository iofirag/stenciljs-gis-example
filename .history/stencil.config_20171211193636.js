exports.config = {
  bundles: [
    { components: ['cc-gis-viewer'] },
    { components: ['gis-viewer'] },
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
