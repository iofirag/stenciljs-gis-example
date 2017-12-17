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
    

    //const props: any = this.appState;

    return (
      <div>
        <gis-viewer  />
      </div>
    );
  }
}
