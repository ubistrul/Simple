const body = document.querySelector("body");
const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
};

console.log(getScrollbarWidth());

const searchBtnBottom = document.querySelector(".nav-buttons-bottom__search");
const searchFormBottom = document.querySelector(".search-form-bottom");
let searchBtnBottomAriaExpanded =
    searchFormBottom.getAttribute("aria-expanded");
const searchFormBottomActive = "search-form-bottom--width";
const searchCloseBtnBottom = document.querySelector(
    ".search-form-bottom__close"
);
const searchFormBottomInput = document.querySelector(
    ".search-form-bottom__input"
);

const burgerMenuBtn = document.querySelector(".burger-menu");
const burgerMenuClass = "burger-menu--active";
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuClass = "mobile-menu--active";
const mobileMenuLink = document.querySelector(".mobile-menu__nav-link");

burgerMenuBtn.addEventListener("click", () => {
    burgerMenuBtn.classList.toggle(burgerMenuClass);
    mobileMenu.classList.toggle(mobileMenuClass);
    if (mobileMenu.classList.contains(mobileMenuClass)) {
        body.style.paddingRight += `${getScrollbarWidth()}px`;
    } else {
        body.style.cssText = "";
    }
    body.classList.toggle("no-scroll");
});

mobileMenu.addEventListener("click", (e) => {
    if (e.target != mobileMenuLink) {
        burgerMenuBtn.classList.remove(burgerMenuClass);
        mobileMenu.classList.remove(mobileMenuClass);
        body.classList.remove("no-scroll");
    }
});

console.log(searchBtnBottomAriaExpanded);

searchBtnBottom.addEventListener("click", () => {
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

searchCloseBtnBottom.addEventListener("click", () => {
    if (searchFormBottom.classList.contains(searchFormBottomActive)) {
        searchBottomClose();
    }
});

function searchBottomOpen() {
    searchFormBottom.classList.add(searchFormBottomActive);
    searchFormBottom.setAttribute("aria-expanded", true);
}

function searchBottomClose() {
    searchFormBottom.classList.remove(searchFormBottomActive);
    searchFormBottom.setAttribute("aria-expanded", false);
}

const searchBtnTop = document.querySelector(".nav-buttons-top__search");
const searchFormTop = document.querySelector(".search-form-top");
let searchBtnTopAriaExpanded = searchFormTop.getAttribute("aria-expanded");
const searchFormTopActive = "search-form-top--width";
const searchCloseBtnTop = document.querySelector(".search-form-top__close");
const searchFormTopInput = document.querySelector(".search-form-top__input");

console.log(searchBtnTop);
console.log(searchFormTop);

searchBtnTop.addEventListener("click", () => {
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

searchCloseBtnTop.addEventListener("click", () => {
    if (searchFormTop.classList.contains(searchFormTopActive)) {
        console.log("close!");
        searchTopClose();
    }
});

function searchTopOpen() {
    searchFormTop.classList.add(searchFormTopActive);
    searchFormTop.setAttribute("aria-expanded", true);
}

function searchTopClose() {
    searchFormTop.classList.remove(searchFormTopActive);
    searchFormTop.setAttribute("aria-expanded", false);
}
