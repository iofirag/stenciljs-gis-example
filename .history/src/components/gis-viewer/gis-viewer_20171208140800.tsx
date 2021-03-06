import { Component, Prop } from '@stencil/core';
import * as L from 'leaflet';

@Component({
    tag: 'gis-viewer',
    styleUrls: ['gis-viewer.scss']
})
export class GisViewer {

    @Prop() match: string;

    render() {
        return (
            
            <link href="../../../mode_modules/leaflet/dist/leaflet.css" rel="stylesheet" type="text/css"></link>
            <div id='map' class='map-wrap' />
        )
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
}