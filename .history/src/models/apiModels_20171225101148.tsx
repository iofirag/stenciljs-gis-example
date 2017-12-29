/* GisViewerProps and it children goes here */

export interface GisViewerProps {
    tileLayers: TileLayerDefinition[];
    mapSettings?: MapSettings;
    defaultMarkerIcon?: DefaultMarkerIcon;
    shapeLayers?: ShapeLayerDefinition[];
    layersController?: LayersControllerOptions;
    searchBox?: SearchBoxOptions;
    unitsChanger?: UnitsChangerOptions;
    miniMap?: MiniMapOptions;
    drawBar?: DrawBarOptions;
    mouseCoordinate?: MouseCoordinateOptions;
    polylineMeasure?: PolylineMeasureOptions;
    zoomControl?: ZoomControl;
    scaleControl?: ScaleControlOptions;
    zoomToExtend?: ZoomToExtendOptions;
    isImportExport?: boolean;
    isToolbarSettings?: boolean;
    gisSetState?: Function;
    shapeForPopup?: any;
    zoomToExtendOnNewData?: boolean;
    // Callbacks
    onEndImportDraw?: (allImportedLayers: WktShape[]) => void;
    onDrawCreated?: (shapeWkt: WktShape) => void;
    onDrawEdited?: (shapeWktList: WktShape[]) => void;
    onDrawDeleted?: (shapeWktList: WktShape[]) => void;
    onBoundsChanged?: (mapBounds: MapBounds, programmatic: boolean) => void;
    onSelectionDone?: (shapeDefList: ShapeDefinition[]) => void;
    onMapReady?: () => void;
    onSaveKmlBlob?: (kml: Blob) => void;
    onSaveCsvBlob?: (csv: Blob) => void;
    onSaveShpBlob?: (shp: Blob) => void;
};

export type MapSettings = {
    metric?: boolean;
    mode?: ClusterHeat;
    clusterOptions?: ClusterOptions;
    wheelZoomOnlyAfterClick?: boolean;
};
export type ClusterHeat = 'cluster' | 'heat';

export type LayersControllerOptions = {
    enable?: boolean;
};
export type ClusterOptions = {
    singleMarkerMode?: boolean;
    disableClusteringAtZoom?: number;
    chunkedLoading?: boolean;
    chunkProgress?: boolean;
};

export type ZoomToExtendOptions = {
    enable?: boolean;
    position?: string;
};

export type ScaleControlOptions = {
    enable?: boolean;
    maxWidth?: number;
    position?: string;
};

export type ZoomControl = {
    enable?: boolean;
};

export type MapOptions = {
    center: Coordinate,
    enable?: boolean;
    zoomControl?: boolean,
    dragging?: boolean,
};

export type TileLayerDefinition = {
    name: string,
    tilesURI: string, // 'http://10.164.39.38/pandonia/{z}/{x}/{y}.png',
    maxZoom?: number,
    minZoom?: number,
    attributionControl?: boolean
};

export type DefaultMarkerIcon = {
    iconRetinaUrl?: string,
    iconUrl: string,
    shadowUrl?: string
};

export type MouseCoordinateOptions = {
    enable?: boolean,
    gps?: boolean,
    gpsLong?: boolean,
    utm?: boolean,
    utmref?: boolean
};

export type SearchBoxOptions = {
    enable?: boolean;
    searchOnLayer?: boolean;
    queryServerUrl?: string;
};

export type WktShape = {
    wkt: string;
    areaSize?: number;
    id?: number;
};

export type Coordinate = {
    lat: number;
    lng: number;
};

export type IconOptions = {
    iconUrl: string;
    iconWidth: number,
    iconHeight: number
};

export type MiniMapOptions = {
    enable?: boolean;
    toggleDisplay?: boolean;
    position?: string
};

export type PolylineMeasureOptions = {
    enable?: boolean;
    showMeasurementsClearControl?: boolean,
    clearMeasurementsOnStop?: boolean
};

export type UnitsChangerOptions = {
    enable?: boolean;
    position?: string,
};

export type DrawBarOptions = {
    enable?: boolean;
    draw?: DrawBarOptionsDraw,
    edit?: DrawBarOptionsEdit
};

export type DrawBarOptionsDraw = {
    polyline?: boolean,  // Turns off this drawing tool
    polygon?: boolean,   // Turns off this drawing tool
    circle?: boolean,    // Turns off this drawing tool
    rectangle?: boolean, // Turns off this drawing tool
    marker?: boolean,     // Turns off this drawing tool  
    textualMarker?: boolean
};

export type DrawBarOptionsEdit = {
    remove?: boolean
};

export type MapBounds = {
    precision: number,
    bounds: Bounds
};

export type Bounds = {
    topLeft: Coordinate,
    bottomRight: Coordinate
};

export type ShapeLayerDefinition = {
    layerName: string,
    shapes: ShapeDefinition[],
    isDisplay?: boolean
};

// =========== SHAPES =========
export enum ShapeType {
    CIRCLE,
    POLYGON,
    MARKER,
    POLYLINE,
    LABEL,
    MULTIPOLYGON
}

export enum DropDownItemType {
    REGULAR, RADIO_BUTTON, CHECK_BOX
}

export type ShapeDefinition = {
    data?: ShapeData;
    shapeWkt?: string;
    shapeObject?: ShapeObject;
    options?: ShapeObjectOptions;
};

export type ShapeData = {
    name?: string,
    description?: string,
    count?: number,
    dateTime?: number,
    tag?: any,
    isSelected?: boolean,
    id?: string
};

export type ShapeEntities = CircleShape | PolygonShape | MarkerShape | PolylineShape | LabelShape | MultiPolygonShape; // PointShape

export type ShapeObject = {
    type: ShapeType,
    shape: ShapeEntities
};

export type ShapeObjectOptions = CircleShapeOptions | PolygonShapeOptions | MarkerShapeOptions | PolylineShapeOptions | LabelShapeOptions | MultiPolygonShapeOptions; // PointShapeOptions |

// =========== CIRCLE / (POINT) =========

export type CircleShape = {
    coordinate: Coordinate,
    radius: number
};

export type CircleShapeOptions = {
    // radius: number,
    color?: string,
    fillColor?: string,
    fillOpacity?: number,
};

// =========== POLYGON =========

export type PolygonShape = {
    coordinates: Coordinate[],
    // map: Function
};

export type PolygonShapeOptions = {
    color?: string,
    fillColor?: string,
    fillOpacity?: number,
};

// =========== MULTI-POLYGON =========

export type MultiPolygonShape = {
    polygons: PolygonShape[],
};

export type MultiPolygonShapeOptions = {
    color?: string,
    fillColor?: string,
    fillOpacity?: number,
};

// =========== MARKER =========
export type MarkerShape = {
    coordinate: Coordinate,
};

export type MarkerShapeOptions = {
    customIcon?: IconOptions,
    icon?: any;
    draggable?: boolean,
};

// =========== POLILINE =========
export type PolylineShape = {
    coordinates: Coordinate[],
};
export type PolylineShapeOptions = {
    color?: string,
};

// =========== LABEL =========
export type LabelShape = {
    coordinate: Coordinate,
    text: string
};

export type LabelShapeOptions = {
    icon?: any
};