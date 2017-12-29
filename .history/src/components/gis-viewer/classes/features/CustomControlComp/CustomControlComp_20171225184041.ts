import L from "leaflet";
import './CustomControlComp.css';
import { GisPluginContext } from "../../pluginBase";
import { FeaturesNames, CustomControlName } from "../../statics";

export default class CustomControlComp extends L.Control {
  element: any;
  controlConfig: any;

  constructor(private context: GisPluginContext, private onClickCB: () => void, private controlName: string) {
    super();
    // Do bind first! 
    this.createCustomControl = this.createCustomControl.bind(this);
    this.init                = this.init.bind(this);
    this.init();
  }

  private init() {
    // Init element
    this.controlConfig = {
      [CustomControlName.UNIT_CHANGER] : {
        createControl: this.createCustomControl,
        className: 'toggle-units-bt',
        title: 'Toggle-units',
      }
    };

    this.controlConfig[this.controlName].onClick = this.onClickCB;

    const {className, title, createControl, onClick} = this.controlConfig[this.controlName];

    this.element = createControl(className, title, onClick);
    this.context.onAddControlToFeatures(FeaturesNames.CUSTOM_CONTROL_COMP+"_"+this.controlName, this);
  }

  private createCustomControl(className: string, title: string, onClick: () => void) {
    try {
      const customControl = L.Control.extend({
        options: {},
        onAdd: () => {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom ' + className);

          container.title = title;
          container.addEventListener('click', onClick);
          return container;
        },
			});
			
      return new customControl();
    } catch (e) {
      console.error('failed to create custom control: ' + e);
      return null;
    }
  }
}