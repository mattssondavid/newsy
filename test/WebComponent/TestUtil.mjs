/*
 * Every function assumes @type {Document} `document` exists
 */

/**
 * Wrap `window.requestAnimationFrame` in a Promise
 * @return {Promise}
 */
export const promisedRequestAnimationFrame = () => new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
});

/**
 * @param {String} tagName
 * @param {String} [id='']
 *
 * @return {undefined}
 */
export const removeElements = (tagName, id = '') => {
    let tagNodes = Array.from(
        document.getElementsByTagName(tagName)
    );
    if (id) {
        tagNodes.filter(element => {
            return element.id === id;
        });
    }
    tagNodes.forEach(element => document.body.removeChild(element));
};

/**
 * @param {String} tagName
 * @param {Object} [attributes={}] Object containing (String:String) pairs of attributes
 *
 * @return {HTMLElement}
 */
const createElement = (tagName, attributes = {}) => {
    const node = document.createElement(tagName);
    Object.entries(attributes).forEach(pair => {
        const [key, value] = pair;
        node.setAttribute(key, value);
    });
    return node;
};

/**
 * @param {String} tagName
 * @param {Object} attributes
 *
 * @return {HTMLElement}
 */
export const renderToDocument = async (tagName, attributes) => {
    const node = createElement(tagName, attributes);
    document.body.appendChild(node);
    await window.customElements.whenDefined(tagName);
    await waitForWebComponentToBeReady(tagName);
    return node;
};

/**
 * ToDo: Fix this method so it waits till the DOM is ready with the WC
 *
 * @param {String} tagName
 */
const waitForWebComponentToBeReady = async (tagName) => {
    return new Promise(resolve => {
        const checkFn = async () => {
            const elements = document.querySelectorAll(tagName);
            await promisedRequestAnimationFrame();
            if (elements.length > 0) {
                resolve(true);
            } else {
                // await promisedRequestAnimationFrame();
                checkFn();
            }
        };
        checkFn();
    });
};
