import './ToolbarComp.css';
import * as L from 'leaflet';
import * as _ from 'lodash';
import Utils from '../../utils';
import SearchBoxComp from '../SearchBoxComp/SearchBoxComp';
import LayersControllerComp from '../LayersControllerComp/LayersControllerComp';
import MouseCoordintatePlugin from '../MouseCoordinatePlugin';
import ZoomToExtendComp from '../ZoomToExtendComp/ZoomToExtendComp';
import CustomControlComp from '../CustomControlComp/CustomControlComp';
import DropDownComp from '../CustomControlComp/DropDownComp/DropDownComp';
import CustomDropDownComp from '../CustomControlComp/CustomDropDownComp/CustomDropDownComp';
import ScaleControlComp from '../ScaleControlComp/ScaleControlComp';
import PolylineMeasureComp from '../PolylineMeasureComp/PolylineMeasureComp';
import DrawBarComp from '../DrawBarComp/DrawBarComp';
import MiniMapComp from '../MiniMapComp';
import { GisPluginContext, SelectionMode } from '../../pluginBase';
import { FeaturesNames, CustomControlName, ToolbarPlugins, MapPlugins, CoordinateType, LayersTypeLabel, SELECT_LAYER, UNSELECT_LAYER, FILE_TYPES_ARRAY, FILE_TYPES } from "../../statics";
import { ShapeLayerContainer } from '../../models/shapeLayerContainer';
import { ClusterHeat, DropDownItemType } from '../../../../../api-generated/wrapper/api-src/index';




export default class ToolbarComp {
  private element: L.Control;
  private toolbarEnabledPlugins: any[] = [];
  private mapEnabledPlugins: Set<string> = new Set();

  /*
    All features:
    -------------
    SearchBoxComp
    DrawBarComp
    MiniMapComp
    LayersControllerComp
    MousePositionComp
    ZoomToExtendComp
    UnitsChangerComp
    ScaleControlComp
    PolylineMeasureComp
  */
  private features: any;

  constructor(private context: GisPluginContext) {
    // Do bind first!
    this.init                       = this.init.bind(this);
    this.addToolbarControl          = this.addToolbarControl.bind(this);
    this.addFeatureToMap            = this.addFeatureToMap.bind(this);
    this.createElement              = this.createElement.bind(this);
    this.getDrawBar                 = this.getDrawBar.bind(this);
    this.unitsChangeClickHandler    = this.unitsChangeClickHandler.bind(this);
    this.getDrawLayer               = this.getDrawLayer.bind(this);
    this.toolbarFeaturesDecision     = this.toolbarFeaturesDecision.bind(this);
    this.addFeatureToToolbarHandler = this.addFeatureToToolbarHandler.bind(this);
    this.createOutsidePlugins       = this.createOutsidePlugins.bind(this);
    this.changeMouseCoordinates     = this.changeMouseCoordinates.bind(this);
    this.onChangeMapMode            = this.onChangeMapMode.bind(this);

    this.init();
  }

  
  init() {
    const context = this.context;

    if (!context) { return;}

    this.features = {};
    context.onAddControlToFeatures = this.addFeatureToToolbarHandler;
    const { selectedLeafletObjects, mapState, map, props } = this.context;

    const exportDropDownData: any[] = [{
      label: 'Export KML',
      onClick: Utils.exportBlobFactory.bind(this, FILE_TYPES.kml, selectedLeafletObjects, mapState, map, props.onSaveKmlBlob),
      className: 'icon-kml'
    }, {
      label: 'Export CSV',
      onClick: Utils.exportBlobFactory.bind(this, FILE_TYPES.csv, selectedLeafletObjects, mapState, map, props.onSaveCsvBlob),
      className: 'icon-csv'
    },
    {
      label: 'Export SHP',
      onClick: Utils.exportBlobFactory.bind(this, FILE_TYPES.zip, selectedLeafletObjects, mapState, map, props.onSaveShpBlob),
      className: 'icon-shp'
    }
  ];

    const coordinateSystemToolbarData = _.get(context, 'props.mouseCoordinate.enable')
    ? {
      title: 'Coordinate system',
      itemList: [
        {
          label: CoordinateType.MGRS,
          iconClassName: 'icon-pin',
          onClick: MouseCoordintatePlugin.changeMouseCoordinates,
          name: 'coordinates',
          type: DropDownItemType.RADIO_BUTTON,
          isSelected: !!_.get(context, 'props.mouseCoordinate.utmref'),
        }, {
          label: CoordinateType.UTM,
          iconClassName: 'icon-pin',
          onClick: MouseCoordintatePlugin.changeMouseCoordinates,
          name: 'coordinates',
          type: DropDownItemType.RADIO_BUTTON,
          isSelected: !!_.get(context, 'props.mouseCoordinate.utm'),
        }, {
          label: CoordinateType.DECIMAL,
          iconClassName: 'icon-pin',
          onClick: MouseCoordintatePlugin.changeMouseCoordinates,
          name: 'coordinates',
          type: DropDownItemType.RADIO_BUTTON,
          isSelected: !!_.get(context, 'props.mouseCoordinate.gps'),
        }
      ],
    }
    : null;

    const toolbarLayerSettingsConfig = _.get(context, 'props.layersController.enable')
    ? {
      title: 'Layers',
      itemList: [
        {
          label: LayersTypeLabel.HEAT,
          iconClassName: 'icon-heatmap',
          onClick: this.onChangeMapMode,
          name: 'layers',
          type: DropDownItemType.RADIO_BUTTON,
          isSelected: this.context.mapSettings.mode === 'heat',
        }, {
          label: LayersTypeLabel.CLUSTER,
          iconClassName: 'icon-cluster',
          onClick: this.onChangeMapMode,
          name: 'layers',
          type: DropDownItemType.RADIO_BUTTON,
          isSelected: this.context.mapSettings.mode === 'cluster',
        },],
      }
    : null;

    const dropDownData = [coordinateSystemToolbarData, toolbarLayerSettingsConfig];

    const toolbarSettingsDropDownData = _.filter(dropDownData, (item) => item !== null);

    const { isImportExport, isToolbarSettings } = context.props;

    const mouseCoordinateGps =  {
      enable: true,
      gps: true,
      gpsLong: false,
      utm: false,
      utmref: false,
    };

    const mouseCoordinateUtm =  {
      enable: true,
      gps: false,
      gpsLong: false,
      utm: true,
      utmref: false,
    };

    const mouseCoordinateUtmref =  {
      enable: true,
      gps: false,
      gpsLong: false,
      utm: false,
      utmref: true,
    };

    // Create all plugins
    new LayersControllerComp(context); // Create first
    new DrawBarComp(context); // Draw-Bar
    new PolylineMeasureComp(context); // Polyline-Measure
    new SearchBoxComp(context); // Search-Box
    new ZoomToExtendComp(context);
    new MouseCoordintatePlugin(context, mouseCoordinateGps); // Mouse-position
    new MouseCoordintatePlugin(context, mouseCoordinateUtm); // Mouse-position
    new MouseCoordintatePlugin(context, mouseCoordinateUtmref); // Mouse-position
    new ScaleControlComp(context); // Add layers-control button to map
    new MiniMapComp(context); // MiniMap
    new CustomControlComp(context, this.unitsChangeClickHandler, CustomControlName.UNIT_CHANGER);
    new DropDownComp(context, exportDropDownData, isImportExport, 'Export Map');
    new CustomDropDownComp(context, toolbarSettingsDropDownData, CustomControlName.SETTINGS, isToolbarSettings, 'Settings');

    this.createElement();
    this.createOutsidePlugins();
  }

  public onChangeMapMode(mode: ClusterHeat) {
    // const previewsMode: string = this.context.mapSettings.mode;
    this.context.mapSettings.mode = mode;
    // Initial layers
    this.context.mapState.initialLayers.forEach((dataLayer: ShapeLayerContainer) => {
      // const isLayerVisible: boolean = map.hasLayer(dataLayer.leafletHeatLayer);
      if (dataLayer.isDisplay) {

        if (this.context.mapSettings.mode==='heat') {
          this.toggleBetweenHeatCluster(dataLayer, SELECT_LAYER, UNSELECT_LAYER);
        } else if (this.context.mapSettings.mode==='cluster') {
          this.toggleBetweenHeatCluster(dataLayer, UNSELECT_LAYER, SELECT_LAYER);
        }
      }
    });
    // Imported layers
    if (this.context.mapState.importedLayers) {
      FILE_TYPES_ARRAY.forEach((fileType: string) => {
        this.context.mapState.importedLayers[fileType.toLowerCase()].forEach((dataLayer: ShapeLayerContainer) => {
          if (dataLayer.isDisplay) {
            if (this.context.mapSettings.mode === 'heat') {
              this.toggleBetweenHeatCluster(dataLayer, SELECT_LAYER, UNSELECT_LAYER);
            } else if (this.context.mapSettings.mode === 'cluster') {
              this.toggleBetweenHeatCluster(dataLayer, UNSELECT_LAYER, SELECT_LAYER);
            }
          }
        });
      });
    }
    Utils.updateLayerControllerLayersClass(this.context.mapSettings.mode);
  }

  public getZoomToExtends(): ZoomToExtendComp {
    return this.features[FeaturesNames.ZOOM_TO_EXTEND_COMP];
  }

  public getDrawBar(): DrawBarComp {
    return this.features[FeaturesNames.DRAWBAR_COMP];
  }

  public getDrawLayer(): L.FeatureGroup {
    return this.getDrawBar().getDrawLayer();
  }

  private toggleBetweenHeatCluster(dataLayer: ShapeLayerContainer, HeatSelectionMode: SelectionMode, clusterSelectionMode: SelectionMode) {
    if (dataLayer.leafletHeatLayer) {
      this.context.layersController.element[HeatSelectionMode](dataLayer.leafletHeatLayer);
    }
    if (dataLayer.leafletClusterLayer) {
      this.context.layersController.element[clusterSelectionMode](dataLayer.leafletClusterLayer);
    }
  }
  private unitsChangeClickHandler() {
    const toggleableList = [
      FeaturesNames.MEASURE_COMP,
      FeaturesNames.SCALE_CONTROL_COMP,
      FeaturesNames.DRAWBAR_COMP
    ];

    try {
      toggleableList.forEach(key => {
        if (this.features[key]) {
          this.features[key].toggleUnits();
        }
      });
    } catch(e) {
      console.error('Error in change units in one of the plugins', e);
    }
  }

  private addFeatureToToolbarHandler(key: string, control: any) {
    this.features[key] = control;
    if (ToolbarPlugins[key]) {
      this.toolbarEnabledPlugins.push(key);
    } else if (MapPlugins[key]) {
      this.mapEnabledPlugins.add(key);
    }
  }

  private addFeatureToMap(control: any) {
      this.context.map.addControl(control);
  }

  private createOutsidePlugins() {
    try {
      this.mapEnabledPlugins.forEach((featureKey: string) => {
        if (this.features[featureKey]) {
          this.addFeatureToMap(this.features[featureKey].element);
          if (featureKey === FeaturesNames.SCALE_CONTROL_COMP) {
              this.features[featureKey].fixHiddenStyleClass();
          }
        }
      });

      // need to refactor to custom contller
      const layerControllerButton: any = document.querySelector('.custom-toolbar-button.layer-controller');
      const layerControllerPlugin: any = document.querySelector('.custom-layer-controller');

      if (layerControllerButton && layerControllerPlugin) {
          layerControllerPlugin.style.left = layerControllerButton.offsetLeft+'px';
      }

      const {mouseCoordinate} = this.context.props;

      Utils.initMouseCoordinates(mouseCoordinate);
    } catch(e) {
      console.error('Error in change units in one of the plugins', e);
    }
  }
  private createElement(): void {
    this.element = this.addToolbarControl();
    this.addFeatureToMap(this.element);
  }

  private addToolbarControl() {
      try {
        let customControl = L.Control.extend({
          options: {position: 'topleft'},
          onAdd: this.toolbarFeaturesDecision
        });
        return new customControl();
      } catch (e) {
          console.error('failed to create custom control: ' + e);
          return null;
      }
  }

  private changeMouseCoordinates(value: string) {
    const gpsElement:    HTMLElement = document.querySelector('.gps') as HTMLElement;
    const utmElement:    HTMLElement = document.querySelector('.utm') as HTMLElement;
    const utmrefElement: HTMLElement = document.querySelector('.utmref') as HTMLElement;

    const mouseCoordinateTypesElementCollection = [gpsElement, utmElement, utmrefElement];

    _.forEach(mouseCoordinateTypesElementCollection, (elm: HTMLElement) => {
      elm.style.display = elm.classList.contains(value) ? 'flex' : 'none';
    });
  }

  private toolbarFeaturesDecision() {

    // // create toolbar wrapper controller groups
    const controllerSettingsGroup:     HTMLElement = L.DomUtil.create('div', 'custom-toolbar-group');
    const controllerDrawGroup:         HTMLElement = L.DomUtil.create('div', 'custom-toolbar-group');
    const controllerMapGroup:          HTMLElement = L.DomUtil.create('div', 'custom-toolbar-group');
    const controllerSearchGroup:       HTMLElement = L.DomUtil.create('div', 'custom-toolbar-group');
    const controllerActionsGroup:      HTMLElement = L.DomUtil.create('div', 'custom-toolbar-group');
    const controllerImportExportGroup: HTMLElement = L.DomUtil.create('div', 'custom-toolbar-group');

    // Draw
    let drawBar: any = {};
    let editDrawBar: any = {};
    const settingsControllerName = FeaturesNames.CUSTOM_DROP_DOWN_COMP+'_'+CustomControlName.SETTINGS;

    // me.features
    if (this.features[FeaturesNames.DRAWBAR_COMP]) {
      const drawBarLeafletElement: any = this.features[FeaturesNames.DRAWBAR_COMP].element;
      this.addFeatureToMap(drawBarLeafletElement);
      drawBar     = drawBarLeafletElement._container.childNodes[0] as HTMLElement;
      // setting id for future styling purposes
      drawBar.id = "draw-shapes-section";
      editDrawBar = drawBarLeafletElement._container.childNodes[1] as HTMLElement;
    }

    if (this.context.props.zoomControl && this.context.props.zoomControl.enable) {
      const zoomController: HTMLElement = document.querySelector('.leaflet-control-zoom') as HTMLElement;
      controllerMapGroup.appendChild(zoomController);
    }

    if (this.features[FeaturesNames.ZOOM_TO_EXTEND_COMP]) {
      const zoomToExtendLeafletElement: any = this.features[FeaturesNames.ZOOM_TO_EXTEND_COMP].element;
      this.addFeatureToMap(zoomToExtendLeafletElement);
      // Stop double click on plugin
      Utils.stopDoubleClickOnPlugin(zoomToExtendLeafletElement._container);
    }

    if (this.features[FeaturesNames.DROP_DOWN_COMP] ) {
      const dropDownLeafletElement: any = this.features[FeaturesNames.DROP_DOWN_COMP].element;
      this.addFeatureToMap(dropDownLeafletElement);
      // Stop double click on plugin
      Utils.stopDoubleClickOnPlugin(dropDownLeafletElement._container);
    }

    if (this.features[settingsControllerName]) {
      const settingsElement: any = this.features[settingsControllerName].element;
      this.addFeatureToMap(settingsElement);
      // Stop double click on plugin
      Utils.stopDoubleClickOnPlugin(settingsElement._container);
    }

    if (this.features[FeaturesNames.SEARCH_BOX_COMP]) {
      const searchLeafletElement: any = this.features[FeaturesNames.SEARCH_BOX_COMP].element;
      this.addFeatureToMap(searchLeafletElement);
      this.features[FeaturesNames.SEARCH_BOX_COMP].fixCss();
      // Stop double click on plugin
      Utils.stopDoubleClickOnPlugin(searchLeafletElement._container);
    }

    // Measure
    if (this.features[FeaturesNames.MEASURE_COMP]) {
      const measureLeafletElement: any = this.features[FeaturesNames.MEASURE_COMP].element;
      this.addFeatureToMap(measureLeafletElement);
      const measure: HTMLElement = measureLeafletElement._container;
      measure.classList.add('polyline-measure');
    }

    const container:  HTMLElement = L.DomUtil.create('div', 'custom-toolbar leaflet-draw-toolbar leaflet-bar');

    const controllerGroupMap = {
      [FeaturesNames.LAYERS_CONTROLLER_COMP]: [controllerMapGroup],
      [FeaturesNames.DRAWBAR_COMP]:           [controllerDrawGroup, controllerActionsGroup],
      [FeaturesNames.MEASURE_COMP]:           [controllerDrawGroup],
      [FeaturesNames.SEARCH_BOX_COMP]:        [controllerSearchGroup],
      [FeaturesNames.ZOOM_TO_EXTEND_COMP]:    [controllerMapGroup],
      [FeaturesNames.DROP_DOWN_COMP]:         [controllerImportExportGroup],
      [FeaturesNames.CUSTOM_DROP_DOWN_COMP + '_' + CustomControlName.SETTINGS]: [controllerSettingsGroup],
    };


    // Feature iterate
    this.toolbarEnabledPlugins.forEach((featureKey: string) => {
        // draw or zoomToExtend
        if (this.features[featureKey]) {
          let htmlElement: HTMLElement = null;
          if (featureKey === FeaturesNames.LAYERS_CONTROLLER_COMP) {
            htmlElement = this.features[featureKey].htmlBtElement;
          } else {
            htmlElement = this.features[featureKey].element._container;
          }

          const controlList = controllerGroupMap[featureKey];
          controlList.forEach(cg => {
            if (featureKey === FeaturesNames.DRAWBAR_COMP) {
              // Special case for drawBar_comp
              const childs = htmlElement.childNodes;
              if (childs && childs.length) {
              cg.appendChild(childs[0]);
              }
            } else {
              cg.appendChild(htmlElement);
            }
          });
        }
    });

    const controllerGroups = [
      controllerSettingsGroup,
      controllerImportExportGroup,
      controllerActionsGroup,
      controllerDrawGroup,
      controllerMapGroup,
      controllerSearchGroup,
    ];

    controllerGroups.forEach(controllerGroup => {
      if(controllerGroup.childNodes && controllerGroup.childNodes.length) {
        container.appendChild(controllerGroup);
      }
    });

    return container;
  }
}

