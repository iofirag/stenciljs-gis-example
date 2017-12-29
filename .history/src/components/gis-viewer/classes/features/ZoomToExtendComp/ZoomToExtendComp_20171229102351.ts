// Leaflet Mini-Map
// import './ZoomToExtend.css';
import { GisPluginContext } from "../../pluginBase";
import {FeaturesNames} from "../../statics";
import { ZoomToExtendOptions } from "../../../../../models/apiModels";
import /** as*/ _ from 'lodash';
import /** as*/ L from 'leaflet';

export default class ZoomToExtendComp {
	element: any;

    constructor(private context: GisPluginContext) {
		// Do bind first!
		this.zoomToExtendClickHandler = this.zoomToExtendClickHandler.bind(this);
		this.addingZoomToExtend       = this.addingZoomToExtend.bind(this);
		this.init                     = this.init.bind(this);

		this.init();
	}

	init() {
		const isZoomToExtendEnable: boolean = _.get(this, 'context.props.zoomToExtend.enable');

		if (isZoomToExtendEnable) {
			const { zoomToExtend } = this.context.props;

			if (zoomToExtend) {
				this.element = this.addingZoomToExtend(zoomToExtend);
				this.context.onAddControlToFeatures(FeaturesNames.ZOOM_TO_EXTEND_COMP, this);
			}
		}
	}


	public zoomToExtendClickHandler() {
		this.context.zoomToExtend();
	};

	// Move this code from here
	private addingZoomToExtend(options?: ZoomToExtendOptions): any {
		try {
			const customControl = L.Control.extend({
				options: options,
				onAdd: () => {
					debugger
					const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom zoom-to-extend-bt');
					container.title = 'Zoom to extend';

					this.zoomToExtendClickHandler.bind(this);
					container.addEventListener('click', this.zoomToExtendClickHandler);

					return container;
				},
			});

			return new customControl();
		} catch (e) {
			console.error('failed to create custom control: ' + e);
			return null;
		}
	};
}
