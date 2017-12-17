import { Component, Prop, Method } from '@stencil/core';
import * as L from 'leaflet';
// import { GisViewerProps } from '../../models/api';


@Component({
    tag: 'gis-viewer',
    styleUrls: ['gis-viewer.scss', '../../../node_modules/leaflet/dist/leaflet.css'],
})
export class GisViewer {
    private map: L.Map;

    @Prop() public gisViewer-props: any;
    
    // constructor(public prop) {
    //     console.log(prop)
    // }
    
    componentWillLoad() {
        console.log('The component is about to be rendered', this);
        debugger
    }
    render() {
        return ( <div id='map' /> )
    }

    componentDidLoad() {
        this.map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        debugger
        this.map.on('moveend', () => {
            debugger
            if (this['gis-viewer-props'].onMapReady && typeof this['gis-viewer-props'].onMapReady === 'function') {
                this['gis-viewer-props'].onMapReady();
            }
        })
    }


    @Method()
    createMaerker() {
        L.marker([50.5, -1.09]).addTo(this.map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
    }
}