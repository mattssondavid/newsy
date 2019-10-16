import { textSample, randomTextLength } from './HelloWorld.native.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        p {
            color: black;
            font-size: 12px;
        }

        p > span {
            color: green;
            font-size: 10px;
            font-weight: 700;
        }
    </style>
    <p>Hello world! <span id="message"></span></p>
`;

class HelloWorldTemplate extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.message = '';
    }

    connectedCallback() {
        this._timer = setInterval(
            () => {
                this.message = randomTextLength(textSample);
                this.changeHtmlMessage();
            },
            2000
        );
    }

    disconnectedCallback() {
        clearInterval(this._timer);
    }

    /**
     * @param {Sting} value
     */
    changeHtmlMessage() {
        this.shadowRoot.querySelector('span[id="message"]').innerHTML = this.message;
    }
}
customElements.define('hello-world-template', HelloWorldTemplate);
export default HelloWorldTemplate;
