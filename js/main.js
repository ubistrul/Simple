import { BREAK_POINTS } from './consts.js';
import { MobileMenuController } from './modules/mobileMenu.js';
import { SearchController } from './modules/searchController.js';

const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
};
const getWindowHeight = () => window.innerHeight;

const header = document.querySelector('.header');
const currentHeaderHeight = () => header.offsetHeight;
const headerTopHeigth = () => document.querySelector('.header-top').offsetHeight;
const main = document.querySelector('main');
const firstMainElement = main.firstElementChild;
const firstMainElementStyle = window.getComputedStyle(firstMainElement);
const firstMainElementPaddingTop = () => firstMainElementStyle.getPropertyValue('padding-top');

function updateElementPadding(element) {
    if (!element) {
        return;
    }

    const style = window.getComputedStyle(element);
    let paddingTop = parseFloat(style.getPropertyValue('padding-top'));
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
        paddingTop = PADDINGS.else;
    }

    paddingTop += currentHeaderHeight();
    element.style.paddingTop = paddingTop + 'px';
}

function updateMobileMenuHeight() {
    const offset = 10;
    const neededHeight = getWindowHeight() - headerTopHeigth();
    mobileMenuControl.setStyleHeight(`${neededHeight + offset}px`);
}

window.addEventListener('resize', () => {
    updateElementPadding(firstMainElement);
    updateMobileMenuHeight();
    if (window.innerWidth > BREAK_POINTS.mobile) {
        mobileMenuControl.closeMenu();
    }
});

window.addEventListener('load', () => {
    updateElementPadding(firstMainElement);
    updateMobileMenuHeight();
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

const smoothLinks = document.querySelectorAll('a[href^="#"]', 'a[href^="#"]');

smoothLinks.forEach((item) => {
    let hashLink = item.getAttribute('href').replace('#', '');

    if (hashLink && hashLink !== '!') {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const element = document.querySelector(`#${hashLink}`);
            const y = element.getBoundingClientRect().top + window.scrollY - currentHeaderHeight();

            {
                const mobileMenuLinks = Array.from(mobileMenuControl.innerLinks);
                if (mobileMenuLinks.includes(item)) {
                    mobileMenuControl.closeMenu();
                }
            }
            window.scrollTo({ top: y, behavior: 'smooth' });
            window.history.pushState(null, null, `#${hashLink}`);
            item.blur();
        });
    }
});
