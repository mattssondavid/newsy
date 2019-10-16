const textSample = 'Quo dolores inventore possimus commodi consequatur ut enim exercitationem qui adipisci voluptas vel officia fugit non distinctio est incidunt aut corporis rerum similique possimus non ut dolorem exercitationem hic consectetur et reprehenderit qui ipsa ullam enim consequatur expedita cumque et id cum accusantium ad laudantium.';
const randomTextLength = (sourceText: String) => sourceText.substring(0, Math.floor(Number(Math.random().toPrecision(3)) * sourceText.length));

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

class HelloWorldTypeScript extends HTMLElement {
    message: string;
    _timer!: NodeJS.Timeout;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot!.appendChild(template.content.cloneNode(true));
        this.message = '';
    }


    connectedCallback() {
        this._timer = setInterval(
            () => {
                this.message = randomTextLength(textSample);
                this.render();
            },
            2000
        );
    }

    disconnectedCallback() {
        clearInterval(this._timer);
    }

    render() {
        this.shadowRoot!.querySelector('span[id="message"]')!.innerHTML = this.message;
    }
}

customElements.define('hello-world-typescript', HelloWorldTypeScript);
export default HelloWorldTypeScript;
