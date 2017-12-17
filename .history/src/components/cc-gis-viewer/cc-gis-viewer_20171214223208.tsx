import { Component, State, Method, Prop } from '@stencil/core';


@Component({
  tag: 'cc-gis-viewer',
  styleUrl: 'cc-gis-viewer.scss'
})
export class CcGisViewer {

  @Prop() appProps: ccGisViewerProps;


  // @State() appState: any;
  
  isDev: boolean = true;
  // Elements
  gisViewer: HTMLGisViewerElement;
  
  
  @Method() myApi(): void {
    alert('my stencil api')
  }
  @Method() exportMapImage(){
    this.gisViewer.exportMapImageCh()
  }

  // Life-Cycle
  render() {
    if( this.isDev ) {
      return ( <dev-component /> );
    } else {
      return ( <gis-viewer { ...this.appState } /> );
    }
  }
  componentDidLoad() {
    this.gisViewer = document.querySelector('gis-viewer');
    this.appProps = {
      myProp: ''
    }
  }
}

type ccGisViewerProps {
  myProp: string,
  onFooComplited: Function
}