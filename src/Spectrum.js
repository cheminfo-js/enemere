'use strict';

class Spectrum {
    constructor() {
        this.url = '';
        this.name = '';
        this.title = '';
        this.date = 0;
        this.dimension = 0;
        this.nucleus = [];
        this.solvent = '';
        this.temperature = 0;
        this.frequency = 0;
        this.pulse = '';
        this.experiment = '';
        // todo store preprocessing steps and reapply on load (phase, baseline corrections)
    }
}

module.exports = Spectrum;
