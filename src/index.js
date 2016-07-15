'use strict';

const Spectrum = require('./Spectrum');
const State = require('./State');
const GraphView = require('./GraphView');
const util = require('./util');

class Enemere {
    constructor(dom, options = {}) {
        this.dom = {
            root: dom
        };
        this.state = new State(options.state);
        this.fileLoader = null;
        this.setupDom();
    }

    setFileLoader(func) {
        this.fileLoader = func;
    }

    onResize() {
        // todo call this method when the viewport is resized and forward to GraphView
    }

    loadJcamp(path) {
        var spectrum = this.state.getSpectrum(path);
        if (!spectrum) {
            spectrum = new Spectrum('jcamp', path, this.fileLoader);
            this.state.addSpectrum(spectrum);
        }
        this.loadSpectrum(spectrum);
    }

    loadSpectrum(spectrum) {
        spectrum.load().then(() => {
            this.put2D(spectrum);
        });
    }

    put2D(spectrum) {
        this.twoD = spectrum;
        this.redraw2D();
    }

    redraw2D() {
        this.graphView.setMainData(this.twoD.getContours(this.zoomLevel));
        this.graphView.mainGraph.draw();
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

    setupDom() {
        this.dom.root.innerHTML = '';
        this.onResize();
        this.dom.main = util.getDiv('height: 100%; width: 100%; display: flex; flex-direction: column');
        this.dom.root.appendChild(this.dom.main);

        this.dom.menu = util.getDiv('height: 40px', 'top menu');
        this.dom.main.appendChild(this.dom.menu);

        this.dom.content = util.getDiv('flex: 1; display: flex');
        this.dom.main.appendChild(this.dom.content);

        this.dom.table = util.getDiv('width: 200px; display: flex; flex-direction: column');
        this.dom.content.appendChild(this.dom.table);

        this.dom.data = util.getDiv('height: 40%; display: flex');
        this.dom.table.appendChild(this.dom.data);

        this.dom.dataTools = util.getDiv('width: 40px', 'DT');
        this.dom.data.appendChild(this.dom.dataTools);

        this.dom.dataList = util.getDiv('flex: 1', 'DataList');
        this.dom.data.appendChild(this.dom.dataList);

        this.dom.pages = util.getDiv('flex: 1; display: flex');
        this.dom.table.appendChild(this.dom.pages);

        this.dom.pagesTools = util.getDiv('width: 40px', 'PT');
        this.dom.pages.appendChild(this.dom.pagesTools);

        this.dom.pagesList = util.getDiv('flex: 1', 'PagesList');
        this.dom.pages.appendChild(this.dom.pagesList);

        this.dom.graphs = util.getDiv('flex: 1');
        this.dom.content.appendChild(this.dom.graphs);

        this.graphView = new GraphView();
        this.dom.graphs.appendChild(this.graphView.getDomContainer());
        this.graphView.createMainGraph();
    }
}

module.exports = Enemere;
