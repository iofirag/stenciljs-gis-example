import /** as*/ _ from 'lodash';
import { GisPluginBase, GisPluginContext } from '../../pluginBase';
import './ScaleControlComp.css';
import {FeaturesNames} from "../../statics";
import { Units } from "../../MapContainer/MapContainer";
import /** as*/ L from "leaflet";
import { ScaleControlOptions } from "../../../../../models/apiModels";

export default class ScaleControlComp {
	element: any;

	constructor(private context: GisPluginContext) {
		super();
		// Do bind first
		this.toggleUnits = this.toggleUnits.bind(this);
		this.createElement = this.createElement.bind(this);

		this.init();
	}

	init() {
		const scaleControlEnable: boolean = _.get(this, 'context.props.scaleControl.enable');

		if (scaleControlEnable) {
			const { scaleControl } = this.context.props;

			// Component options
			const objCloned: any = Object.assign({}, scaleControl);
			objCloned.metric = true;
			objCloned.imperial = true;

			const optionsDev: ScaleControlOptions_Dev = objCloned;
			this.createElement(optionsDev);
		}
	}

	/**
	 * name
	 */
	public fixHiddenStyleClass() {
		const scaleControlDOM: HTMLElement = this.element._container as HTMLElement;
		const km:              HTMLElement = scaleControlDOM.childNodes[0] as HTMLElement;
		const mi:              HTMLElement = scaleControlDOM.childNodes[1] as HTMLElement;

		km.classList.add('scale-unit');
		mi.classList.add('scale-unit');

		if (this.context.mapUnits === Units.METRIC) {
			mi.classList.toggle('hidden');
		} else {
			km.classList.toggle('hidden');
		}
	}

	public toggleUnits(): void {
		const scaleControlDOM: HTMLElement = this.element._container as HTMLElement;
		const km:              HTMLElement = scaleControlDOM.childNodes[0] as HTMLElement;
		const mi:              HTMLElement = scaleControlDOM.childNodes[1] as HTMLElement;

		km.classList.toggle('hidden');
		mi.classList.toggle('hidden');
	}

	private createElement(scaleControlOptionsDev: ScaleControlOptions_Dev): void {
		this.element = L.control.scale(<any>scaleControlOptionsDev);
		
		this.context.onAddControlToFeatures(FeaturesNames.SCALE_CONTROL_COMP, this);
	}
}

type ScaleControlOptions_Dev = ScaleControlOptions & {
	metric: boolean;
	imperial: boolean;
};