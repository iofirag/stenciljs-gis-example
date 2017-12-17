/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/router';

import {
  MatchResults,
} from '@stencil/router';

import {
  AppHome as AppHome
} from './components\app-home/app-home';

declare global {
  interface HTMLAppHomeElement extends AppHome, HTMLElement {
  }
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };
  interface HTMLElementTagNameMap {
    "app-home": HTMLAppHomeElement;
  }
  interface ElementTagNameMap {
    "app-home": HTMLAppHomeElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "app-home": JSXElements.AppHomeAttributes;
    }
  }
  namespace JSXElements {
    export interface AppHomeAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  AppProfile as AppProfile
} from './components/app-profile/app-profile';

declare global {
  interface HTMLAppProfileElement extends AppProfile, HTMLElement {
  }
  var HTMLAppProfileElement: {
    prototype: HTMLAppProfileElement;
    new (): HTMLAppProfileElement;
  };
  interface HTMLElementTagNameMap {
    "app-profile": HTMLAppProfileElement;
  }
  interface ElementTagNameMap {
    "app-profile": HTMLAppProfileElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "app-profile": JSXElements.AppProfileAttributes;
    }
  }
  namespace JSXElements {
    export interface AppProfileAttributes extends HTMLAttributes {
      match?: MatchResults;
    }
  }
}


import {
  GisViewer as GisViewer
} from './components/gis-viewer/gis-viewer';

declare global {
  interface HTMLGisViewerElement extends GisViewer, HTMLElement {
  }
  var HTMLGisViewerElement: {
    prototype: HTMLGisViewerElement;
    new (): HTMLGisViewerElement;
  };
  interface HTMLElementTagNameMap {
    "gis-viewer": HTMLGisViewerElement;
  }
  interface ElementTagNameMap {
    "gis-viewer": HTMLGisViewerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "gis-viewer": JSXElements.GisViewerAttributes;
    }
  }
  namespace JSXElements {
    export interface GisViewerAttributes extends HTMLAttributes {
      match?: MatchResults;
    }
  }
}


import {
  MyApp as MyApp
} from './components/my-app/my-app';

declare global {
  interface HTMLMyAppElement extends MyApp, HTMLElement {
  }
  var HTMLMyAppElement: {
    prototype: HTMLMyAppElement;
    new (): HTMLMyAppElement;
  };
  interface HTMLElementTagNameMap {
    "my-app": HTMLMyAppElement;
  }
  interface ElementTagNameMap {
    "my-app": HTMLMyAppElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "my-app": JSXElements.MyAppAttributes;
    }
  }
  namespace JSXElements {
    export interface MyAppAttributes extends HTMLAttributes {
      
    }
  }
}

