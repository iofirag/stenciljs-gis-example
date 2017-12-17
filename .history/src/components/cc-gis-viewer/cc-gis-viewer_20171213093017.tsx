import { Component, State, Method, Prop } from '@stencil/core';
// import { GisViewer } from '../gis-viewer/gis-viewer';

@Component({
  tag: 'cc-gis-viewer',
  styleUrl: 'cc-gis-viewer.scss'
})
export class CcGisViewer {
  @State() appState: any;

  // Elements
  @Prop() gisViewer: HTMLGisViewerElement;
  
  
  @Method() isDev(): boolean {
    return true;
  }
  @Method() myApi(): void {
    alert('my stencil api')
  }
  @Method() exportMapImage(){
    this.gisViewer.exportMapImageCh()
  }

  render() {

    this.appState= this.getState()

    return (
      <div>
        {this.isDev() ? <dev-component /> : ''}
        <gis-viewer {...this.appState} />
      </div>
    );
  }

  // Functions
  private componentDidLoad() {
    this.gisViewer = document.querySelector('gis-viewer');
  }
  getState(): any {
    return { aa: 22 }
  }
}
