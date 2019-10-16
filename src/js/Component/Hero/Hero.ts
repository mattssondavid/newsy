import customElements from '../../Util/CustomElements.js';

class Hero extends HTMLElement {
    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
    }
}
customElements.define('newsy-hero', Hero);

export default Hero;
