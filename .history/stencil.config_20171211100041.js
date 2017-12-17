exports.config = {
  bundles: [
    { components: ['firstgis-viewer'] },
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
