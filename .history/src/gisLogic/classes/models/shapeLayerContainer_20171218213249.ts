import  * as ApiModels from '../../../../api-generated/wrapper/api-src';
import { LPlus } from '../../../declarations/LPlus';

// info on shape layer for internal use of Gis conponent
// contains ApiModels.ShapeLayerDefinition, which was received from props from external application
export type ShapeLayerContainer = {
    layerDefinition: ApiModels.ShapeLayerDefinition;
    leafletHeatLayer: LPlus.HeatLayer;
    leafletClusterLayer: LPlus.MarkerClusterGroup;
    isDisplay: boolean;
    // type: LayerType; // TODO
};