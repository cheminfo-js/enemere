'use strict';

const superagent = require('superagent');
const Enemere = require('..');

const enemere = new Enemere(document.getElementById('mainView'));

enemere.setFileLoader(function (filename) {
    return new Promise((resolve, reject) => {
        superagent.get(filename, function (err, res) {
            if (err) return reject(err);
            resolve(res.text);
        });
    });
});

enemere.loadJcamp('data/ethylbenzene_noise/hmbc_0.jdx');
