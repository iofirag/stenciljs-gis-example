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


    class MapOptions implements L.MapOptions {

    }
}