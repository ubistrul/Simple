import { setAttrubuteBoolean } from '../helpers/index.js';
import { ARIA_EXPANDED_ATTRIBUTE, ARIA_HIDDEN_ATTRIBUTE } from '../consts.js';

class MobileMenuController {
    constructor({
        triggerElement,
        menuElement,
        triggerElementClassActive,
        menuElementClassActive,
        menuLinks,
    }) {
        this.triggerElement = triggerElement;
        this.menuElement = menuElement;
        this.triggerElementClassActive = triggerElementClassActive;
        this.menuElementClassActive = menuElementClassActive;
        this.body = document.querySelector('body');
        this.innerLinks = menuLinks;

        this.addEventListeners();
    }

    addEventListeners() {
        this.triggerElement.addEventListener('click', this.toggleMenu.bind(this));
        this.menuElement.addEventListener('click', this.handleClickOutside.bind(this)); // Необязательно для отдельных методов открытия/закрытия
    }

    openMenu() {
        this.triggerElement.classList.add(this.triggerElementClassActive);
        this.menuElement.classList.add(this.menuElementClassActive);
        this.body.classList.add('no-scroll');
        this.setBodyOverflow();
        this.setAriaAttributes();
    }

    closeMenu() {
        this.triggerElement.classList.remove(this.triggerElementClassActive);
        this.menuElement.classList.remove(this.menuElementClassActive);
        this.body.classList.remove('no-scroll');
        this.setBodyOverflow();
        this.setAriaAttributes();
    }

    toggleMenu() {
        if (this.isMenuHasActiveClass()) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    handleClickOutside(event) {
        const target = event.target;
        const mobileMenuLinks = Array.from(this.innerLinks);
        if (this.isMenuHasActiveClass() && !mobileMenuLinks.includes(target)) {
            this.closeMenu();
        }
    }

    setBodyOverflow() {
        if (this.isMenuHasActiveClass()) {
            const scrollbarWidth = this.getScrollbarWidth();
            this.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            this.body.style.paddingRight = '';
        }
    }

    setStyleHeight(height) {
        this.menuElement.style.height = height;
    }

    getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    isMenuHasActiveClass() {
        return this.menuElement.classList.contains(this.menuElementClassActive);
    }

    setAriaAttributes() {
        const ariaHidden = this.isMenuHasActiveClass() ? false : true;
        const ariaExpanded = this.isMenuHasActiveClass() ? true : false;
        setAttrubuteBoolean(this.searchElem, ARIA_HIDDEN_ATTRIBUTE, ariaHidden);
        setAttrubuteBoolean(this.searchElem, ARIA_EXPANDED_ATTRIBUTE, ariaExpanded);

        this.menuElement.setAttribute('aria-hidden', ariaHidden);
        this.menuElement.setAttribute('aria-expanded', ariaExpanded);
    }
}

export { MobileMenuController };
