import { Component, Prop, Method, State } from '@stencil/core';
import * as L from 'leaflet';
import * as canvgbrowser from 'canvg-browser';
import { MapSettings } from '../../models/api';
// import { MapSettings } from '../../models/api';
// import * as html2canvas from 'html2canvas';

@Component({
    tag: 'gis-viewer',
    styleUrls: ['gis-viewer.scss', '../../../node_modules/leaflet/dist/leaflet.css'],
})
export class GisViewer {

    @Prop() mapSettings: MapSettings;
    
    map: any;
    
    render() {
        return ( <div id='map' /> )
    }

    componentDidLoad() {
        this.map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        L.marker([51.5, -0.09]).addTo(this.map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();

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