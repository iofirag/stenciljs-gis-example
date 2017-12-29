import { Component, State, Listen } from '@stencil/core';
import { GisViewerProps, TileLayerDefinition, MapSettings, ShapeType, ShapeLayerDefinition, UnitsChangerOptions, ZoomToExtendOptions, PolylineMeasureOptions, MouseCoordinateOptions, DrawBarOptions, ZoomControl, MiniMapOptions, SearchBoxOptions, ScaleControlOptions, LayersControllerOptions } from '../../models/apiModels';


@Component({
    tag: 'dev-component',
    styleUrl: 'dev-component.scss'
})
export class DevComponent {
    private gisViewerEl: HTMLGisViewerElement;
    @State() gisViewerState: GisViewerProps;


    //document.querySelector('gis-viewer').addEventListener('drawCreated', (e) => { console.log(e.detail) })
    @Listen('mapReady')
    onMapReady(event: CustomEvent) {
        console.log('Received the custom mapReady event');
    }
    @Listen('moveEnd')
    onMoveEnd(e: UIEvent) {
        console.log('Received the custom moveEnd event:', event.detail);
    }
    @Listen('drawCreated')
    drawCreatedHandler(e: CustomEvent) {
        console.log(e.detail)
    }

    componentWillLoad() {
        this.createDevState();
    }
    render() {
        return (
            <div class="dev-components">
                <div class="header">
                    <header title="This is a GIS Viewer component Application"/>
                </div>
                <div class="body">
                    <div class="sideMenu">
                        <input type="button" value="Create Marker" onClick={e => this.testCreateMarker(e)} />
                        {/* <input type="button" value="" onClick={() => {}} /> */}

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

                        {/* <input type="button" value="" onClick={() => {}} /> */}
                    </div>
                    <div class="gisWrapper">
                        <gis-viewer gisViewerProps={this.gisViewerState} />
                    </div>
                </div>        
            </div>
        );
    }
    componentDidLoad() {
        this.gisViewerEl = document.querySelector('gis-viewer');

        // this.gisViewerEl.addEventListener('moveEnd', (ev: any) => {
        //     console.log(ev.detail);
        // });
        // this.gisViewerEl.addEventListener('mapReady', (ev) => {
        //     console.log(ev, this);
        //     debugger
        //     // ev.detail contains the data passed out from the component
        //     // Handle event here...
        // });
    }

    // @Event
    testCreateMarker(e: UIEvent) {
        console.log('Testing create marker command', e.type);
        // this.gisViewerEl.createMarker();
    }


    


    createDevState(): void {
        const protocol: string = 'https:';

        const mapSettings: MapSettings = {
            metric: false,
            wheelZoomOnlyAfterClick: true,
            clusterOptions: {
                disableClusteringAtZoom: 13,
                chunkedLoading: true,
                chunkProgress: true,
                // singleMarkerMode: false
            },
            mode: 'cluster'
        };
        const tileLayers: TileLayerDefinition[] = [
            {
                name: 'Online Map',
                tilesURI: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                minZoom: 1,
                maxZoom: 18,
                attributionControl: false,
            },
            {
                name: 'Local OSM',
                tilesURI: protocol + '//osm/osm_tiles/{z}/{x}/{y}.png',
                minZoom: 1,
                maxZoom: 18,
                attributionControl: false,
            }
        ];
        const shapeLayers: ShapeLayerDefinition[] = [
            {
                layerName: 'Test data 1',
                // isDisplay: false,
                shapes: [
                    {
                        shapeObject: { // 	// shapeWkt: 'POINT(-28.82 46.07)',
                            type: ShapeType.MARKER,
                            shape: {
                                coordinate: {
                                    lat: -23.6415,
                                    lng: 45.79101
                                }
                            }
                        },
                        data: { id: '1111', count: 10/* , type: 'intercept' */ },
                    }, 
                    {
                        shapeObject: { // 	// shapeWkt: 'POINT(-28.82 46.07)',
                            type: ShapeType.MARKER,
                            shape: {
                                coordinate: {
                                    lat: -24.6415,
                                    lng: 45.79101
                                }
                            }
                        },
                        data: { id: '1112', count: 10/* , type: 'intercept' */ },
                    }, 
                ]
            }
        ];
        
        const isImportExport: boolean = true;

        const layersController: LayersControllerOptions = {
            enable: true
        };

        const scaleControl: ScaleControlOptions = {
            enable: true,
            position: 'bottomright'
        };

        const searchBox: SearchBoxOptions = {
            enable: true,
            searchOnLayer: true,
            queryServerUrl: 'http://nominatim.openstreetmap.org/search?format=json&q={s}'  //protocol + '//osm/nominatim?format=json&limit=3&type=administrative&q={s}' // 'http://10.164.39.38/nominatim/search.php?format=json&q={s}' // 'http://nominatim.openstreetmap.org/search?format=json&q={s}' //
        };

        const miniMap: MiniMapOptions = {
            enable: true,
            toggleDisplay: true
        };

        const zoomControl: ZoomControl = {
            enable: true
        };

        const drawBar: DrawBarOptions = {
            enable: true,
            draw: {
                polyline: true,
                polygon: true, // Turns off this drawing tool
                circle: true, // Turns off this drawing tool
                rectangle: true, // Turns off this drawing tool
                marker: true, // Turns off this drawing tool
                // textualMarker: false // Turns off this drawing tool
            },
            edit: {
                remove: true        // Turns on remove button
            }
        };

        const mouseCoordinate: MouseCoordinateOptions = {
            enable: true,
            gps: true,
            utm: false,
            utmref: false
        };

        const polylineMeasure: PolylineMeasureOptions = {
            enable: true,
            showMeasurementsClearControl: true,
            clearMeasurementsOnStop: false,
        };

        const zoomToExtend: ZoomToExtendOptions = {
            enable: true,
            position: 'topright'
        };

        const unitsChanger: UnitsChangerOptions = {
            enable: true
        };

        const isToolbarSettings: boolean = true;
        
        this.gisViewerState = {
            mapSettings,
            tileLayers,
            shapeLayers,
            layersController,
            scaleControl,
            searchBox,
            miniMap,
            drawBar,
            zoomControl,
            mouseCoordinate,
            polylineMeasure,
            zoomToExtend,
            zoomToExtendOnNewData: true,
            unitsChanger,		//
            isImportExport,			//
            isToolbarSettings,			//
            // onMapReady: () => {
            //     console.log('Map is ready! (callback)');
            // }
        }
    }
}