export declare type GisViewerProps = {
    tileLayers?: TileLayerDefinition[];
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
    onEndImportDraw?: (allImportedLayers: WktShape[]) => void;
    onDrawCreated?: (shapeWkt: WktShape) => void;
    onDrawEdited?: (shapeWktList: WktShape[]) => void;
    onDrawDeleted?: (shapeWktList: WktShape[]) => void;
    onBoundsChanged?: (mapBounds: MapBounds, programmatic: boolean) => void;
    onSelectionDone?: (shapeDefList: ShapeDefinition[]) => void;
    onMapReady?: () => void;
    onSaveKmlFormat?: (kml: string) => void;
    onSaveShpFormat?: (shp: string) => void;
    onSaveCsvFormat?: (csv: string) => void;
};
export declare type MapSettings = {
    metric?: boolean;
    mode?: ClusterHeat;
    clusterOptions?: ClusterOptions;
    wheelZoomOnlyAfterClick?: boolean;
};
export declare type ClusterHeat = 'cluster' | 'heat';
export declare type LayersControllerOptions = {
    enable?: boolean;
};
export declare type ClusterOptions = {
    singleMarkerMode?: boolean;
    disableClusteringAtZoom?: number;
    chunkedLoading?: boolean;
    chunkProgress?: boolean;
};
export declare type ZoomToExtendOptions = {
    enable?: boolean;
    position?: string;
};
export declare type ScaleControlOptions = {
    enable?: boolean;
    maxWidth?: number;
    position?: string;
};
export declare type ZoomControl = {
    enable?: boolean;
};
export declare type MapOptions = {
    center: Coordinate;
    enable?: boolean;
    zoomControl?: boolean;
    dragging?: boolean;
};
export declare type TileLayerDefinition = {
    name: string;
    tilesURI: string;
    maxZoom?: number;
    minZoom?: number;
    attributionControl?: boolean;
};
export declare type DefaultMarkerIcon = {
    iconRetinaUrl?: string;
    iconUrl: string;
    shadowUrl?: string;
};
export declare type MouseCoordinateOptions = {
    enable?: boolean;
    gps?: boolean;
    gpsLong?: boolean;
    utm?: boolean;
    utmref?: boolean;
};
export declare type SearchBoxOptions = {
    enable?: boolean;
    searchOnLayer?: boolean;
    queryServerUrl?: string;
};
export declare type WktShape = {
    wkt: string;
    areaSize?: number;
    id?: number;
};
export declare type Coordinate = {
    lat: number;
    lng: number;
};
export declare type IconOptions = {
    iconUrl: string;
    iconWidth: number;
    iconHeight: number;
};
export declare type MiniMapOptions = {
    enable?: boolean;
    toggleDisplay?: boolean;
    position?: string;
};
export declare type PolylineMeasureOptions = {
    enable?: boolean;
    showMeasurementsClearControl?: boolean;
    clearMeasurementsOnStop?: boolean;
};
export declare type UnitsChangerOptions = {
    enable?: boolean;
    position?: string;
};
export declare type DrawBarOptions = {
    enable?: boolean;
    draw?: DrawBarOptionsDraw;
    edit?: DrawBarOptionsEdit;
};
export declare type DrawBarOptionsDraw = {
    polyline?: boolean;
    polygon?: boolean;
    circle?: boolean;
    rectangle?: boolean;
    marker?: boolean;
    textualMarker?: boolean;
};
export declare type DrawBarOptionsEdit = {
    remove?: boolean;
};
export declare type MapBounds = {
    precision: number;
    bounds: Bounds;
};
export declare type Bounds = {
    topLeft: Coordinate;
    bottomRight: Coordinate;
};
export declare type ShapeLayerDefinition = {
    layerName: string;
    shapes: ShapeDefinition[];
    isDisplay?: boolean;
};
export declare enum ShapeType {
    CIRCLE = 0,
    POLYGON = 1,
    MARKER = 2,
    POLYLINE = 3,
    LABEL = 4,
    MULTIPOLYGON = 5,
}
export declare enum DropDownItemType {
    REGULAR = 0,
    RADIO_BUTTON = 1,
    CHECK_BOX = 2,
}
export declare type ShapeDefinition = {
    data?: ShapeData;
    shapeWkt?: string;
    shapeObject?: ShapeObject;
    options?: ShapeObjectOptions;
};
export declare type ShapeData = {
    name?: string;
    description?: string;
    count?: number;
    dateTime?: number;
    tag?: any;
    isSelected?: boolean;
    id?: string;
};
export declare type ShapeEntities = CircleShape | PolygonShape | MarkerShape | PolylineShape | LabelShape | MultiPolygonShape;
export declare type ShapeObject = {
    type: ShapeType;
    shape: ShapeEntities;
};
export declare type ShapeObjectOptions = CircleShapeOptions | PolygonShapeOptions | MarkerShapeOptions | PolylineShapeOptions | LabelShapeOptions | MultiPolygonShapeOptions;
export declare type CircleShape = {
    coordinate: Coordinate;
    radius: number;
};
export declare type CircleShapeOptions = {
    color?: string;
    fillColor?: string;
    fillOpacity?: number;
};
export declare type PolygonShape = {
    coordinates: Coordinate[];
};
export declare type PolygonShapeOptions = {
    color?: string;
    fillColor?: string;
    fillOpacity?: number;
};
export declare type MultiPolygonShape = {
    polygons: PolygonShape[];
};
export declare type MultiPolygonShapeOptions = {
    color?: string;
    fillColor?: string;
    fillOpacity?: number;
};
export declare type MarkerShape = {
    coordinate: Coordinate;
};
export declare type MarkerShapeOptions = {
    customIcon?: IconOptions;
    icon?: any;
    draggable?: boolean;
};
export declare type PolylineShape = {
    coordinates: Coordinate[];
};
export declare type PolylineShapeOptions = {
    color?: string;
};
export declare type LabelShape = {
    coordinate: Coordinate;
    text: string;
};
export declare type LabelShapeOptions = {
    icon?: any;
};
