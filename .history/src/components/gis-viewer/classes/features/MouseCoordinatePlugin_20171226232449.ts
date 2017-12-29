import { Component } from '@stencil/core';

// import '../../../../../node_modules/leaflet.mousecoordinate/dist/leaflet.mousecoordinate.css'
// import 'leaflet.mousecoordinate/dist/leaflet.mousecoordinate.css';
import * as mousecoordinate from 'leaflet.mousecoordinate/dist/leaflet.mousecoordinate.min';
import { GisPluginBase, GisPluginContext } from "../pluginBase";
import { MouseCoordinateOptions } from "../../../../models/apiModels";
import /** as*/ _ from 'lodash';
import /** as*/ L from 'leaflet';

@Component({
	tag: 'mouse-coordinate-',
	styleUrls: [
		'leaflet.mousecoordinate/dist/leaflet.mousecoordinate.css'
	],
})
export default class MouseCoordintatePlugin /* extends GisPluginBase */ {
	
	public static changeMouseCoordinates(value: string) {
		const gpsElement: HTMLElement = document.querySelector('.gps') as HTMLElement;
		const utmElement: HTMLElement = document.querySelector('.utm') as HTMLElement;
		const utmrefElement: HTMLElement = document.querySelector('.utmref') as HTMLElement;

		const mouseCoordinateTypesElementCollection = [gpsElement, utmElement, utmrefElement];

		_.forEach(mouseCoordinateTypesElementCollection, (elm: HTMLElement) => {
			elm.style.display = elm.classList.contains(value) ? 'flex' : 'none';
		});
	}
	
	constructor(private context: GisPluginContext, private overridOptions?:MouseCoordinateOptions) {
		// super();
		
		this.init(this.context);
	}

	init(context: GisPluginContext): void {
		const { mouseCoordinate } = context.props;

		if (mouseCoordinate && mouseCoordinate.enable) {

			const options: MouseCoordinateOptions_Dev = _.assign({position: 'bottomleft'}, mouseCoordinate);

			if (this.overridOptions) {
				_.assign(options, this.overridOptions);
			}

			this.createElement(options);
		}
	}

	private createElement(options?: MouseCoordinateOptions): any {
		const element: L.Control = <L.Control> new L.Control.mouseCoordinate(options);

		this.context.map.addControl(element);
	}
}

type MouseCoordinateOptions_Dev = MouseCoordinateOptions & {
	position: string
};