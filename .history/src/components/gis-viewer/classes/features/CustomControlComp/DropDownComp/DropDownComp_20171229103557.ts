// import './DropDownComp.css';
import /** as*/ L from "leaflet";
import /** as*/ _ from 'lodash';
import { GisPluginContext } from "../../../pluginBase";
import { FeaturesNames } from '../../../statics';
import Utils from '../../../utils';

export default class DropDownComp extends L.Control {
  element: any;

  constructor(private context: GisPluginContext, 
              private dropDownData: any[], 
              private isRender: boolean, 
              private dropDownTitle?: string) {
    super();
    // Do bind first! 
    this.createCustomControl = this.createCustomControl.bind(this);
    this.init                = this.init.bind(this);
    this.init();
  }

  private init() {
    // Init element
    if (!this.isRender) { return; }
    this.dropDownTitle = this.dropDownTitle || '';
    this.element = this.createCustomControl();
    this.context.onAddControlToFeatures(FeaturesNames.DROP_DOWN_COMP, this);
  }

  private createCustomControl() {
    try {
      const customControl = L.Control.extend({
        options: {},
        onAdd: () => {
          const container = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar');
          const menuBtn   = L.DomUtil.create('a', 'export-bt btn-menu custom-icon');
          const list      = L.DomUtil.create('ul', 'menu');
          
          menuBtn.title = this.dropDownTitle;
          menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            Utils.toggleCustomDropDownMenu(list);
          });

          container.appendChild(menuBtn);

          // create list items
          _.forEach(this.dropDownData, (item: any) => {
            const listItem = L.DomUtil.create('li', 'menu-item');
            const icon     = L.DomUtil.create('i', 'menu-item-icon ' + item.className);
            const label    = L.DomUtil.create('span', 'menu-item-label');
            
            label.innerText = item.label;
            listItem.appendChild(icon);
            listItem.appendChild(label);
            listItem.addEventListener('click', () => {
              item.onClick();
              Utils.toggleCustomDropDownMenu(list);
            });
            list.appendChild(listItem);
          });

          container.appendChild(list);

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