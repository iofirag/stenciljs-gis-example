import { EventEmitter } from '@stencil/core';
import { GisViewerProps } from '../../models/apiModels';
export declare class GisViewer {
    private map;
    gisViewerProps: GisViewerProps;
    mapReady: EventEmitter;
    moveEnd: EventEmitter;
    render(): JSX.Element;
    componentDidLoad(): void;
    createMarker(): void;
}
