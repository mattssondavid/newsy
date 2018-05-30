import customElements from '../../Util/CustomElements.mjs';
import {ShadyCSSStampElement} from '../../Util/ShadyCSSHelper.mjs';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            -webkit-box-sizing: inherit;
            -moz-box-sizing: inherit;
            box-sizing: inherit;
            display: inline-block;
            margin: 0;
            padding: 0;
            position: relative;
            width: 100%;
        }

        :host > img {
            max-width: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }

        :host([preview]) > img {
            -webkit-filter: blur(5px);
            filter: blur(5px);
        }

        :host([loaded]) > img {
            will-change: opacity;
            -webkit-animation-name: image-shift;
            -moz-animation-name: image-shift;
            -o-animation-name: image-shift;
            animation-name: image-shift;
            -webkit-animation-duration: 3s;
            -moz-animation-duration: 3s;
            -o-animation-duration: 3s;
            animation-duration: 3s;
        }

        @-webkit-keyframes image-shift {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @-moz-keyframes image-shift {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @-o-keyframes image-shift {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes image-shift {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    </style>
    <img />
`;

class ProgressiveImage extends HTMLElement {
    static get observedAttributes() {
        return [
            'src',
            'height',
            'width',
        ];
    }

    constructor() {
        super();
        ShadyCSSStampElement(template, 'progressive-img', this);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._img = this.shadowRoot.querySelector('img');
    }

    connectedCallback() {
        this._liftAttribute('alt');
        this._liftAttribute('height');
        this._liftAttribute('width');
        this._liftAttribute('src');

        if (!this.hasAttribute('alt')) {
            this.alt = '';
        }

        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'img');
        }

        if (!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', '0');
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        const hasNewValue = newValue !== null;
        const valueHasChanged = oldValue !== newValue;
        switch (attrName) {
            case 'src':
                if (hasNewValue && valueHasChanged) {
                    const image = this._createImage(newValue, (_) => {
                        if (this._img.parentNode === null) {
                            // This is a fix for Firefox, which can enter a state
                            // where parentNode (the shadowRoot) is NULL, which
                            // is caused by Firefox not creating empty elements
                            // in a shadowRoot, so the initial <img /> does not
                            // exist
                            this.shadowRoot.appendChild(image);
                        } else {
                            this._img.parentNode.replaceChild(image, this._img);
                        }
                        this._img = image;
                        if (this.src !== this.dataSrc) {
                            this.preview = true;
                            this.loaded = false;
                            this.src = this.dataSrc; // Re-trigger attributeChangedCallback
                        } else {
                            this.preview = false;
                            this.loaded = true;
                        }
                    });
                }
                break;

            case 'height':
                if (hasNewValue && valueHasChanged) {
                    this.style.height = `${newValue}px`;
                    this._img.setAttribute('height', newValue);
                }
                break;

            case 'width':
                if (hasNewValue && valueHasChanged) {
                    this.style.width = `${newValue}px`;
                    this._img.setAttribute('width', newValue);
                }
                break;

            default:
                break;
        }
    }

    get alt() {
        return this.getAttribute('alt');
    }

    set alt(value) {
        this.setAttribute('alt', value);
    }

    get dataSrc() {
        return this.dataset.src;
    }

    set dataSrc(value) {
        this.setAttribute('data-src', value);
    }

    get height() {
        return this.getAttribute('height');
    }

    set height(value) {
        this.setAttribute('height', value);
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

    get preview() {
        return this.hasAttribute('preview');
    }

    set preview(value) {
        const isPreview = Boolean(value);
        if (isPreview) {
            this.setAttribute('preview', '');
        } else {
            this.removeAttribute('preview');
        }
    }

    get src() {
        return this.getAttribute('src');
    }

    set src(value) {
        this.setAttribute('src', value);
    }

    get width() {
        return this.getAttribute('width');
    }

    set width(value) {
        this.setAttribute('width', value);
    }

    _createImage(src, onLoadFn) {
        const imageBuffer = new Image();
        const attrs = this._getAttributesArray()
            .filter((value) => {
                return value.name !== 'src' && value.name !== 'style';
            })
            .map((value) => {
                imageBuffer[value.name] = value.value;
                return value;
            });
        imageBuffer.onload = onLoadFn;
        imageBuffer.src = src;
        return imageBuffer;
    }

    _getAttributesArray() {
        return Array.prototype.slice.call(this.attributes);
    }

    _liftAttribute(attribute) {
        if (this.hasOwnProperty(attribute)) {
            const originalAttribute = this[attribute];
            delete this[attribute];
            this[attribute] = originalAttribute;
        }
    }
}
customElements.define('progressive-img', ProgressiveImage);

export default ProgressiveImage;

/*

https://www.sitepoint.com/how-to-build-your-own-progressive-image-loader/

https://jmperezperez.com/more-progressive-image-loading/
https://codepen.io/jmperez/pen/yYjPER

https://github.com/GoogleChromeLabs/ui-element-samples/blob/gh-pages/lazy-image/static/sc-img.js

https://medium.com/front-end-hacking/progressive-image-loading-and-intersectionobserver-d0359b5d90cd

The gist is to load in a smaller image a-head-of a big image. Once the big image
is loaded, then replace the smaller image. The replacing could be nicel done with
a CSS transition (e.g. opacity change).
- Perhaps store "real" image in a dataset property, and setting the image.src to
preview image, replacing the preview with the real image once it has buffered up.

*/

/*
To fix Firefox and Edge with bleeding CSS, perhaps should check if the browser
supports shadowDOM CSS, if it doesn't then perhaps loop through all CSS rules in
the template.style and apply it with `"this.style" = ...`

styles:
console.log(this.shadowRoot.querySelector('style'));
console.log('host', this.shadowRoot.host);
console.log('stylesheets', this.shadowRoot.styleSheets);
console.log('host style', this.shadowRoot.host.style);
*/