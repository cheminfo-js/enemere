'use strict';

const arrayStat = require('ml-stat/array');
const Conrec = require('ml-conrec');
const jcampconverter = require('jcampconverter');
const nmrMetadata = require('nmr-metadata');
const range = require('js-range');

class Spectrum {
    constructor(id, kind, url, fileloader, metadata) {
        this.id = id;
        this.name = id;
        this.kind = kind;
        this.url = url;
        this.fileloader = fileloader;
        this.setMetadata(metadata);
        this.loading = null;
        // todo store preprocessing steps and reapply on load (phase, baseline corrections)
    }

    setMetadata(metadata) {
        if (!metadata) {
            return;
        }
        this.title = metadata.title || '';
        this.date = metadata.date || 0;
        this.dimension = metadata.dimension || 0;
        this.nucleus = metadata.nucleus || [];
        this.solvent = metadata.solvent || [];
        this.temperature = metadata.temperature || 0;
        this.frequency = metadata.frequency || 0;
        this.pulse = metadata.pulse || '';
        this.experiment = metadata.experiment || '';
    }

    load() {
        if (this.loading) {
            return this.loading;
        }
        switch (this.kind) {
            case 'jcamp':
                return this.loadJcamp();
            default:
                throw new Error('unknown kind: ' + this.kind);
        }
    }

    loadJcamp() {
        return this.loading = this.fileloader(this.url).then(jcamp => {
            this.setMetadata(nmrMetadata.parseJcamp(jcamp));
            var parsed = jcampconverter.convert(jcamp, {
                noContour: true,
                xy: true
            });
            if (this.dimension === 1) {
                this.data = parsed.spectra[0].data[0];
            } else if (this.dimension === 2) {
                if (!parsed.minMax) {
                    throw new Error('2D data is missing');
                }
                this.minMax = parsed.minMax;
                const xs = getRange(parsed.minMax.minY, parsed.minMax.maxY, parsed.minMax.z.length);
                const ys = getRange(parsed.minMax.minX, parsed.minMax.maxX, parsed.minMax.z[0].length);
                this.conrec = new Conrec(parsed.minMax.z, {xs, ys});
            } else {
                throw new Error('unexpected dimension: ' + this.dimension);
            }
        });
    }

    getContours(zoomLevel) {
        if (this.dimension !== 2) {
            throw new Error('getContours can only be called on 2D spectra');
        }
        const conrec = this.conrec;
        const median = this.getDoubleMedian();
        const max = Math.max(Math.abs(this.minMax.maxZ), Math.abs(this.minMax.minZ));
        const positiveRange = getRange(median * 4 * Math.pow(2, zoomLevel), max * 20 / 100, 10, 2);
        const negativeRange = getRange(-max * 20 / 100, -median * 4 * Math.pow(2, zoomLevel), 10, 2);
        const contours = conrec.getContours({
            levels: positiveRange,
       //     keepLevels: true
        });
        return conrecToNorman(contours, this.minMax);
    }

    getDoubleMedian() {
        if (this.median) {
            return this.median;
        } else {
            const firstLine = this.minMax.z[0].map(Math.abs);
            const median = arrayStat.median(firstLine);
            return this.median = 2 * median;
        }
    }
}

function getRange(min, max, length, exp) {
    if (exp) {
        var factors = new Array(length);
        factors[0] = 0;
        for (var i = 1; i < length; i++) {
            factors[i] = factors[i - 1] + (exp - 1) / Math.pow(exp, i);
        }
        const lastFactor = factors[i - 1];

        var result = new Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = (max - min) * (1 - factors[i]/lastFactor) + min;
        }
        return result;
    } else {
        const step = (max - min) / (length - 1);
        return range(min, max + step, step);
    }
}

function conrecToNorman(contours, minMax) {
    var data = {
        minX: minMax.minY,
        maxX: minMax.maxY,
        minY: minMax.minX,
        maxY: minMax.maxX,
        segments: []
    };
    var segments = data.segments;
    for (var i = 0; i < contours.length; i++) {
        var contour = contours[i];
        if (!segments[contour.k]) segments[contour.k] = {
            lines: [],
            zValue: contour.level
        };
        var segment = segments[contour.k].lines;
        for (var j = 0; j < contour.length - 1; j++) {
            segment.push(contour[j].y, contour[j].x, contour[j + 1].y, contour[j + 1].x);
        }
    }
    return data;
}

module.exports = Spectrum;
