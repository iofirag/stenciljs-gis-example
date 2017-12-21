import { GisViewerProps } from '../../models/apiModels';
export declare class DevComponent {
    private gisViewerEl;
    gisViewerState: GisViewerProps;
    onMapReady(event: CustomEvent): void;
    onMoveEnd(event: UIEvent): void;
    componentWillLoad(): void;
    render(): JSX.Element;
    componentDidLoad(): void;
    testCreateMaerker(e: UIEvent): void;
    createDevState(): void;
}
