export class HeaderController {
    constructor({ headerElement }) {
        this.header = headerElement;
    }

    currentHeaderHeight() {
        return this.header.offsetHeight;
    }
}
