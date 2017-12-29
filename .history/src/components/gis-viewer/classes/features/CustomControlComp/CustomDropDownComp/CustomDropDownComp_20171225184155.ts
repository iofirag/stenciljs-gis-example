import '../DropDownComp/DropDownComp.css';

import /** as*/ L from "leaflet";
import /** as*/ _ from 'lodash';
import { GisPluginContext } from "../../../pluginBase";
import { FeaturesNames } from '../../../statics';
import { DropDownItemType } from "../../../../../../models/apiModels";
import Utils from '../../../utils';

export default class CustomDropDownComp extends L.Control {
  element: any;

  constructor(private context: GisPluginContext, 
              private dropDownData: any[], 
              private customControlName: string,
              private isRender: boolean, 
              private dropDownTitle?: string) {
    super();
    // Do bind first! 
    this.createCustomControl = this.createCustomControl.bind(this);
    this.createDropDownItem  = this.createDropDownItem.bind(this);
    this.init                = this.init.bind(this);
    this.init();
  }

  private init() {

    if (!this.isRender) { return; }
    // Init element
    const customControllerName = FeaturesNames.CUSTOM_DROP_DOWN_COMP + '_' + this.customControlName;

    this.dropDownTitle = this.dropDownTitle || '';
    this.element = this.createCustomControl();
    this.context.onAddControlToFeatures(customControllerName, this);
  }

  private createDropDownItem(dropDownDataItem: any) {
    const mainId = dropDownDataItem.name.replace(/\s+/g, '-').toLowerCase();
    const id     = `${ mainId }-${ dropDownDataItem.label.replace(/\s+/g, '-').toLowerCase() }`;
    const gItem  = L.DomUtil.create('div', 'group-item');
    const input  = L.DomUtil.create('input', 'group-item-input');
    const label  = L.DomUtil.create('label', 'group-item-input-label');
    const icon   = L.DomUtil.create('i', 'group-item-icon ' + dropDownDataItem.iconClassName);

    gItem.appendChild(icon);
    gItem.appendChild(label);
    gItem.appendChild(input);

    const itemTemplate = {
      [DropDownItemType.RADIO_BUTTON] : () => {
        input.setAttribute('type', 'radio');
        input.setAttribute('name', dropDownDataItem.name);
        input.setAttribute('value', dropDownDataItem.label);
        input.setAttribute('id', id);

        /*to be able to click all over the item and switch between the radio buttons 
        we need to disable all the click events on the this elements*/
        _.forEach(gItem.childNodes, (item: HTMLElement) => {
          item.style.pointerEvents  = 'none';
        });

        // init selected item
        if (dropDownDataItem.isSelected) {
          input.setAttribute('checked', dropDownDataItem.isSelected);
        }
        
        // add click event on the group item
        gItem.addEventListener('click', (e: any) => {
          e.stopPropagation();
          const allInputs = e.target.parentElement.querySelectorAll('.group-item-input');

          // remove all 'checked' attributes (this attribute is in charge of selecting the radio button)
          _.forEach(allInputs, (input: HTMLElement) => {
            input.removeAttribute('checked');
          });

          // select check box
          e.target.childNodes[2].setAttribute('checked', 'true');
          dropDownDataItem.onClick(e.target.childNodes[2].value);
        });
      
        label.innerText = dropDownDataItem.label.replace(/-/g,' ');

        return gItem;
      },
      [DropDownItemType.CHECK_BOX] : () => {
        const gItem = L.DomUtil.create('div', 'group-item');

        return gItem;
      },
      [DropDownItemType.REGULAR] : () => {
        const gItem = L.DomUtil.create('div', 'group-item');

        return gItem;
      },
    };

    return itemTemplate[dropDownDataItem.type]();
  }

  private createCustomControl() {
    try {
      const customControl = L.Control.extend({
        options: {},
        onAdd: () => {
          const container = L.DomUtil.create('div', 'leaflet-draw-toolbar leaflet-bar');
          const menuBtn   = L.DomUtil.create('a', 'btn-menu custom-icon ' + this.customControlName);
          const list      = L.DomUtil.create('ul', 'menu');
          
          menuBtn.title = this.dropDownTitle;
          menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            Utils.toggleCustomDropDownMenu(list);
          });

          // add list items according to the state (see received dropDownData structure)
          _.reduce(this.dropDownData, (list, group, key) => {
            const li  = L.DomUtil.create('li', 'menu-item custom-group');

            // fill list item with the relevant markup according to the state
            _.reduce(group.itemList,  (li, item, key)  => {
              const customGroupItem = this.createDropDownItem(item);

              li.appendChild(customGroupItem);

              return li;
            }, li);

            list.appendChild(li);

            return list;
          }, list);

          container.appendChild(menuBtn);
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