'use strict';

module.exports = {
    entry: [
        './test/main.js'
    ],
    output: {
        path: __dirname + '/test/dist',
        publicPath: '/',
        filename: 'bundle.js'
    }
};
