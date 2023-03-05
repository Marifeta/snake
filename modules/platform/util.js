function getElements(className) {
    const element = document.getElementsByClassName(className)[0];
    if (element instanceof window.HTMLDocument
        || element instanceof window.Document
        || element instanceof (window.EventTarget || function () {})
        || element instanceof HTMLDocument
        || element instanceof Window) {
        return element;
    }
    throw new Error('Element is not a DOM-element or className is not defined');
}
