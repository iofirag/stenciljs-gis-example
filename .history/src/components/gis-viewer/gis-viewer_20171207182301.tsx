import { Component, Prop } from '@stencil/core';
import * as L from "leaflet";


@Component({
    tag: 'gis-viewer',
    styleUrl: 'gis-viewer.scss'
})
export class GisViewer {

    @Prop() match: string;

    render() {
        return (
            <div id='map' class='map-wrap' />
        )
    }

    componentDidLoad() {
        console.log('The component has been rendered');
    }
}