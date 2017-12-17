import { Component } from '@stencil/core';
import { GisViewerProps } from '../../models/api';
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
                    <header
                        title="This is a GIS Viewer component Application"
                    />
                </div>
                <div class="body">
                    <div class="sideMenu">
                        <input type="button" value="Export image" onClick={(event: UIEvent) => this.handleClick(event)} />
                        <input type="button" value="" onClick={(event: UIEvent) => }/>
                        {/* <button onClick={() => { }this.testExportDraw}*/}
                        {/* <RaisedButton label="Export draw" primary={true} onClick={this.testExportDraw} />
                        <RaisedButton label="Import user draw" primary={true} onClick={this.testImportUserDraw} />
                        <RaisedButton label="Clear draws" primary={true} onClick={this.testClearDraws} />
                        <RaisedButton label="Export bounds" primary={true} onClick={this.testExportBounds} />
                        <RaisedButton label="test Export CSV" primary={true} onClick={this.testExportCSV} />
                        <RaisedButton label="Get Selected Shapes" primary={true} onClick={this.testGetAllSelectedShape} />
                        <RaisedButton label="Get Drawable Multipolygon wkt" primary={true} onClick={this.testGetMultiPolygon} />
                        <RaisedButton label="Select shape by id" primary={true} onClick={this.testSelectShapeById} />
                        <RaisedButton label="Zoom to extend" primary={true} onClick={this.testZoomToExtend} />
                        <RaisedButton label="Export image" primary={true} onClick={this.testExportImage} />
                        <RaisedButton label="Export KML" primary={true} onClick={this.exportKmlCMD} />
                        <RaisedButton label="Add shape" primary={true} onClick={this.addShape} />
                        <input type="file" id="fileInput" onChange={this.testImportKmlFormatByStringCMD} accept={ImportFileFormats} /> */}
                    </div>
                    <div class="gisWrapper">
                        <gis-viewer { ...this.getDevState() } />
                    </div>
                </div>
            </div>

            // <div>
            //     Dev component
            //     <button onClick={(event: UIEvent) => this.handleClick(event)}>Export Image</button>
                
            // </div>
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
            // tileLayers
        }
    }
}