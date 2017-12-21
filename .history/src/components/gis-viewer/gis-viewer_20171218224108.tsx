import { Component, Prop, Method } from '@stencil/core';
import * as L from 'leaflet';
import { GisViewerProps } from '../../models/apiModels';


@Component({
    tag: 'gis-viewer',
    styleUrls: ['gis-viewer.scss', '../../../node_modules/leaflet/dist/leaflet.css'],
})
export class GisViewer {
    private map: L.Map;

    @Prop() gisViewerProps: GisViewerProps;
    

    render() {
        return ( <div id='map' /> )
    }

    componentDidLoad() {
        this.map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        this.map.on('moveend', () => {
            if (this.gisViewerProps.onMapReady && typeof this.gisViewerProps.onMapReady === 'function') {
                this.gisViewerProps.onMapReady();
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
// export const LPlus = L;
window["LPlus"] = L; // tslint:disable-line