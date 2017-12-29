import { Component, Prop, Method, Event,/* , Element */  EventEmitter} from '@stencil/core';
// import * as L from 'leaflet';
import { GisViewerProps } from '../../models/apiModels';
import MapContainer from './classes/MapContainer/MapContainer';


@Component({
    tag: 'gis-viewer',
    styleUrls: [
        'gis-viewer.scss', 
        '../../../node_modules/leaflet/dist/leaflet.css',
        '../'
    ],
})
export class GisViewer {
    // private map: L.Map;
    mapContainer: MapContainer;

    // @Element() el: HTMLElement;
    @Prop() gisViewerProps: GisViewerProps;

    @Event() mapReady: EventEmitter;
    @Event() moveEnd: EventEmitter;

    render() {
        return ( <div id='map' /> )
    }

    componentDidLoad() {
        // this.map = new L.Map('map').setView([51.505, -0.09], 13);
        
        // this.mapReady.emit();
        // // if (this.gisViewerProps.onMapReady && typeof this.gisViewerProps.onMapReady === 'function') {
        // //     this.gisViewerProps.onMapReady();
        // // }

        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

        // this.map.on('moveend', () => {
        //     // if (this.gisViewerProps.onMapReady && typeof this.gisViewerProps.onMapReady === 'function') {
        //     //     this.gisViewerProps.onMapReady();
        //     // }
        //     this.moveEnd.emit('moveEnd');
        // })
        this.mapContainer = new MapContainer(this.gisViewerProps);
    }


    @Method()
    createMarker() {
        // L.marker([50.5, -1.09]).addTo(this.map)
        //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        //     .openPopup();
    }
}