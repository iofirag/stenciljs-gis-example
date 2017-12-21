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
        constructor(options: any);
        options: {
            singleMarkerMode?: boolean;
            iconCreateFunction?: Function;
        };
        getAllChildMarkers: Function;
        getChildCount: Function;
        layerName: string;
    }
    function markerClusterGroup(options: any): MarkerClusterGroup;

    interface LayerGroup {
        getBounds: () => LatLngBounds;
    }
    function layerGroup(): LayerGroup;
}