import LayersControllerComp from "./features/LayersControllerComp/LayersControllerComp";
import { Units } from "./MapContainer/MapContainer";
import { FitBoundsOptions } from "leaflet";
import { ShapeLayerContainer } from './models/shapeLayerContainer';
import { FILE_TYPES } from './statics';
import { LPlus } from "../../declarations/LPlus";
import { GisViewerProps, MapSettings } from "../../models/apiModels";
import * as L from 'leaflet';

export type GisPluginContext = {
    map: LPlus.Map;
    props: GisViewerProps;
    layersController: LayersControllerComp,
    mapState: MapState;
    mapSettings: MapSettings;
    mapUnits: Units,
    selectedLeafletObjects: { [key: string]: LPlus.Layer },
    onAddControlToFeatures: (key: string, control: any) => void,
    zoomToExtend: () => void;
    fitBounds: (bounds: L.LatLngBoundsExpression, options?: FitBoundsOptions) => void;
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
    drawableLayers: LPlus.FeatureGroup[];
};

export type BaseMap = { [key: string]: L.TileLayer };
export type SelectionMode = 'selectLayer' | 'unSelectLayer';