// import  * as ApiModels from '../../../../api-generated/wrapper/api-src';
import { LPlus } from '../../../declarations/LPlus';
import { ShapeLayerDefinition } from '../../../models/apiModels';

// info on shape layer for internal use of Gis conponent
// contains ApiModels.ShapeLayerDefinition, which was received from props from external application
export type ShapeLayerContainer = {
    layerDefinition: ShapeLayerDefinition;
    leafletHeatLayer: LPlus.HeatLayer;
    leafletClusterLayer: LPlus.MarkerClusterGroup;
    isDisplay: boolean;
    // type: LayerType; // TODO
};