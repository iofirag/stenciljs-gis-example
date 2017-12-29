import { ShapeType, ShapeDefinition } from '../../../../api-generated/wrapper/api-src';
import { CircleShapeManager } from "./circle/circleShapeManager";
import { PolygonShapeManager } from "./polygon/polygonShapeManager";
import { MarkerShapeManager } from "./Marker/markerShapeManager";
import { LabelShapeManager } from "./label/labelShapeManager";
import { PolylineShapeManager } from "./polyline/polylineShapeManager";
import { MultiPolygonShapeManager } from "./multi-polygon/multipolygonShapeManager";
import { ShapeManagerInterface } from "./ShapeManager";
import * as _ from 'lodash';

const DRAWABLE_MARKER: string = 'marker';
const DRAWABLE_CIRCLE: string = 'circle';
const DRAWABLE_POLYGON: string = 'polygon';
const DRAWABLE_POLYLINE: string = 'polyline';
const DRAWABLE_RECTANGLE: string = 'rectangle';


export class ShapeManagerRepository {
	private static managersByType: {
		[s: string]: ShapeManagerInterface;
	};

	public static initialize(): void {
		this.managersByType = {};

		ShapeManagerRepository.managersByType[ShapeType.CIRCLE]       	= new CircleShapeManager();	// wkt not supported
		ShapeManagerRepository.managersByType[ShapeType.MARKER]      	= new MarkerShapeManager();
		ShapeManagerRepository.managersByType[ShapeType.POLYGON]    	= new PolygonShapeManager();
		ShapeManagerRepository.managersByType[ShapeType.POLYLINE] 	    = new PolylineShapeManager();
		ShapeManagerRepository.managersByType[ShapeType.LABEL] 			= new LabelShapeManager(); // wkt not supported
		ShapeManagerRepository.managersByType[ShapeType.MULTIPOLYGON]	= new MultiPolygonShapeManager();// wkt not supported?
	}

	public static getManagerByType(shapeType: ShapeType): ShapeManagerInterface {
		return ShapeManagerRepository.managersByType[shapeType];
	}
	public static getManagerByLeafletLayer(leafletLayer: any): ShapeManagerInterface | null {
		for (const managerEnum of Object.keys(this.managersByType)) {
			const manager = this.managersByType[managerEnum];
			if (manager.isLayerOfThisShapeType(leafletLayer)) {
				return manager;
			}
		}
		console.error(`ShapeManagerRepository: Unable to detect manager of layer: ${leafletLayer}`);
		return null;
	}

	public static getManagerByShapeDefLayer(layer: L.Layer): ShapeManagerInterface | null {
		const shapeType: ShapeType = _.get(layer, 'shapeDef.shapeObject.type');
		if (shapeType !== null && shapeType !== undefined) {
			return ShapeManagerRepository.getManagerByType(shapeType);
		}
		console.error('ShapeManagerRepository: Unable to detect layer');
		return null;
	}

	public static getManagerByWkt(wkt: string): ShapeManagerInterface | null {
		for (const managerEnum of Object.keys(this.managersByType)) {
			const manager = this.managersByType[managerEnum];
			if (manager.isWktOfType(wkt)) {
				return manager;
			}
		}
		console.error(`ShapeManagerRepository: Unable to detect WKT ${wkt}`);
		return null;
	}

	public static getManagerByShapeDefinition(shapeDef: ShapeDefinition): ShapeManagerInterface | null {
		const shapeType: ShapeType = _.get(shapeDef, 'shapeObject.type');
		if (shapeType !== null && shapeType !== undefined) {
			return ShapeManagerRepository.getManagerByType(shapeType);
		}
		if (shapeDef.shapeWkt) {
			return ShapeManagerRepository.getManagerByWkt(shapeDef.shapeWkt);
		}
		console.error('ShapeManagerRepository: Either shapeObject or shapeWkt must not be empty');
		return null;
	}

	public static getTypeNumberByDrawableTypeName(shapeTypeName: string): ShapeType {
		switch (shapeTypeName.toLowerCase()) {
			case DRAWABLE_MARKER:
				return ShapeType.MARKER;
			case DRAWABLE_CIRCLE:
				return ShapeType.CIRCLE;
			case DRAWABLE_POLYGON:
			case DRAWABLE_RECTANGLE:
				return ShapeType.POLYGON;
			case DRAWABLE_POLYLINE:
				return ShapeType.POLYLINE;
			default:
				throw 'shapeType unrecognize: ' + shapeTypeName;
		}
	}
}

ShapeManagerRepository.initialize();