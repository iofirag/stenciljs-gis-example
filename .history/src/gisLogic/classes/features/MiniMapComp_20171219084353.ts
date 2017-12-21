import { MiniMapOptions } from '../../../models/apiModels';
import * as L from 'leaflet';

// Leaflet Mini-Map
import 'leaflet-minimap/dist/Control.MiniMap.min.css';
import 'leaflet-minimap';
import { GisPluginBase, GisPluginContext } from "../pluginBase";
import {FeaturesNames} from "../statics";

export default class MiniMapComp extends GisPluginBase {
  element: any;

    constructor(private context: GisPluginContext) {
    super();
        
    this.createElement = this.createElement.bind(this);

    this.init();
  }

  init() {
    if (this.context.props.miniMap && this.context.props.miniMap.enable) {
      const { tileLayers, miniMap } = this.context.props;

      if (tileLayers && tileLayers.length > 0 && tileLayers[0].tilesURI) {
        this.createElement(tileLayers[0].tilesURI, miniMap);
      }
    }
  }

  private createElement(tileLayersURI: string, options?: MiniMapOptions) {
      this.element = this.addingMiniMap(tileLayersURI, options);
      this.context.onAddControlToFeatures(FeaturesNames.MINI_MAP_COMP, this);
  }
  private addingMiniMap(urlTemplate: string, options?: MiniMapOptions): any {
    const optionsAny: any = options;
    const osm2            = new L.TileLayer(urlTemplate, optionsAny);
    const miniMap         = new LPlus.Control.MiniMap(osm2, optionsAny);

    return miniMap;
  }
}
