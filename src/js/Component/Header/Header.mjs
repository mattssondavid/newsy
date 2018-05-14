import customElements from '../../Util/CustomElements.mjs';

class Header extends HTMLElement {
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
customElements.define('newsy-header', Header);

export default Header;
