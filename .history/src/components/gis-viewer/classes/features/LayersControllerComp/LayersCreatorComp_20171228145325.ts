// Leaflet Marker-Cluster
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
// Leaflet Heat-Map
import 'leaflet.heat';
import { GisPluginContext } from "../../pluginBase";
import { ShapeManagerInterface } from "../../shapes/ShapeManager";
import { ShapeManagerRepository } from "../../shapes/ShapeManagerRepository";
import { ShapeLayerContainer } from "../../../../../models/shapeLayerContainer";
import { MIN_OPACITY, BUBBLE_TYPE } from "../../statics";
import { ShapeLayerDefinition, ClusterOptions, ShapeObjectOptions, Coordinate } from "../../../../../models/apiModels";
import Utils from '../../utils';
import _ from 'lodash';
import L from 'leaflet';
import { Component } from '@stencil/core';

export const HEAT_LAYER    = 'Heat Layer';
export const CLUSTER_LAYER = 'Cluster Layer';


@Component({
	tag: 'layers-creator-comp',
	styleUrls: [
		'../../../../node_modules/leaflet.markercluster/dist/MarkerCluster.css'
	],
})
export class LayersCreatorComp {
	public static defaultClusterOptions: any = {
		singleMarkerMode: false,
		disableClusteringAtZoom: 13,
		chunkedLoading: true,
		chunkProgress: LayersCreatorComp.updateProgressBar,
		iconCreateFunction: LayersCreatorComp.iconCreateFunction,
	};

	public static createHeatAndClusterLayer(shapeLayerDef: ShapeLayerDefinition, context: GisPluginContext): ShapeLayerContainer {
		
		const layerContainer: ShapeLayerContainer = {
	      	layerDefinition: shapeLayerDef,
	      	leafletHeatLayer: null,
	    	leafletClusterLayer: null,
			isDisplay: <boolean>_.get(shapeLayerDef, 'isDisplay', true)
	    };
		if (!_.get(shapeLayerDef,'shapes.length')) { return layerContainer; };
		
		layerContainer.leafletHeatLayer = LayersCreatorComp.createHeatLayer(shapeLayerDef); // will be added later
		// layerContainer.leafletClusterLayer = LayersCreatorComp.createClusterLayer(shapeLayerDef, layerContainer.isDisplay, context); // will be added later
		return layerContainer;
	}

	public static createHeatLayer(layer: ShapeLayerDefinition): L.HeatLayer {
		let heatLayerGroup: L.HeatLayer = null;
		const coordinateList: Coordinate[] = [];

		for (const shapeDef of layer.shapes) {
			// Iterate all shapes in this layer (some object types)
			const manager: ShapeManagerInterface | null = ShapeManagerRepository.getManagerByShapeDefinition(shapeDef);

			if (manager) {
				// Fix missing wkt flow
				if (shapeDef.shapeObject && !shapeDef.shapeWkt) {
					shapeDef.shapeWkt = manager.shapeObjectToWkt(shapeDef.shapeObject, shapeDef.options);
				}

				// Fix missing shapeObject flow
				if (!shapeDef.shapeObject && shapeDef.shapeWkt) {
					shapeDef.shapeObject = manager.shapeWktToObject(shapeDef.shapeWkt);
				}
				const coords: Coordinate = manager.getHeatLayerPoints(shapeDef.shapeObject);

				if (coords) {
					coordinateList.push(coords);
				}
			}
		}

		if (coordinateList.length) {
			heatLayerGroup = _createHeatLayerByCoordinates(coordinateList);
		}
		return heatLayerGroup;

		function _createHeatLayerByCoordinates(heatData: Coordinate[]): L.HeatLayer {
			return <L.HeatLayer> new L.HeatLayer(heatData, { minOpacity: MIN_OPACITY });
		}
	}

	// public static createClusterLayer(layer: ShapeLayerDefinition, isDisplay: boolean, context: GisPluginContext): L.MarkerClusterGroup {
	// 	let clusterLayer: L.MarkerClusterGroup = null; 
	// 	const clusterOptions: ClusterOptions = _.get(this,'context.props.mapSettings.clusterOptions', {});
	// 	const {
	// 		singleMarkerMode,
	// 		disableClusteringAtZoom,
	// 		chunkedLoading,
	// 		chunkProgress
	// 	} = clusterOptions;

	// 	const clusterOptions_Dev: ClusterOptions_Dev = {
	// 		singleMarkerMode: singleMarkerMode || LayersCreatorComp.defaultClusterOptions.singleMarkerMode,
	// 		disableClusteringAtZoom: disableClusteringAtZoom || LayersCreatorComp.defaultClusterOptions.disableClusteringAtZoom,
	// 		chunkedLoading: chunkedLoading || LayersCreatorComp.defaultClusterOptions.chunkedLoading,
	// 		iconCreateFunction: LayersCreatorComp.defaultClusterOptions.iconCreateFunction
	// 	};

	// 	if (chunkProgress) {
	// 		_.assign(clusterOptions_Dev, { chunkProgress: LayersCreatorComp.defaultClusterOptions.chunkProgress });
	// 	}

	// 	clusterLayer = new L.MarkerClusterGroup(clusterOptions_Dev);

	// 	for (const shapeDef of layer.shapes) {
	// 		shapeDef.options = <ShapeObjectOptions>_.get(shapeDef, 'options', {});
	// 		// Iterate all shapes in this layer (some object types)
	// 		const manager: ShapeManagerInterface | null = ShapeManagerRepository.getManagerByShapeDefinition(shapeDef);

	// 		if (manager) {

	// 			const leafletObject: L.Layer | L.FeatureGroup = manager.addShapeToLayer(shapeDef, clusterLayer, {
	// 				click: Utils.shapeOnClickHandler.bind(this, manager, context)
	// 			});
				
	// 			if (isDisplay) {
	// 				// Layer should be displayed
	// 				const isSelected: boolean = _.get(shapeDef, 'data.isSelected');
	// 				if (isSelected) {
	// 					// Selected Object
	// 					const layerId: string = String(L.Util.stamp(leafletObject));	// Get leaflet layer id
	// 					// Add leaflet id to selected object list
	// 					context.selectedLeafletObjects[layerId] = leafletObject;
	// 					// Select layer if need
	// 					manager.updateIsSelectedView(leafletObject);
	// 				}
	// 			}
	// 			// Create bubble
	// 			Utils.createBubble(leafletObject, BUBBLE_TYPE.TOOLTIP);
				
	// 			leafletObject.layerName = layer.layerName;	// For Exporting layer name of this object
	// 		}
	// 	}

	// 	clusterLayer.on('clusterclick', (e: any) => {
	// 		if (e.originalEvent.ctrlKey) {
	// 			// select all layers
	// 			console.warn('TBD select all shapes behind this cluster'); // TBD
	// 		}
	// 		// color all the clusterd object
	// 		console.warn('TBD color all selected shapes behind this cluster'); // TBD
	// 	});
	// 	return clusterLayer;
	// }



	public static updateProgressBar(processed: number, total: number, elapsed: number, layersArray?: any[]) {
		var progress = document.getElementById('progress');
		var progressBar = document.getElementById('progress-bar');

		if (!progress || !progressBar) { return; }

		if (elapsed > 1000) {
			// if it takes more than a second to load, display the progress bar:
			progress.style.display = 'block';
			progressBar.style.width = Math.round(processed / total * 100) + '%';
		}
		if (processed === total) {
			// all markers processed - hide the progress bar:
			progress.style.display = 'none';
		}
	}

	public static iconCreateFunction(cluster: L.MarkerClusterGroup): any {
		// iterate all markers and count
		const childrenList = cluster.getAllChildMarkers();
		let weight = 0;

		childrenList.forEach((leafletLayer: any) => {
			const count: number = _.get(leafletLayer, 'shapeDef.data.count');
			weight += (count || 1);
		});

		const size: string = (weight < 10) ? 'small' : ((weight < 100)
			? 'medium'
			: 'large');

		// create the icon with the "weight" count, instead of marker count
		return L.divIcon({
			html: `<div><span>${weight}</span></div>`,
			className: `marker-cluster marker-cluster-${size}`,
			iconSize: new L.Point(40, 40)
		});
	}
}


export type ClusterOptions_Dev = ClusterOptions & {
	iconCreateFunction?: Function; // (cluster: L.MarkerClusterGroup) => any;
	chunkProgress?: Function; // (processed: number, total: number, elapsed: number, layersArray?: any[]) => void;
};