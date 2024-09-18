import { BREAK_POINTS } from './consts.js';
import { MobileMenuController } from './modules/mobileMenuController.js';
import { SearchController } from './modules/searchController.js';
import { smoothLinksScroll } from './modules/smoothLinksScroll.js';
import { getWindowHeight } from './helpers/index.js';
import { HeaderController } from './modules/headerController.js';

const headerElement = document.querySelector('.header-main');

const headerController = new HeaderController({
    headerElement: headerElement,
});

const mobileMenuHeight = () => getWindowHeight() - headerController.currentHeaderHeight();
const main = document.querySelector('main');
const firstMainElement = main.firstElementChild;

function updateElementPadding(element) {
    if (!element) {
        return;
    }

    const elementStyles = window.getComputedStyle(element);
    let paddingTop = parseFloat(elementStyles.getPropertyValue('padding-top'));
    const PADDINGS = {
        mobile: 49,
        tablet: 20,
        else: 60,
    };

    if (window.innerWidth <= BREAK_POINTS.mobile) {
        paddingTop = PADDINGS.mobile;
    } else if (window.innerWidth <= BREAK_POINTS.tablet) {
        paddingTop = PADDINGS.tablet;
    } else {
        paddingTop = PADDINGS.else || 0;
    }

    paddingTop += headerController.currentHeaderHeight();
    element.style.paddingTop = paddingTop + 'px';
}

window.addEventListener('resize', () => {
    mobileMenuController.updateMobileMenuHeight(10, mobileMenuHeight());
    // document.body.style.paddingTop = headerController.currentHeaderHeight() + 'px';

    updateElementPadding(firstMainElement);
    if (window.innerWidth > BREAK_POINTS.mobile) {
        mobileMenuController.closeMenu();
    }
});

window.addEventListener('load', () => {
    mobileMenuController.updateMobileMenuHeight(10, mobileMenuHeight());

    updateElementPadding(firstMainElement);
});

//? Mobile menu logic

const burgerMenuBtn = document.querySelector('.burger-menu');
const burgerMenuActiveClass = 'burger-menu--active';
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuActiveClass = 'mobile-menu--active';
const mobileMenuLinkClassName = 'mobile-menu__nav-link';
const mobileMenuLinks = document.querySelectorAll(`.${mobileMenuLinkClassName}`);

const mobileMenuController = new MobileMenuController({
    triggerElement: burgerMenuBtn,
    menuElement: mobileMenu,
    triggerElementClassActive: burgerMenuActiveClass,
    menuElementClassActive: mobileMenuActiveClass,
    menuLinks: mobileMenuLinks,
});

//? Header Search

const searchBtn = document.querySelector('.nav-buttons__search');
const searchForm = document.querySelector('.search-form');
const searchFormInput = document.querySelector('.search-form__input');
const searchCloseBtn = document.querySelector('.search-form__close');
const searchFormActive = 'search-form--width';

const searchTopController = new SearchController({
    searchBtn: searchBtn,
    searchElement: searchForm,
    inputElement: searchFormInput,
    closeBtn: searchCloseBtn,
    activeClass: searchFormActive,
});

//? Smooth scroll to Links

const smoothLinks = document.querySelectorAll('a[href^="#"]', 'a[href^="#!"]');
smoothLinksScroll({ headerController, linksNodeList: smoothLinks, mobileMenuController });
