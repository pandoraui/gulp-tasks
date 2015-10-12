'use strict';

var assign = require('object-assign');

console.log(assign({a: 1}, {a: 11, b: 2}));


// 使用 NPM 中的模块
var detector = require('detector');

console.log(detector.browser)
