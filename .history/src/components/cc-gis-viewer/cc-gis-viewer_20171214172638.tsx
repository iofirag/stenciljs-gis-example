import { Component, State, Method } from '@stencil/core';

@Component({
  tag: 'cc-gis-viewer',
  styleUrl: 'cc-gis-viewer.scss'
})
export class CcGisViewer {
  @State() appState: any;

  // Elements
  gisViewer: HTMLGisViewerElement;
  devComponent: HTMLDevComponentElement;
  
  
  @Method() isDev(): boolean {
    return true;
  }
  @Method() myApi(): void {
    alert('my stencil api')
  }
  @Method() exportMapImage(){
    this.gisViewer.exportMapImageCh()
  }

  // Life-Cycle
  render() {
    this.appState= this.getState()
    return (
      <div>
        {this.isDev() ? <dev-component /> : ''}
        <gis-viewer { this.isDev() ? ...this.appState: HTMLDevComponentElement.} />
      </div>
    );
  }
  componentDidLoad() {
    this.gisViewer = document.querySelector('gis-viewer');
    this.devComponent = document.querySelector('dev-component');
  }

  // Private functions
  private getState(): any {
    return { aa: 'my state' }
  }
}
