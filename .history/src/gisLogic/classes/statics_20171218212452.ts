import { SelectionMode } from "./pluginBase";
import { Coordinate } from "../../models/apiModels";

export const ImportFileFormats: string = '.kml,.csv,.zip';

export const FeaturesNames: { [key:string]: string } = {
    LAYERS_CONTROLLER_COMP : 'layersControllerComp',
    DRAWBAR_COMP           : 'drawBarComp',
    MEASURE_COMP           : 'measureComp',
    SEARCH_BOX_COMP        : 'searchBoxComp',
    ZOOM_TO_EXTEND_COMP    : 'zoomToExtendComp',
    MOUSE_POSITION_COMP    : 'mousePositionComp',
    SCALE_CONTROL_COMP     : 'scaleControlComp',
    MINI_MAP_COMP          : 'miniMapComp',
    CUSTOM_CONTROL_COMP    : 'customControlComp',
    DROP_DOWN_COMP         : 'dropDownComp',
    CUSTOM_DROP_DOWN_COMP  : 'customDropDownComp',
};

export const CoordinateType: { [key: string]: string } = {
    MGRS: 'utmref', 
    UTM: 'utm', 
    DECIMAL: 'gps',
};

export const LayersTypeLabel: { [key: string]: string } = {
    HEAT: 'heat',
    CLUSTER: 'cluster',
};

export const CustomControlName: { [key:string]: string } = {
    UNIT_CHANGER: 'unitChanger',
    EXPORT_TO_KML: 'exportToKML',
    SETTINGS: 'settings',
};

export const ToolbarPlugins = {
    [FeaturesNames.LAYERS_CONTROLLER_COMP]: true,
    [FeaturesNames.DRAWBAR_COMP]: true,
    [FeaturesNames.MEASURE_COMP]: true,
    [FeaturesNames.SEARCH_BOX_COMP]: true,
    [FeaturesNames.ZOOM_TO_EXTEND_COMP]: true,
    [FeaturesNames.DROP_DOWN_COMP]: true,
    [FeaturesNames.CUSTOM_DROP_DOWN_COMP+'_'+CustomControlName.SETTINGS]: true,
};
export const MapPlugins = {
    [FeaturesNames.SCALE_CONTROL_COMP]: true,
    [FeaturesNames.MINI_MAP_COMP]: true,
    [FeaturesNames.MOUSE_POSITION_COMP]: true,
    [FeaturesNames.CUSTOM_CONTROL_COMP+"_"+CustomControlName.UNIT_CHANGER]: true,
    [FeaturesNames.CUSTOM_CONTROL_COMP+"_"+CustomControlName.EXPORT_TO_KML]: true,
};

export enum ShowLayerType {
    HEAT,
    CLUSTER
}
export const MapStateFields: {[key:string]: string} = {
    BASE_MAPS: 'baseMaps',
    INITIAL_LAYERS: 'initialLayers',
    IMPORTED_LAYERS: 'importedLayers',
    DRAWABLE_LAYERS: 'drawableLayers'
};
export const BUBBLE_TYPE = {
    POPUP: 'Popup',
    TOOLTIP: 'Tooltip'
};
export const MIN_OPACITY: number = 0.1;

export const MAX_NORTH_EAST: Coordinate = {
    lat: 85,
    lng: -180
};
export const MAX_SOUTH_WEST: Coordinate = {
    lat: -85,
    lng: 180
};
export const ZOOM_TO_EXTEND_PADDING: L.PointExpression = [20, 20];

export enum FILE_TYPES { 
    kml= 'kml', 
    csv= 'csv', 
    zip= 'zip' // (shp file) 
}

export const FILE_TYPES_ARRAY: FILE_TYPES[] = <FILE_TYPES[]>Object.values(FILE_TYPES);

export const LayerNames: { [key: string]: string } = {
    BASE_MAPS: 'Base Maps',
    DRAWABLE_LAYER: 'Drawable Layer',
    INITIAL_LAYERS: 'Initial Layers',
    [FILE_TYPES.kml.toUpperCase() + '_Layers']: FILE_TYPES.kml.toUpperCase() + ' Layers',
    [FILE_TYPES.csv.toUpperCase() + '_Layers']: FILE_TYPES.csv.toUpperCase() + ' Layers',
    [FILE_TYPES.zip.toUpperCase() + '_Layers']: FILE_TYPES.zip.toUpperCase() + ' Layers',
};

export const DEFAULT_OSM_TILE = {
    name: 'Online map',
    address: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};
export const DEFAULT_MAP_SETTINGS = {
    metric: true, 
    mode: 'cluster'
};
export const SELECT_LAYER: SelectionMode = 'selectLayer';
export const UNSELECT_LAYER: SelectionMode = 'unSelectLayer';

export const EXPORT_SHAPE_FIELDS: { [key: string]: string } = {
    shapeWkt: 'shapeWkt',
    shapeDataObj: 'shapeDataObj',
    shapeOptionsObj: 'shapeOptionsObj',
    areaSize: 'areaSize'
};