"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var driver_1 = require("./driver");
var models_1 = require("./models");
exports.getAlbum = function (id, market) { return __awaiter(_this, void 0, void 0, function () {
    var params, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = { params: { market: market } };
                return [4, driver_1.getAxiosSpotifyInstance().get("/albums/" + id, params)];
            case 1:
                response = _a.sent();
                return [2, new models_1.Album(response.data)];
        }
    });
}); };
exports.getSeveralAlbums = function (ids, market) { return __awaiter(_this, void 0, void 0, function () {
    var exceptionLink, params, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (ids.length > 20) {
                    exceptionLink = 'https://developer.spotify.com/documentation/web-api/reference/albums/get-several-albums/';
                    throw new Error("The maximum number of albums is 20. See " + exceptionLink + " for details");
                }
                params = { params: { market: market, ids: ids.join(',') } };
                return [4, driver_1.getAxiosSpotifyInstance().get('/albums', params)];
            case 1:
                response = _a.sent();
                return [2, response.data.albums.map(function (albumJson) { return new models_1.Album(albumJson); })];
        }
    });
}); };
exports.getAlbumTracks = function (id, offset, limit, market) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 20; }
    return __awaiter(_this, void 0, void 0, function () {
        var params, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = { params: { offset: offset, limit: limit, market: market } };
                    return [4, driver_1.getAxiosSpotifyInstance().get("/albums/" + id + "/tracks", params)];
                case 1:
                    response = _a.sent();
                    return [2, new models_1.Page(response.data, models_1.TrackSimplified)];
            }
        });
    });
};
