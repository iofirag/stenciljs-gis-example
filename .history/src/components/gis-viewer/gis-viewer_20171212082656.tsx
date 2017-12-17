import { Component, Prop } from '@stencil/core';
import * as L from 'leaflet';

@Component({
    tag: 'gis-viewer',
    styleUrls: ['gis-viewer.scss', '../../../node_modules/leaflet/dist/leaflet.css'],
})
export class GisViewer {

    @Prop() match: string;

    render() {
        return (
            <div id='map' />
        )
    }

    componentDidLoad() {
        let map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
    }

    public async exportMapImage(): Promise<any> {
        const controllers: any = document.getElementsByClassName('leaflet-control-container')[0];

        controllers.style.display = 'none';

        const markers = {};
        const markerLayer: any = document.querySelectorAll('.leaflet-marker-icon');

        // Remove tags css translate values and save the for after use
        if (markerLayer) {
            markerLayer.forEach((mark: any, i: number) => {
                const markTransformList = mark.style.transform.replace('translate3d(', '').split(',');
                mark.style.transform = '';

                if (markTransformList.length > 1) {
                    const markX = parseFloat(markTransformList[0].replace('px', ''));
                    mark.style.left = `${markX}px`;
                    const markY = parseFloat(markTransformList[1].replace('px', ''));
                    mark.style.top = `${markY}px`;
                    markers[i] = { markX, markY };
                }
            });
        }

        const linesLayer: any = document.querySelectorAll('svg.leaflet-zoom-animated')[0];
        const canvasElm: HTMLCanvasElement = document.createElement("canvas");
        const overlayContainer = document.getElementsByClassName('leaflet-overlay-pane')[0];

        // create canvas from the overlays svg
        if (canvasElm && linesLayer) {
            canvg(canvasElm, linesLayer.outerHTML);
        }

        // hide overlay svg layer and add the overlay canvas layer,
        // this is must for html2canvas to generate the overlays into image
        if (linesLayer) {
            linesLayer.style.transform.replace('translate3d(', '').split(','); // linesTransform
            linesLayer.style.display = "none";
            if (canvasElm) {
                canvasElm.style.transform = linesLayer.style.transform;
                canvasElm.style.zIndex = "200";
                if (overlayContainer) {
                    overlayContainer.appendChild(canvasElm);
                }
            }
        }

        // create the canvas from the leaflet map
        const canvas: any = await html2canvas(document.getElementById("map"), { useCORS: true, svgRendering: true });

        // return all the layers to their previous styles
        controllers.style.display = 'initial';

        if (linesLayer) {
            linesLayer.style.display = 'initial';
            if (overlayContainer && canvasElm) {
                overlayContainer.removeChild(canvasElm);
            }
        }

        if (markerLayer) {
            markerLayer.forEach((mark: any, i: number) => {
                const pos = markers[i];

                mark.style.transform = `translate3d(${pos.markX}px,${pos.markY}px, 0px)`;
                mark.style.top = `${0}px`;
                mark.style.left = `${0}px`;
            });
        }

        return canvas;
    }
}