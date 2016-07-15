'use strict';

class State {
    constructor(state = defaultState()) {
        this.state = state;
    }

    getSpectrum(url) {
        return this.state.spectra.find(spectrum => spectrum.url === url);
    }

    addSpectrum(spectrum) {
        this.state.spectra.push(spectrum);
    }

    toJSON() {
        return this.state;
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
