"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
new _1.Translator().translate('en', 'ko', 'You\'re fucking weak.')
    .then(function (res) { return console.log(res); })
    .catch(function (e) { return console.log(e); });
new _1.Translator().multiTranslate('en', 'ko', ['You\'re fucking weak.', 'Holy...', 'Jesus Christ'])
    .then(function (res) { return console.log(res); })
    .catch(function (e) { return console.log(e); });
