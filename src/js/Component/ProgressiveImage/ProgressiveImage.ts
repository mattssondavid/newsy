
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

const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve: Function, reject: Function) => {
    const imageBuffer = new Image();
    imageBuffer.onload = resolve();
    imageBuffer.onerror = reject(event);
    imageBuffer.src = src;
});

class ProgressiveImage extends HTMLElement {
    private _img: HTMLImageElement;
    private _intersectionObserver: IntersectionObserver|null;

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
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));

        this._img = shadowRoot.querySelector('img')!;

        this._intersectionObserver = null;
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

        this._createIntersectionObserver();
    }

    disconnectedCallback() {
        this._destroyIntersectionObserver();
    }

    attributeChangedCallback(attrName: string, oldValue: string|null, newValue: string|null) {
        const hasNewValue = newValue !== null;
        const valueHasChanged = oldValue !== newValue;
        switch (attrName) {
            case 'alt':
                if (hasNewValue && valueHasChanged) {
                    this._img.setAttribute(
                        'alt',
                        newValue ? newValue : ''
                    );
                }
                break;

            case 'src':
                if (hasNewValue && valueHasChanged) {
                    if (this.loaded) {
                        return;
                    }
                    loadImage(this.src)
                        .then(
                            () => {
                                // input: event type loaded
                                this._img.src = this.src;
                                if (this.src !== this.dataSrc) {
                                    this.preview = true;
                                    this.loaded = false;
                                } else if (this.src === this.dataSrc) {
                                    this.preview = false;
                                    this.loaded = true;
                                }

                                if (!this.intersected && this.preview && !this.loaded) {
                                    this._observeIntersection();
                                }
                            },
                            () => {
                                // input: event type error
                                this._unobserveIntersection();
                            }
                        )
                        .catch(() => {
                            this._unobserveIntersection();
                        });
                }
                break;

            case 'height':
                if (hasNewValue && valueHasChanged) {
                    this.style.height = `${newValue}px`;
                    this._img.setAttribute(
                        'height',
                        newValue ? newValue : ''
                    );
                }
                break;

            case 'width':
                if (hasNewValue && valueHasChanged) {
                    this.style.width = `${newValue}px`;
                    this._img.setAttribute(
                        'width',
                        newValue ? newValue : ''
                    );
                }
                break;

            case 'intersected':
                if (!this.intersected) {
                    return;
                }
                if (this.loaded || (!this.src || !this.dataSrc)) {
                    this._unobserveIntersection();

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

    get alt(): string {
        return this.getAttribute('alt') || '';
    }

    set alt(value: string) {
        this.setAttribute('alt', value);
    }

    get dataSrc(): string {
        return this.dataset.src || '';
    }

    set dataSrc(value: string) {
        this.setAttribute('data-src', value);
    }

    get height(): string {
        return this.getAttribute('height') || '';
    }

    set height(value: string) {
        this.setAttribute('height', value);
    }

    get intersected(): Boolean {
        return this.hasAttribute('intersected');
    }

    set intersected(isIntersected: Boolean) {
        if (isIntersected) {
            this.setAttribute('intersected', '');
        } else {
            this.removeAttribute('intersected');
        }
    }

    get loaded(): Boolean {
        return this.hasAttribute('loaded');
    }

    set loaded(isLoaded: Boolean) {
        if (isLoaded) {
            this.setAttribute('loaded', '');
        } else {
            this.removeAttribute('loaded');
        }
    }

    get preview(): Boolean {
        return this.hasAttribute('preview');
    }

    set preview(isPreview: Boolean) {
        if (isPreview) {
            this.setAttribute('preview', '');
        } else {
            this.removeAttribute('preview');
        }
    }

    get src(): string {
        return this.getAttribute('src') || '';
    }

    set src(value: string) {
        this.setAttribute('src', value);
    }

    get width(): string {
        return this.getAttribute('width') || '';
    }

    set width(value: string) {
        this.setAttribute('width', value);
    }

    /**
     * Lift the attribute which may cause a trigger to ´attributeChangedCallback´
     * for observered attributes
     *
     * @param {string} attribute The attribute to lift
     */
    private _liftAttribute(attribute: string) {
        const originalAttribute = this.attributes.getNamedItem(attribute);
        if (originalAttribute) {
            this.attributes.removeNamedItem(attribute);
            this.attributes.setNamedItem(originalAttribute);
        }
    }

    private _createIntersectionObserver() {
        if (this._intersectionObserver) {
            return;
        }

        /**
         * @param {[IntersectionObserverEntry]} entries
         */
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            if (entries.some(entry => entry.isIntersecting)) {
                this.intersected = true;
            }
        };
        this._intersectionObserver = new IntersectionObserver(
            observerCallback,
            {
                root: null,
                rootMargin: '0px',
                threshold: [0]
            }
        );
    }

    private _destroyIntersectionObserver() {
        if (this._intersectionObserver) {
            this._intersectionObserver.unobserve(this);
            this._intersectionObserver.disconnect();
            this._intersectionObserver = null;
        }
    }

    private _observeIntersection() {
        if (this._intersectionObserver) {
            this._intersectionObserver.observe(this);
        }
    }

    private _unobserveIntersection() {
        if (this._intersectionObserver) {
            this._intersectionObserver.unobserve(this);
        }
    }
}
customElements.define('progressive-img', ProgressiveImage);

export default ProgressiveImage;
