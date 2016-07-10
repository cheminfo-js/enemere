'use strict';

const Conrec = require('./conrec').Conrec;
const range = require('js-range');
const fs = require('fs');
const path =  require('path');
const jcampconverter = require('jcampconverter');

const data = fs.readFileSync(path.join(__dirname, './test/data/ethylbenzene/zhmbc_0.jdx'), 'utf8');

var parsed = jcampconverter.convert(data, {keepRecordsRegExp: /.*/, keepSpectra: true});

var z = parsed.minMax.z;
delete parsed.minMax.z;

var stepX = (parsed.minMax.maxX - parsed.minMax.minX) / (z.length - 1);
var xs = range(parsed.minMax.minX, parsed.minMax.maxX + stepX, stepX);
var stepY = (parsed.minMax.maxY - parsed.minMax.minY) / (z[0].length - 1);
var ys = range(parsed.minMax.minY, parsed.minMax.maxY + stepY, stepY);

var contours = parsed.contourLines.segments.map(x=> x.zValue).sort((a,b) => a-b);

console.time('conrec');
var conrec = new Conrec();
conrec.contour(z, 0, z.length - 1, 0, z[0].length - 1, xs, ys, contours.length, contours);
var list = conrec.contourList();
console.timeEnd('conrec');

console.log(list[0]);
console.log(list.length);
