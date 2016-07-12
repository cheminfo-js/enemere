'use strict';

const superagent = require('superagent');
const Enemere = require('..');

const enemere = new Enemere();

enemere.setFileLoader(function (filename) {
    return new Promise((resolve, reject) => {
        superagent.get(filename, function (err, res) {
            if (err) return reject(err);
            resolve(res.text);
        });
    });
});

enemere.setMainView(document.getElementById('mainView'));

enemere.loadJcamp('data/ethylbenzene_noise/cosy_0.jdx');
