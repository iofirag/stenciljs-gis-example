import { IconOptions } from "../../../";


export function toLeafletIconOptions(options: IconOptions): L.IconOptions {
    return {
        iconUrl: options.iconUrl,
        iconSize:     [options.iconWidth, options.iconHeight], // size of the icon
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor;
    };
}