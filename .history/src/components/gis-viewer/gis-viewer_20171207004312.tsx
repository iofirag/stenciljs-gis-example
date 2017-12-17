import { Component, Prop } from '@stencil/core';
import * as L from "leaflet";


@Component({
    tag: 'gis-viewer',
    styleUrl: 'gis-viewer.scss'
})
export class GisViewer {

    @Prop() match: string;

    render() {
        return (<div>You have reach 'very secure' file server of company X</div>)
    }
}