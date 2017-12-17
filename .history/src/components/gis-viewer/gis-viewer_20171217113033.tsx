import { Component, Prop, Method } from '@stencil/core';
import * as L from 'leaflet';
import { MapSettings } from '../../models/api';


@Component({
    tag: 'gis-viewer',
    styleUrls: ['gis-viewer.scss', '../../../node_modules/leaflet/dist/leaflet.css'],
})
export class GisViewer {
    
    private map: L.Map;

    @Prop() mapSettings: GisViewerProps;
    
    
    render() {
        return ( <div id='map' /> )
    }

    componentDidLoad() {
        this.map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        this.map.on('moveend', ()=>{
            if (this.mapSettings.onFooComplited && typeof this.mapSettings.onFooComplited === 'function') {
                this.mapSettings.onFooComplited();
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