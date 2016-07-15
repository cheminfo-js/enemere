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
        this.spectra = [];
        this.zoomLevel = 1;
        this.width = 0;
        this.height = 0;
        this.setupDom();
    }

    setFileLoader(func) {
        this.fileLoader = func;
    }

    onResize() {
        if (this.dom.root) {
            const width = this.dom.root.clientWidth;
            const height = this.dom.root.clientHeight;
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
        var twoD = this.graphView.mainGraph.newSerie('2d', {}, 'contour');

        this.twoDSerie = twoD;
        this.twoD = spectrum;

        var rightAxis = this.graphView.mainGraph.getRightAxis();
        twoD.setYAxis(rightAxis);
        var bottomAxis = this.graphView.mainGraph.getBottomAxis();
        twoD.setXAxis(bottomAxis);

        rightAxis.flip(true);
        bottomAxis.flip(true);
   //     bottomAxis.forceMin(6.8).forceMax(7.6);
    //    rightAxis.forceMin(6.8).forceMax(7.6);
        this.redraw2D();

    }

    redraw2D() {
        this.twoDSerie.setData(this.twoD.getContours(this.zoomLevel));
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
