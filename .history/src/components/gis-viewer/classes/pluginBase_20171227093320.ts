import { GisViewerProps, MapSettings } from "../../../models/apiModels";
// import { LayersControllerComp } from "./features/LayersControllerComp/LayersControllerComp";
import { Units } from "./MapContainer/MapContainer";
import { FitBoundsOptions } from "leaflet";
import { ShapeLayerContainer } from "../../../models/shapeLayerContainer";
import { FILE_TYPES } from './statics';

export type GisPluginContext = {
    map: L.Map;
    props: GisViewerProps;
    layersController: any;
    mapState: MapState;
    mapSettings: MapSettings;
    mapUnits: Units;
    selectedLeafletObjects: { [key: string]: L.Layer };
    onAddControlToFeatures: (key: string, control: any) => void;
    zoomToExtend: () => void;
    fitBounds: (bounds: L.LatLngBounds, options?: FitBoundsOptions) => void;
};

export abstract class GisPluginBase {
    abstract init(context: GisPluginContext): void;
}

export type MapState = {
    baseMaps: BaseMap; // Check - change to type
    initialLayers: ShapeLayerContainer[];
    importedLayers: {
        [p in FILE_TYPES]: ShapeLayerContainer[];
    };
    drawableLayers: L.FeatureGroup[];
};

export type BaseMap = { [key: string]: L.TileLayer };
export type SelectionMode = 'selectLayer' | 'unSelectLayer';