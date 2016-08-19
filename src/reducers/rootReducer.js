'use strict';

export default function rootReducer(state = getInitialState(), action) {
    return state;
}

function getInitialState() {
    return {
        name: 'test'
    };
}
