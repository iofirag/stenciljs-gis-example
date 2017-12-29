import { MarkerShape, ShapeObject, ShapeType, MarkerShapeOptions, ShapeDefinition, Coordinate } from '../../../../../models/apiModels';
import { ShapeManagerBase, ShapeEventHandlers } from '../ShapeManager';
import * as _ from 'lodash';
import /** as*/ L from 'leaflet';
import {markerSvg} from './maker';

export class MarkerShapeManager extends ShapeManagerBase {

	// getCoordinateAsString(shapeObject: ShapeObject): string {
	// 	const marker = <MarkerShape>shapeObject.shape;

	// 	return Utils.getCoordinageStrByCoordinate(marker.coordinate);
	// }

	getHeatLayerPoints(shapeObject: ShapeObject): Coordinate {
		const marker = <MarkerShape>shapeObject.shape;

		return marker.coordinate;
	}

	getType(): ShapeType {
		return ShapeType.MARKER;
	}

	shapeObjectToWkt(shapeObject: ShapeObject): string {
		const marker = <MarkerShape>shapeObject.shape;

		return `POINT(${marker.coordinate.lng} ${marker.coordinate.lat})`;
	}

	shapeWktToObject(shapeWkt: string): ShapeObject {
		const lnglatArr: string[] = shapeWkt.replace(/[^0-9\.\ \-]/g, '').split(' ');

		if (lnglatArr.length === 2) {
			const lnglat: Coordinate = {
				lng: Number(lnglatArr[0]),
				lat: Number(lnglatArr[1])
			};

			// Create label object
			const markerObj: ShapeObject = {
				shape: <MarkerShape>{ coordinate: lnglat },
				type: ShapeType.MARKER
			};

			return markerObj;
		} else {
			throw 'missing latitude or longitude';
		}
	}

	isWktOfType(wkt: string): boolean {
		return (wkt.indexOf('POINT(') > -1);
	}

	addShapeToLayer(shapeDef: ShapeDefinition, container: L.LayerGroup, eventHandlers: ShapeEventHandlers): L.Layer {
		if (shapeDef.shapeObject) {
			// Create Marker from shape values
			const markerShape:        MarkerShape        = <MarkerShape>shapeDef.shapeObject.shape;
			const markerShapeOptions: MarkerShapeOptions = <MarkerShapeOptions>shapeDef.options;
			const { lat, lng } = markerShape.coordinate;

			const markerIcon = L.divIcon({
				html: markerSvg,
				className: 'marker-svg',
				iconSize: new L.Point(28, 28)
			});

			_.assign(markerShapeOptions, {icon: markerIcon});

			const leafletObject: L.Layer = new L.Marker([lat, lng], markerShapeOptions);

			const obj = {...shapeDef};
			leafletObject.shapeDef = _.merge(leafletObject.shapeDef, obj, {
				data: {
					isSelected: _.get(shapeDef, 'data.isSelected', false),
					count: _.get(shapeDef, 'data.count', 1),
				}
			});

			leafletObject.addTo(<any>container);

			if (eventHandlers && eventHandlers.click) {
				leafletObject.on('click', eventHandlers.click);
			}

			return leafletObject;
		} else {
			console.error('shapeDef.shapeObject.shape is missing for creating the marker');
			return null;
		}
		// tbd , use _.defaults for default options
	}

	updateIsSelectedView(leafletObject: L.Marker): void {
		if (!leafletObject ._icon) { return; } // Object that hide under cluster

		const AddOrRemoveStr = _.get(leafletObject, 'shapeDef.data.isSelected') ? 'add' : 'remove';
		// add or remove 'selected' css class
		leafletObject._icon.classList[AddOrRemoveStr]('selected');
	}

	getShapeObjectFromDrawingLayer(layer: L.Marker): ShapeObject {
		const marker: MarkerShape = {
			coordinate: layer.getLatLng()
		};

		// Create label object
		const markerObj: ShapeObject = {
			shape: marker,
			type: ShapeType.MARKER
		};

		return markerObj;
	}

	getCoordinateList(shapeObject: ShapeObject): Coordinate[] {
		const marker = <MarkerShape>shapeObject.shape;
		return [marker.coordinate];
	}

	public getAreaSize(shapeObject: ShapeObject): number {
		return 0;
	}

	public isLayerOfThisShapeType(leafletLayer: L.Marker): boolean {
		let success: boolean = false;

		const tagName: string = _.get(leafletLayer, 'feature.geometry.type');
		if (tagName && tagName.toLowerCase()==='point') {
			// Way A
			success = true;
		} else {
			// Way B
			// Marker | Label
			const markerClassNames: string = _.get(leafletLayer, '_icon.className');
			if (markerClassNames) { 
				success = (markerClassNames.indexOf('textLabelClass') === -1);
			}
		}

		return success;
	}
}


// const ClusterableMarker = L.Marker.extend({
// 	getLatLng: function () {
// 		return this._latlng;
// 	},
// 	getBounds: function () {
// 		return this.getLatLng();
// 	},
// 	setLatLng: function () { }
// });