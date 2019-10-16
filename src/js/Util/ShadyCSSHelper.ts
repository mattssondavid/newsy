/**
 * Use this function BEFORE initialising a Shadow Root via attachShadow
 *
 * Example:
 *   In the Web Component's constructor, assumed "template" is a variable to a template tag
 *   ShadyCSSStampElement(template, 'x-tag', this);
 *   this.attachShadow({mode: 'open'});
 *
 * @param templateElement A <template> element
 * @param elementName The Web Component element name, as used in customElements.define function
 * @param element The Web Component element instance (this)
 */
export const ShadyCSSStampElement = (templateElement, elementName, element) => {
    if (nativeShadowDomSupport()) return;
    ShadyCSS.prepareTemplate(templateElement, elementName);
    ShadyCSS.styleElement(element);
}

const nativeShadowDomSupport = () => window.HTMLElement.prototype
    .attachShadow
    .toString()
    .indexOf('[native code]') > -1 || false;
