exports.config = {
  bundles: [
    { components: ['gis-viewer', 'map-container', 'toolbar-comp'] },
    // { components: ['dev-component', 'gis-viewer'] },
  ],
  collections: [
     { name: '@stencil/router' }
  ],
  serviceWorker: {
    globPatterns: [
      '**/*.{js,css,json,html,ico,png,jpg,jpeg}'
    ]
  }
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
