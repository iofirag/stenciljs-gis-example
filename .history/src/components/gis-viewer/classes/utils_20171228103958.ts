import { IconOptions, Coordinate, Bounds, MouseCoordinateOptions, ShapeData, ShapeDefinition, ClusterHeat } from "../../../models/apiModels";
import { ShapeLayerContainer } from "../../../models/shapeLayerContainer";
// import { ShapeManagerInterface } from './shapes/ShapeManager';
// import { ShapeManagerRepository } from './shapes/ShapeManagerRepository';
import { MAX_NORTH_EAST, MAX_SOUTH_WEST, ZOOM_TO_EXTEND_PADDING, FILE_TYPES, EXPORT_SHAPE_FIELDS, FILE_TYPES_ARRAY } from './statics';
import { GisPluginContext, MapState } from './pluginBase';
// import { zip } from "@cc/shp-write";

import _ from 'lodash';
import L from 'leaflet';
// import html2canvas from 'html2canvas';
// import canvg from 'canvg-browser';
import tokml from 'tokml';

export default class Utils {
	public static async exportMapImage(): Promise<any> {
		// const controllers: any = document.getElementsByClassName('leaflet-control-container')[0];

		// controllers.style.display = 'none';

		// const markers = {};
		// const markerLayer: any = document.querySelectorAll('.leaflet-marker-icon');

		// // Remove tags css translate values and save the for after use
		// if (markerLayer) {
		// 	markerLayer.forEach((mark: any, i: number) => {
		// 		const markTransformList = mark.style.transform.replace('translate3d(', '').split(',');
		// 		mark.style.transform = '';

		// 		if (markTransformList.length > 1) {
		// 			const markX = parseFloat(markTransformList[0].replace('px', ''));
		// 			mark.style.left = `${markX}px`;
		// 			const markY = parseFloat(markTransformList[1].replace('px', ''));
		// 			mark.style.top = `${markY}px`;
		// 			markers[i] = { markX, markY };
		// 		}
		// 	});
		// }

		// const linesLayer: any = document.querySelectorAll('svg.leaflet-zoom-animated')[0];
		// const canvasElm: HTMLCanvasElement = document.createElement("canvas");
		// const overlayContainer = document.getElementsByClassName('leaflet-overlay-pane')[0];

		// // create canvas from the overlays svg
		// if (canvasElm && linesLayer) {
		// 	canvg(canvasElm, linesLayer.outerHTML);
		// }

		// // hide overlay svg layer and add the overlay canvas layer,
		// // this is must for html2canvas to generate the overlays into image
		// if (linesLayer) {
		// 	linesLayer.style.transform.replace('translate3d(', '').split(','); // linesTransform
		// 	linesLayer.style.display = "none";
		// 	if (canvasElm) {
		// 		canvasElm.style.transform = linesLayer.style.transform;
		// 		canvasElm.style.zIndex = "200";
		// 		if (overlayContainer) {
		// 			overlayContainer.appendChild(canvasElm);
		// 		}
		// 	}
		// }

		// // create the canvas from the leaflet map
		// const canvas: any = await html2canvas(document.getElementById("map"), { useCORS: true, svgRendering: true });

		// // return all the layers to their previous styles
		// controllers.style.display = 'initial';

		// if (linesLayer) {
		// 	linesLayer.style.display = 'initial';
		// 	if (overlayContainer && canvasElm) {
		// 		overlayContainer.removeChild(canvasElm);
		// 	}
		// }

		// if (markerLayer) {
		// 	markerLayer.forEach((mark: any, i: number) => {
		// 		const pos = markers[i];

		// 		mark.style.transform = `translate3d(${pos.markX}px,${pos.markY}px, 0px)`;
		// 		mark.style.top = `${0}px`;
		// 		mark.style.left = `${0}px`;
		// 	});
		// }

		// return canvas;
		return null;
	}

	public static updateLayerControllerLayersClass(currentMode: ClusterHeat) {
		const previousMode = (currentMode === 'cluster') ? 'heat' : 'cluster';

		const allNextModeNodes = document.querySelectorAll("." + currentMode);
		// tslint:disable-next-line:align
		const allPreviousModeNodes = document.querySelectorAll("." + previousMode);
		// tslint:disable-next-line:align
		_.forEach(allNextModeNodes, (element: HTMLElement) => {
			element.classList.remove('hidden');
		});
		// tslint:disable-next-line:align
		_.forEach(allPreviousModeNodes, (element: HTMLElement) => {
			element.classList.add('hidden');
		});
	}

	public static toLeafletIconOptions(options: IconOptions): L.IconOptions {
		return {
			iconUrl: options.iconUrl,
			iconSize: [options.iconWidth, options.iconHeight], // size of the icon
			shadowAnchor: [4, 62], // the same for the shadow
			popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
		};
	}

	public static fitLayerControllerPosition(LayerControllerMode: string = ''): void {
		const layerControllerButton: any = document.querySelector('.custom-toolbar-button.layer-controller');
		const layerControllerPlugin: any = document.querySelector('.custom-layer-controller');

		if (!(layerControllerButton && layerControllerPlugin)) { return; }

		layerControllerPlugin.style.left = layerControllerButton.offsetLeft + 'px';
		// layerControllerPlugin.className = layerControllerPlugin.className+ ' ' + isShowLayerController;

		const customLayerController: any = document.querySelector('.custom-layer-controller');
		customLayerController.className = layerControllerPlugin.className + ' ' + LayerControllerMode;
		const styledLayerControllerElement: any = document.querySelector('.leaflet-control-layers-expanded');

		styledLayerControllerElement.parentNode.removeChild(styledLayerControllerElement);
		customLayerController.appendChild(styledLayerControllerElement);

	}
	public static getGeojsonCollectionFromLayers(layers: any): any[] {
		return _.reduce(layers, (acc: any[], item: any, i: number) => {
			const itemGeoJSON = item.toGeoJSON();
			const geojson = itemGeoJSON.type === 'FeatureCollection' ? itemGeoJSON.features[0] : itemGeoJSON;
			geojson.properties.shapeDef = item.shapeDef;
			geojson.properties.shapeProp = _.assign({}, item.options);
			acc.push(geojson);

			return acc;
		}, []);
	}

	/**
	 * Retreive selected objects if there are.
	 * if there isn't - retreive all visible objects
	 */
	public static getVisibleLayers(mapState: MapState, map: L.Map): L.Layer[] {
		const shapeLayers: any[] = [];

		// collect all visible leaflet shapes from every layer

		// Initial layers
		mapState.initialLayers.forEach((dataLayer: ShapeLayerContainer) => {
			const isLayerVisible: boolean = map.hasLayer(dataLayer.leafletClusterLayer);

			if (isLayerVisible) {
				// Add all layers-objects to the output list
				shapeLayers.push(...dataLayer.leafletClusterLayer.getLayers());
			}
		});

		// Imported layers
		if (mapState.importedLayers) {
			FILE_TYPES_ARRAY.forEach((fileType: string) => {
				mapState.importedLayers[fileType].forEach((dataLayer: ShapeLayerContainer) => {
					const isLayerVisible: boolean = map.hasLayer(dataLayer.leafletClusterLayer);
					if (isLayerVisible) {
						// Add all layers-objects to the output list
						shapeLayers.push(...dataLayer.leafletClusterLayer.getLayers());
					}
				});
			});
		}

		// Drawable layers
		mapState.drawableLayers.forEach((drawLayer: L.FeatureGroup) => {
			const isLayerVisible: boolean = map.hasLayer(drawLayer);
			if (isLayerVisible) {
				// Add all layers-objects to the output list
				shapeLayers.push(...drawLayer.getLayers());
			}
		});

		return shapeLayers;
	}
	public static getSelectedObjects(selectedLeafletObjects: { [key: string]: L.Layer }): L.Layer[] {
		// get all selected object
		return <L.Layer[]>Object.values(selectedLeafletObjects);
	}

	// public static exportBlobFactory(
	// 	fileType: FILE_TYPES,
	// 	selectedLeafletObjects: { [key: string]: L.Layer },
	// 	mapState: MapState,
	// 	map: L.Map,
	// 	callback?: Function): Blob {
	// 	const relevantExportedLayers: L.Layer[]   = Utils.getRelevantExportedLayers(selectedLeafletObjects, mapState, map);
	// 	const geoJsonList:            L.GeoJSON[] = Utils.shapeListToGeoJson(relevantExportedLayers);

	// 	return Utils.getBlobByType(fileType, geoJsonList, callback);
	// }

	public static stopDoubleClickOnPlugin(htmlElement: HTMLElement) {
		// Disable double-click
		htmlElement.addEventListener("dblclick", (eventData: any) => {
			eventData.stopPropagation();
		});
	}
	public static generatePopupMarkupFromData(shapeData: ShapeData) {
		const popupFields = _.pick(shapeData, ['id', 'name', 'description', 'count', 'dateTime', 'tag', 'isSelected']);
		let htmlTemplate = '';

		_.forIn(popupFields, (value, key) => {
			htmlTemplate +=
				`<div class="tooltip-row">
				<label class="tooltip-row-key">${key}</label><label class="tooltip-row-value">${value}</label>
			</div>`;
		});

		return htmlTemplate;
	}

	public static createBubble(leafletObject: any, type: string): void {
		// Create bubble
		const bubbleContent: string = Utils.generatePopupMarkupFromData(leafletObject.shapeDef.data);
		if (leafletObject._layers) {
			// Multipolygon flow
			Object.values(leafletObject._layers).forEach((polygonItem: L.Polygon) => {
				createBubbleByLayerAndContent(polygonItem, bubbleContent);
			});
		} else {
			// Other shapes flow
			createBubbleByLayerAndContent(leafletObject, bubbleContent);
		}
		function createBubbleByLayerAndContent(layer: any, bubbleData: string) {
			layer['bind' + type](bubbleData);
		}
	};
	public static updateBubble(leafletObject: any): void {
		// Update popup
		const bubbleContent: string = Utils.generatePopupMarkupFromData(leafletObject.shapeDef.data);
		if (leafletObject._layers) {
			// Multipolygon flow
			Object.values(leafletObject._layers).forEach((polygonItem: L.Polygon) => {
				updateBubbleByLayerAndContent(polygonItem, bubbleContent);
			});
		} else {
			// Other shapes flow
			updateBubbleByLayerAndContent(leafletObject, bubbleContent);
		}

		function updateBubbleByLayerAndContent(layer: any, bubbleData: string) {
			if (layer.getPopup()) {
				layer.setPopupContent(bubbleData);
			}
			if (layer.getTooltip()) {
				layer.setTooltipContent(bubbleData);
			}
		}
	};

	// public static shapeOnClickHandler(manager: ShapeManagerInterface | null, context: GisPluginContext, clickEvent: any) {
	// 	if (clickEvent.originalEvent.ctrlKey) {
	// 		manager.toggleSelectShape(context, clickEvent.target);
	// 		manager.updateIsSelectedView(clickEvent.target);
	// 		Utils.updateBubble(clickEvent.target);
	// 		context.props.onSelectionDone([clickEvent.target.shapeDef]);
	// 	}
	// }

	public static selectedLeafletObjectHandler(context: GisPluginContext, leafletObject: L.FeatureGroup | L.Layer) {
		// Single/Multi select a shape flow
		const layerId: string = String(L.Util.stamp(leafletObject));	// Get leaflet layer id
		// Selected leaflet shpae list
		if (leafletObject.shapeDef.data.isSelected) {
			// Save leaflet shape reference to selected list
			context.selectedLeafletObjects[layerId] = leafletObject;
		} else {
			// Remove selected object from selectedLeafletObjects
			delete context.selectedLeafletObjects[layerId];
		}
	}

	public static getCoordinageStrByCoordinate(coords: Coordinate): string {
		return `lng: ${coords.lng} lat: ${coords.lat}`;
	}

	public static getCentralGeoCoordinate(geoCoordinates: Coordinate[]): Coordinate {
		if (geoCoordinates.length === 1) {
			return geoCoordinates[0];
		}

		let x = 0, y = 0, z = 0;

		geoCoordinates.forEach((geoCoordinate: Coordinate) => {
			var latitude = geoCoordinate.lat * Math.PI / 180;
			var longitude = geoCoordinate.lng * Math.PI / 180;

			x += Math.cos(latitude) * Math.cos(longitude);
			y += Math.cos(latitude) * Math.sin(longitude);
			z += Math.sin(latitude);
		});

		let total = geoCoordinates.length;

		x = x / total;
		y = y / total;
		z = z / total;

		var centralLongitude = Math.atan2(y, x);
		var centralSquareRoot = Math.sqrt(x * x + y * y);
		var centralLatitude = Math.atan2(z, centralSquareRoot);

		return {
			lng: centralLatitude * 180 / Math.PI,
			lat: centralLongitude * 180 / Math.PI
		};
	}

	public static zoomToExtend(mapState: MapState, map: L.Map): boolean {
		let tempLayers: L.FeatureGroup = new L.FeatureGroup([]);

		const visibleShapes: L.Layer[] = this.getVisibleLayers(mapState, map);
		visibleShapes.map((shape: L.Layer) => {
			tempLayers.addLayer(shape);
		});

		/* Heat points */
		// Initial layers
		mapState.initialLayers.forEach((dataLayer: ShapeLayerContainer) => {
			const isLayerVisible: boolean = map.hasLayer(dataLayer.leafletHeatLayer);
			if (isLayerVisible) {
				// Add all layers-objects to the output list
				dataLayer.leafletHeatLayer._latlngs.forEach((coordinate: Coordinate) => {
					// heat points are not regular layers therefore we need to convert them to markers to be able to "collect" them in the templayer
					const shape: L.Layer = L.marker([coordinate.lat, coordinate.lng]);
					tempLayers.addLayer(shape);
				});
				// shapeLayers.push(...dataLayer.leafletHeatLayer._latlngs);
			}
		});
		// Imported layers
		if (mapState.importedLayers) {
			FILE_TYPES_ARRAY.forEach((fileType: string) => {
				mapState.importedLayers[fileType.toLowerCase()].forEach((dataLayer: ShapeLayerContainer) => {
					const isLayerVisible: boolean = map.hasLayer(dataLayer.leafletHeatLayer);
					if (isLayerVisible) {
						// Add all layers-objects to the output list
						dataLayer.leafletHeatLayer._latlngs.forEach((coordinate: Coordinate) => {
							// heat points are not regular layers therefore we need to convert them to markers to be able to "collect" them in the templayer
							const shape: L.Layer = L.marker([coordinate.lat, coordinate.lng]);
							tempLayers.addLayer(shape);
						});
					}
				});
			});
		}

		if (tempLayers.getLayers().length === 0) {
			map.fitWorld();
			return true;
		} else {
			const bounds: L.LatLngBounds = tempLayers.getBounds() as L.LatLngBounds;
			const boundsMaxZoom: number = map.getBoundsZoom(bounds);
			if (bounds && bounds.getNorthEast() && bounds.getSouthWest() && boundsMaxZoom) {
				map.flyToBounds(bounds, { padding: ZOOM_TO_EXTEND_PADDING, maxZoom: boundsMaxZoom });
				return true;
			} else {
				console.log('Currently there is not any shapes on any layer');
			}
		}
		return false;
	};

	public static closeAllCustomDropDownMenus() {
		const allDropDownMenus = document.querySelectorAll('.menu');
		_.forEach(allDropDownMenus, (menu: HTMLElement) => {
			menu.style.display = 'none';
		});
	}

	public static toggleCustomDropDownMenu(elm: HTMLElement) {
		const toogleState = elm.style.display;
		Utils.closeAllCustomDropDownMenus();
		elm.style.display = (toogleState === 'block') ? 'none' : 'block';
	}

	public static initMouseCoordinates(mouseCoordinate: MouseCoordinateOptions) {
		if (!(mouseCoordinate && mouseCoordinate.enable)) { return; }

		const gpsElement: any = document.querySelector('.gps');
		const utmElement: any = document.querySelector('.utm');
		const utmrefElement: any = document.querySelector('.utmref');

		if (mouseCoordinate.utm) {
			gpsElement.style.display = 'none';
			utmrefElement.style.display = 'none';
		}

		if (mouseCoordinate.utmref) {
			gpsElement.style.display = 'none';
			utmElement.style.display = 'none';
		}

		if (mouseCoordinate.gps) {
			utmElement.style.display = 'none';
			utmrefElement.style.display = 'none';
		}
	}

	public static computeNewCoordinateFromCoordinateAndDistance(vPoint: Coordinate, vAngle: number, vDistance: number) {
		const EARTH_RADIUS_IN_METERS = 6371000; // maybe this real  6371000
		const distance = vDistance / EARTH_RADIUS_IN_METERS;
		const angle = Utils.toRad(vAngle);

		const vLat1 = Utils.toRad(vPoint.lat);
		const vLng1 = Utils.toRad(vPoint.lng);

		const vNewLat = Math.asin(Math.sin(vLat1) * Math.cos(distance) +
			Math.cos(vLat1) * Math.sin(distance) * Math.cos(angle));

		const vNewLng = vLng1 + Math.atan2(Math.sin(angle) * Math.sin(distance) * Math.cos(vLat1), Math.cos(distance) - Math.sin(vLat1) * Math.sin(vNewLat));

		return (isNaN(vNewLat) || isNaN(vNewLng)) ? null : Utils.toDeg(vNewLat) + ' ' + Utils.toDeg(vNewLng);  // vNewLatLng;
	}

	public static toRad(vInput: number) {
		return vInput * Math.PI / 180;
	}

	public static toDeg(vInput: number) {
		return vInput * 180 / Math.PI;
	}

	public static b64toBlob = function (b64Data: string, contentType: string, sliceSize?: number) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		const byteCharacters = atob(b64Data);
		const byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			const slice = byteCharacters.slice(offset, offset + sliceSize);
			const byteNumbers = new Array(slice.length);

			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			const byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		const blob = new Blob(byteArrays, { type: contentType });

		return blob;
	};

	public static zoomToExtendOnLayer(layerGroup: L.LayerGroup | L.FeatureGroup, map: L.Map): void {
		// Zoom to extend on new data
		let tempLayers: L.FeatureGroup = new L.FeatureGroup([]);

		const layerGroupLayers: L.Layer[] = layerGroup.getLayers();
		layerGroupLayers.forEach((layer: L.Layer) => {
			tempLayers.addLayer(layer);
		});

		if (tempLayers.getLayers().length) {
			const bounds: L.LatLngBounds = tempLayers.getBounds() as L.LatLngBounds;
			const boundsMaxZoom: number = map.getBoundsZoom(bounds);
			if (bounds && bounds.getNorthEast() && bounds.getSouthWest() && boundsMaxZoom) {
				map.flyToBounds(bounds, { padding: ZOOM_TO_EXTEND_PADDING, maxZoom: boundsMaxZoom });
			} else {
				console.log('There is not any shapes on this layer');
			}
		} else {
			map.fitWorld();
		}
		// const bounds: L.LatLngLiteralBounds = layer.getBounds() as L.LatLngLiteralBounds;
		// const boundsMaxZoom: number = map.getBoundsZoom(bounds);
		// if (bounds && bounds._northEast && bounds._southWest && boundsMaxZoom) {
		// 	map.fitBounds(bounds, { padding: ZOOM_TO_EXTEND_PADDING, maxZoom: boundsMaxZoom });
		// } else {
		// 	console.log('Currently there is not any shapes on any layer');
		// }
		// const bounds: L.LatLngLiteralBounds = layer.getBounds() as L.LatLngLiteralBounds;
		// const boundsMaxZoom: number = map.getBoundsZoom(bounds);
		// map.fitBounds(bounds, { padding: ZOOM_TO_EXTEND_PADDING, maxZoom: boundsMaxZoom });
	}

	public static getDirectHtmlChildrenElements(element: HTMLElement, depth: number): HTMLElement[] {
		let elements: HTMLElement[] = [];
		let currentElement = element;
		for (let i = 0; i < depth; i++) {
			if (!element.children) break;
			elements.push(...<HTMLElement[]>Array.from(currentElement.children));
			currentElement = <HTMLElement>currentElement.firstElementChild;
		}
		return elements;
	}

	public static addClassesToHtmlCollection(collection: HTMLElement[], ...classesToAdd: string[]): void {
		collection.map(htmlEle => htmlEle.classList.add(...classesToAdd));
	}

	public static removeClassesFromHtmlCollection(collection: HTMLElement[], ...classesToRemove: string[]): void {
		collection.map(htmlEle => htmlEle.classList.remove(...classesToRemove));
	}

	// private static getBlobByType(type: FILE_TYPES, geoJsonList: L.GeoJSON[], callback?: Function): Blob {

	// 	let blobData: Blob;
	// 	switch (type) {
	// 		case FILE_TYPES.kml:
	// 			const kml: string = Utils.exportToKML(geoJsonList);
	// 			blobData = new Blob([kml], { type: "text/plain;charset=utf-8" });
	// 			break;
	// 		case FILE_TYPES.csv:
	// 			const csv: string = Utils.exportToCSV(geoJsonList);
	// 			blobData = new Blob([csv], { type: "text/plain;charset=utf-8" });
	// 			break;
	// 		case FILE_TYPES.zip:
	// 			const shp64b = Utils.exportToSHP(geoJsonList);
	// 			blobData = Utils.b64toBlob(shp64b, 'application/zip');
	// 			break;
	// 		default:
	// 			console.warn('File type is not recognize');
	// 			break;
	// 	}
	// 	if (blobData && callback) {
	// 		callback(blobData);
	// 	}
	// 	return blobData;
	// }

	private static getRelevantExportedLayers(selectedLeafletObjects: { [key: string]: L.Layer }, mapState: MapState, map: L.Map): L.Layer[] {
		// Check if there are selected objects
		if (Object.keys(selectedLeafletObjects).length) {
			return this.getSelectedObjects(selectedLeafletObjects);
		} else {
			return this.getVisibleLayers(mapState, map);
		}
	}

	// private static shapeListToGeoJson(visibleLayers: L.Layer[]): L.GeoJSON[] {
	// 	let geoJsonList: L.GeoJSON[] = [];

	// 	visibleLayers.forEach((layer: L.Layer) => {
	// 		const shapeDefObj: ShapeDefinition = <ShapeDefinition>_.cloneDeep(_.get(layer, 'shapeDef'));
	// 		const manager: ShapeManagerInterface = ShapeManagerRepository.getManagerByType(layer.shapeDef.shapeObject.type);

	// 		let geoJson: any = layer.toGeoJSON();
	// 		geoJson.properties[EXPORT_SHAPE_FIELDS.shapeWkt] = shapeDefObj.shapeWkt || '';
	// 		geoJson.properties[EXPORT_SHAPE_FIELDS.shapeDataObj] = JSON.stringify(shapeDefObj.data) || JSON.stringify({});
	// 		geoJson.properties[EXPORT_SHAPE_FIELDS.shapeOptionsObj] = JSON.stringify(shapeDefObj.options) || JSON.stringify({});
	// 		geoJson.properties[EXPORT_SHAPE_FIELDS.areaSize] = manager.getAreaSize(shapeDefObj.shapeObject);

	// 		geoJsonList.push(geoJson);
	// 	});
	// 	return geoJsonList;
	// }

	public static uglifyCsvJson(geoJson: L.GeoJSON): L.GeoJSON {
		// Uglify shapeDataObj
		if (geoJson.properties[EXPORT_SHAPE_FIELDS.shapeDataObj]) {
			geoJson.properties[EXPORT_SHAPE_FIELDS.shapeDataObj] = geoJson.properties[EXPORT_SHAPE_FIELDS.shapeDataObj].replace(/`/g, "");// delete all ` character
			geoJson.properties[EXPORT_SHAPE_FIELDS.shapeDataObj] = geoJson.properties[EXPORT_SHAPE_FIELDS.shapeDataObj].replace(/"/g, "`");// replace all " with `
		}
		// Uglify Options
		if (geoJson.properties[EXPORT_SHAPE_FIELDS.shapeOptionsObj]) {
			geoJson.properties[EXPORT_SHAPE_FIELDS.shapeOptionsObj] = geoJson.properties[EXPORT_SHAPE_FIELDS.shapeOptionsObj].replace(/`/g, "");// delete all ` character
			geoJson.properties[EXPORT_SHAPE_FIELDS.shapeOptionsObj] = geoJson.properties[EXPORT_SHAPE_FIELDS.shapeOptionsObj].replace(/"/g, "`");// replace all " with `
		}
		return geoJson;
	}
	public static pretifyCsvJson(geoJson: L.GeoJSON): L.GeoJSON {
		// Pretify shapeDataObj
		if (geoJson.properties[EXPORT_SHAPE_FIELDS.shapeDataObj]) {
			geoJson.properties[EXPORT_SHAPE_FIELDS.shapeDataObj] = geoJson.properties[EXPORT_SHAPE_FIELDS.shapeDataObj].replace(/`/g, '"');// replace all " with `
		}
		// Pretify Options
		if (geoJson.properties[EXPORT_SHAPE_FIELDS.shapeOptionsObj]) {
			geoJson.properties[EXPORT_SHAPE_FIELDS.shapeOptionsObj] = geoJson.properties[EXPORT_SHAPE_FIELDS.shapeOptionsObj].replace(/`/g, '"');// replace all " with `
		}
		return geoJson;
	}

	private static exportToCSV(geoJsonList: L.GeoJSON[]): string {
		const csv: string = Utils.createCsvFormatFromGeoJsonList(geoJsonList);
		return csv;
	}

	private static exportToSHP(geoJsonList: L.GeoJSON[]): any {
		// const shpBase64: any = zip({
		// 	type: 'FeatureCollection',
		// 	features: geoJsonList
		// });
		// return shpBase64;
		return null;
	}

	// private static exportToKML(geoJsonList: L.GeoJSON[]): string {
	// 	const kml: string = Utils.createKmlFormatFromLayers(geoJsonList);
	// 	return kml;
	// }

	private static createCsvFormatFromGeoJsonList(geoJsonList: L.GeoJSON[]): string {
		let allRows: ExportedCSVFormat[] = [];
		// var jsonToCsv = require('convert-json-to-csv');

		geoJsonList.forEach((geoJson: L.GeoJSON, i: number) => {
			geoJson = Utils.uglifyCsvJson(geoJson);	// Fix data for creating valid csv	// Check
			const row: ExportedCSVFormat = geoJson.properties;
			allRows.push(row);
		});
		return this.convertArrayOfObjectsToCSV(allRows);
	}

	private static convertArrayOfObjectsToCSV(dataList: ExportedCSVFormat[], columnDelimiter?: any, lineDelimiter?: string): string {
		let result: string;
		let ctr: number;
		let keys: string[];

		if (dataList === null || !dataList.length) {
			return '';
		}

		columnDelimiter = columnDelimiter || ',';
		lineDelimiter = lineDelimiter || '\n';
		keys = Object.keys(dataList[0]);
		result = '';
		result += keys.join(columnDelimiter);

		dataList.forEach((item: any) => {
			ctr = 0;
			result += lineDelimiter;
			keys.forEach((key: any) => {
				if (ctr > 0) {
					result += columnDelimiter;
				}
				result += "\"" + item[key] + "\"";
				ctr++;
			});
		});
		return result;
	}

	// private static createKmlFormatFromLayers(geoJsonLayers: L.GeoJSON[]): string {
	// 	if (!geoJsonLayers) { return undefined; }

	// 	let kmlStrHeader = '';
	// 	let kmlStrFooter = '';
	// 	let kmlStrContent = '';

	// 	geoJsonLayers.forEach((geoJson: L.GeoJSON, i: number) => {
	// 		// const geojson:              any       = layer.toGeoJSON();
	// 		const kml: string = tokml(geoJson);
	// 		const placeMarkStartTag: string = '<Placemark>';
	// 		const placeMarkEndTag: string = '</Placemark>';
	// 		const documentStartTag: string = '<Document>';
	// 		const documentEndTag: string = '</Document>';
	// 		const emptyExtendedDataTag: string = '<ExtendedData></ExtendedData>';

	// 		// kml content
	// 		const startPlacemarkIndex: number = kml.indexOf(placeMarkStartTag) + placeMarkStartTag.length;
	// 		const endPlacemarkIndex: number = kml.lastIndexOf(placeMarkEndTag) + placeMarkEndTag.length;

	// 		kmlStrContent = kml.slice(startPlacemarkIndex, endPlacemarkIndex).replace(emptyExtendedDataTag, '');

	// 		if (i === 0) {
	// 			// kml header syntax tags
	// 			kmlStrHeader = kml.slice(0, kml.indexOf(documentStartTag) + documentStartTag.length);
	// 			// Create schema here & kmlStrHeader += schema;
	// 			// kml closing tags
	// 			kmlStrFooter = kml.slice(kml.lastIndexOf(documentEndTag));
	// 		}
	// 		kmlStrHeader += placeMarkStartTag;
	// 		kmlStrHeader += this.createKmlExtendedData(geoJson);
	// 		kmlStrHeader += kmlStrContent;
	// 	});
	// 	kmlStrHeader += kmlStrFooter; // Valid KML format
	// 	return kmlStrHeader;
	// }

	// private static createKmlExtendedData(geoJson: L.GeoJSON): string {
	// 	const shapeDef: ShapeDefinition = <ShapeDefinition>_.cloneDeep(_.get(geoJson, 'shapeDef'));
	// 	if (!shapeDef) { return ''; };

	// 	if (_.has(shapeDef, 'data.isSelected')) {
	// 		// Remove isSelected from extended data
	// 		delete shapeDef.data.isSelected;
	// 	}
	// 	const manager: ShapeManagerInterface = ShapeManagerRepository.getManagerByShapeDefLayer(geoJson);
	// 	const areaSize: number = manager.getAreaSize(shapeDef.shapeObject);

	// 	let extendedData: string =
	// 		`<ExtendedData>
	// 		${shapeDef.shapeWkt ? `<Data name="shapeWkt"><value>${shapeDef.shapeWkt}</value></Data>` : ''}
	// 		${shapeDef.data ? `<Data name="shapeDataObj"><value>${JSON.stringify(shapeDef.data)}</value></Data>` : ''}
	// 		${shapeDef.options ? `<Data name="shapeOptionsObj"><value>${JSON.stringify(shapeDef.options)}</value></Data>` : ''}
	// 		<Data name="areaSize"><value>${areaSize}</value></Data>
	// 	</ExtendedData>`;
	// 	return extendedData;
	// }

	// Future use
	private static fixBounds(bounds: Bounds): Bounds {
		// MAX North-East coordinage (Top-Right) lat: 85, lng: -180
		if (bounds.topLeft.lat > MAX_NORTH_EAST.lat) {
			bounds.topLeft.lat = MAX_NORTH_EAST.lat;
		}
		if (bounds.topLeft.lng < MAX_NORTH_EAST.lng) {
			bounds.topLeft.lng = MAX_NORTH_EAST.lng;
		}
		// MAX South-West coordinage (Bottom-Left) lat: -85, lng: 180
		if (bounds.bottomRight.lat < MAX_SOUTH_WEST.lat) {
			bounds.bottomRight.lat = MAX_SOUTH_WEST.lat;
		}
		if (bounds.bottomRight.lng > MAX_SOUTH_WEST.lng) {
			bounds.bottomRight.lng = MAX_SOUTH_WEST.lng;
		}
		return bounds;
	}
}
export type ExportedCSVFormat = {
	shapeWkt: string,
	shapeDataObj: any,
	shapeOptionsObj: any,
	areaSize: number
};