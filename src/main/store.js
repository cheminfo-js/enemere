'use strict';

import {createStore} from 'redux';

export default function getStore(previousStore) {
    return createStore(() => 0);
}
