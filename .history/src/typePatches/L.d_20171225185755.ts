import "leaflet";
import { FeatureGroup, LayerGroup, PathOptions, LatLngLiteral } from "leaflet";
import { Coordinate, ShapeDefinition } from '../models/apiModels'
declare module "leaflet" {
    // interface Map {
    //     _layers: any;
    //     _targets: any;Y
    //     zoomControl: any;
    // }
    // export function doGoodStuff(stuff: string): void;

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
            constructor(baseLayers: any[], overlays: any[], map: any, options?: any);
        }

        class MiniMap {
            constructor(layer: any, options: any);
        }

        // class Draw {
        //     
        // }
        interface Draw {
            constructor(options: any);
            interface Event {
                public static CREATED: string;
                public static EDITED: string;
                public static DELETED: string;
            }
        }

        class PolylineMeasure {
            constructor(options: any);
        }
    }


    class MapOptions { }

    interface Map {
        zoomControl: any;
    }

    interface GeoJSON {
        features?: GeoJSON[];
        properties: any;
    }
    interface FeatureGroup {
        shapeDef: ShapeDefinition;
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
    }

    class HeatLayer extends LayerGroup {
        constructor(latlngs: Coordinate[], options?: any);
    }

    interface Layer {
        shapeDef: ShapeDefinition;
        layerName?: string;
        value?: string;
        feature?: any;
        setStyle(style: PathOptions): this;
        toGeoJSON(): any;
    }
    interface Marker {
        addClass: Function;
        removeClass: Function;
        _icon?: any;
    }
    interface Circle {
        initialize: any;
        _path?: any;
        _mRadius?: number;
    }
    interface Polygon {
        initialize: any;
        _path?: any;
        _layers?: any;
        // _rings?: any[];
        // getLatLng: any;
    }
    interface Polyline {
        initialize: any
        _path?: any;
    }
    interface Label extends Layer {
        getLatLng(): Coordinate;
    }
}

// type MyCoord = {
//     lat: number,
//     lng: number
// }
// type ShapeDef_Dev = {
//     data?: any
//     shapeObject?: ShapeObject_Dev;
// }
// type ShapeObject_Dev = {
//     type?: number
// }