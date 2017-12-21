import './PolylineMeasureComp.css';

// Leaflet Polyline-Measure
import 'leaflet.polylinemeasure/Leaflet.PolylineMeasure.css';
import 'leaflet.polylinemeasure';
import { GisPluginBase, GisPluginContext } from "../../pluginBase";
import { Units } from "../../MapContainer/MapContainer";
import {FeaturesNames} from "../../statics";
import { PolylineMeasureOptions } from "../../../../../api-generated/wrapper/api-src/index";
import * as _ from 'lodash';

const IMPERIAL: string = 'landmiles';
const METERS: string = 'metres';

export default class PolylineMeasureComp extends GisPluginBase {
	element: any;

	constructor(private context: GisPluginContext) {
		super();

		this.toggleUnits   = this.toggleUnits.bind(this);
		this.createElement = this.createElement.bind(this);

		this.init();
	}

	init() {
		const { polylineMeasure } = this.context.props;
		if (polylineMeasure && polylineMeasure.enable) {
			const objCloned: PolylineMeasureOptions_Dev = Object.assign(
				{ showUnitControl: true }, 
				{ unit: this.context.mapUnits === Units.METRIC ? METERS : IMPERIAL},
				polylineMeasure
			);

			this.createElement(objCloned);
			this.context.onAddControlToFeatures(FeaturesNames.MEASURE_COMP, this);
		}
	}

	public toggleUnits() {
		const unitControlIdElement = document.getElementById('unitControlId');

		if (unitControlIdElement) {
			if (unitControlIdElement.innerText === 'nm') {
				unitControlIdElement.click();
			}

			unitControlIdElement.click();
			
			if (unitControlIdElement.innerText === 'nm') {
				unitControlIdElement.click();
			}
		}
	}

	public isLayerOfThisShapeType(leafletLayer: LPlus.Polygon): boolean {
		// Polygon | Polyline
		const item: any = _.get(leafletLayer, '_rings[0][0]');
		if (!item || !item.length) { return false; }

		const itemKeys: string[] = Object.keys(item);
		return itemKeys.indexOf('_code') === -1;
	}
	private createElement(options?: PolylineMeasureOptions_Dev): void {
		this.element = new LPlus.Control.PolylineMeasure(options);
	}
}

export type PolylineMeasureOptions_Dev = PolylineMeasureOptions & {
	showUnitControl: boolean,
	unit: string,
};