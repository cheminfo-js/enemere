'use strict';

const Graph = require('node-jsgraph');
const util = require('./util');

class GraphView {
    constructor(options = {}) {
        this.hasLeftTrace = false;
        this.hasTopTrace = false;
        this.setupDom();
        this.updateVisibility();

        this.mode = null;
        this.mainSpectra = [];
        this.leftTrace = null;
        this.topTrace = null;
        this.zoomLevel = 1;
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

    addMainSpectrum(spectrum) {
        return spectrum.load().then(() => {
            var requiredMode = spectrum.dimension + 'd';
            if (this.mode === requiredMode || this.mode === null) {
                const specData = {
                    id: spectrum.id,
                    options: {},
                    spectrum,
                    serie: null
                };
                this.mainSpectra.push(specData);
                this.mode = requiredMode;
                this.createSerie(specData);
                this.redraw2D();
            }
        });
    }

    createSerie(specData) {
        this.createMainGraph(this.mode);
        if (this.mode === '2d') {
            const serie = this.mainGraph.newSerie('2d', {
                selectableOnClick: false
            }, 'contour');
            var rightAxis = this.mainGraph.getRightAxis(0, {nbTicksPrimary: 10});
            serie.setYAxis(rightAxis);
            var bottomAxis = this.mainGraph.getBottomAxis(0, {nbTicksPrimary: 10});
            serie.setXAxis(bottomAxis);
            rightAxis.flip(true);
            bottomAxis.flip(true);
            specData.serie = serie;
        }
    }

    createMainGraph(mode) {
        if (this.mainGraph) {
            return;
        }
        if (mode === '1d') {
            throw new Error('1d not implemented');
        } else if (mode === '2d') {
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
        } else {
            throw new Error('unknown mode: ' + mode);
        }
    }

    redraw2D() {
        const spectrum = this.mainSpectra[0];
        spectrum.serie.setData(spectrum.spectrum.getContours(this.zoomLevel));
        this.mainGraph.draw();
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
