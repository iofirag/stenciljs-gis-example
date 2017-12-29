import { Component, Prop, Method, Event, EventEmitter, State} from '@stencil/core';
import { GisViewerProps, Coordinate, WktShape } from '../../models/apiModels';
import { MAX_NORTH_EAST, MAX_SOUTH_WEST } from './classes/statics';
import { MapContainer } from './classes/MapContainer/MapContainer';
import _ from 'lodash';
import L from 'leaflet';


@Component({
    tag: 'gis-viewer',
    styleUrls: [
        'gis-viewer.scss', 
        '../../../node_modules/leaflet/dist/leaflet.css',
        
        /* MapContainer */
        'classes/MapContainer/MapContainer.css',

        /* ToolbarComp */
        'classes/features/ToolbarComp/ToolbarComp.css',

        /* LayersControllerComp */
        '../../../node_modules/material-design-lite/material.min.css',             // Need to import this from styledLayerControl.css
        '../../../node_modules/leaflet.styledlayercontrol/css/MaterialIcons.css',  // Need to import this from styledLayerControl.css
        '../../../node_modules/leaflet.styledlayercontrol/css/styledLayerControl.css',
        'classes/features/LayersControllerComp/LayersControllerComp.css',

        /* LayersCreatorComp */
        '../../../node_modules/leaflet.markercluster/dist/MarkerCluster.css', 
        '../../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
        
        /* DrawBarComp */
        // '../../../node_modules/leaflet-draw/dist/images/marker-icon.png',
        '../../../node_modules/leaflet-draw/dist/leaflet.draw.css',
        'classes/features/DrawBarComp/DrawBarComp.css'

        // '../../../node_modules/leaflet.mousecoordinate/dist/leaflet.mousecoordinate.css', 
    ],
})
export class GisViewer {
    // private map: L.Map;
    @State() mapContainer: MapContainer;

    // @Element() el: HTMLElement;
    @Prop() gisViewerProps: GisViewerProps;

    @Event() mapReady: EventEmitter;
    @Event() moveEnd: EventEmitter;
    @Event() drawCreated: EventEmitter;
    @Event() drawEdited: EventEmitter;
    @Event() drawEdited: EventEmitter;
    

    render() {
        return ( <div id='map' /> )
    }

    componentDidLoad() {
        this.mapContainer = new MapContainer(this.gisViewerProps);
    }
    
    @Method()
    emitDrawCreated(wktShape: WktShape) {
        this.drawCreated.emit(wktShape);
    }
    @Method()
    emitDrawEdited(wktList: WktShape[]) {
        this.drawEdited.emit(wktList);
    }
    @Method()
    emitDrawDeleted(wktList: WktShape[]) {
        this.drawDeleted.emit(wktList);
    }
}