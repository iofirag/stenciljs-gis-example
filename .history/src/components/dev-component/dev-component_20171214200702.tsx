import { Component, Method } from '@stencil/core';


@Component({
    tag: 'dev-component',
    styleUrl: 'dev-component.scss'
})
export class DevComponent {

    ccGisViewer: HTMLCcGisViewerElement;
    
    render() {
        return (
            <div>
                Dev component
                <button onClick={(event: UIEvent) => this.handleClick(event)}>Export Image</button>

                render() {
                    this.appState = this.isDev() ? this.devComponent.getTestState() : this.getState();


                    <gis-viewer { ...this.appState } />

            </div>
        );
    }

    componentDidLoad() {
        this.ccGisViewer = document.querySelector('cc-gis-viewer');
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