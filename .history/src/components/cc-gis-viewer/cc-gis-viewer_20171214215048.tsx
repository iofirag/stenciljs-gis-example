import { Component, State, Method } from '@stencil/core';
// import { DevComponent } from '../dev-component/dev-component';

@Component({
  tag: 'cc-gis-viewer',
  styleUrl: 'cc-gis-viewer.scss'
})
export class CcGisViewer {
  @State() appState: any;
  
  isDev: boolean = false;
  // Elements
  gisViewer: HTMLGisViewerElement;
  // devComponent: HTMLDevComponentElement;
  
  
  @Method() myApi(): void {
    alert('my stencil api')
  }
  @Method() exportMapImage(){
    this.gisViewer.exportMapImageCh()
  }

  // Life-Cycle
  render() {
    if( this.isDev ) {
      return (
        <dev-component></dev-component>
      );
    } else {
      this.appState = this.getState();
      return (
        this.gisViewer.attributes = ...this.appState; //<gis-viewer { ...this.appState } />
      );
    }
  }
  componentDidLoad() {
    this.gisViewer = document.querySelector('gis-viewer');
    // if (this.isDev) {
    //   this.devComponent = document.querySelector('dev-component');
    // }
  }

  // Private functions
  private getState(): any {
    return { aa: 'my real state' }
  }
}
