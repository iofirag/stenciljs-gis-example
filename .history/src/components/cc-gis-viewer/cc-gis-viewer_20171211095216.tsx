import { Component, State, Method } from '@stencil/core';

@Component({
  tag: 'gis-viewer',
  styleUrl: 'cc-gis-viewer.scss'
})
export class CcGisViewer {
  @State() appState: any;
  
  @Method()
  isDev(): boolean {
    return true;
  }

  @Method()
  myApi(): void {
    alert('my stencil api')
  }

  getState(): any {
    return {aa:22}
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
}
