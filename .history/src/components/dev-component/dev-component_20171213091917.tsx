import { Component, Prop } from '@stencil/core';
import { CcGisViewer } from '../cc-gis-viewer/cc-gis-viewer';


@Component({
    tag: 'dev-component',
    styleUrl: 'dev-component.scss'
})
export class DevComponent {

    @Prop() ccgisviewer: CcGisViewer;
    
    render() {
        return (
            <div>
                Dev component
                <button onClick={(event: UIEvent) => this.handleClick(event)}>Export Image</button>
            </div>
        );
    }

    componentDidLoad() {
        this.gisViewer = document.getElementsByTagName('gis-viewer')[0]
    }

    handleClick(event: UIEvent) {
        this.ccgisviewer.exportMapImage()
        alert('Received the button click!');
    }

    getState(): any {
        return { aa: 22 }
    }
}