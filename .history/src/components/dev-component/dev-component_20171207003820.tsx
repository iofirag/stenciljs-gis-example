import { Component, Prop, Method } from '@stencil/core';
import * as L from "leaflet";


@Component({
    tag: 'gis-viewer',
    styleUrl: 'dev-component.scss'
})
export class DevComponent {



    render() {
        return (
            <div>Dev component</div>
            <button>test button</button>
        )
    }
}