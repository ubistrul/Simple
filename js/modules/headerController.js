export class HeaderController {
    constructor({ mainHeaderEl, topHeaderElement, bottomHeaderElement }) {
        this.mainHeader = mainHeaderEl;
        this.topHeader = topHeaderElement;
        this.bottomHeader = bottomHeaderElement;
    }
    currentHeaderHeight() {
        return this.mainHeader.offsetHeight;
    }

    currentTopHeaderHeight() {
        return this.topHeader.offsetHeight || 0;
    }

    currentBottomHeaderHeight() {
        return this.bottomHeader.offsetHeight || 0;
    }
}
