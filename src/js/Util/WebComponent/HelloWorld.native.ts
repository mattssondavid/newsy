
export const textSample = 'Quo dolores inventore possimus commodi consequatur ut enim exercitationem qui adipisci voluptas vel officia fugit non distinctio est incidunt aut corporis rerum similique possimus non ut dolorem exercitationem hic consectetur et reprehenderit qui ipsa ullam enim consequatur expedita cumque et id cum accusantium ad laudantium.';

/**
 * @param {String} sourceText
 */
export const randomTextLength = sourceText => sourceText.substring(0, Math.floor(Number(Math.random().toPrecision(3)) * sourceText.length));

class HelloWorldNative extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                p {
                    color: black;
                    font-size: 12px;
                }

                p > span {
                    color: red;
                    font-size: 10px;
                    font-weight: 700;
                }
            </style>
            <p>Hello world! <span id="message"></span></p>
        `;
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
customElements.define('hello-world-native', HelloWorldNative);
export default HelloWorldNative;
