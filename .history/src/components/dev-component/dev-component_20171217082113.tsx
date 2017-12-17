import { Component } from '@stencil/core';
import { GisViewerProps } from '../../models/api';


@Component({
    tag: 'dev-component',
    styleUrl: 'dev-component.scss'
})
export class DevComponent {

    gisViewer: HTMLGisViewerElement;
    
    render() {

        return (
            <div>
                Dev component
                <button onClick={(event: UIEvent) => this.handleClick(event)}>Export Image</button>
                <gis-viewer { ...this.getDevState() } />
            </div>
        );
    }

    componentDidLoad() {
        this.gisViewer = document.querySelector('gis-viewer');
    }

    handleClick(event: UIEvent) {
        this.gisViewer.exportMapImage();
        this.gisViewer.doSomething();
        console.log(event);
    }

    getDevState(): GisViewerProps {
        return {
            // myProp: 'my dev State',
            // onFooComplited: () => {
            //     console.log('my onFooComplited callback has executed');
            // },
            tileLayers
        }
    }
}