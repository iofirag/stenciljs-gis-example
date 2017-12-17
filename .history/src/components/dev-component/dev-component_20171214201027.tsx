import { Component, State } from '@stencil/core';


@Component({
    tag: 'dev-component',
    styleUrl: 'dev-component.scss'
})
export class DevComponent {
    @State() appState: any;

    gisViewer: HTMLGisViewerElement;
    
    render() {
        this.appState = this.getTestState();

        return (
            <div>
                Dev component
                <button onClick={(event: UIEvent) => this.handleClick(event)}>Export Image</button>
                <gis-viewer { ...this.appState } />
            </div>
        );
    }

    componentDidLoad() {
        this.gisViewer = document.querySelector('gis-viewer');
    }

    handleClick(event: UIEvent) {
        this.ccGisViewer.exportMapImage();
        console.log(event);
    }

    callbackFunc() {

    }

    getTestState() {
        return { aa: 'my Test State' }
    }
}