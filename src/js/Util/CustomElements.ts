export default (typeof window.customElements !== undefined)
    ? window.customElements
    : {
        define: (tagName, constructor, options) => {},
        get: (tagName) => undefined,
        whenDefined: (tagName) => Promise.resolve()
    };