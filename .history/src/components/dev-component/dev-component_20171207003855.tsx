import { Component } from '@stencil/core';


@Component({
    tag: 'dev-component',
    styleUrl: 'dev-component.scss'
})
export class DevComponent {



    render() {
        return (
            <div>Dev component</div>
            <button>test button</button>
        );
    }
}