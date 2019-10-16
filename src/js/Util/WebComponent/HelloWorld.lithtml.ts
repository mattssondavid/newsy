import { html, render } from 'lit-html';
import { textSample, randomTextLength } from './HelloWorld.native.js';

class HelloWorldLitHtml extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.message = '';
    }

    connectedCallback() {
        this._timer = setInterval(
            () => {
                this.message = randomTextLength(textSample);
                render(this.template(), this.shadowRoot);
            },
            2000
        );
    }

    disconnectedCallback() {
        clearInterval(this._timer);
    }

    template() {
        return html`
            <style>
                p {
                    color: black;
                    font-size: 12px;
                }

                p > span {
                    color: blue;
                    font-size: 10px;
                    font-weight: 700;
                }
            </style>
            <p>Hello world! <span id="message">${this.message}</span></p>
        `;
    }
}
customElements.define('hello-world-lithtml', HelloWorldLitHtml);
export default HelloWorldLitHtml;
