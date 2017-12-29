// import { Component } from "@stencil/core";
import { WktShape, ShapeDefinition, ShapeObject, PolygonShape, ShapeType, MultiPolygonShape, DrawBarOptions, DrawBarOptionsEdit, DrawBarOptionsDraw, ShapeData } from "../../../../../models/apiModels";
import L from 'leaflet';
// Leaflet Draw
// import 'leaflet-draw/dist/images/marker-icon.png';
// import 'leaflet-draw/dist/leaflet.draw.css';
// import './DrawBarComp.css';
import 'leaflet-draw-drag';
import _ from 'lodash';
import { GisPluginContext } from "../../pluginBase";
import { ShapeManagerInterface } from "../../shapes/ShapeManager";
import { ShapeManagerRepository } from "../../shapes/ShapeManagerRepository";
import { Units } from "../../MapContainer/MapContainer";
import { LayerNames, FeaturesNames, BUBBLE_TYPE } from "../../statics";
import Utils from '../../utils';
import { EventEmitter } from "events";

const textIconClassName: string = 'textLabelClass';

// @Component({
// 	tag: 'draw-bar-comp',
// 	styleUrls: [
// 		// '../../../../../../node_modules/leaflet-draw/dist/images/marker-icon.png',
// 		'../../../../../../node_modules/leaflet-draw/dist/leaflet.draw.css',
// 		'./DrawBarComp.css'
// 	],
// })
export class DrawBarComp {
	element: any;
	private drawableLayer: L.FeatureGroup;

	constructor(private context: GisPluginContext) {
		// super();

		// this.import                        = this.import.bind(this);
		// this.export                        = this.export.bind(this);
		// this.clear                         = this.clear.bind(this);
		// this.getMultiPolygon               = this.getMultiPolygon.bind(this);
		this.onDrawCreated                 = this.onDrawCreated.bind(this);
		// this.onDrawEdited                  = this.onDrawEdited.bind(this);
		// this.onDrawDeleted                 = this.onDrawDeleted.bind(this);
		// this.createWktFromEditableLayer    = this.createWktFromEditableLayer.bind(this);
		// this.getWktShapeListFromEvent      = this.getWktShapeListFromEvent.bind(this);
		// this.getDrawLayer                  = this.getDrawLayer.bind(this);
		// this.calculateAreaSizeFromShapeObj = this.calculateAreaSizeFromShapeObj.bind(this);
		// this.drawEventHandler              = this.drawEventHandler.bind(this);
		// this.addShapeDefToLayer			       = this.addShapeDefToLayer.bind(this);
		// this.getWktShapeFromWkt 		       = this.getWktShapeFromWkt.bind(this);
		this.createShapeDefFromDrawLayer   = this.createShapeDefFromDrawLayer.bind(this);
		// this.toggleUnits		 		           = this.toggleUnits.bind(this);
		// this.onOverlayRemoved 	 		       = this.onOverlayRemoved.bind(this);
		// this.onOverlayAdded                = this.onOverlayAdded.bind(this);

		this.init();
	}

	init() {
		const { drawBar } = this.context.props;

		if (drawBar && drawBar.enable) {
			this.createElement(drawBar);

			// Add layer-line to layer manager
			this.context.layersController.addingDrawableLayerToLayerController(this.drawableLayer);


			if (this.element && this.drawableLayer) {
				this.context.map.on(L.Draw.Event.CREATED, this.onDrawCreated); // on-click handler
				this.context.map.on(L.Draw.Event.EDITED, this.onDrawEdited);
				this.context.map.on(L.Draw.Event.DELETED, this.onDrawDeleted);
				// Add plugin controls to Toolbar
				this.context.onAddControlToFeatures(FeaturesNames.DRAWBAR_COMP, this);
				this.context.map.on('overlayremove', this.onOverlayRemoved);
                this.context.map.on('overlayadd', this.onOverlayAdded);
			}

			if (this.context.props.layersController.enable) {
				// Add drawbar to layer controller
				this.context.layersController.element.addOverlay( this.drawableLayer, "Shapes", {groupName : "Draw Bar"} );
			}
		}
	}

	public getDrawLayer(): L.FeatureGroup {
		return this.drawableLayer;
	}

	public export(): WktShape[] {
		const exportDrawableLayers: Array<WktShape> = [];
		const layers = this.drawableLayer.getLayers();

		layers.forEach((layer: L.Layer) => {
			const manager: ShapeManagerInterface | null = ShapeManagerRepository.getManagerByShapeDefLayer(layer);
			if (manager) {
				const shape: ShapeObject = <ShapeObject>manager.getShapeObjectFromDrawingLayer(layer);
				const wkt: string   = manager.shapeObjectToWkt(shape);
				const id: number = L.Util.stamp(layer);	// Get leaflet layer id
				const areaSize: number = manager.getAreaSize(shape);
				exportDrawableLayers.push({ wkt, id, areaSize });
			}
		});
		return exportDrawableLayers;
	}

	public clear() {
		this.drawableLayer.clearLayers();
	}

	public getMultiPolygon() {
		const layers = this.drawableLayer.getLayers();
		const polygonList: PolygonShape[] = [];

		layers.forEach((layer: L.Layer) => {
			const manager: ShapeManagerInterface | null = ShapeManagerRepository.getManagerByShapeDefLayer(layer);

			if (manager && manager.getType() === ShapeType.POLYGON) {
				const shape: PolygonShape = <any>manager.getShapeObjectFromDrawingLayer(layer);
				polygonList.push(shape);
			}
		});

		const multiPolygon: MultiPolygonShape = {
			polygons: polygonList
		};

		const shapeObj: ShapeObject = {
			type: ShapeType.MULTIPOLYGON,
			shape: multiPolygon
		};

		const manager: ShapeManagerInterface | null = ShapeManagerRepository.getManagerByType(ShapeType.MULTIPOLYGON);

		if (manager) {
			const wkt = manager.shapeObjectToWkt(shapeObj);

			return wkt;
		} else {
			console.error('Undetected manager');
			return null;
		}
	}
	// TBD
	public toggleUnits(): void {
		console.log('TOOL BAR: toggleUnits() is TBD');
	}

    public onOverlayRemoved(e: any): void {
		// todo: change hardcoded "Draw Bar" to variable
		if (e.group.name === "Draw Bar") {
			// parent element of all drawing section has the class of "leaflet-draw-toolbar-top"
            const drawSectionParent = <HTMLElement>document.getElementById("draw-shapes-section");
			if (drawSectionParent) {
				const sectionsToDisable = <HTMLElement[]>Array.from([drawSectionParent, drawSectionParent.firstElementChild]);
				Utils.addClassesToHtmlCollection(sectionsToDisable, "disabled-toolbar-section");
				const actionElementsToDisable = <HTMLElement[]>Array.from(drawSectionParent.firstElementChild.children);
				Utils.addClassesToHtmlCollection(actionElementsToDisable, "disabled-toolbar-action", "leaflet-disabled");
			}
		}
    }

    public onOverlayAdded(e: any): void {
        // todo: change hardcoded "Draw Bar" to variable
        if (e.group.name === "Draw Bar") {
            // parent element of all drawing section has the class of "leaflet-draw-toolbar-top"
            const drawSectionParent = <HTMLElement>document.getElementById("draw-shapes-section");
            if (drawSectionParent) {
                const elementsToEnable = <HTMLElement[]>Array.from([drawSectionParent, drawSectionParent.firstElementChild]);
                Utils.removeClassesFromHtmlCollection(elementsToEnable, "disabled-toolbar-section");
                const actionElementsToEnable = <HTMLElement[]>Array.from(drawSectionParent.firstElementChild.children);
                Utils.removeClassesFromHtmlCollection(actionElementsToEnable, "disabled-toolbar-action", "leaflet-disabled");
            }
        }
    }

	public import(wktShapesArr: Array<WktShape>) {
		// Iterate all imported WktShapes
		wktShapesArr.forEach((item: WktShape) => {
			const shapeDef: ShapeDefinition = {
				shapeWkt: item.wkt,
				data: {
					name: 'Editable layer', // TBD get isSelected from extended data
					isSelected: false		// TBD get isSelected from extended data
				}
			};
			const manager: ShapeManagerInterface | null = ShapeManagerRepository.getManagerByWkt(item.wkt);

			if (manager) {
				// Add shapeObject from wkt
				if (!shapeDef.shapeObject && shapeDef.shapeWkt) {
					shapeDef.shapeObject = manager.shapeWktToObject(shapeDef.shapeWkt);
				}
				const leafletObject: L.Layer | L.FeatureGroup = manager.addShapeToLayer(shapeDef, this.drawableLayer, { 
					click: Utils.shapeOnClickHandler.bind(this, manager, this.context)
				});
				Utils.createBubble(leafletObject, BUBBLE_TYPE.TOOLTIP);
				leafletObject.layerName = LayerNames.DRAWABLE_LAYER;
			}
		});

		// Run onEndImportDraw Callback
		const allDrawableLayers: WktShape[] = this.export();
		this.context.props.onEndImportDraw(allDrawableLayers);
	}
	// Draw listener
	private drawEventHandler(drawEvent: any) {
		const manager: ShapeManagerInterface = ShapeManagerRepository.getManagerByShapeDefLayer(drawEvent.layer);

		let layerEnumType: ShapeType = ShapeManagerRepository.getTypeNumberByDrawableTypeName(drawEvent.layerType);
		if (layerEnumType === ShapeType.MARKER) {
			const className: string = _.get<any, string | undefined>(drawEvent.layer, 'options.icon.options.className');

			if (className === textIconClassName) {
				// Label support
				layerEnumType = ShapeType.LABEL;
				editTextMarker(drawEvent.layer);

				drawEvent.layer.on("dblclick", () => {
					editTextMarker(drawEvent.layer);
				});
			}
		}
		// Add this draw to draw-layer
		const leafletObject: L.Layer | L.FeatureGroup = manager.addShapeToLayer(drawEvent.layer.shapeDef, this.drawableLayer, { 
			click: Utils.shapeOnClickHandler.bind(this, manager, this.context)
		});
		Utils.createBubble(leafletObject, BUBBLE_TYPE.TOOLTIP);
	}

	private createElement(options?: DrawBarOptions): void {
		// Create edit layer
		if (!this.drawableLayer) {
			this.drawableLayer = new L.FeatureGroup([]);
		}

		const optionsDev: DrawBarOptions_Dev = <DrawBarOptions_Dev>options;
		const isCircle: boolean = _.get(optionsDev, 'draw.circle');

		// Component initialization
		if (isCircle) {
			const { mapUnits } = this.context;
			optionsDev.draw.circle = {
				metric: mapUnits === Units.METRIC ? true : false
			};
		}

		const removeVal: boolean = _.get(optionsDev, 'edit.remove') ? true : false;

		const drawBarOptionsEditDev: DrawBarOptionsEdit_Dev = {
			featureGroup: this.drawableLayer,
			remove: removeVal
		};

		const drawBarOptionsDev: DrawBarOptions_Dev = {
			draw: optionsDev && optionsDev.draw ? optionsDev.draw : {},
			edit: drawBarOptionsEditDev
		};
		// Create draw controls
		this.element = new L.Control.Draw(drawBarOptionsDev);
		this.context.map.addControl(this.element); // add this control to map
	}

	private createShapeDefFromDrawLayer(layer: L.Layer, shapeType: ShapeType): ShapeDefinition {
		const manager: ShapeManagerInterface = ShapeManagerRepository.getManagerByType(shapeType);
		if (!manager) { return null; }

		// Calculate area size
		const shapeObject: ShapeObject = manager.getShapeObjectFromDrawingLayer(layer);

		// Create WktShape from wkt, id, area size
		const shapeWkt: string = manager.shapeObjectToWkt(shapeObject);
		const shapeData: ShapeData = { name: 'Editable layer', isSelected: false, count: 1 };
		return { shapeObject, shapeWkt, data: shapeData };
	}
	private getWktShapeFromWkt(drawShapeLayer: any): WktShape {
		const manager: ShapeManagerInterface = ShapeManagerRepository.getManagerByShapeDefLayer(drawShapeLayer);

		if (manager) {
			// Create WktShape from wkt, id, area size
			const { shapeWkt, shapeObject } = drawShapeLayer.shapeDef;
			const id: number = L.Util.stamp(drawShapeLayer);	// Get leaflet layer id
			const areaSize: number = this.calculateAreaSizeFromShapeObj(manager, shapeObject);
			return { wkt: shapeWkt, areaSize, id };
		} else {
			console.error('Cant find shape manager by ShapeManagerRepository.getManagerByShapeDefLayer()', drawShapeLayer);
			return null;
		}
	}
	private onDrawCreated(e: any): void {
		const layerEnumType: ShapeType = ShapeManagerRepository.getTypeNumberByDrawableTypeName(e.layerType);
		const shapeDef: ShapeDefinition = this.createShapeDefFromDrawLayer(e.layer, layerEnumType);

		// Add shapeDef to layer
		e.layer = this.addShapeDefToLayer(e.layer, shapeDef) as L.FeatureGroup;

		// Event handler
		this.drawEventHandler(e);

		// Use callback of onDrawCreated
		const wktShape: WktShape = this.getWktShapeFromWkt(e.layer);
		@EventEmitter()
		this.context.props.onDrawCreated(wktShape);
	}
	private onDrawEdited(e: any): void {
		// Save output
		const wktList: WktShape[] = [];

		e.layers.eachLayer((layer: L.Layer) => {
			// Create shapeDef object for this layer
			const { shapeObject, shapeWkt } = this.createShapeDefFromDrawLayer(layer, layer.shapeDef.shapeObject.type);
			// Update just shapeObject, and shapeWkt
			_.merge(layer.shapeDef, { shapeObject, shapeWkt });

			// Create WktShape from layer
			const wktShape: WktShape = this.getWktShapeFromWkt(layer);
			if (wktShape) {
				wktList.push(wktShape);
			}
		});
		// Use callback of onDrawEdited
		this.context.props.onDrawEdited(wktList);
	}
	private onDrawDeleted(e: any): void {
		const wktList: WktShape[] = this.getWktShapeListFromEvent(e);
		// Use callback of onDrawDeleted
		this.context.props.onDrawDeleted(wktList);
	}
	private getWktShapeListFromEvent(e: any) {
		const wktList: WktShape[] = [];
		e.layers.eachLayer((layer: L.Layer) => {
			const wkt: WktShape = this.createWktFromEditableLayer(layer);
			if (wkt) {
				wktList.push(wkt);
			}
		});
		return wktList;
	}
	private calculateAreaSizeFromShapeObj(manager: ShapeManagerInterface, shapeObj: ShapeObject): number {
		const areaSize = manager.getAreaSize(shapeObj);
		return areaSize || 0;
	}
	private createWktFromEditableLayer(drawShapeLayer: L.Layer): WktShape {
		const manager: ShapeManagerInterface = ShapeManagerRepository.getManagerByShapeDefLayer(drawShapeLayer);

		if (manager) {
			// Calculate area size
			const shapeObj: ShapeObject = manager.getShapeObjectFromDrawingLayer(drawShapeLayer);

			// Create WktShape from wkt, id, area size
			const wkt: string = manager.shapeObjectToWkt(shapeObj);
			const id: number = L.Util.stamp(drawShapeLayer);	// Get leaflet layer id
			const areaSize: number = this.calculateAreaSizeFromShapeObj(manager, shapeObj);
			return { wkt, areaSize, id };
		} else {
			console.error('Cant find shape manager by ShapeManagerRepository.getManagerByShapeDefLayer()', drawShapeLayer);
			return null;
		}
	}

	private addShapeDefToLayer(layer: L.FeatureGroup, shapeDef: ShapeDefinition): L.FeatureGroup {
		_.merge(layer, { shapeDef, layerName: LayerNames.DRAWABLE_LAYER });
		return layer;
	}
}



/* tslint:disable */
const LeafletAny: any = L;
let myMap: any;

function editTextMarker(marker: any) {
	const value = prompt("enter label", marker.value);

	if (value) {
		marker.value = value;
		let existingIcon: any = marker._icon;
		if (!existingIcon) {
			marker.setIcon(createLabelIcon(textIconClassName, value));
		} else {
			existingIcon.innerHTML = value;
		}
	} else {
		const isFirstEdit: boolean = !marker.value;
		const isDialogCancelled: boolean = value === null;

		if (isFirstEdit) {
			throw new Error("Adding marker cancelled by user");
		}

		// user types in empty string and pressed ok
		if (!isDialogCancelled) {
			myMap.removeLayer(marker);
		}
	}
}

LeafletAny.DrawToolbar.include({
	getModeHandlers: function (map: any) {
		myMap = map;
		return [
			{
				enabled: this.options.polyline,
				handler: new LeafletAny.Draw.Polyline(map, this.options.polyline),
				title: LeafletAny.drawLocal.draw.toolbar.buttons.polyline
			},
			{
				enabled: this.options.polygon,
				handler: new LeafletAny.Draw.Polygon(map, this.options.polygon),
				title: LeafletAny.drawLocal.draw.toolbar.buttons.polygon
			},
			{
				enabled: this.options.rectangle,
				handler: new LeafletAny.Draw.Rectangle(map, this.options.rectangle),
				title: LeafletAny.drawLocal.draw.toolbar.buttons.rectangle
			},
			{
				enabled: this.options.circle,
				handler: new LeafletAny.Draw.Circle(map, this.options.circle),
				title: LeafletAny.drawLocal.draw.toolbar.buttons.circle
			},
			{
				enabled: this.options.marker,
				handler: new LeafletAny.Draw.Marker(map, this.options.marker),
				title: LeafletAny.drawLocal.draw.toolbar.buttons.marker
			},
			{
				enabled: this.options.textualMarker,
				handler: new LeafletAny.Draw.Marker(map, {
					icon: createLabelIcon(textIconClassName, 'A_'),
					type: 'text'
				}),
				title: 'Add textual marker'
			},
		];
	}
});

const createLabelIcon = (labelClass: string, labelText: string) => (
	L.divIcon({
		className: labelClass,
		html: labelText
	})
);

export type DrawBarOptions_Dev = DrawBarOptions & {
	draw?: DrawBarOptionsDraw_Dev,
	edit?: DrawBarOptionsEdit_Dev
};

type DrawBarOptionsDraw_Dev = DrawBarOptionsDraw & {
	circle?: any,
}

type DrawBarOptionsEdit_Dev = DrawBarOptionsEdit & {
	featureGroup: L.FeatureGroup
};