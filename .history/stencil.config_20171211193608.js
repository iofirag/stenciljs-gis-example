exports.config = {
  bundles: [
    { components: ['cc-gis-viewer'] },
    { components: ['gis-viewer'] }
    { components: ['gis-viewer'] }
  ],
  collections: [
     { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
