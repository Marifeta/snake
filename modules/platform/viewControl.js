class ViewControl {
    constructor(name, el) {
        this.name = name;
        this.el = el;
        this.onClick = () => {};
    }
    hide() {
        this.el.classList.add("hidden");
    }
    show() {
        this.el.classList.remove("hidden");
    }
    clickHandler(e) {
        this.onClick(e);
    }
}
