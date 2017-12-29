exports.config = {
  bundles: [
    { components: ['gis-viewer'] },
    { components: ['map-container' ] },
    { components: ['toolbar-comp' ] },
    { components: ['layers-controller-comp'] },
    { components: ['draw-bar-comp'] },
    { components: ['layers-controller-comp'] },
    { components: ['layers-creator-comp'] },
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
