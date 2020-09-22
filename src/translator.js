"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translator = void 0;
var axios_1 = __importDefault(require("axios"));
var crypto_1 = __importDefault(require("crypto"));
/**
 * Translate text to target language from source language.
 *
 * @param {String} source - Original language code(text)
 * @param {String} target - Target language code(result)
 * @param {String} text - A text to be translated
 *
 * @returns {String} Translated result
 *
 * @param {String} source - Original language code(text)
 * @param {String} target - Target language code(result)
 * @param {Array} content - The array includes texts to be translated.
 *
 * @returns {Array} Translated result array
 *
 * @example
 * (async () => console.log(await new Translator().translate('en', 'ko', 'Hi.')))();
 * (async () => console.log(await new Translator().multiTranslate('en', 'ko', ['apple', 'banana', 'orange', 'computer', 'laptop', 'cellphone', 'school', 'promise'])))();
 */
var Translator = /** @class */ (function () {
    function Translator() {
    }
    Translator.prototype.genUUID = function (time) {
        var tower = time;
        var base = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        var uuid = base.replace(/[xy]/g, function (e) {
            var chip = (time + 16 * Math.random()) % 16 | 0;
            tower = Math.floor(tower / 16);
            return (e === 'x' ? chip : 3 & chip | 8).toString();
        });
        return uuid;
    };
    Translator.prototype.toFormData = function (formObj) {
        var result = [];
        for (var property in formObj)
            result.push(property + "=" + formObj[property]);
        return result.join('&');
    };
    Translator.prototype.translate = function (source, target, text) {
        if (source === void 0) { source = 'ko'; }
        if (target === void 0) { target = 'en'; }
        return __awaiter(this, void 0, void 0, function () {
            var time, uuid, data, hash, headers, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        time = Date.now();
                        uuid = this.genUUID(time);
                        data = this.toFormData({
                            'deviceId': uuid,
                            'locale': 'en',
                            'dict': true,
                            'dictDisplay': 30,
                            'honorific': false,
                            'instant': true,
                            'paging': false,
                            'source': source,
                            'target': target,
                            'text': text
                        });
                        hash = crypto_1.default.createHmac('md5', 'v1.5.1_4dfe1d83c2')
                            .update(uuid + "\nhttps://papago.naver.com/apis/n2mt/translate\n" + time);
                        headers = {
                            'Accept': 'application/json',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Accept-Language': 'en',
                            'Authorization': "PPG " + uuid + ":" + hash.digest('base64'),
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'Device-Type': 'pc',
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4)\
                     AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
                            'Origin': 'https://papago.naver.com',
                            'Referer': 'https://papago.naver.com/',
                            'sec-fetch-dest': 'empty',
                            'sec-fetch-mode': 'cors',
                            'sec-fetch-site': 'same-origin',
                            'Timestamp': time
                        };
                        return [4 /*yield*/, axios_1.default.post('https://papago.naver.com/apis/n2mt/translate', data, { headers: headers })];
                    case 1:
                        result = (_a.sent()).data.translatedText;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Translator.prototype.multiTranslate = function (source, target, content) {
        return __awaiter(this, void 0, void 0, function () {
            var result, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        promises = content.map(function (element, index) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.translate(source, target, element)
                                            .then(function (res) { return result[index] = res; })
                                            .catch(function (error) { return console.log(error); })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises).then(function (res) { return res; }).catch(function (error) { return console.log(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return Translator;
}());
exports.Translator = Translator;
