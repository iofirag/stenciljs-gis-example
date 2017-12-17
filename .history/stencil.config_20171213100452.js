exports.config = {
  bundles: [
    { components: ['cc-gis-viewer', 'gis-viewer','dev-component'] },
    { components: [] },
    { components: [] }
  ],
  collections: [
     { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
