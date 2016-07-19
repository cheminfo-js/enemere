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

exports.stopEvent = function stopEvent(e) {
    e.stopPropagation();
    e.preventDefault();
};

exports.validateTransferType = function (dataTransfer) {
    console.log(dataTransfer.types);
    if (dataTransfer.types) {
        for (var i = 0; i < dataTransfer.types.length; i++) {
            var type = dataTransfer.types[i];
            if (type === 'Files') {
                return 'files';
            }
            if (type === 'text/uri-list' || type === 'text/x-moz-url') {
                return 'url';
            }
        }
    }
    return false;
};
