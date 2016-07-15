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
        var spectrum = this.state.getSpectrumByUrl(path);
        if (!spectrum) {
            spectrum = new Spectrum(this.state.getNextSpectrumId(), 'jcamp', path, this.fileLoader);
            this.state.addSpectrum(spectrum);
            // Each individual spectrum has an associated GraphView
            const graphView = new GraphView();
            this.state.addPage(graphView);
            this.setGraphView(graphView);
            graphView.addMainSpectrum(spectrum);
        }
    }

    setGraphView(graphView) {
        this.dom.graphs.innerHTML = '';
        this.dom.graphs.appendChild(graphView.getDomContainer());
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
    }
}

module.exports = Enemere;
