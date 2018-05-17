import customElements from '../../Util/CustomElements.mjs';

const template = document.createElement('template');
template.innerHTML = `
    <style></style>
    <img/>
`;

class ProgressiveImage extends HTMLImageElement {
    static get observedAttributes() {
        return [
            'loaded',
        ];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this._liftAttribute('thumbnail-src');
        const imageBuffer = new Image();
        imageBuffer.onload = this._onLoad;
        imageBuffer.src = this.src;
        imageBuffer.srcset = this.srcset;
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        const hasNewValue = newValue !== null;
        const valueHasChanged = oldValue !== newValue;
        switch (attrName) {
            case 'thumbnail-src':
                if (hasNewValue && valueHasChanged) {
                    this._render();
                }
                break;

            default:
                break;
        }
    }

    get thumbnail() {
        return this.getAttribute('thumbnail-src');
    }

    set thumbnail(value) {
        this.setAttribute('thumbnail-src', value);
    }

    get loaded() {
        return this.hasAttribute('loaded');
    }

    set loaded(value) {
        const isLoaded = Boolean(value);
        if (isLoaded) {
            this.setAttribute('loaded', '');
        } else {
            this.removeAttribute('loaded');
        }
    }

    _liftAttribute(attribute) {
        if (this.hasOwnProperty(attribute)) {
            const originalAttribute = this[attribute];
            delete this[attribute];
            this[attribute] = originalAttribute;
        }
    }

    _onLoad() {
        this.loaded = true;
    }

    _render() {
        const image = this.shadowRoot.querySelector('img');
        if (!this.loaded) {
            this._getAttributesArray
                .filter((value, name) => {
                    return name !== 'src';
                })
                .map((value, name) => this[name] = value);
            this.src = this.thumbnail;
        } else {
            this._getAttributesArray
                .map((value, name) => this[name] = value);
        }
    }

    _getAttributesArray() {
        return Array.prototype.slice.call(this.attributes);
    }
}
customElements.define('progressive-img', ProgressiveImage, {extends: 'img'});

export default ProgressiveImage;
