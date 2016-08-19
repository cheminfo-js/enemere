'use strict';

import {createStore} from 'redux';

import rootReducer from '../reducers/rootReducer';

export default function getStore(previousState) {
    return createStore(rootReducer, previousState);
}
