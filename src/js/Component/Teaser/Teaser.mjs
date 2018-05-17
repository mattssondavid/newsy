import customElements from '../../Util/CustomElements.mjs';
import {getPosts} from '../../API/Post.mjs';
import {getPost} from '../../API/Post.mjs';
import {getImage} from '../../API/Image.mjs';

const template = document.createElement('template');
template.innerHTML = `
    <a>
        <progressive-img/>
    </a>
    <header>
        <h3>
            <a></a>
        </h3>
    </header>
    <section></section>
    <footer></footer>
`;

class Teaser extends HTMLElement {
    static get observedAttributes() {
        return [
            'id',
            'loaded',
        ];
    }

    constructor() {
        super();
        this._post = Object.freeze({});

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        if (this.hasOwnProperty('id')) {
            let value = this['id'];
            delete this['id'];
            this['id'] = value;
        }
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === 'loaded') {
            if (this.loaded) this._render();
        }

        if (attrName === 'id') {
            const valueChanged = oldValue !== newValue;
            if (valueChanged) {
                this._load();
            }
        }
    }

    get id() {
        return parseInt(this.getAttribute('id'), 10);
    }

    set id(value) {
        this.setAttribute('id', value);
    }

    get loaded() {
        return this.hasAttribute('loaded') && Object.keys(this._post).length > 0;
    }

    set loaded(value) {
        const isLoaded = Boolean(value);
        if (isLoaded) {
            this.setAttribute('loaded', '');
        } else {
            this.removeAttribute('loaded');
        }
    }

    async _load() {
        const post = await getPost(this.id);
        if (parseInt(post.featured_media, 10) > 0) {
            const image = await getImage(post.featured_media);
            post.featured_media_data = image;
        } else {
            post.featured_media_data = null;
        }
        this._post = Object.freeze(post);
        this.loaded = true;
    }

    _render() {
        const titleLink = this.shadowRoot.querySelector('header > h3 > a');
        titleLink.href = this._post.link;
        titleLink.rel = 'bookmark';
        titleLink.textContent = this._post.title.rendered;

        const content = this.shadowRoot.querySelector('section');
        content.innerHTML = this._post.excerpt.rendered;

        if (this._post.featured_media_data !== null) {
            if (this._post.featured_media_data.media_details.hasOwnProperty('sizes')) {
                const image = this.shadowRoot.querySelector('a > progressive-img');
                image.alt = this._post.featured_media_data.alt_text;
                image.width = this._post.featured_media_data.media_details.sizes.medium.width;
                image.height = this._post.featured_media_data.media_details.sizes.medium.height;
                image.src = this._post.featured_media_data.media_details.sizes.medium.source_url;
                const imageLink = this.shadowRoot.querySelector('a');
                imageLink.href = this._post.link;
            }
        }

        console.log(this._post);
    }
}
customElements.define('newsy-teaser', Teaser);

export default Teaser;
