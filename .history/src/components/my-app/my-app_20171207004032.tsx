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
    if (this.isDev) {
      return (<dev-component />);
    }

    const props: any = this.appState;

    return (
      <div>
        <gis-viewer /> key="theComponent" {...props} }} />
      </div>
    );
  }
}
