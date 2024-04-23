import { BREAK_POINTS } from './consts.js';
import { MobileMenuController } from './modules/mobileMenuController.js';
import { SearchController } from './modules/searchController.js';
import { smoothLinksScroll } from './modules/smoothLinksScroll.js';
import { getWindowHeight } from './helpers/index.js';
import { HeaderController } from './modules/headerController.js';

const header = document.querySelector('.header');
const headerTop = document.querySelector('.header-top');
const headerBottom = document.querySelector('.header-bottom');

const headerController = new HeaderController({
    mainHeaderEl: header,
    topHeaderElement: headerTop,
    bottomHeaderElement: headerBottom,
});

const mobileMenuHeight = () => getWindowHeight() - headerController.currentTopHeaderHeight();
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
    mobileMenuControl.updateMobileMenuHeight(10, mobileMenuHeight());

    updateElementPadding(firstMainElement);
    if (window.innerWidth > BREAK_POINTS.mobile) {
        mobileMenuControl.closeMenu();
    }
});

window.addEventListener('load', () => {
    mobileMenuControl.updateMobileMenuHeight(10, mobileMenuHeight());

    updateElementPadding(firstMainElement);
});

//? Mobile menu logic

const burgerMenuBtn = document.querySelector('.burger-menu');
const burgerMenuActiveClass = 'burger-menu--active';
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuActiveClass = 'mobile-menu--active';
const mobileMenuLinkClassName = 'mobile-menu__nav-link';
const mobileMenuLinks = document.querySelectorAll(`.${mobileMenuLinkClassName}`);

const mobileMenuControl = new MobileMenuController({
    triggerElement: burgerMenuBtn,
    menuElement: mobileMenu,
    triggerElementClassActive: burgerMenuActiveClass,
    menuElementClassActive: mobileMenuActiveClass,
    menuLinks: mobileMenuLinks,
});

//? Top Header Search

const searchBtnTop = document.querySelector('.nav-buttons-top__search');
const searchFormTop = document.querySelector('.search-form-top');
const searchFormTopInput = document.querySelector('.search-form-top__input');
const searchCloseBtnTop = document.querySelector('.search-form-top__close');
const searchFormTopActive = 'search-form-top--width';

const searchTopController = new SearchController({
    searchBtn: searchBtnTop,
    searchElement: searchFormTop,
    inputElement: searchFormTopInput,
    closeBtn: searchCloseBtnTop,
    activeClass: searchFormTopActive,
});

//? Bottom Header Search

const searchBtnBottom = document.querySelector('.nav-buttons-bottom__search');
const searchFormBottom = document.querySelector('.search-form-bottom');
const searchFormBottomInput = document.querySelector('.search-form-bottom__input');
const searchCloseBtnBottom = document.querySelector('.search-form-bottom__close');
const searchFormBottomActiveClass = 'search-form-bottom--width';

const searchBottomController = new SearchController({
    searchBtn: searchBtnBottom,
    searchElement: searchFormBottom,
    inputElement: searchFormBottomInput,
    closeBtn: searchCloseBtnBottom,
    activeClass: searchFormBottomActiveClass,
});

//? Smooth scroll to Links

const smoothLinks = document.querySelectorAll('a[href^="#"]', 'a[href^="#!"]');
smoothLinksScroll(smoothLinks, mobileMenuControl);
