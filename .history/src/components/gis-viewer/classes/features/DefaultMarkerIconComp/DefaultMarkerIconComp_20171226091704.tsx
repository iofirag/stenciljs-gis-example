import /** as*/ L from "leaflet";
import { DefaultMarkerIcon } from "../../../../../models/apiModels";
export default class DefaultMarkerIconComp {

  public static checkAddingDefaultMarkerIcon(options?: DefaultMarkerIcon) {
    if (options) {
      DefaultMarkerIconComp._setDefaultMarkerIcon(options);
    } else {
      // Set default leaflet icon
      this._fixDefaultIcon();
    }
  }

  private static _fixDefaultIcon() {
    // Fix default icon
    this._deleteGetIconUrlFromProto();

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
      iconUrl: 'leaflet/dist/images/marker-icon.png',
      shadowUrl: 'leaflet/dist/images/marker-shadow.png'
    });
  }

  private static _setDefaultMarkerIcon(options: DefaultMarkerIcon) {
    this._deleteGetIconUrlFromProto();

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: options.iconRetinaUrl,
      iconUrl: options.iconUrl,
      shadowUrl: options.shadowUrl
    });
  }

  private static _deleteGetIconUrlFromProto(): void {
    var prototype: any = L.Icon.Default.prototype;
    delete prototype._getIconUrl;
  }
}