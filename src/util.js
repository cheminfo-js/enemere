'use strict';

exports.getDiv = function getDiv(style, content = '') {
    const div = document.createElement('div');
    div.setAttribute('style', style + '; border: solid black;');
    div.innerHTML = content;
    return div;
};
