import customElements from '../../Util/CustomElements.mjs';
import {getPosts} from '../../API/Post.mjs';

class Teaser extends HTMLElement {
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
customElements.define('newsy-teaser', Teaser);

export default Teaser;
