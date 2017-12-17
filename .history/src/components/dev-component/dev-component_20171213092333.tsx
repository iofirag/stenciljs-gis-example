import { Component, Prop, State } from '@stencil/core';
import { CcGisViewer } from '../cc-gis-viewer/cc-gis-viewer';


@Component({
    tag: 'dev-component',
    styleUrl: 'dev-component.scss'
})
export class DevComponent {

    @State() ccgisviewer: CcGisViewer;
    
    render() {
        return (
            <div>
                Dev component
                <button onClick={(event: UIEvent) => this.handleClick(event)}>Export Image</button>
            </div>
        );
    }

    componentDidLoad() {
        this.ccgisviewer = document.querySelector(('gis-viewer');
    }

    handleClick(event: UIEvent) {
        this.ccgisviewer.exportMapImage();
        // alert('Received the button click!');
    }

    getState(): any {
        return { aa: 22 }
    }
}