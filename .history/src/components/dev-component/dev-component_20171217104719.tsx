import { Component } from '@stencil/core';
import { MapSettings } from '../../models/api';
// import { GisViewerProps } from '../../models/api';
// import { AppBar, RaisedButton } from "material-ui";


@Component({
    tag: 'dev-component',
    styleUrl: 'dev-component.scss'
})
export class DevComponent {

    gisViewer: HTMLGisViewerElement;
    
    render() {

        return (
            <div class="dev-components">
                <div class="header">
                    <header title="This is a GIS Viewer component Application"/>
                </div>
                <div class="body">
                    <div class="sideMenu">
                        <input type="button" value="Create Marker" onClick={() => this.testCreateMaerker()} />
                        {/* <input type="button" value="" onClick={() => {}} /> */}
                    </div>
                    <div class="gisWrapper">
                        <gis-viewer mapSettings={this.getDevState()} />
                    </div>
                </div>
            </div>
        );
    }

    getDevState(): MapSettings {
        let mapSettings: MapSettings = {
            myProp: 'my dev State',
            onFooComplited: () => {
                console.log('my onFooComplited callback has executed');
            }
        }
        return mapSettings;
    }

    componentDidLoad() {
        this.gisViewer = document.querySelector('gis-viewer');
    }

    testCreateMaerker() {
        console.log('Testing create marker command');
        this.gisViewer.createMaerker();
    }

    
}