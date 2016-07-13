'use strict';

const Graph = require('node-jsgraph');

const Spectrum = require('./Spectrum');

class Enemere {
    constructor() {
        this.fileLoader = null;
        this.mainView = null;
        this.spectra = [];
        this.zoomLevel = 1;
        this.width = 0;
        this.height = 0;
    }

    setFileLoader(func) {
        this.fileLoader = func;
    }

    setMainView(dom) {
        this.mainView = dom;
        this.resize();
        this.graph = new Graph(dom, {
            plugins: {zoom: {
                zoomMode: 'xy'
            }},
            mouseActions: [{
                plugin: 'zoom'
            },{
                plugin: 'zoom',
                type: 'dblclick',
                options: {
                    mode: 'total'
                }
            },{
                type: 'mousewheel',
                callback: (event) => this.handleMousewheel(event)
            }]
        });
    }

    resize() {
        if (this.mainView) {
            const width = this.mainView.clientWidth;
            const height = this.mainView.clientHeight;
            this.width = width;
            this.height = height;
        }
    }

    loadJcamp(path) {
        return this.fileLoader(path).then(jcamp => {
            this.addSpectrum(Spectrum.fromJcamp(path, jcamp));
        });
    }

    addSpectrum(spectrum) {
        this.spectra.push(spectrum);
        spectrum.load();
        this.put2D(spectrum);
    }

    put2D(spectrum) {
        var twoD = this.graph.newSerie('2d', {}, 'contour');

        this.twoDSerie = twoD;
        this.twoD = spectrum;

        var rightAxis = this.graph.getRightAxis();
        twoD.setYAxis(rightAxis);
        var bottomAxis = this.graph.getBottomAxis();
        twoD.setXAxis(bottomAxis);

        rightAxis.flip(true);
        bottomAxis.flip(true);
   //     bottomAxis.forceMin(6.8).forceMax(7.6);
    //    rightAxis.forceMin(6.8).forceMax(7.6);
        this.redraw2D();

    }

    redraw2D() {
        this.twoDSerie.setData(this.twoD.getContours(this.zoomLevel));
        this.graph.draw();
    }

    handleMousewheel(value) {
        if (Math.sign(value) === -1) {
            // zoom out
            this.zoomLevel++;
            this.redraw2D();
        } else {
            this.zoomLevel--;
            this.redraw2D();
        }
    }
}

module.exports = Enemere;
