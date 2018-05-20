import customElements from '../../Util/CustomElements.mjs';

const template = document.createElement('template');
template.innerHTML = `
    <style></style>
    <img>
`;

class ProgressiveImage extends HTMLElement {
    static get observedAttributes() {
        return [
            'loaded',
            'src',
            'thumbnailsrc'
        ];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._img = this.shadowRoot.querySelector('img');
    }

    connectedCallback() {
        this._liftAttribute('thumbnailsrc');
        this._liftAttribute('src');
        this._liftAttribute('alt');
        this._liftAttribute('width');
        this._liftAttribute('height');
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        const hasNewValue = newValue !== null;
        const valueHasChanged = oldValue !== newValue;
        switch (attrName) {
            case 'thumbnailsrc':
                if (hasNewValue && valueHasChanged) {
                    const image = this._createImage(this.thumbnailsrc, (_) => {
                        console.log('preview image ready');
                        this._img = image;
                    });
                }
                break;

            case 'src':
                if (hasNewValue && valueHasChanged) {
                    const image = this._createImage(this.src, (_) => {
                        console.log('true image ready');
                        this._img = image;
                        this.loaded = true;
                    });
                }
                break;

            default:
                break;
        }
    }

    get alt() {
        return this._img.getAttribute('alt');
    }

    set alt(value) {
        this._img.setAttribute('alt', value);
    }

    get thumbnailsrc() {
        return this.getAttribute('thumbnailsrc');
    }

    set thumbnailsrc(value) {
        this.setAttribute('thumbnailsrc', value);
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

    get src() {
        return this.getAttribute('src');
    }

    set src(value) {
        this.setAttribute('src', value);
    }

    get height() {
        return this.getAttribute('height');
    }

    set height(value) {
        this._img.setAttribute('height', value);
        this.setAttribute('height', value);
    }

    get width() {
        return this.getAttribute('width');
    }

    set width(value) {
        this._img.setAttribute('width', value);
        this.setAttribute('width', value);
    }

    _liftAttribute(attribute) {
        if (this.hasOwnProperty(attribute)) {
            const originalAttribute = this[attribute];
            delete this[attribute];
            this[attribute] = originalAttribute;
        }
    }

    _createImage(src, onLoadFn) {
        const imageBuffer = new Image();
        const attrs = this._getAttributesArray()
            .filter((value) => {
                return value.name !== 'src';
            })
            .map((value) => {
                this[value.name] = value.value
                return value;
            })
            .map((value) => {
                imageBuffer[value.name] = value.value;
                console.log(`${value.name} => ${value.value}`);
                return value;
            });
        imageBuffer.onload = onLoadFn;
        imageBuffer.src = src;
        return imageBuffer;
    }

    _getAttributesArray() {
        return Array.prototype.slice.call(this.attributes);
    }
}
customElements.define('progressive-img', ProgressiveImage);

export default ProgressiveImage;

/*

https://www.sitepoint.com/how-to-build-your-own-progressive-image-loader/

https://jmperezperez.com/more-progressive-image-loading/
https://codepen.io/jmperez/pen/yYjPER

https://github.com/GoogleChromeLabs/ui-element-samples/blob/gh-pages/lazy-image/static/sc-img.js

*/