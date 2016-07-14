'use strict';

class State {
    constructor(state = defaultState()) {
        this.state = state;
    }
}

module.exports = State;

function defaultState() {
    return {
        userPreferences: {
            experiments: {}
        },
        spectra: [],
        pages: [],
        currentPage: 0
    };
}
