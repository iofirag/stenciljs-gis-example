import { Component, Prop, Method/* , Element */ } from '@stencil/core';
import * as L from 'leaflet';
import { GisViewerProps } from '../../models/apiModels';
import { LPlus } from '../../typePatches/LPlus';


@Component({
    tag: 'gis-viewer',
    styleUrls: ['gis-viewer.scss', '../../../node_modules/leaflet/dist/leaflet.css'],
})
export class GisViewer {
    private map: LPlus.Map;

    // @Element() el: HTMLElement;
    @Prop() gisViewerProps: GisViewerProps;
    

    render() {
        return ( <div id='map' /> )
    }

    componentDidLoad() {
        this.map = new LPlus.Map('map').setView([51.505, -0.09], 13);

        LPlus.ileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
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
// window["LPlus"] = L; // tslint:disable-line