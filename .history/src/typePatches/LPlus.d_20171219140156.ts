import * as L from 'leaflet';

declare namespace LPlus {

    namespace GeometryUtil {
        function geodesicArea(latlngs: Coordinate[]): number;
    }

    namespace Control {
        class Search {
            constructor(options: any);
        }

        class mouseCoordinate {
            constructor(options: any);
        }

        class StyledLayerControl {
            constructor(baseLayers: any[], overlays: any[],map:any,  options?: any);
        }

        class MiniMap {
            constructor(layer: any, options: any);
        }

        class Draw {
            constructor(options: any);
        }

        class PolylineMeasure {
            constructor(options: any);
        }
    }

    class MapOptions implements L.MapOptions {

    }
    class Map extends L.Map {
        _layers: any;
        _targets: any;
        zoomControl: any;
    }
    function map()

    class LatLngBounds extends L.LatLngBounds {
        _northEast: Coordinate;
        _southWest: Coordinate;
    }

    class GeoJSON extends L.GeoJSON {
        features?: LPlus.GeoJSON[];
        properties: {
            shapeWkt: string;
            shapeDataObj: string;
            shapeOptionsObj: string;
            areaSize: number;
        };
    }

    class FeatureGroup extends L.FeatureGroup {
        _layers: any;
        _latlng?: any;
        _latlngs?: any[];
        shapeDef?: ShapeDef_Dev;
        layerName?: string;
    }

    class MarkerClusterGroup extends L.FeatureGroup {
        options: {
            singleMarkerMode?: boolean;
            iconCreateFunction?: Function;
        };
        getAllChildMarkers: Function;
        getChildCount: Function;
        layerName: string;
    }
    function markerClusterGroup(options: any): MarkerClusterGroup;

    class LayerGroup extends L.LayerGroup {
        getBounds: () => LatLngBounds;
    }
    function layerGroup(): LayerGroup;



    class HeatLayer extends L.Layer {
        constructor(latlngs: L.LatLngExpression[], options?: any);
        _latlngs?: any[];
    }

    namespace Draw {
        class Event {
            public static CREATED: string;
            public static EDITED: string;
            public static DELETED: string;
        }
    }

    class Marker extends L.Marker {
        addClass: Function;
        removeClass: Function;
        isSelected?: boolean;
        count?: number;
        _icon?: any;
    }
    class Circle extends L.Circle {
        initialize: any;
        isSelected?: boolean;
        count?: number;
        _path?: any;
        _mRadius?: number;
    }
    class Polygon extends L.Polygon {
        initialize: any;
        isSelected?: boolean;
        count?: number;
        _path?: any;
        _layers?: any;
        _rings?: any[];
    }
    class Polyline extends L.Polyline {
        initialize: any
        isSelected?: boolean;
        count?: number;
        _path?: any;
    }
    class Label extends L.Layer {
        isSelected?: boolean;
        count?: number;
    }
    class Layer extends L.Layer {
        shapeDef?: ShapeDef_Dev;
        layerName?: string;
        _latlng?: any;
        _latlngs?: any[];
        _mRadius?: number;
        value?: string;
        setStyle?: Function;
        feature?: any;
        toGeoJSON?: Function;
    }
}


type Coordinate = {
    lat: number
    lng: number
}
type ShapeDef_Dev = {
    data?: any
    shapeObject?: ShapeObject_Dev;
}
type ShapeObject_Dev = {
    type?: number
}