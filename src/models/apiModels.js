"use strict";
/* GisViewerProps and it children goes here */
Object.defineProperty(exports, "__esModule", { value: true });
// =========== SHAPES =========
var ShapeType;
(function (ShapeType) {
    ShapeType[ShapeType["CIRCLE"] = 0] = "CIRCLE";
    ShapeType[ShapeType["POLYGON"] = 1] = "POLYGON";
    ShapeType[ShapeType["MARKER"] = 2] = "MARKER";
    ShapeType[ShapeType["POLYLINE"] = 3] = "POLYLINE";
    ShapeType[ShapeType["LABEL"] = 4] = "LABEL";
    ShapeType[ShapeType["MULTIPOLYGON"] = 5] = "MULTIPOLYGON";
})(ShapeType = exports.ShapeType || (exports.ShapeType = {}));
var DropDownItemType;
(function (DropDownItemType) {
    DropDownItemType[DropDownItemType["REGULAR"] = 0] = "REGULAR";
    DropDownItemType[DropDownItemType["RADIO_BUTTON"] = 1] = "RADIO_BUTTON";
    DropDownItemType[DropDownItemType["CHECK_BOX"] = 2] = "CHECK_BOX";
})(DropDownItemType = exports.DropDownItemType || (exports.DropDownItemType = {}));
