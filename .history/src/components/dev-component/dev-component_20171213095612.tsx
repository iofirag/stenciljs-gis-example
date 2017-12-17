import { Component, Prop } from '@stencil/core';


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
            </div>
        );
    }

    componentDidLoad() {
        this.ccGisViewer = document.querySelector('cc-gis-viewer');
        let cGisViewer = document.querySelector('cc-gis-viewer');
        this.ccGisViewer = cGisViewer;
        debugger
    }

    handleClick(event: UIEvent) {
        this.ccGisViewer.exportMapImage();
        console.log(event);
    }

    getState(): any {
        return { aa: 22 }
    }
}