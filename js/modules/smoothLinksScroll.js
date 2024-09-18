function smoothLinksScroll({ headerController, linksNodeList, mobileMenuController }) {
    const currentHeaderHeight = () => headerController.currentHeaderHeight();
    linksNodeList.forEach((item) => {
        let hashLink = item.getAttribute('href').replace('#', '');

        if (hashLink && hashLink !== '!') {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                const element = document.querySelector(`#${hashLink}`);
                const y =
                    element.getBoundingClientRect().top + window.scrollY - currentHeaderHeight();

                {
                    const mobileMenuLinks = Array.from(mobileMenuController.innerLinks);
                    if (mobileMenuLinks.includes(item)) {
                        mobileMenuController.closeMenu();
                    }
                }
                window.scrollTo({ top: y, behavior: 'smooth' });
                window.history.pushState(null, null, `#${hashLink}`);
                item.blur();
            });
        }
    });
}

export { smoothLinksScroll };
