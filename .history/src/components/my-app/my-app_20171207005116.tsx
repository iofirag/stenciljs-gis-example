import { Component, State, Method } from '@stencil/core';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {
  @State() appState: any;
  
  @Method()
  isDev(): boolean {
    return true;
  }

  render() {

    this.appState;

    return (
      <div>
        {this.isDev() ? <dev-component /> : ''}
        <gis-viewer {...props} />
      </div>
    );
  }
}
