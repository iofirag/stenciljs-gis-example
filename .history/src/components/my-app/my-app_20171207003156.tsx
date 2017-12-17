import { Component } from '@stencil/core';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  render() {
    if (!this.isConnectedToParent) {
      return (<DevComponent />);
    }

    const props: any = this.state;

    return (
      <div>
        <GisViewer key="theComponent" {...props} ref={(gis) => {
          if (!gis) { return; }
          this.gisComponent = gis;
          this.gisComponent.fireMapReadyWhenReady();
        }} />
      </div>
    );
    return (
      
      // <div>
      //   <header>
      //     <h1>Stencil App Starter</h1>
      //   </header>

      //   <main>
      //     <stencil-router>
      //       <stencil-route url='/' component='app-home' exact={true}>
      //       </stencil-route>

      //       <stencil-route url='/profile/:name' component='app-profile'>
      //       </stencil-route>
      //     </stencil-router>
      //   </main>
      // </div>
    );
  }
}