import { MAX_NORTH_EAST, MAX_SOUTH_WEST, DEFAULT_MAP_SETTINGS, DEFAULT_OSM_TILE } from "../statics";
import { Coordinate, MapSettings, GisViewerProps, TileLayerDefinition } from "../../../../models/apiModels";
import * as L from "leaflet";

// import './MapContainer.css';
// import { setTimeout } from 'timers';
// import { TileLayerDefinition, MapSettings, ShapeData, MapBounds, ShapeDefinition, GisViewerProps, Coordinate } from "../../../../models/apiModels";
// import DefaultMarkerIconComp from '../features/DefaultMarkerIconComp/DefaultMarkerIconComp';
// import ToolbarComp from '../features/ToolbarComp/ToolbarComp';
// import { GisPluginContext, BaseMap } from '../pluginBase';
// import { ShapeManagerRepository } from '../shapes/ShapeManagerRepository';
// import Utils from '../utils';
// import { FitBoundsOptions } from "leaflet";
// import { MAX_NORTH_EAST, MAX_SOUTH_WEST, DEFAULT_OSM_TILE, DEFAULT_MAP_SETTINGS, FILE_TYPES } from '../statics';
// import /** as*/ L from 'leaflet';
import /** as*/ _ from 'lodash';
import { GisPluginContext, BaseMap } from "../pluginBase";


export default class MapContainer {
    public context: GisPluginContext;
    // public toolbarComp: ToolbarComp;

    private nextBoundsChangeIsProgrammatic: boolean;
    private mapReadyReported: boolean;

    constructor(private props: any) {
        this.nextBoundsChangeIsProgrammatic = false;

        // Do bind first!
        // this.createControls          = this.createControls.bind(this);
        // this.areaSelection           = this.areaSelection.bind(this);
        // this.selectShapeById         = this.selectShapeById.bind(this);
        // this.importKmlFormatByString = this.importKmlFormatByString.bind(this);
        // this.getDefaultOptions       = this.getDefaultOptions.bind(this);
        // this.getBounds               = this.getBounds.bind(this);
        // this.getSelectedShapes       = this.getSelectedShapes.bind(this);
        // this.decleareMapUnits        = this.decleareMapUnits.bind(this);
        // this.forceZoomToExtend       = this.forceZoomToExtend.bind(this);
        // this.init                    = this.init.bind(this);
        // this.update                  = this.update.bind(this);
        // this.fireMapReadyWhenReady   = this.fireMapReadyWhenReady.bind(this); 

        // alert(JSON.stringify(this.props))
        // DefaultMarkerIconComp.checkAddingDefaultMarkerIcon(this.props.defaultMarkerIcon);    // Default Marker icon
        this.init();
    }

    // public update(nextProps: GisViewerProps, oldProps: GisViewerProps) {
    //     this.context.props.shapeLayers = nextProps.shapeLayers || [];

    //     // const selectedObjectsRefList: L.Layer = this.context.selectedLeafletObjects;
    //     this.context.layersController.update();

    //     // Zoom to extend on new data
    //     if (nextProps.zoomToExtendOnNewData && !_.isEqual(nextProps.shapeLayers, oldProps.shapeLayers)) {
    //         setTimeout(() => {
    //             this.forceZoomToExtend();
    //         }, 0);
    //     }
    // }
    public init() {
        const map: L.Map = this.createMap();

        const mapSettingsDefault: MapSettings = DEFAULT_MAP_SETTINGS as MapSettings;
        const mapSettings: MapSettings = _.assign(mapSettingsDefault, this.props.mapSettings);

        this.context = {
            map,
            props: this.getDefaultOptions(),// this.parentContext.props,
            layersController: null,
            mapState: {
                baseMaps: {},// Check - change to type
                initialLayers: [],
                importedLayers: {
                    csv: [],
                    kml: [],
                    zip: []
                },
                drawableLayers: []
            },
            mapSettings,
            mapUnits: this.decleareMapUnits(),
            selectedLeafletObjects: {},
            onAddControlToFeatures: null,
            zoomToExtend: null, // this.forceZoomToExtend.bind(this),
            fitBounds: null, // this.fitBounds.bind(this)
        };

        const { tileLayers } = this.context.props;
        this.context.mapState.baseMaps = this.initialMapTiles(tileLayers);

        this.context.map.whenReady(() => {
        //     this.createControls(); // Add modules by conditions
        //     this.createEvents();
        //     this.forceZoomToExtend(); // Auto zoom

        //     const {mouseCoordinate} = this.context.props;
        //     Utils.initMouseCoordinates(mouseCoordinate);
        //     Utils.fitLayerControllerPosition();
        //     Utils.updateLayerControllerLayersClass(this.context.mapSettings.mode);
        // });
    }

    public initialMapTiles(tilesLayerList: TileLayerDefinition[]): BaseMap {
        const baseMaps: BaseMap = {};
        // Add other layers
        if (tilesLayerList && tilesLayerList.length) {
            tilesLayerList.forEach((t: TileLayerDefinition) => {
                const tileOptions: L.TileLayerOptions = _.pick(t, ['minZoom', 'maxZoom', 'attributionControl', 'zoomControl']);
                // Create tile Layer from Uri
                const tileUrl: string = t.tilesURI;
                baseMaps[t.name] = L.tileLayer(tileUrl, tileOptions);
            });
        } else {
            baseMaps[DEFAULT_OSM_TILE.name] = L.tileLayer(DEFAULT_OSM_TILE.address);
        }
        return baseMaps;
    }


    public createMap(): L.Map {

        // Map options
        const extendedOptions: any = {}; // this.tileLayersComp.setTileLayers(this.context.mapState.baseMaps, tileProps);

        // Zoom control
        extendedOptions.zoomControl = _.get(this, 'props.zoomControl.enable', true);

        // MAX Bounds
        const northEast: Coordinate = { lat: MAX_NORTH_EAST.lat, lng: MAX_NORTH_EAST.lng };
        const southWest: Coordinate = { lat:MAX_SOUTH_WEST.lat, lng: MAX_SOUTH_WEST.lng };
        const bounds: L.LatLngBounds = new L.LatLngBounds(southWest, northEast);

        Object.assign(extendedOptions, {
            noWrap: true,
            maxBounds: bounds,
            minZoom: _.max([extendedOptions.minZoom, 2]),
            maxBoundsViscosity: 1.0,
            //   doubleClickZoom: false,
            bounceAtZoomLimits: false,
            zoom: 1,
            center: {
                lat: 0.076304,
                lng: 0.013960
            },
        });
        return new L.Map('map', extendedOptions);  // Create Map
    }

    // public fireMapReadyWhenReady(): void {
    //     if (!this.context.map || this.mapReadyReported) { return; }

    //     this.mapReadyReported = true;

    //     this.context.map.whenReady(() => {
    //         setTimeout(() => {
    //             if (this.context.props.onMapReady) {
    //                 this.context.props.onMapReady();
    //             }
    //         }, 0);
    //     });
    // }

    // public importKmlFormatByString(stringifiedKmlFormat: string): void {
    //     // this.context.layersController.onReadKml(stringifiedKmlFormat);
    // }
    
    // public exportBlobByFileTypeCommand(fileType: FILE_TYPES): Blob {
    //     const { selectedLeafletObjects, mapState, map } = this.context;
    //     return Utils.exportBlobFactory(fileType, selectedLeafletObjects, mapState, map);
    // }

    // public forceZoomToExtend(): void {
    //     if (this.context.map && this.context.layersController) {
    //         if (Utils.zoomToExtend(this.context.mapState, this.context.map)) {
    //             this.nextBoundsChangeIsProgrammatic = true;
    //         }
    //     }
    // }

    // public getBounds(): MapBounds {
    //     const bounds: L.LatLngBounds = this.context.map.getBounds();

    //     const boundsState = {
    //         precision: this.context.map.getZoom(),
    //         bounds: {
    //             topLeft: bounds.getNorthEast(),
    //             bottomRight: bounds.getSouthWest()
    //         }
    //     };
    //     return boundsState;
    // }

    // public selectShapeById(shapeDataArr: ShapeData[]): void {
    //     const boundsDetectorLayer: L.FeatureGroup = new L.FeatureGroup([]);

    //     const visibleLayers = Utils.getVisibleLayers(this.context.mapState, this.context.map);

    //     const idListToDetect: string[] = shapeDataArr.map(item => { return item.id; });
    //     visibleLayers.forEach((layer: any, i: number) => {
    //         if (idListToDetect.indexOf(layer.shapeDef.data.id) > -1) {
    //             // Object found in bounds
    //             const manager = ShapeManagerRepository.getManagerByType(_.get(layer, 'shapeDef.shapeObject.type'));
    //             if (manager) {
    //                 layer.shapeDef.data.isSelected = true;
    //                 manager.updateIsSelectedView(layer);
    //                 Utils.updateBubble(layer);
    //                 boundsDetectorLayer.addLayer(layer);
    //             }
    //         }
    //     });

    //     if (boundsDetectorLayer.getLayers().length) {
    //         // Zoom to extend on new data
    //         Utils.zoomToExtendOnLayer(boundsDetectorLayer, this.context.map);
    //     } else {
    //         console.log('Currently there is not any shapes on any layer');
    //     }
    //     const selectedLayersById: any = boundsDetectorLayer.getLayers();
    //     const selectedShapesDefinitionByIdList: ShapeDefinition[] = <ShapeDefinition[]>selectedLayersById
    //         .map((layer: L.Layer | L.FeatureGroup) => layer.shapeDef);
    //     // Execute callback
    //     this.context.props.onSelectionDone(selectedShapesDefinitionByIdList);
    // }

    // public getSelectedShapes(): ShapeDefinition[] {
    //     const selectedObjects: L.Layer[] = Utils.getSelectedObjects(this.context.selectedLeafletObjects);
    //     return <ShapeDefinition[]>selectedObjects.map((item) => { return item.shapeDef; });
    // }

    /**
     * Map Events:
     * ----------
     * layerremove / layeradd
     * baselayerchange
     * overlayadd / overlayremove
     * boxzoomstart / boxzoomend
     * movestart / moveend - (check those)
     */
    // private createEvents() {
    //     const hasOnBoundsChanged: boolean = _.hasIn(this, 'context.props.onBoundsChanged');

    //     this.context.map.on('click', () => {// Move to map events
    //         Utils.closeAllCustomDropDownMenus();
    //     });

    //     // Selecting area
    //     this.context.map.on('boxzoomend', this.areaSelection);

    //     // Zoom event
    //     if (hasOnBoundsChanged) {
    //         this.context.map.on('moveend', (e: any) => {
    //             this.context.props.onBoundsChanged(this.getBounds(), this.nextBoundsChangeIsProgrammatic);
    //             this.nextBoundsChangeIsProgrammatic = false;
    //         });
    //     }

    //     this.context.map.on('moveend', (e: any) => {
    //         // Colored selected objects (for de-cluster objects)
    //         const visibleLayers = Utils.getSelectedObjects(this.context.selectedLeafletObjects);

	// 		// TBD check e for inner shapes instead of iterate all visibleLayers
    //         visibleLayers.forEach((layerObj: any, i: number) => {
    //             const manager = ShapeManagerRepository.getManagerByType(_.get(layerObj, 'shapeDef.shapeObject.type'));
    //             if (manager) {
    //                 manager.updateIsSelectedView(layerObj);
    //             }
    //         });
    //     });

    //     // Leaflet mouse wheel zoom only after click on map
    //     const wheelZoomOnlyAfterClick: boolean = _.get(this, 'context.props.mapSettings.wheelZoomOnlyAfterClick');
    //     if (wheelZoomOnlyAfterClick) {
    //         this.context.map.scrollWheelZoom.disable();
    //         this.context.map.on('click', () => { this.context.map.scrollWheelZoom.enable(); });
    //         this.context.map.on('mouseout', () => { this.context.map.scrollWheelZoom.disable(); });
    //     }

    //     // Set map overlays events right after map is ready
    //     // this.context.map.on("overlayadd", ()=>{});
    //     // this.context.map.on("overlayremove", ()=>{});
    // }

    // private createControls() {
    //     this.toolbarComp = new ToolbarComp(this.context);
    // }

    // private fitWorld(options?: FitBoundsOptions): void {
    //     this.nextBoundsChangeIsProgrammatic = true;
    //     this.context.map.fitWorld(options);
    // }
    // private fitBounds(bounds: L.LatLngBounds, options?: FitBoundsOptions): void {
    //     this.nextBoundsChangeIsProgrammatic = true;
    //     this.context.map.flyToBounds(bounds, options);
    // }

    private getDefaultOptions(): GisViewerProps {
        const defaultSettings: MapSettings = {
            metric: true
        };
        const propsCloned = _.defaults({}, this.props, {
            mapSettings: defaultSettings
        });
        return propsCloned;
    }

    private decleareMapUnits(): Units {
        const isMetric: boolean = _.get(this, 'context.props.mapSettings.metric');
        return isMetric ? Units.METRIC : Units.IMPERIAL;
    }

    // private areaSelection(event: any): void {
    //     const shapeDefSelectedList: ShapeDefinition[] = [];
    //     const visibleLayers = Utils.getVisibleLayers(this.context.mapState, this.context.map);

    //     visibleLayers.forEach((layer: any, i: number) => {
    //         const manager = ShapeManagerRepository.getManagerByType(_.get(layer, 'shapeDef.shapeObject.type'));
    //         if (manager) {

    //             let latLng: Coordinate | Coordinate[] = layer._latlngs ? layer._latlngs : layer._latlng;

    //             if (latLng && event.boxZoomBounds.contains(latLng)) {
    //                 // Object found in bounds
    //                 manager.toggleSelectShape(this.context, layer);
    //                 manager.updateIsSelectedView(layer);
    //                 Utils.updateBubble(layer);
    //                 shapeDefSelectedList.push(layer.shapeDef);
    //             }
    //         }
    //     });
    //     // Execute onGetSelected callback
    //     this.context.props.onSelectionDone(shapeDefSelectedList);
    // }
}

export enum Units {
    METRIC,
    IMPERIAL
};