import { Component, State, Method } from '@stencil/core';
import { GisViewer } from '../gis-viewer/gis-viewer';

@Component({
  tag: 'cc-gis-viewer',
  styleUrl: 'cc-gis-viewer.scss'
})
export class CcGisViewer {
  @State() appState: any;
  @State() GisViewer: string = '';
  
  
  @Method() isDev(): boolean {
    return true;
  }

  @Method() myApi(): void {
    alert('my stencil api')
  }

  @Method() exportMapImage(){
    
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

  componentDidLoad() {
    document.getElementsByTagName('gis-viewer')[0]
  }
  getState(): any {
    return { aa: 22 }
  }
}
