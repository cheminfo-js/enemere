'use strict';

exports.getDiv = function getDiv(style, content = '') {
    const div = document.createElement('div');
    div.setAttribute('style', style + '; border: solid black;');
    div.innerHTML = content;
    return div;
};

exports.removeChildren = function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};
