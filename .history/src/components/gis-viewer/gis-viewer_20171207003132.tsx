import { Component, Prop, Method } from '@stencil/core';
import * as L from "leaflet";


@Component({
    tag: 'gis-viewer',
    styleUrl: 'gis-viewer.scss'
})
export class GisViewer {

    @Prop() match: string;
    @Method()

    render() {
        if (!this.isConnectedToParent) {
            return (<DevComponent />);
        }

        const props: any = this.state;

        return (
            <div>
                <GisViewer key="theComponent" {...props} ref={(gis) => {
                    if (!gis) { return; }
                    this.gisComponent = gis;
                    this.gisComponent.fireMapReadyWhenReady();
                }} />
            </div>
        );
        return (<div>You have reach 'very secure' file server of company X</div>)
        // if (this.match && this.match.params.name) {
        //     return (
        //         <div>
        //             <p>
        //                 Hello! My name is {this.match.params.name}.
        //     My name was passed in through a route param!
        //   </p>
        //         </div>
        //     );
        // }
    }
}