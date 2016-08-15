'use strict';

class State {
    constructor(state = defaultState()) {
        this.state = state;
    }

    getSpectrumById(id) {
        return this.state.spectra.find(spectrum => spectrum.id === id);
    }

    getSpectrumByUrl(url) {
        return this.state.spectra.find(spectrum => spectrum.url === url);
    }

    addSpectrum(spectrum) {
        this.state.spectra.push(spectrum);
    }

    getNextSpectrumId() {
        return this.state.spectrumId++;
    }

    addPage(page) {
        this.state.pages.push(page);
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
        currentPage: 0,
        spectrumId: 0
    };
}
