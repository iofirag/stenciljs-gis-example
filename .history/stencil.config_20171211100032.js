exports.config = {
  bundles: [
    { components: ['firstgis-viewer'/*, 'app-home'*/] },
    { components: ['gis-viewer'] }
  ],
  collections: [
    // { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
