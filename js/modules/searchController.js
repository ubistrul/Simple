import { ARIA_EXPANDED_ATTRIBUTE, ARIA_HIDDEN_ATTRIBUTE } from '../consts.js';
import {
    addClass,
    focusToElem,
    removeClass,
    setAttrubuteBoolean,
    elementHasClassName,
} from '../helpers/index.js';

class SearchController {
    constructor({ searchBtn, searchElement, inputElement, closeBtn, activeClass }) {
        this.searchBtn = searchBtn;
        this.searchElem = searchElement;
        this.inputElement = inputElement;
        this.closeBtn = closeBtn;
        this.activeClass = activeClass;

        this.addEventListeners();
    }

    addEventListeners() {
        this.searchBtn.addEventListener('click', this.open.bind(this));
        this.closeBtn.addEventListener('click', this.close.bind(this));
    }

    open() {
        if (!this.searchElem) {
            return;
        }
        addClass(this.searchElem, this.activeClass);
        this.setAriaAttributes();
        this.inputFocus();
    }

    inputFocus() {
        focusToElem(this.inputElement);
    }

    close() {
        if (!this.searchElem) {
            return;
        }
        removeClass(this.searchElem, this.activeClass);
        this.setAriaAttributes();
    }

    isSearchHasActiveClass() {
        return elementHasClassName(this.searchElem, this.activeClass);
    }

    setAriaAttributes() {
        const ariaHidden = this.isSearchHasActiveClass() ? false : true;
        const ariaExpanded = this.isSearchHasActiveClass() ? true : false;
        setAttrubuteBoolean(this.searchElem, ARIA_HIDDEN_ATTRIBUTE, ariaHidden);
        setAttrubuteBoolean(this.searchElem, ARIA_EXPANDED_ATTRIBUTE, ariaExpanded);
    }
}

export { SearchController };
