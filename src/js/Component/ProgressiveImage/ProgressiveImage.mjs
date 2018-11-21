
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

        img {
            max-width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
        }

        :host([preview]) > img {
            -webkit-filter: blur(5px);
            filter: blur(5px);
            opacity: 1;
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
            opacity: 1;
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

const intersectionObserver = new IntersectionObserver(
    entries => {
        for (const entry of entries) {
            if ((entry.isIntersecting || entry.intersectionRatio > 0) &&
                entry.target.offsetHeight > 0
            ) {
                entry.target.setAttribute('intersected', '');
            }
        }
    },
    {
        root: null,
        rootMargin: '0px',
        threshold: [0]
    }
);

const loadImage = src => new Promise((resolve, reject) => {
    const imageBuffer = new Image();
    imageBuffer.onload = resolve;
    imageBuffer.onerror = reject;
    imageBuffer.src = src;
});

class ProgressiveImage extends HTMLElement {
    static get observedAttributes() {
        return [
            'alt',
            'src',
            'height',
            'width',
            'intersected'
        ];
    }

    constructor() {
        super();
        if (window.ShadyCSS) {
            window.ShadyCSS.prepareTemplate(template, this.localName);
            window.ShadyCSS.styleElement(this);
        }
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._img = this.shadowRoot.querySelector('img');
    }

    connectedCallback() {
        this._liftAttribute('alt');
        this._liftAttribute('height');
        this._liftAttribute('width');
        this._liftAttribute('src');
        this._liftAttribute('intersected');

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
        intersectionObserver.unobserve(this);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        const hasNewValue = newValue !== null;
        const valueHasChanged = oldValue !== newValue;
        switch (attrName) {
            case 'alt':
                if (hasNewValue && valueHasChanged) {
                    this._img.setAttribute('alt', newValue);
                }
                break;

            case 'src':
                if (hasNewValue && valueHasChanged) {
                    if (this.loaded) {
                        return;
                    }
                    loadImage(this.src)
                        .then(() => {
                            this._img.src = this.src;
                            if (this.src !== this.dataSrc) {
                                this.preview = true;
                                this.loaded = false;
                            } else {
                                this.preview = false;
                                this.loaded = true;
                            }
                        })
                        .then(() => {
                            if (!this.intersected &&
                                this.preview &&
                                !this.loaded
                            ) {
                                intersectionObserver.observe(this);
                            }
                        })
                        .catch(() => undefined);
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

            case 'intersected':
                if (!this.intersected) {
                    return;
                }
                if (this.loaded || (!this.src || !this.dataSrc)) {
                    intersectionObserver.unobserve(this);

                    return;
                }
                if (this.preview && (Boolean(this.src) && Boolean(this.dataSrc))) {
                    this.src = this.dataSrc;
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
        return this.dataset.src || "";
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

    get intersected() {
        return this.hasAttribute('intersected');
    }

    set intersected(value) {
        const isIntersected = Boolean(value);
        if (isIntersected) {
            this.setAttribute('intersected', '');
        } else {
            this.removeAttribute('intersected');
        }
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
        return this.getAttribute('src') || "";
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

    _liftAttribute(attribute) {
        if (Object.prototype.hasOwnProperty.call(this, attribute)) {
            const originalAttribute = this[attribute];
            delete this[attribute];
            this[attribute] = originalAttribute;
        }
    }
}
customElements.define('progressive-img', ProgressiveImage);

export default ProgressiveImage;
