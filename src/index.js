'use strict';

const jcampconverter = require('jcampconverter');

class Enemere {
    constructor() {
        this._fileLoader = null;
        this._mainView = null;
    }

    setFileLoader(func) {
        this._fileLoader = func;
    }

    setMainView(dom) {
        this._mainView = dom;
    }

    loadJcamp(path) {
        return this._fileLoader(path).then(jcamp => {
            const data = jcampconverter.convert(jcamp);
            console.log(data);
        });
    }
}

module.exports = Enemere;
