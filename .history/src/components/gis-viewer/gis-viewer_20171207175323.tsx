import { Component, Prop } from '@stencil/core';
import * as L from "leaflet";


@Component({
    tag: 'gis-viewer',
    styleUrl: 'gis-viewer.scss'
})
export class GisViewer {

    @Prop() match: string;

    getState(): any {
        new LPlus.Map('map', extendedOptions);  // Create Map
    }

    render() {
        return (
            <div id='map' class='map-wrap' />
        )
    }
}