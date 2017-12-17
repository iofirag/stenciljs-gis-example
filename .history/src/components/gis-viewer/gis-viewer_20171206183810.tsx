import { Component, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';


@Component({
    tag: 'gis-viewer',
    styleUrl: 'gis-viewer.scss'
})
export class GisViewer {

    @Prop() match: MatchResults;
    @me

    render() {
        return (<div>ddYou have reach 'very secure' file server of company X</div>)
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