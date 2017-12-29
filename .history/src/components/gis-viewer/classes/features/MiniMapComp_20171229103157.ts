
// Leaflet Mini-Map
// import 'leaflet-minimap/dist/Control.MiniMap.min.css';
import 'leaflet-minimap';
import { GisPluginContext } from "../pluginBase";
import { FeaturesNames } from "../statics";
import { MiniMapOptions } from "../../../../models/apiModels";
import L from 'leaflet';

export default class MiniMapComp {
  element: any;

    constructor(private context: GisPluginContext) {
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
    const miniMap         = new L.Control.MiniMap(osm2, optionsAny);

    return miniMap;
  }
}
