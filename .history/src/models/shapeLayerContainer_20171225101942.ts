import  * as ApiModels from '../../../../api-generated/wrapper/api-src';

// info on shape layer for internal use of Gis conponent
// contains ApiModels.ShapeLayerDefinition, which was received from props from external application
export type ShapeLayerContainer = {
    layerDefinition: ApiModels.ShapeLayerDefinition;
    leafletHeatLayer: any; // L.HeatLayer; O.A
    leafletClusterLayer: any/* L.MarkerClusterGroup; O.A */
    isDisplay: boolean;
    // type: LayerType; // TODO
};