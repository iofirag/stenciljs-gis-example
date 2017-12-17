import { Component, Prop } from '@stencil/core';
import * as L from "leaflet";


@Component({
    tag: 'gis-viewer',
    styleUrl: 'gis-viewer.scss'
})
export class GisViewer {

    @Prop() match: string;

    getState(): any {
        new L.Map('map');  // Create Map
        alert(1111111)
    }

    render() {
        this.getState();
        return (
            <div id='map' class='map-wrap' />
        )
    }
}