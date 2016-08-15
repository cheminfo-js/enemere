'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './components/App';
import getStore from './main/store';

export default class Enemere {
    constructor(dom, options = {}) {
        this.dom = dom;
        this.store = getStore(options.state);

        ReactDOM.render(
            <Provider store={this.store}>
                <App />
            </Provider>,
            dom
        );
    }

    setFileLoader() {

    }

    loadJcamp() {

    }
}
