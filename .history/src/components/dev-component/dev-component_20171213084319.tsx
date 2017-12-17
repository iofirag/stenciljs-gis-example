import { Component } from '@stencil/core';


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
                <button>test button</button>
            </div>
        );
    }

    componentDidLoad() {
        this.gisViewer = document.getElementsByTagName('gis-viewer')[0]
    }

    getState(): any {
        return { aa: 22 }
    }
}