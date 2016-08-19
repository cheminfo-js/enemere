'use strict';

const defaultNegColor = 'yellow';
const defaultPosLevels = 10;
const defaultNegLevels = 10;

function fillTwoD(obj) {
    if (!obj.colorNeg) obj.colorNeg = defaultNegColor;
    if (!obj.levelsPos) obj.levelsPos = defaultPosLevels;
    if (!obj.levelsNeg) obj.levelsNeg = defaultNegLevels;
    return obj;
}

const oneD = {
    color: 'black'
};

const cosy = fillTwoD({
    colorPos: 'blue',
    colorNeg: 'lightblue'
});

const tocsy = fillTwoD({
    colorPos: 'green'
});

const roesy = fillTwoD({
    colorPos: 'pink'
});

const noesy = fillTwoD({
    colorPos: 'pink'
});

const hsqc = fillTwoD({
    colorPos: 'red'
});

const hmbc = fillTwoD({
    colorPos: 'black'
});

const other = fillTwoD({
    colorPos: 'black'
});

export default {
    oneD,
    cosy,
    tocsy,
    roesy,
    noesy,
    hsqc,
    hmbc,
    other
};
