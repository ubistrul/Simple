//? Utils

function elementHasClassName(element, className) {
    if (!element) {
        return;
    }
    return element.classList.contains(className);
}

function addClass(element, className) {
    if (!element) {
        return;
    }
    element.classList.add(className);
}

function removeClass(element, className) {
    if (!element) {
        return;
    }
    element.classList.remove(className);
}

function setAttrubuteBoolean(element, attribute, boolean) {
    if (!element || !attribute) {
        return;
    }
    element.setAttribute(attribute, boolean);
}

function focusToElem(element) {
    if (!element) {
        return;
    }
    element.focus();
}

export { elementHasClassName, addClass, removeClass, setAttrubuteBoolean, focusToElem };
