import * as L from "leaflet";
// Leaflet Search
import 'leaflet-search/dist/leaflet-search.min.css';
import 'leaflet-search';
import './SearchBoxComp.css';
import { SearchBoxOptions } from "../../../";
import { GisPluginBase, GisPluginContext } from "../../pluginBase";
import {FeaturesNames} from "../../statics";

export default class SearchBoxComp extends GisPluginBase {
  element: any;

  constructor(private context: GisPluginContext) {
    super();

    this.createElement = this.createElement.bind(this);
    this.fixCss        = this.fixCss.bind(this);

    this.init();
  }

  init() {

    const { searchBox } = this.context.props;

    if (searchBox && searchBox.enable) {
      this.createElement(searchBox);
    }
  }

  private createElement(options?: SearchBoxOptions) {
    this.element = this._configSearch(options); // Default
    this.context.onAddControlToFeatures(FeaturesNames.SEARCH_BOX_COMP, this);
  }
  private fixCss() {
    // Fix css, remove 2 props
    const searchElements = document.getElementsByClassName("search-button");
    if (searchElements.length) {
      const elem = searchElements[0] as HTMLElement;
      elem.classList.add('leaflet-bar');
    }
  }
  private _configSearch(options: SearchBoxOptions) {
    const searchController: any = new L.Control.Search({
      url: options.queryServerUrl,
      jsonpParam: 'json_callback',
      propertyName: 'display_name',
      propertyLoc: ['lat', 'lon'],
      marker: new L.Marker([0, 0]),
      autoCollapse: true,
      autoType: false,
      minLength: 2
    });
    
    return searchController;
  }
}
