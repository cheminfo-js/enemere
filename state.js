var state = {
    // Here go personal preferences that are not related to a specific analysis
    userPreferences: {
        experiments: {
            cosy: {
                colorPos: 'lightblue',
                colorNeg: 'blue',
                levelsPos: 10,
                levelsNeg: 10
            },
            hmbc: {},
            // default style for experiments that are not in this list
            other: {}
        }
    },
    spectra: [
        {
            id: 'spectrum0', // generated
            name: 'spectrum0', // editable by the user
            title: 'xxx',
            dimension: 1,
            // ... other metadata
        }
    ],
    spectrumId: 0, // ID for the next loaded spectrum
    // A page corresponds to an NMR view of one or multiple spectra
    pages: [
        {
            spectra: [
                {
                    id: 'spectrum0',
                    options: {
                        levelsPos: 15 // override for this spectrum in this page
                    },
                    zoomLevel: 1 // current z-axis zoom
                }
            ],
            // contains quick view change info, indexed by key number
            quick: {
                1: {
                    zoom: {
                        from: [x0, y0],
                        to: [x1, y1]
                    }
                }
            }
        }
    ],
    // Page that is currently loaded
    currentPage: 0
};
