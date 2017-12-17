import { Component, Prop } from '@stencil/core';
import * as L from "leaflet";


@Component({
    tag: 'gis-viewer',
    styleUrl: 'gis-viewer.scss'
})
export class GisViewer {

    @Prop() match: string;

    getState(): void {
        alert(1111111);
        new L.map('map');  // Create Map
    }

    render() {
        this.getState();
        return (
            <div id='map' class='map-wrap' />
        )
    }
}