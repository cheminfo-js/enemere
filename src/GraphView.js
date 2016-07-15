'use strict';

const Graph = require('node-jsgraph');
const util = require('./util');

class GraphView {
    constructor(options = {}) {
        this.mode = options.mode || '2d';
        this.hasLeftTrace = false;
        this.hasTopTrace = false;
        this.setupDom();
        this.updateVisibility();
    }

    showLeftTrace(bool = true) {
        bool = !!bool;
        if (this.hasLeftTrace !== bool) {
            this.hasLeftTrace = bool;
            this.updateVisibility();
        }
    }

    showTopTrace(bool = true) {
        bool = !!bool;
        if (this.hasTopTrace !== bool) {
            this.hasTopTrace = bool;
            this.updateVisibility();
        }
    }

    createMainGraph() {
        if (this.mode === '1d') {
            throw new Error('1d not implemented');
        } else if (this.mode === '2d') {
            this.mainGraph = new Graph(this.dom.bottomRight, {
                plugins: {
                    zoom: {
                        zoomMode: 'xy'
                    }
                },
                mouseActions: [
                    {
                        plugin: 'zoom'
                    }, {
                        plugin: 'zoom',
                        type: 'dblclick',
                        options: {
                            mode: 'total'
                        }
                    }, {
                        type: 'mousewheel',
                        callback: (event) => this.handleMousewheel(event)
                    }
                ]
            });
            this.mainSerie = this.mainGraph.newSerie('2d', {}, 'contour');
            var rightAxis = this.mainGraph.getRightAxis();
            this.mainSerie.setYAxis(rightAxis);
            var bottomAxis = this.mainGraph.getBottomAxis();
            this.mainSerie.setXAxis(bottomAxis);
            rightAxis.flip(true);
            bottomAxis.flip(true);
        } else {
            throw new Error('unknown mode: ' + this.mode);
        }
    }

    setMainData(data) {
        this.mainSerie.setData(data)
    }

    getDomContainer() {
        return this.dom.container;
    }

    updateVisibility() {
        this.dom.topLeft.style.display = this.hasLeftTrace ? 'block' : 'none';
        this.dom.bottomLeft.style.display = this.hasLeftTrace ? 'block' : 'none';
        this.dom.top.style.display = this.hasTopTrace ? 'flex' : 'none';
        // todo resize jsgraphs
    }

    setupDom() {
        this.dom = {};
        this.dom.container = util.getDiv('width: 100%; height: 100%; display: flex; flex-direction: column');

        this.dom.top = util.getDiv('flex: 1; display: flex');
        this.dom.container.appendChild(this.dom.top);

        this.dom.topLeft = util.getDiv('flex: 1', 'topLeft');
        this.dom.top.appendChild(this.dom.topLeft);

        this.dom.topRight = util.getDiv('flex: 8', 'topRight');
        this.dom.top.appendChild(this.dom.topRight);

        this.dom.bottom = util.getDiv('flex: 8; display: flex');
        this.dom.container.appendChild(this.dom.bottom);

        this.dom.bottomLeft = util.getDiv('flex: 1');
        this.dom.bottom.appendChild(this.dom.bottomLeft);

        this.dom.bottomRight = util.getDiv('flex: 8');
        this.dom.bottom.appendChild(this.dom.bottomRight);
    }
}

module.exports = GraphView;
