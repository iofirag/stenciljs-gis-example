"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@stencil/core");
// import { EventEmitterData } from '@stencil/core/util/interfaces';
let DevComponent = class DevComponent {
    onMapReady(event) {
        console.log('Received the custom mapReady event');
    }
    onMoveEnd(event) {
        console.log('Received the custom moveEnd event:', event.detail);
    }
    componentWillLoad() {
        this.createDevState();
    }
    render() {
        return (h("div", { class: "dev-components" },
            h("div", { class: "header" },
                h("header", { title: "This is a GIS Viewer component Application" })),
            h("div", { class: "body" },
                h("div", { class: "sideMenu" },
                    h("input", { type: "button", value: "Create Marker", onClick: e => this.testCreateMaerker(e) })),
                h("div", { class: "gisWrapper" },
                    h("gis-viewer", { gisViewerProps: this.gisViewerState })))));
    }
    componentDidLoad() {
        this.gisViewerEl = document.querySelector('gis-viewer');
        // this.gisViewerEl.addEventListener('moveEnd', (ev: any) => {
        //     console.log(ev.detail);
        // });
        // this.gisViewerEl.addEventListener('mapReady', (ev) => {
        //     console.log(ev, this);
        //     debugger
        //     // ev.detail contains the data passed out from the component
        //     // Handle event here...
        // });
    }
    // @Event
    testCreateMaerker(e) {
        console.log('Testing create marker command', e.type);
        this.gisViewerEl.createMarker();
    }
    createDevState() {
        this.gisViewerState = {};
    }
};
__decorate([
    core_1.State()
], DevComponent.prototype, "gisViewerState", void 0);
__decorate([
    core_1.Listen('mapReady')
], DevComponent.prototype, "onMapReady", null);
__decorate([
    core_1.Listen('moveEnd')
], DevComponent.prototype, "onMoveEnd", null);
DevComponent = __decorate([
    core_1.Component({
        tag: 'dev-component',
        styleUrl: 'dev-component.scss'
    })
], DevComponent);
exports.DevComponent = DevComponent;
