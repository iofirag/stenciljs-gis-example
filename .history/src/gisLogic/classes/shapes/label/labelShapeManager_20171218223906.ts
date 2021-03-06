import { ShapeType, ShapeObject, ShapeDefinition, LabelShape, LabelShapeOptions, Coordinate } from "../../../../models/apiModels";
import * as L from 'leaflet';
import { ShapeEventHandlers, ShapeManagerBase } from "../ShapeManager";
import Utils from "../../utils";
import * as _ from 'lodash';
// import { LPlus } from "../../../../declarations/LPlus";

export class LabelShapeManager extends ShapeManagerBase {

	getCoordinateAsString(shapeObject: ShapeObject): string {
		const label = <LabelShape>shapeObject.shape;
		return Utils.getCoordinageStrByCoordinate(label.coordinate);
	}

	getType(): ShapeType {
		return ShapeType.LABEL;
	}

	isWktOfType(wkt: string): boolean {
		return (wkt.indexOf('LABEL(') > -1);
	}
	shapeObjectToWkt(shapeObject: ShapeObject): string {
		const label = <LabelShape>shapeObject.shape;
		return 'LABEL(' + label.coordinate.lng + ' ' + label.coordinate.lat + ',' + label.text + ')';
	}
	shapeWktToObject(shapeWkt: string): ShapeObject {
		const labelParts = shapeWkt.split(',');

		if (labelParts.length === 2) {
			const lnglatStr = labelParts[0].replace(/[^0-9\.\ \-]/g, '');
			let strValue = labelParts[1];
			
			if (lnglatStr && strValue) {
				const lnglatArr: string[] = lnglatStr.split(' ');

				if (lnglatArr.length === 2) {
					const lnglat: Coordinate = {
						lng: Number(lnglatArr[0]),
						lat: Number(lnglatArr[1])
					};

					strValue = strValue.replace(/[)]/g, '');

					// Create label object
					const labelObj: ShapeObject = {
						shape: <LabelShape>{ coordinate: lnglat, text: strValue },
						type: ShapeType.LABEL
					};

					return labelObj;
				} else {
					throw 'missing latitude or longitude';
				}
			} else {
				throw 'format are not valid';
			}
		} else {
			throw 'missing latitude/longitude or label text';
		}
	}

	addShapeToLayer(shapeDef: ShapeDefinition, container: LPlus.LayerGroup, eventHandlers: ShapeEventHandlers): LPlus.Layer {

		if (shapeDef.shapeObject) { // everytime true, because shapeDef.shapeObject filled with value at shape initialize
			// Create Circle from shape values
			const labelShape: LabelShape = <LabelShape>shapeDef.shapeObject.shape;
			const labelShapeOptions: LabelShapeOptions = <LabelShapeOptions>shapeDef.options || {};
			const { lat, lng } = labelShape.coordinate;
			const textIcon = L.divIcon({
				className: 'leaflet-marker-icon textLabelClass leaflet-zoom-animated leaflet-interactive',
				html: labelShape.text
			});

			labelShapeOptions.icon = textIcon;

			const leafletObject: LPlus.Layer = <any>L.marker([lat, lng], labelShapeOptions);

			const obj = _.cloneDeep(shapeDef);
			leafletObject.shapeDef = _.merge(leafletObject.shapeDef, obj, {
				data: {
					isSelected: _.get(shapeDef, 'data.isSelected', false),
					count: _.get(shapeDef, 'data.count', 1),
				}
			});

			leafletObject.addTo(<any>container);

			return leafletObject;
		} else {
			console.error('shapeDef.shapeObject.shape is missing for creating the circle');
			return null;
		}
	}

	updateIsSelectedView(leafletObject: LPlus.Label): void {
		console.error('TBD for label');
	}
	getShapeObjectFromDrawingLayer(layer: LPlus.Layer): ShapeObject {
		const label: LabelShape = {
			coordinate: layer._latlng,
			text: layer.value
		};

		return {
			shape: label,
			type: ShapeType.LABEL
		};
	}
	getCoordinateList(shapeObject: ShapeObject): Coordinate[] {
		const label = <LabelShape>shapeObject.shape;
		return [label.coordinate];
	}

	public getAreaSize(shapeObject: ShapeObject): number {
		return 0;
	}

	public isLayerOfThisShapeType(leafletLayer: LPlus.Marker): boolean {
		// Marker | Label
		const markerClassNames: string = _.get(leafletLayer, '_icon.className');
		if (!markerClassNames) { return false; };

		return markerClassNames.indexOf('textLabelClass') > -1;
	}
}