import { Component, State } from '@stencil/core';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {
  @State() appState: any;
  
  @Method()
  isDev() {
    
  }

  render() {
    if (this.isDev) {
      return (<Dev-component />);
    }

    const props: any = this.state;

    return (
      <div>
        <gis-viewer /> key="theComponent" {...props} }} />
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
