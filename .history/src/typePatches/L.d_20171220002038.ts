import "leaflet";

declare module "leaflet" {
    // interface Map {
    //     _layers: any;
    //     _targets: any;
    //     zoomControl: any;
    // }
    // export function doGoodStuff(stuff: string): void;

    namespace Control {
        class Search {
            constructor(options: any);
        }

        class mouseCoordinate {
            constructor(options: any);
        }

        class StyledLayerControl {
            constructor(baseLayers: any[], overlays: any[], map: any, options?: any);
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


    class MapOptions {}

    interface Map {
        _layers: any;
        _targets: any;
        zoomControl: any;
    }
    interface LatLngBounds {
        _northEast: LatLng;
        _southWest: LatLng;
    }

    interface GeoJSON {
        features?: GeoJSON[];
        properties: any;
    }
    interface FeatureGroup {
        _layers: any;
        _latlng?: any;
        _latlngs?: any[];
        shapeDef?: ShapeDef_Dev;
        layerName?: string;
    }

    class MarkerClusterGroup extends FeatureGroup {
        // constructor(options: any);
        options: {
            singleMarkerMode?: boolean;
            iconCreateFunction?: Function;
        };
        getAllChildMarkers: Function;
        getChildCount: Function;
        layerName: string;
    }
    function markerClusterGroup(options: any): MarkerClusterGroup;// change with CTor

    interface LayerGroup {
        // constructor()
        getBounds: () => LatLngBounds;
    }
    function layerGroup(): LayerGroup;// change with CTor

    class HeatLayer extends Layer {
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

    interface Marker {
        addClass: Function;
        removeClass: Function;
        isSelected?: boolean;
        count?: number;
        _icon?: any;
    }
    interface Circle extends L.Circle {
        initialize: any;
        isSelected?: boolean;
        count?: number;
        _path?: any;
        _mRadius?: number;
    }
}