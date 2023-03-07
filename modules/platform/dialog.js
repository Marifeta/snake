class Dialog extends ViewControl {
    constructor() {
        super('dialog', getElements('dialog'));
        this.el.addEventListener('click', this.clickHandler.bind(this));

    }
    hide() {
        this.el.removeAttribute('open');
    }
    show() {
        this.el.setAttribute("open", "open");
    }
    returnCheckedValue() {
        return document.querySelectorAll('input[name=radio]:checked')[0].value;
    }
}
