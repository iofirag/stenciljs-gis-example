import "leaflet";

declare module "leaflet" {
    interface Map {
        _layers: any;
        _targets: any;
        zoomControl: any;
    }
    export function doGoodStuff(stuff: string): void;


    namespace Draw {
        class Event {
            public static CREATED: string;
            public static EDITED: string;
            public static DELETED: string;
        }
    }
}