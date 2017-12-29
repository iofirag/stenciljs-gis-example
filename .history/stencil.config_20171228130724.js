exports.config = {
  bundles: [
    { components: ['gis-viewer', 'map-container' ] },
    { components: ['map-container' ] },
    { components: ['gis-viewer', 'map-container', 'toolbar-comp', ] },
    { components: ['gis-viewer', 'map-container', 'layers-controller-comp'] },
    { components: ['gis-viewer', 'map-container', 'draw-bar-comp'] },
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
