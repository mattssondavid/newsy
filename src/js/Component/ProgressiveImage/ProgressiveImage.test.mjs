import chai from 'chai';
/* Global methods: describe, it */
import {} from './ProgressiveImage.mjs';

import {
    renderToDocument,
    removeElements,
    promisedRequestAnimationFrame
} from '../../../../test/WebComponent/TestUtil.mjs';

const { expect } = chai;

describe('ProgressiveImage', () => {
    afterEach(() => {
        // Cleanup
        removeElements('progressive-img');
    });

    it('can default render', async () => {
        const node = await renderToDocument('progressive-img');

        expect(node.attributes.length).to.equal(3);
        expect(node.getAttribute('alt')).to.equal('');
        expect(node.getAttribute('role')).to.equal('img');
        expect(node.getAttribute('tabindex')).to.equal('0');

        const img = node.shadowRoot.querySelector('img');
        expect(img.attributes.length).to.equal(1);
        expect(img.getAttribute('alt')).to.equal('');
    });

    it('can render with a set src attribute', async () => {
        const attributes = {
            src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
        };
        const node = await renderToDocument('progressive-img', attributes);

        expect(node.getAttribute('src')).to.equal(attributes.src);
        expect(node.shadowRoot.querySelector('img').getAttribute('src')).to.equal(attributes.src);
    });

    it('can render with a preview', async () => {
        const node = await renderToDocument('progressive-img');
        node.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        // The DOM is not ready for the test assertion. We have to wait a bit.
        await promisedRequestAnimationFrame();

        expect(node.loaded).to.equal(false);
        expect(node.preview).to.equal(true);
    });

    it('can render as loaded', async () => {
        const attributes = {
            src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
        };
        attributes['data-src'] = attributes.src;
        const node = await renderToDocument('progressive-img', attributes);

        expect(node.loaded).to.equal(true);
        expect(node.preview).to.equal(false);
    });

    it('can adjust alt via attribute', async () => {
        const node = await renderToDocument('progressive-img', { alt: 'test' });

        expect(node.getAttribute('alt')).to.equal('test');
        expect(node.shadowRoot.querySelector('img').getAttribute('alt')).to.equal('test');

        node.setAttribute('alt', 'test2');

        expect(node.getAttribute('alt')).to.equal('test2');
        expect(node.shadowRoot.querySelector('img').getAttribute('alt')).to.equal('test2');
    });

    it('can adjust alt via property', async () => {
        const node = await renderToDocument('progressive-img');
        node.alt = 'test';
        await promisedRequestAnimationFrame();

        expect(node.alt).to.equal('test');
        expect(node.getAttribute('alt')).to.equal('test');
        expect(node.shadowRoot.querySelector('img').getAttribute('alt')).to.equal('test');

        node.alt = 'test2';
        await promisedRequestAnimationFrame();

        expect(node.alt).to.equal('test2');
        expect(node.getAttribute('alt')).to.equal('test2');
        expect(node.shadowRoot.querySelector('img').getAttribute('alt')).to.equal('test2');
    });
});
