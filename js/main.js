const body = document.querySelector('body');

const searchBtnBottom = document.querySelector('.nav-buttons-bottom__search');
const searchFormBottom = document.querySelector('.search-form-bottom');
let searchBtnBottomAriaExpanded = searchFormBottom.getAttribute('aria-expanded');
const searchFormBottomActive = 'search-form-bottom--width';
const searchCloseBtnBottom = document.querySelector('.search-form-bottom__close');

const burgerMenuBtn = document.querySelector('.burger-menu');
const burgerMenuClass = 'burger-menu--active';
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClass = 'mobile-menu--active';
const mobileMenuLink = document.querySelector('.mobile-menu__nav-link')

burgerMenuBtn.addEventListener('click', () => {
        burgerMenuBtn.classList.toggle(burgerMenuClass);
        mobileMenu.classList.toggle(mobileMenuClass);
        body.classList.toggle('no-scroll')
})

mobileMenu.addEventListener('click', (e) => {
    if (e.target != mobileMenuLink) {
        burgerMenuBtn.classList.remove(burgerMenuClass);
        mobileMenu.classList.remove(mobileMenuClass)
        body.classList.remove('no-scroll')
    }
})

console.log(searchBtnBottomAriaExpanded);

searchBtnBottom.addEventListener('click', () => {
    if (!searchFormBottom.classList.contains(searchFormBottomActive)) {
        searchBottomOpen();
    }
})


searchCloseBtnBottom.addEventListener('click', () => {
    if (searchFormBottom.classList.contains(searchFormBottomActive)) {
        searchBottomClose();
    }
});

function searchBottomOpen () {
    searchFormBottom.classList.add(searchFormBottomActive);
    searchFormBottom.setAttribute('aria-expanded', true);
}

function searchBottomClose () {
    searchFormBottom.classList.remove(searchFormBottomActive);
    searchFormBottom.setAttribute('aria-expanded', false);
}