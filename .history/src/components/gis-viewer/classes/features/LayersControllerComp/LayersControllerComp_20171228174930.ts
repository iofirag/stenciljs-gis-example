import { GisPluginContext, MapState, SelectionMode } from "../../pluginBase";
import { LayerNames, FILE_TYPES, ImportFileFormats, FeaturesNames, LayersTypeLabel, EXPORT_SHAPE_FIELDS } from "../../statics";

// import "leaflet.styledlayercontrol/css/styledLayerControl.css";
import "leaflet.styledlayercontrol";
import { ShapeLayerContainer } from "../../../../../models/shapeLayerContainer";

// // import '../../../../../../node_modules/leaflet.styledlayercontrol/css/styledLayerControl.css'
// // import "./LayersControllerComp.css";

// import { GisPluginContext, MapState, SelectionMode } from "../../pluginBase";
// import { ShapeLayerDefinition, ClusterHeat, ShapeDefinition } from "../../../../../models/apiModels";
// import LayersCreatorComp from "./LayersCreatorComp";
// import { FeaturesNames, LayerNames, LayersTypeLabel, ImportFileFormats, FILE_TYPES, EXPORT_SHAPE_FIELDS } from "../../statics";
import _ from "lodash";
import L from "leaflet";
// import { GeoJSON } from "leaflet";
import csv2geojson from 'csv2geojson'
import { ClusterHeat, ShapeLayerDefinition, ShapeDefinition } from "../../../../../models/apiModels";
import { LayersCreatorComp } from "./LayersCreatorComp";
import { ShapeManagerRepository } from "../../shapes/ShapeManagerRepository";
import Utils from "../../utils";
import shp from '../../../../../assets/shp';

// // const shp:      any = require('../../../../../common-utils/shp');
import togeojson from '@mapbox/togeojson'; 
import xmldom from 'xmldom'

// @Component({
//   tag: 'layers-controller-comp',
//   styleUrls: [
//     '../../../../../../node_modules/material-design-lite/material.min.css',             // Need to import this from styledLayerControl.css
//     '../../../../../../node_modules/leaflet.styledlayercontrol/css/MaterialIcons.css',  // Need to import this from styledLayerControl.css

//     '../../../../../../node_modules/leaflet.styledlayercontrol/css/styledLayerControl.css',
//     './LayersControllerComp.css'
//   ],
// })
export class LayersControllerComp {
  public element: any;
  public htmlBtElement: HTMLElement;
  private styledLayerConroller: any;

  // Default shape data
  // private defaultShapeData: ShapeData = {
  //   name: "No name",
  //   description: "imported from kml",
  //   count: 1
  // };

  constructor(public context: GisPluginContext) {
//     // super();

//     // Bind this first!
    // this.init                          = this.init.bind(this);
//     // this.onLayerAdd                    = this.onLayerAdd.bind(this);
    // this.createElement                 = this.createElement.bind(this);
//     // this.onLayerRemove                 = this.onLayerRemove.bind(this);
//     // this.onReadKml                     = this.onReadKml.bind(this);
//     // this.onReadCsv                     = this.onReadCsv.bind(this);
//     // this.onReadShp                     = this.onReadShp.bind(this);
//     // this.createOverlayLayers           = this.createOverlayLayers.bind(this);
//     // this.onOverlayChanged_updateSelections = this.onOverlayChanged_updateSelections.bind(this);

    this.context.layersController = this;

    // hack for enabling attach event listener on tagged templates html syntax/ DON'T REMOVE!!! CODE WILL BREAK!!!
    (Element.prototype as any).appendHtmlWithContext = function (dom: string, context: any) {
      this.innerHTML = dom;
      const elements = this.querySelectorAll("[attachEvent]");

      elements.forEach(function (element: any) {
        element.getAttribute("attachEvent").split(";").forEach(function (event: any) {
          const eventNameAndHandler = event.split(":");
          const eventName = eventNameAndHandler[0];
          const eventHandler = eventNameAndHandler[1];

          if (eventName && eventHandler) {
            element.addEventListener(eventName, context[eventHandler].bind(context));
          }
        });
      });
    };

    this.init();
  }
  
  init() {
    this.createElement();
    this.context.map.addControl(this.element);
    // Set first base map as working tile
    const tileName: string = Object.keys(this.context.mapState.baseMaps)[0];
    this.element.selectLayer(this.context.mapState.baseMaps[tileName]);

    // Layers creator
    this.initiateLayers();

    const { layersController } = this.context.props;

    if (layersController && layersController.enable) {
      this.context.onAddControlToFeatures(FeaturesNames.LAYERS_CONTROLLER_COMP, this);

      // HTML button element
      this.htmlBtElement = this.createToolbarButton("div", "layer-controller", "Layer Controller") as HTMLElement;

      this.htmlBtElement.addEventListener("click", () => {
        this.toggleClassNamefromElement(this.element._container, "show");
        this.toggleClassNamefromElement(this.htmlBtElement, "clicked");
      });
      // Stop double click on plugin
      _.forEach([this.htmlBtElement, this.element._container], (item: HTMLElement) => Utils.stopDoubleClickOnPlugin(item));
    }
    /* Add map events */
    // Base layers change event
    // tslint:disable-next-line:no-empty
    this.context.map.on("baselayerchange", () => {} );

    // Overlays change checkbox events
    this.context.map.on("overlayadd overlayremove", this.onOverlayChanged_updateSelections);

    // Every layer add/remove
    this.context.map.on("layeradd", this.onLayerAdd);
    this.context.map.on("layerremove", this.onLayerRemove);
  }

//   public update() {
//     console.log('TBD show selections');

//     // Remove old layers
//     console.log(this.element);
//     _.map(this.context.mapState.initialLayers, (item: ShapeLayerContainer) => {
//       // Check if Drawable layer or KML layer
//       if (item.leafletHeatLayer) {
//         this.element.deleteLayer(item.leafletHeatLayer); // Delete layer data from plugin
//       }

//       if (item.leafletClusterLayer) {
//         this.element.deleteLayer(item.leafletClusterLayer); // Delete layer data from plugin
//       }
//     });

//     this.context.mapState.initialLayers = [];
//     console.log(this.context.mapState.initialLayers);

//     this.initiateLayers();

//     Utils.updateLayerControllerLayersClass(this.context.mapSettings.mode);
//   }

  public initiateLayers() {
    const shapeLayers: ShapeLayerDefinition[] = _.get(this, 'context.props.shapeLayers');

    let layerContainers: ShapeLayerContainer[] = [];
    if (shapeLayers && shapeLayers.length) {
			shapeLayers.forEach((item: ShapeLayerDefinition) => {
        const shapeLayerContainer: ShapeLayerContainer = LayersCreatorComp.createHeatAndClusterLayer(item, this.context);
        layerContainers.push(shapeLayerContainer);
      });

      // tslint:disable-next-line:align
      layerContainers.forEach((layerContainer: ShapeLayerContainer) => {
        this.addingNewLayerToLayerController(layerContainer, LayerNames.INITIAL_LAYERS);
      });
    }
  }
  public geoJsonToShapeDef(geoJson: L.GeoJSON): ShapeDefinition {
    const shape: ShapeDefinition = {};

    const geoJsonAny: any = geoJson;// hotfix
    // WKT
    if (geoJsonAny.properties[EXPORT_SHAPE_FIELDS.shapeWkt]) {
      shape.shapeWkt = geoJsonAny.properties[EXPORT_SHAPE_FIELDS.shapeWkt];
    }
    // Data
    if (geoJsonAny.properties[EXPORT_SHAPE_FIELDS.shapeDataObj]) {
      shape.data = JSON.parse(geoJsonAny.properties[EXPORT_SHAPE_FIELDS.shapeDataObj]);
    }
    // Options
    if (geoJsonAny.properties[EXPORT_SHAPE_FIELDS.shapeOptionsObj]) {
      shape.options = JSON.parse(geoJsonAny.properties[EXPORT_SHAPE_FIELDS.shapeOptionsObj]);
    }
    return shape;
  }
  public geoJsonListToShapeDefList(geoJsonList: L.GeoJSON[]): ShapeDefinition[] {
    return geoJsonList.reduce((accumulator: ShapeDefinition[], geoJson: L.GeoJSON) => {
      const shapeDef: ShapeDefinition = this.geoJsonToShapeDef(geoJson);
      if (shapeDef.shapeWkt) {
        accumulator.push(shapeDef);
  }
      return accumulator;
    }, []);
  }
  public onReadKml(fileNames: FileNames, onLoadEvent?: any): void {
    const content: string = onLoadEvent.target.result;
    if (!content) { throw 'Empty content'; }

    try {
      const DOMParser = xmldom.DOMParser;
      const kmlAsXml = new DOMParser().parseFromString(content);
      const geoJsonOfKml: L.GeoJSON = togeojson.kml(kmlAsXml);

      if (geoJsonOfKml && (geoJsonOfKml as any).features) {
        const geoJsonList: L.GeoJSON[] = (geoJsonOfKml as any).features;
        this.geoJsonToLeafletLayer(geoJsonList, fileNames);
      }
    } catch(ex) {
      console.error('Kml File failed to load: ', ex);
    }
  }
  public onReadCsv(fileNames: FileNames, onLoadEvent?: any): void {
    const content: string = onLoadEvent.target.result;
    if (!content) { throw 'Empty content'; }

    try {
      csv2geojson.csv2geojson(content, this.csv2geojsonCB.bind(this, fileNames));
    } catch (ex) {
      console.error('Csv File failed to load: ', ex);
    }
  }

  public onReadShp(fileNames: FileNames, onLoadEvent: any): void {
    const buffer: ArrayBuffer = onLoadEvent.target.result;

    shp(buffer).then((geojsons: any) => {
      let geoJsonList: any[];

      if (Array.isArray(geojsons)) {
        geoJsonList = _.reduce(geojsons, (acc: any[], geoJson: any) => {
          acc.push(...geoJson.features);
          return acc;
        }, []);
      } else {
        geoJsonList = geojsons.features;
      }

      this.geoJsonToLeafletLayer(geoJsonList, fileNames);
    }).catch((e: any) => {
      console.error('Error in Shapefile: ', e.message);
    });
  }

  public addingDrawableLayerToLayerController(drawableLayer: L.FeatureGroup) {
    this.context.mapState.drawableLayers.push(drawableLayer);
    this.element.addOverlay(drawableLayer, 'Shapes', {groupName: LayerNames.DRAWABLE_LAYER});
    // Turn on this layer
    this.element.selectLayer(drawableLayer);
  }
  // Add layer to layer manager
  public addingNewLayerToLayerController(shapeLayerContainer: ShapeLayerContainer, groupName?: string): void {

    // BASE_MAPS
    // INITIAL_LAYERS
    this.context.mapState.initialLayers.push(shapeLayerContainer);

    const { isDisplay, leafletHeatLayer, layerDefinition, leafletClusterLayer } = shapeLayerContainer;
    const mode:                  ClusterHeat   = this.context.mapSettings.mode;
    const showLayerStateHeat:    SelectionMode = (isDisplay && mode === 'heat')    ? 'selectLayer' : 'unSelectLayer';
    const showLayerStateCluster: SelectionMode = (isDisplay && mode === 'cluster') ? 'selectLayer' : 'unSelectLayer';

    this.addLayerToLayerController(showLayerStateHeat, leafletHeatLayer, layerDefinition, groupName, 'Heat');
    this.addLayerToLayerController(showLayerStateCluster, leafletClusterLayer, layerDefinition, groupName, 'Cluster');
  }

  public getFileNamesFromFileName(fileNameWithExtension: string): FileNames {
    const dotIndex:          number    = fileNameWithExtension.lastIndexOf(".");
    const fileName:          string    = fileNameWithExtension.substr(0, dotIndex);
    let fileExtention:     string    = fileNameWithExtension.substr(dotIndex + 1);
    if (fileExtention) {
      fileExtention = fileExtention.toLowerCase();
    }

    const fileNameStructure: FileNames = { fileName, fileExtention };


    return fileNameStructure;
  }

  private csv2geojsonCB(fileNames: FileNames, err: any, geoJsonOfCsv: L.GeoJSON) {
    if (err) { throw 'Parse csv error' };
    if (geoJsonOfCsv && geoJsonOfCsv.features) {
      const prettifyGeoJsonList: L.GeoJSON[] = [];

      // Prettify GeoJson properties
      const geoJsonList: L.GeoJSON[] = geoJsonOfCsv.features;
      geoJsonList.forEach((geoJson: L.GeoJSON, i: number) => {
        geoJson = Utils.pretifyCsvJson(geoJson);	// Fix data for creating valid csv
        prettifyGeoJsonList.push(geoJson);
      });
      this.geoJsonToLeafletLayer(prettifyGeoJsonList, fileNames);
    }
  }

  private geoJsonToLeafletLayer(geoJsonList: L.GeoJSON[], fileNames: FileNames) {
    const shapes: ShapeDefinition[] = this.geoJsonListToShapeDefList(geoJsonList);

    // Layer name
    const layerName: string = `${fileNames.fileName} (${fileNames.fileExtention})`;

    const shapeLayerDefinition: ShapeLayerDefinition = {
      layerName,
      shapes,
      isDisplay: true
    };

    // There is at least one extended data, so present it
    const layerContainer:  ShapeLayerContainer = LayersCreatorComp.createHeatAndClusterLayer(shapeLayerDefinition, this.context);

    // Add to mapState
    this.context.mapState.importedLayers[fileNames.fileExtention].push(layerContainer);

    const mode: SelectionMode = this.context.mapSettings.mode as SelectionMode;
    // Layer contains heat layer
    if(layerContainer.leafletHeatLayer) {
      this.element.addOverlay(
        layerContainer.leafletHeatLayer,
        layerContainer.layerDefinition.layerName.replace(`(${fileNames.fileExtention})`, '(Heat)'),
        { groupName: fileNames.fileExtention.toUpperCase() + ' Layers' },
        LayersTypeLabel.HEAT.toLowerCase()
      );
      // Turn on layer
      if (mode === LayersTypeLabel.HEAT) {
        this.element.selectLayer(layerContainer.leafletHeatLayer);
      }
    }

    // Layer contains cluster layer
    if(layerContainer.leafletClusterLayer) {
      this.element.addOverlay(
        layerContainer.leafletClusterLayer,
        layerContainer.layerDefinition.layerName.replace(`(${fileNames.fileExtention})`, '(Cluster)'),
        { groupName: fileNames.fileExtention.toUpperCase() + ' Layers' },
        LayersTypeLabel.CLUSTER.toLowerCase()
      );
      // Turn on layer
      if (mode === LayersTypeLabel.CLUSTER) {
        this.element.selectLayer(layerContainer.leafletClusterLayer);
      }
    }

    // Zoom to extend on new data
    Utils.zoomToExtend(this.context.mapState, this.context.map);
    // const returnToMode = this.context.mapSettings.mode === 'cluster' ? 'heat' : 'cluster';
    Utils.updateLayerControllerLayersClass(this.context.mapSettings.mode);
  }

  private addLayerToLayerController(showLayerState: SelectionMode, layer: any, layerDefinition: any, groupName: string, mode: string) {

    if (!layer) { return; }
    // Add layer to layer manager
    this.element.addOverlay(layer, `${layerDefinition.layerName} (${mode})`, { groupName }, mode.toLowerCase());
    // select or unselect Layer
    this.element[showLayerState](layer);
  }

  private createToolbarButton(
    tagElement: string,
    className: string,
    title?: string,
    innerHTML?: any
  ) {
    const button = L.DomUtil.create(
      tagElement,
      `custom-toolbar-button ${className}`
    );

    if (title) {
      button.title = title;
    }

    if (innerHTML) {
      button.innerHTML = innerHTML;
    }

    if (tagElement.toLocaleLowerCase() === "a") {
      button.setAttribute("href", "#");
    }

    return button;
  }

  private toggleClassNamefromElement(elm: HTMLElement, className: string) {
    const AddOrRemove =
      elm.className.indexOf(className) > -1 ? "remove" : "add";
    elm.classList[AddOrRemove](className);
  }

  private overlayMapsProjection(mapState: MapState): any {

    const layerGroupsList = _.reduce(mapState,(result: any[], leafletLayer: any, layerName: string) => {
      const layerNameToArray: string[] = layerName.toLowerCase().replace(/([)])/g, '').split(' (');

      // tslint:disable-next-line:switch-default
      switch(layerNameToArray.length) {
        case 2: {
          const basicLayerName: string = layerNameToArray[0];
          const layerMode:      string = layerNameToArray[1].replace(' layer','');
          const newLayerName:   string = `${basicLayerName} (${layerMode})`;
          const initLayers: any = {
            'Initial Layers' : {
              [newLayerName]: leafletLayer
            }
          };
          _.merge(result, initLayers);
          break;
        }
        case 3: {
          const basicLayerName: string = layerNameToArray[0];
          const layerType:      string = layerNameToArray[1];
          const layerMode:      string = layerNameToArray[2].replace(' layer','');
          const newLayerName:   string = `${basicLayerName} (${layerMode})`;

          const typedLayers: any = {
            [`${layerType.toUpperCase()} Layers`] : {
              [newLayerName]: leafletLayer
            }
          };

          _.merge(result, typedLayers);
          break;
        }
      }
			   return result;
    // tslint:disable-next-line:align
    },{});

    const result: any[] = this.createOverlayLayers(layerGroupsList);

    return result;
  }

  private createOverlayLayers(overlaysMapProjection: any): any[] {
    const result: any[] = [];
    const groupNames: string[] = Object.keys(overlaysMapProjection);

    groupNames.forEach((groupName: string, i: number) => {
      const layers = overlaysMapProjection[groupName];
      const item: any = {
        groupName,
        layers,
        expanded: true
      };

      if (groupName === LayerNames.DRAWABLE_LAYER) {
        result.unshift(item);
      } else {
        result.push(item);
      }

    });
    return result;
  }

  private changeDisplayAfterOneOverlayChanged(layerGroupName: string, layerName: string , isChecked: boolean): void {
    // const { FILE_TYPES.kml.toUpperCase() + '_Layers', CSV_LAYERS, SHP_LAYERS } = LayerNames;
    const LayersTypes: string[] = []
    Object.values(FILE_TYPES).forEach((type: string)=> {
      LayersTypes.push(type.toUpperCase() + ' Layers');
    });

    // Find layer in initial layers
    if (layerGroupName.includes(LayerNames.INITIAL_LAYERS)) {
      this.context.mapState.initialLayers.forEach((dataLayer: ShapeLayerContainer) => {
        if (layerName.includes(dataLayer.layerDefinition.layerName)) {
          dataLayer.isDisplay = isChecked;
        }
      });
    } else if (LayersTypes.includes(layerGroupName)) {
      // Find layer in imported layers
      _.map(this.context.mapState.importedLayers, (fileTypeLayerList: ShapeLayerContainer[], key: string) => {
        _.map(fileTypeLayerList, (dataLayer: ShapeLayerContainer) => {
          // Remove import indetifier key from name
          const index: number = dataLayer.layerDefinition.layerName.toLowerCase().lastIndexOf(`(${key})`);
          const layerNameWithoutExt: string = dataLayer.layerDefinition.layerName.substring(0, index);

          if (layerName.includes(layerNameWithoutExt)) {
            dataLayer.isDisplay = isChecked;
          }
        });
      });
    }
  }

  private createElement(): void {
    const layerControllerOptionsDev: any = {
      position: "topleft",
      collapsed: false,
      container_maxHeight: "500px",
      callbacks: {
        onChangeCheckbox: (event: any, obj: any) => {
          if (obj.group.name !== LayerNames.DRAWABLE_LAYER) {
            this.changeDisplayAfterOneOverlayChanged(obj.group.name, obj.name, event.target.checked);
          }
        }
      }
    };
    const baseMaps: any[] = [
      {
        groupName: "Base Maps",
        layers: this.context.mapState.baseMaps
      }
    ];

    const mapState: MapState = this.context.mapState;
    const layers: any[] = this.overlayMapsProjection(mapState);  // Remove this

    this.styledLayerConroller = new L.Control.StyledLayerControl(
      baseMaps,
      layers,
      layerControllerOptionsDev
    );

    this.context.map.addControl(this.styledLayerConroller);

    const control = L.Control.extend({
      options: {
        position: 'topleft'
      },

      onAdd: (map: any) => {
        const div: HTMLElement = L.DomUtil.create('div', 'custom-layer-controller');

        if (_.get(this,'context.props.isImportExport')) {
          const optionsListOpenningPosition: string = 'left';
          const buttonId:  string = `demo-menu-lower-${optionsListOpenningPosition}`;
          const container: string = `
            <div class="custom-layer-controller-header">
              <h2 class="custom-layer-controller-header-title">
                <span>Layers</span>
                <button class="mdl-button mdl-js-button mdl-button--icon" id="${ buttonId }">
                  <i class='material-icons add-circle'>add_circle</i>
                </button>
              </h2>
              <ul id="custom-layer-controller-add-layer-menu" class="mdl-menu mdl-menu--bottom-${optionsListOpenningPosition} mdl-js-menu mdl-js-ripple-effect" for="${ buttonId }">
                <li class="mdl-menu__item" for="import-layer">
                  <label class="drop-down-label">
                    Import
                    <input type="file" accept="${ImportFileFormats}" id="import-layer" class="hidden" attachEvent="change:onChangeImport"/>
                  </label>
                </li>
                <li class="mdl-menu__item" disabled>Load</li>
              </ul>
            </div>
          `;

          (div as any).appendHtmlWithContext(container, this);
        }

        return div;
      },

      onRemove: (map: any) => {
        this.styledLayerConroller.onRemove(map);
      },

      addBaseLayer: (layer: any, name: any, group: any) => {
        return this.styledLayerConroller.addBaseLayer(layer, name, group);
      },

      addOverlay: (layer: any, name: any, group: any, className?:string) => {
        return this.styledLayerConroller.addOverlay(layer, name, group, className);
      },
      deleteLayer: (layer: any) => {
        this.styledLayerConroller.deleteLayer(layer);
      },
      removeLayer: (layer: any) => {
        return this.styledLayerConroller.removeLayer(layer);
      },
      removeGroup: (group_Name: string, del: any) => {
        this.styledLayerConroller.removeGroup(group_Name, del);
      },
      removeAllGroups: (del: any) => {
        this.styledLayerConroller.removeAllGroups(del);
      },
      selectLayer: (layer: any) => {
        this.styledLayerConroller.selectLayer(layer);
      },
      unSelectLayer: (layer: any) => {
        this.styledLayerConroller.unSelectLayer(layer);
      },
      changeGroup: (group_Name: string, select: any) => {
        this.styledLayerConroller.changeGroup(group_Name, select);
      }
    });

    this.element = new control();
  }


  private onChangeImport(event: any) {
    const fileDescriptor: any = event.target.files[0];
    if (fileDescriptor) {
      this.importFileHandler(fileDescriptor);
    }
  }
  private importFileHandler(fileDescriptor: any) {
    // const extension: string = this.getFileExtension(fileDescriptor.name) || '';
    const fileNames: FileNames = this.getFileNamesFromFileName(fileDescriptor.name);
    const reader = new FileReader();

    switch (fileNames.fileExtention) {
      case FILE_TYPES.kml: // kml
        reader.onload = this.onReadKml.bind(this, fileNames);
        reader.readAsText(fileDescriptor);
        break;
      case FILE_TYPES.csv: // csv
        reader.onload = this.onReadCsv.bind(this, fileNames);
        reader.readAsText(fileDescriptor);
        break;
      case FILE_TYPES.zip: // zip
        reader.onload = this.onReadShp.bind(this, fileNames);
        reader.readAsArrayBuffer(fileDescriptor);
        break;

      default:
        console.warn(`File type ${fileNames.fileExtention} not supported`);
        break;
    }
  };

  private getFileExtension(filename: string): string {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
  }

//   private selectAllLayers(e: any):void {
//     console.log('selectAllLayers',e);
//   }

  private onOverlayChanged_updateSelections(e: any): void {
    // Check if there are layers inside this overlay-layer
    if (!e.layer.getLayers) {
      return;
    }
    // Iterate all shapes
    const leafletShapes: L.Layer[] = e.layer.getLayers() || [];
    leafletShapes.forEach((leafletLayer: L.Layer) => {
      // Detect selected shapes
      if (_.get(leafletLayer, "shapeDef.data.isSelected")) {
        // Selected shape
        const layerId: string = String(L.Util.stamp(leafletLayer)); // Get leaflet layer id

        if (e.type ==='overlayadd') {
          // Add leaflet id to selected-shapes-list
          this.context.selectedLeafletObjects[layerId] = leafletLayer;

          // Update selected shapes view
          const manager = ShapeManagerRepository.getManagerByType(
            _.get(leafletLayer, "shapeDef.shapeObject.type")
          );
          manager.updateIsSelectedView(leafletLayer);
        } else if (e.type === 'overlayremove') {
          // Remove from selected leaflet objects
          if (_.has(this, "context.selectedLeafletObjects." + layerId)) {
            // Remove leaflet id to selected objects list
            delete this.context.selectedLeafletObjects[layerId];
          }
        }
      }
    });
  }

  private onLayerAdd(e: any): void {
    // WARNING: Happend twice for the same layer!
    // console.log('onLayerAdd', e.layer);
  }
  private onLayerRemove(e: any): void {
    // WARNING: Happend twice for the same layer!
    // console.log('onLayerRemove')
  }
}

type FileNames = {
  fileName: string;
  fileExtention: string;
};