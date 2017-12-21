import { PolylineShape, ShapeObject, ShapeType, PolylineShapeOptions, ShapeDefinition, Coordinate } from "../../../../models/apiModels";
import { ShapeEventHandlers, ShapeManagerBase } from "../ShapeManager";
import Utils from "../../utils";
import * as _ from 'lodash';

export class PolylineShapeManager extends ShapeManagerBase {

	getCoordinateAsString(shapeObject: ShapeObject): string {
		const polyline:          PolylineShape = shapeObject.shape as PolylineShape;
		const coordinatesStrArr: string[]      = [];

		// Iterate coordinates
		polyline.coordinates.forEach((coordinate: Coordinate) => {
			coordinatesStrArr.push(Utils.getCoordinageStrByCoordinate(coordinate));
		});

		return coordinatesStrArr.join(',');
	}
	getCoordinateList(shapeObject: ShapeObject): Coordinate[] {
		const polyline: PolylineShape = shapeObject.shape as PolylineShape;
		return polyline.coordinates;
	}

	getType(): ShapeType {
		return ShapeType.POLYLINE;
	}

	isWktOfType(wkt: string): boolean {
		return (wkt.indexOf('LINESTRING(') > -1);
	}

	shapeObjectToWkt(shapeObject: ShapeObject): string {
		const polyline 	 = <PolylineShape>shapeObject.shape;
		const coordinate = polyline.coordinates.map((item: Coordinate) => (`${item.lng} ${item.lat}`)).join(',');

		return `LINESTRING(${coordinate})`;
	}

	shapeWktToObject(shapeWkt: string): ShapeObject {
		const lnglatsStr:  string 			= shapeWkt.replace(/[^0-9\.\,\ \-]/g, '');
		const lnglatsArr:  string[]     = lnglatsStr.split(',');
		const coordinates: Coordinate[] = [];

		for (const coordsStr of lnglatsArr) {
			const coordinate: string[]   = coordsStr.split(' ');
			const coord:      Coordinate = {
				lng: Number(coordinate[0]),
				lat: Number(coordinate[1])
			};

			coordinates.push(coord);
		}

		const polylineObj: ShapeObject = {
			shape: <PolylineShape>{ coordinates: coordinates },
			type: ShapeType.POLYLINE
		};

		return polylineObj;
	}

	addShapeToLayer(shapeDef: ShapeDefinition, container: LPlus.LayerGroup, eventHandlers: ShapeEventHandlers): LPlus.FeatureGroup {

		if (shapeDef.shapeObject) {
			// Create Circle from shape values
			const polylineShape:        PolylineShape        = <PolylineShape>shapeDef.shapeObject.shape;
			const polylineShapeOptions: PolylineShapeOptions = <PolylineShapeOptions>shapeDef.options;
			const { coordinates } = polylineShape;

			// Clusterable Polyline ********************************************
			const ClusterablePolyline = LPlus.Polyline.extend({
				_originalInitialize: LPlus.Polyline.prototype.initialize,

				initialize: function (bounds: any, options: any) {
					this._originalInitialize(bounds, options);
					this._latlng = this.getBounds().getCenter();
				},
				getLatLng: function () {
					return this._latlng;
				},
				setLatLng: function () { }
			});
      		// ****************************************************************

			const leafletObject: LPlus.FeatureGroup = <any>new ClusterablePolyline(coordinates, polylineShapeOptions);

			const obj = _.cloneDeep(shapeDef);
			leafletObject.shapeDef = _.merge(leafletObject.shapeDef, obj, {
				data: {
					isSelected: _.get(shapeDef, 'data.isSelected', false),
					count: _.get(shapeDef, 'data.count', 1),
				}
			});

			leafletObject.addTo(<any>container);

			if (eventHandlers && eventHandlers.click) {
				// Set on click event handler
				leafletObject.on('click', eventHandlers.click);
			}

			return leafletObject;
		} else {
			console.error('shapeDef.shapeObject.shape is missing for creating the polyline');
			return null;
		}
	}

	getShapeObjectFromDrawingLayer(layer: LPlus.Layer): ShapeObject {
		const polyline: PolylineShape = {
			coordinates: layer._latlngs
		};

		const polylineObj: ShapeObject = {
			shape: polyline,
			type: ShapeType.POLYLINE
		};

		return polylineObj;
	}

	public getAreaSize(shapeObject: ShapeObject): number {
		const polyline: PolylineShape = shapeObject.shape as PolylineShape;
		const areaSizeCalc: number = LPlus.GeometryUtil.geodesicArea(polyline.coordinates);
		return areaSizeCalc || 0;
	}

	public isLayerOfThisShapeType(leafletLayer: LPlus.Marker): boolean {
		let success: boolean = false;
		const tagName: string = _.get(leafletLayer, 'feature.geometry.type');
		if (tagName && tagName.toLowerCase() === 'linestring') {
			// Way A
			success = true;
		} else {
			// Way B
			// Polygon | Polyline
			const item: any = _.get(leafletLayer, '_rings[0][0]');
			if (item) {
				const itemKeys: string[] = Object.keys(item);
				success = (itemKeys.indexOf('_code') === -1);
			}
		}
		return success;
	}
}