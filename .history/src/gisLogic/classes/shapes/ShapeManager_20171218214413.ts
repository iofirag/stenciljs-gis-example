import './ShapeManager.css';
import { ShapeType, ShapeObject, ShapeDefinition, Coordinate, ShapeObjectOptions } from "../../../models/apiModels";
import { GisPluginContext } from '../pluginBase';
import Utils from '../utils';
import * as _ from 'lodash';
import * as L from 'leaflet';
import { LPlus } from '../../../declarations/LPlus';

export interface ShapeManagerInterface {
	getName(): string;
	getType(): ShapeType;

	// wkt to object conversions
	isWktOfType(wkt: string): boolean;
	shapeObjectToWkt(shapeObject: ShapeObject, shapeObjectOptions?: ShapeObjectOptions): string;
	updateIsSelectedView(leafletObject: any): void;
	shapeWktToObject(shapeWkt: string): ShapeObject;

	toggleSelectShape(context: GisPluginContext, leafletObject: any): void;

	// data layer
	addShapeToLayer(shapeDef: ShapeDefinition, container: L.LayerGroup, eventHandlers?: any): LPlus.Layer | LPlus.FeatureGroup;

	// draw layer
	getShapeObjectFromDrawingLayer(layer: LPlus.Layer): ShapeObject;

	getHeatLayerPoints(shapeObject: ShapeObject): Coordinate;
	getCoordinateAsString(shapeObject: ShapeObject): string;
	getCoordinateList(shapeObject: ShapeObject): Coordinate[];
	getMiddleCoordinate(shapeObject: ShapeObject): Coordinate;

	getAreaSize(shapeObject: ShapeObject): number;
	isLayerOfThisShapeType(leafletLayer: LPlus.Layer | LPlus.FeatureGroup): boolean;
}

export type ShapeEventHandlers = {
	click?: (e: any) => void;
	dblClick?: (e: any) => void;
};

// info on shape for internal use of Gis conponent
// contains ShapeDefinition, which was received from props from external application

export abstract class ShapeManagerBase implements ShapeManagerInterface {

	abstract getType(): ShapeType;

	// wkt to object conversions
	abstract isWktOfType(wkt: string): boolean;
	abstract shapeObjectToWkt(shapeObject: ShapeObject, shapeObjectOptions?: ShapeObjectOptions): string;
	abstract shapeWktToObject(shapeWkt: string): ShapeObject;

	// data layer
	abstract addShapeToLayer(shapeDef: ShapeDefinition, container: L.LayerGroup, eventHandlers?: any): LPlus.Layer | LPlus.FeatureGroup;
	abstract getCoordinateAsString(shapeObject: ShapeObject): string;
	abstract getShapeObjectFromDrawingLayer(layer: LPlus.Layer): ShapeObject;
	abstract getAreaSize(shapeObject: ShapeObject): number;
	abstract isLayerOfThisShapeType(leafletLayer: any): boolean;

	getName(): string {
		return ShapeType[this.getType()];
	}

	getHeatLayerPoints(shapeObject: ShapeObject): Coordinate {
		return null;
	}

	toggleSelectShape(context: GisPluginContext, leafletObject: LPlus.FeatureGroup | LPlus.Layer): void {
		// Change isSelected state
		leafletObject.shapeDef.data.isSelected = !leafletObject.shapeDef.data.isSelected;
		// Handle Selected-leaflet-shpae-list
		Utils.selectedLeafletObjectHandler(context, leafletObject);
	}

	updateIsSelectedView(leafletObject: LPlus.Layer): void {
		const isSelected = _.get(leafletObject, 'shapeDef.data.isSelected') ? 'orange' : '#38f';
		leafletObject.setStyle({ color: isSelected });
	}

	getCoordinateList(shapeObject: ShapeObject): Coordinate[] {
		return [];
	};

	getMiddleCoordinate(shapeObject: ShapeObject): any {
		// TBD get middle coordinate for selecting with shift and mouse - zoomboxend
		return null;
	};
}