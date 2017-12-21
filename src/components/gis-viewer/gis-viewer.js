"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@stencil/core");
const L = require("leaflet");
let GisViewer = class GisViewer {
    render() {
        return (h("div", { id: 'map' }));
    }
    componentDidLoad() {
        this.map = new L.Map('map').setView([51.505, -0.09], 13);
        this.mapReady.emit();
        if (this.gisViewerProps.onMapReady && typeof this.gisViewerProps.onMapReady === 'function') {
            this.gisViewerProps.onMapReady();
        }
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
        this.map.on('moveend', () => {
            // if (this.gisViewerProps.onMapReady && typeof this.gisViewerProps.onMapReady === 'function') {
            //     this.gisViewerProps.onMapReady();
            // }
            this.moveEnd.emit('moveEnd');
        });
    }
    createMarker() {
        L.marker([50.5, -1.09]).addTo(this.map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
    }
};
__decorate([
    core_1.Prop()
], GisViewer.prototype, "gisViewerProps", void 0);
__decorate([
    core_1.Event()
], GisViewer.prototype, "mapReady", void 0);
__decorate([
    core_1.Event()
], GisViewer.prototype, "moveEnd", void 0);
__decorate([
    core_1.Method()
], GisViewer.prototype, "createMarker", null);
GisViewer = __decorate([
    core_1.Component({
        tag: 'gis-viewer',
        styleUrls: ['gis-viewer.scss', '../../../node_modules/leaflet/dist/leaflet.css'],
    })
], GisViewer);
exports.GisViewer = GisViewer;
