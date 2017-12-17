import { Component, State, Method } from '@stencil/core';

@Component({
  tag: 'cc-gis-viewer',
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

  @Method() 
  exportMapImage(){
    document.getElementsByTagName('gis-viewer')[0]
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
    let map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }
  getState(): any {
    return { aa: 22 }
  }
}
