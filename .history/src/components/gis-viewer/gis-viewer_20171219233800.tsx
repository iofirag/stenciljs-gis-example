import { Component, Prop, Method/* , Element */ } from '@stencil/core';
import * as L from 'leaflet';
import { GisViewerProps } from '../../models/apiModels';


@Component({
    tag: 'gis-viewer',
    styleUrls: ['gis-viewer.scss', '../../../node_modules/leaflet/dist/leaflet.css'],
})
export class GisViewer {
    private map: L.Map;

    // @Element() el: HTMLElement;
    @Prop() gisViewerProps: GisViewerProps;
    

    render() {
        return ( <div id='map' /> )
    }

    componentDidLoad() {
        this.map = new L.Map('map').setView([51.505, -0.09], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

        this.map.on('moveend', () => {
            if (this.gisViewerProps.onMapReady && typeof this.gisViewerProps.onMapReady === 'function') {
                this.gisViewerProps.onMapReady();
            }
        })
    }

    
    @Method()
    createMarker() {
        L.marker([50.5, -1.09]).addTo(this.map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
    }
}