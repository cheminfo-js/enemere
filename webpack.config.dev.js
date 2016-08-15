'use strict';

module.exports = {
    entry: [
        './test/main.js'
    ],
    output: {
        path: __dirname + '/test/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
