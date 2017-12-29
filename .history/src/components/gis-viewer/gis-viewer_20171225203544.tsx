import { Component, Prop, Method, Event, EventEmitter, State} from '@stencil/core';
// import /** as*/ L from 'leaflet';
import { GisViewerProps, Coordinate } from '../../models/apiModels';
// import MapContainer from './classes/MapContainer/MapContainer';
// import { MAX_NORTH_EAST, MAX_SOUTH_WEST } from './classes/statics';
// import L from 'leaflet';
import _ from 'lodash';
import { TestClass } from './classes/MapContainer/testClass';
import { MAX_NORTH_EAST, MAX_SOUTH_WEST } from './classes/statics';
import * as L from 'leaflet';
import MapContainer from './classes/MapContainer/MapContainer';


@Component({
    tag: 'gis-viewer',
    styleUrls: ['gis-viewer.scss', '../../../node_modules/leaflet/dist/leaflet.css'],
})
export class GisViewer {
    // private map: L.Map;
    // @State() mapContainer: MapContainer;

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
        // console.log(this.gisViewerProps);
        // const props = JSON.stringify(this.gisViewerProps);
        // console.log(props)
        const mapContainernew MapContainer(this.gisViewerProps);
        // const map: L.Map = this.createMap();
    }

    // public createMap(): L.Map {
    //     // Map options
    //     const extendedOptions: any = {}; // this.tileLayersComp.setTileLayers(this.context.mapState.baseMaps, tileProps);

    //     // Zoom control
    //     extendedOptions.zoomControl = _.get(this, 'props.zoomControl.enable', true);

    //     // MAX Bounds
    //     const northEast: Coordinate = { lat: MAX_NORTH_EAST.lat, lng: MAX_NORTH_EAST.lng };
    //     const southWest: Coordinate = { lat: MAX_SOUTH_WEST.lat, lng: MAX_SOUTH_WEST.lng };
    //     const bounds: L.LatLngBounds = new L.LatLngBounds(southWest, northEast);

    //     Object.assign(extendedOptions, {
    //         noWrap: true,
    //         maxBounds: bounds,
    //         minZoom: _.max([extendedOptions.minZoom, 2]),
    //         maxBoundsViscosity: 1.0,
    //         //   doubleClickZoom: false,
    //         bounceAtZoomLimits: false,
    //         zoom: 1,
    //         center: {
    //             lat: 0.076304,
    //             lng: 0.013960
    //         },
    //     });
    //     return new L.Map('map', extendedOptions);  // Create Map
    // }


    @Method()
    createMarker() {
        // L.marker([50.5, -1.09]).addTo(this.map)
        //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        //     .openPopup();
    }
}