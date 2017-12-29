import { ShapeLayerDefinition } from "./apiModels";
import L from 'leaflet';
// info on shape layer for internal use of Gis conponent
// contains ApiModels.ShapeLayerDefinition, which was received from props from external application
export type ShapeLayerContainer = {
    layerDefinition: ShapeLayerDefinition;
    leafletHeatLayer: L.HeatLayer; //O.A
    leafletClusterLayer: L.MarkerClusterGroup; // O.A */
    isDisplay: boolean;
    // type: LayerType; // TODO
};