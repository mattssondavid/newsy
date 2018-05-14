import customElements from '../../Util/CustomElements.mjs';

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
