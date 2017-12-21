import "leaflet";
import { FeatureGroup } from "leaflet";
import { LayerGroup } from "leaflet";

declare module "leaflet" {
    // interface Map {
    //     _layers: any;
    //     _targets: any;
    //     zoomControl: any;
    // }
    // export function doGoodStuff(stuff: string): void;

    namespace GeometryUtil {
        function geodesicArea(latlngs: L.LatLngLiteral[]): number;
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

        class Draw {
            constructor(options: any);
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
    }

    class HeatLayer extends LayerGroup {
        constructor(latlngs: L.LatLngLiteral[], options?: any);
    }


    namespace Draw {
        class Event {
            public static CREATED: string;
            public static EDITED: string;
            public static DELETED: string;
        }
    }

    interface Layer {
        shapeDef?: ShapeDef_Dev;
        layerName?: string;
        value?: string;
        feature?: any;
        setStyle?: Function;
        toGeoJSON?: Function;
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
        _rings?: any[];
    }
    interface Polyline {
        initialize: any
        _path?: any;
    }
    interface Label extends Layer {
        getLatLng(): LatLngLiteral;
    }
}

type ShapeDef_Dev = {
    data?: any
    shapeObject?: ShapeObject_Dev;
}
type ShapeObject_Dev = {
    type?: number
}