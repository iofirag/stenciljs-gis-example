import { Component, State } from '@stencil/core';


@Component({
    tag: 'dev-component',
    styleUrl: 'dev-component.scss'
})
export class DevComponent {
    @State() appState: any;

    ccGisViewer: HTMLCcGisViewerElement;
    
    render() {
        this.appState = this.getDevState();

        return (
            <div>
                Dev component
                <button onClick={(event: UIEvent) => this.handleClick(event)}>Export Image</button>
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

    // callbackFunc() {

    // }

    getDevState() {
        return {
            m: 'my dev State',
            myCallback: () => {
                console.log('my callback');
            }
        }
    }
}