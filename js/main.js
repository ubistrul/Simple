const body = document.querySelector('body');
const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
};
const getWindowHeight = () => window.innerHeight;
const breakingPoints = {
    mobile: 509,
    tablet: 689,
};

const header = document.querySelector('.header');
const headerHeight = () => header.offsetHeight;
const headerTopHeigth = () => document.querySelector('.header-top').offsetHeight;
const main = document.querySelector('main');
const firstMainElement = main.firstElementChild;
const firstMainElementStyle = window.getComputedStyle(firstMainElement);
const firstMainElementPaddingTop = () => firstMainElementStyle.getPropertyValue('padding-top');

function updateElementPadding(element) {
    if (!element) {
        return;
    } else {
        const style = window.getComputedStyle(element);
        let paddingTop = parseFloat(style.getPropertyValue('padding-top'));
        let paddingBottom = parseFloat(style.getPropertyValue('padding-top'));

        if (window.innerWidth <= breakingPoints.mobile) {
            paddingTop = 49;
            paddingBottom = 49;
        } else if (window.innerWidth <= breakingPoints.tablet) {
            paddingTop = 20;
        } else {
            paddingTop = 60;
        }

        paddingTop += headerHeight();
        element.style.paddingTop = paddingTop + 'px';
    }
}

function updateMobileMenuHeight() {
    const offset = 10;
    const neededHeight = getWindowHeight() - headerTopHeigth();
    mobileMenu.style.height = `${neededHeight + offset}px`;
}

window.addEventListener('resize', () => {
    updateElementPadding(firstMainElement);
    updateMobileMenuHeight();
});
window.addEventListener('load', () => {
    updateElementPadding(firstMainElement);
    updateMobileMenuHeight();
});

const searchBtnBottom = document.querySelector('.nav-buttons-bottom__search');
const searchFormBottom = document.querySelector('.search-form-bottom');
let searchBtnBottomAriaExpanded = searchFormBottom.getAttribute('aria-expanded');
const searchFormBottomActive = 'search-form-bottom--width';
const searchCloseBtnBottom = document.querySelector('.search-form-bottom__close');
const searchFormBottomInput = document.querySelector('.search-form-bottom__input');

const burgerMenuBtn = document.querySelector('.burger-menu');
const burgerMenuClass = 'burger-menu--active';
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuHeight = () => mobileMenu.offsetHeight;
const mobileMenuClass = 'mobile-menu--active';
const mobileMenuLink = document.querySelector('.mobile-menu__nav-link');

const ariaHiddenAttribute = 'aria-hidden';
const ariaExpandedAttribute = 'aria-expanded';
const ariaLabelAttribute = 'aria-label';
const ariaDescriptionAttribute = 'aria-description';

burgerMenuBtn.addEventListener('click', () => {
    burgerMenuBtn.classList.toggle(burgerMenuClass);
    mobileMenu.classList.toggle(mobileMenuClass);
    menuToggleAttributes();
    if (mobileMenu.classList.contains(mobileMenuClass)) {
        body.style.paddingRight += `${getScrollbarWidth()}px`;
    } else {
        body.style.cssText = '';
    }
    body.classList.toggle('no-scroll');
});

mobileMenu.addEventListener('click', (e) => {
    if (e.target != mobileMenuLink) {
        burgerMenuBtn.classList.remove(burgerMenuClass);
        mobileMenu.classList.remove(mobileMenuClass);
        body.classList.remove('no-scroll');
        menuToggleAttributes();
    }
});

function toggleAttributes(elem, attribute) {
    if (elem && attribute && elem.getAttribute(attribute)) {
        const newAttrValue = elem.getAttribute(attribute) === 'true' ? false : true;
        elem.setAttribute(attribute, newAttrValue);
    } else {
        return;
    }
}

function menuToggleAttributes() {
    toggleAttributes(mobileMenu, ariaHiddenAttribute);
    toggleAttributes(mobileMenu, ariaExpandedAttribute);
    // if (mobileMenu.getAttribute(ariaExpandedAttribute) == 'true') {
    //     console.log('Открыто');
    // } else {
    //     console.log('Закрыто');
    // }
}

searchBtnBottom.addEventListener('click', () => {
    if (!searchFormBottom.classList.contains(searchFormBottomActive)) {
        searchBottomOpen();
        searchFormBottomInput.focus();
    } else {
        // Получаем данные из формы
        /*         let formData = new FormData(searchFormBottom); */
        // Отправляем данные на сервер
        /*         fetch('your-server-url', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        }); */
    }
});

searchCloseBtnBottom.addEventListener('click', () => {
    if (searchFormBottom.classList.contains(searchFormBottomActive)) {
        searchBottomClose();
    }
});

function searchBottomOpen() {
    searchFormBottom.classList.add(searchFormBottomActive);
    searchFormBottom.setAttribute('aria-expanded', true);
}

function searchBottomClose() {
    searchFormBottom.classList.remove(searchFormBottomActive);
    searchFormBottom.setAttribute('aria-expanded', false);
}

const searchBtnTop = document.querySelector('.nav-buttons-top__search');
const searchFormTop = document.querySelector('.search-form-top');
let searchBtnTopAriaExpanded = searchFormTop.getAttribute('aria-expanded');
const searchFormTopActive = 'search-form-top--width';
const searchCloseBtnTop = document.querySelector('.search-form-top__close');
const searchFormTopInput = document.querySelector('.search-form-top__input');

searchBtnTop.addEventListener('click', () => {
    if (!searchFormTop.classList.contains(searchFormTopActive)) {
        searchTopOpen();
        searchFormTopInput.focus();
    } else {
        // Получаем данные из формы
        /*         let formData = new FormData(searchFormBottom); */
        // Отправляем данные на сервер
        /*         fetch('your-server-url', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        }); */
    }
});

searchCloseBtnTop.addEventListener('click', () => {
    if (searchFormTop.classList.contains(searchFormTopActive)) {
        console.log('close!');
        searchTopClose();
    }
});

function searchTopOpen() {
    searchFormTop.classList.add(searchFormTopActive);
    searchFormTop.setAttribute('aria-expanded', true);
}

function searchTopClose() {
    searchFormTop.classList.remove(searchFormTopActive);
    searchFormTop.setAttribute('aria-expanded', false);
}
