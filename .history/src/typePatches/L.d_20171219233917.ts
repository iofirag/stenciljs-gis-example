import "leaflet";

declare module "leaflet" {
    interface Map {
        _layers: any;
        _targets: any;
        zoomControl: any;
    }
    export function doGoodStuff(stuff: string): void;


    name
}