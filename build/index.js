'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var spotifyToken;
var spotifyAxiosInstance;
var init = function (token) {
    spotifyToken = token;
    spotifyAxiosInstance = axios.create({
        baseURL: 'https://api.spotify.com/v1',
        headers: { Authorization: "Bearer " + token },
    });
};
var getToken = function () {
    if (spotifyToken)
        return spotifyToken;
    throw new Error('You must log in first');
};
var getAxiosSpotifyInstance = function () {
    if (spotifyAxiosInstance)
        return spotifyAxiosInstance;
    throw new Error('You must log in first');
};

var driver = /*#__PURE__*/Object.freeze({
    init: init,
    getToken: getToken,
    getAxiosSpotifyInstance: getAxiosSpotifyInstance
});

var ExternalUrl = (function () {
    function ExternalUrl(json) {
        this.key = json.key;
        this.value = json.value;
    }
    return ExternalUrl;
}());

var ArtistSimplified = (function () {
    function ArtistSimplified(json) {
        this.externalUrls = new ExternalUrl(json.external_urls);
        this.href = json.href;
        this.id = json.id;
        this.name = json.name;
        this.type = json.type;
        this.uri = json.uri;
    }
    return ArtistSimplified;
}());

var Image = (function () {
    function Image(json) {
        this.height = json.height;
        this.url = json.url;
        this.width = json.width;
    }
    return Image;
}());

var AlbumSimplified = (function () {
    function AlbumSimplified(json) {
        this.albumGroup = json.album_group;
        this.albumType = json.album_type;
        this.artists = json.artists.map(function (artistJson) { return new ArtistSimplified(artistJson); });
        this.availableMarkets = json.available_markets;
        this.externalUrls = new ExternalUrl(json.external_urls);
        this.href = json.href;
        this.id = json.id;
        this.images = json.images.map(function (imageJson) { return new Image(imageJson); });
        this.name = json.name;
        this.releaseDate = json.release_date;
        this.releaseDatePrecision = json.release_date_precision;
        this.restrictions = json.restrictions;
        this.type = json.type;
        this.uri = json.uri;
    }
    Object.defineProperty(AlbumSimplified.prototype, "stringArtists", {
        get: function () {
            var artistNames = this.artists.map(function (artist) { return artist.name; });
            return artistNames.join(', ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlbumSimplified.prototype, "releaseYear", {
        get: function () {
            return this.releaseDate.substring(0, 4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlbumSimplified.prototype, "imageUrl", {
        get: function () {
            return this.images[0].url;
        },
        enumerable: true,
        configurable: true
    });
    return AlbumSimplified;
}());

var ExternalId = (function () {
    function ExternalId(json) {
        this.key = json.key;
        this.value = json.value;
    }
    return ExternalId;
}());

var Track = (function () {
    function Track(json) {
        this.album = new AlbumSimplified(json.album);
        this.artists = json.artists.map(function (artistJson) { return new ArtistSimplified(artistJson); });
        this.availableMarkets = json.available_markets;
        this.discNumber = json.disc_number;
        this.durationMs = json.duration_ms;
        this.explicit = json.explicit;
        this.externalIds = new ExternalId(json.external_ids);
        this.externalUrls = new ExternalUrl(json.external_urls);
        this.href = json.href;
        this.id = json.id;
        this.isPlayable = json.is_playable;
        this.linkedFrom = json.linked_from;
        this.restrictions = json.restrictions;
        this.name = json.name;
        this.popularity = json.popularity;
        this.previewUrl = json.preview_url;
        this.trackNumber = json.track_number;
        this.type = json.type;
        this.uri = json.uri;
        this.isLocal = json.isLocal;
    }
    Object.defineProperty(Track.prototype, "albumName", {
        get: function () {
            return this.album.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Track.prototype, "stringArtists", {
        get: function () {
            var artistNames = this.artists.map(function (artist) { return artist.name; });
            return artistNames.join(', ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Track.prototype, "releaseYear", {
        get: function () {
            return this.album.releaseYear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Track.prototype, "formattedDuration", {
        get: function () {
            var minutes = Math.floor(this.durationMs / 60000);
            var seconds = Math.floor((this.durationMs % 60000) / 1000);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        },
        enumerable: true,
        configurable: true
    });
    return Track;
}());

var _this = undefined;
var getSeveralTracks = function (ids) { return __awaiter(_this, void 0, void 0, function () {
    var exceptionLink, params, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (ids.length > 50) {
                    exceptionLink = 'https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-tracks/';
                    throw new Error("The maximum number of tracks is 50. See " + exceptionLink + " for details");
                }
                params = { params: { ids: ids } };
                return [4, getAxiosSpotifyInstance().get('/tracks', params)];
            case 1:
                response = _a.sent();
                return [2, response.data.tracks.map(function (trackJson) { return new Track(trackJson); })];
        }
    });
}); };
var getTrack = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, getAxiosSpotifyInstance().get("/tracks/" + id)];
            case 1:
                response = _a.sent();
                return [2, new Track(response.data)];
        }
    });
}); };

var tracks = /*#__PURE__*/Object.freeze({
    getSeveralTracks: getSeveralTracks,
    getTrack: getTrack
});

var Followers = (function () {
    function Followers(json) {
        this.href = json.href;
        this.total = json.total;
    }
    return Followers;
}());

var Artist = (function () {
    function Artist(json) {
        this.externalUrls = new ExternalUrl(json.external_urls);
        this.followers = new Followers(json.followers);
        this.genres = json.genres;
        this.href = json.href;
        this.id = json.id;
        this.images = json.images.map(function (imageJson) { return new Image(imageJson); });
        this.name = json.name;
        this.popularity = json.popularity;
        this.type = json.type;
        this.uri = json.uri;
    }
    return Artist;
}());

var _this$1 = undefined;
var getFollowedArtists = function (limit, after) {
    if (limit === void 0) { limit = 20; }
    return __awaiter(_this$1, void 0, void 0, function () {
        var exceptionLink, afterQuery, params, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (limit < 1 || limit > 50) {
                        exceptionLink = 'https://developer.spotify.com/documentation/web-api/reference/follow/get-followed/';
                        throw new Error("The limit must be between 1 and 50 (inclusive). See " + exceptionLink + " for details");
                    }
                    afterQuery = after ? after : null;
                    params = { params: { limit: limit, type: 'artist', after: afterQuery } };
                    return [4, getAxiosSpotifyInstance().get('/me/following', params)];
                case 1:
                    response = _a.sent();
                    return [2, response.data.artists.items.map(function (artistJson) { return new Artist(artistJson); })];
            }
        });
    });
};
var isFollowing = function (type, ids) { return __awaiter(_this$1, void 0, void 0, function () {
    var exceptionLink, params, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exceptionLink = 'https://developer.spotify.com/documentation/web-api/reference/follow/check-current-user-follows/';
                if (type !== 'artist' && type !== 'user') {
                    throw new Error("The type must be either artist or user. See " + exceptionLink + " for details");
                }
                else if (ids.length > 50) {
                    throw new Error("The maximum number of ids to check is 50. See " + exceptionLink + " for details");
                }
                params = { params: { type: type, ids: ids.join() } };
                return [4, getAxiosSpotifyInstance().get('/me/following/contains', params)];
            case 1:
                response = _a.sent();
                return [2, response.data];
        }
    });
}); };
var checkUsersFollowingPlaylist = function (playlistId, ids) { return __awaiter(_this$1, void 0, void 0, function () {
    var exceptionLink, params, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (ids.length > 5) {
                    exceptionLink = 'https://developer.spotify.com/documentation/web-api/reference/follow/check-user-following-playlist/';
                    throw new Error("The maximum number of users to check is 5. See " + exceptionLink + " for details");
                }
                params = { params: { ids: ids.join() } };
                return [4, getAxiosSpotifyInstance().get("/playlists/" + playlistId + "/followers/contains", params)];
            case 1:
                response = _a.sent();
                return [2, response.data];
        }
    });
}); };

var follow = /*#__PURE__*/Object.freeze({
    getFollowedArtists: getFollowedArtists,
    isFollowing: isFollowing,
    checkUsersFollowingPlaylist: checkUsersFollowingPlaylist
});

var Page = (function () {
    function Page(json, t) {
        this.t = t;
        this.href = json.href.split('?')[0];
        this.items = json.items.map(function (json) { return new t(json); });
        this.limit = json.limit;
        this.next = json.next ? json.next.split('?')[1] : null;
        this.offset = json.offset;
        this.previous = json.previous ? json.previous.split('?')[1] : null;
        this.total = json.total;
    }
    Page.prototype.getAxiosPageInstance = function () {
        var instance = getAxiosSpotifyInstance();
        instance.defaults.baseURL = this.href;
        return instance;
    };
    Page.prototype.hasNext = function () {
        return Boolean(this.next);
    };
    Page.prototype.hasPrevious = function () {
        return Boolean(this.previous);
    };
    Page.prototype.getNextPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var params, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasNext())
                            throw new Error('There are no more pages');
                        params = { limit: this.limit, offset: this.offset + this.limit };
                        return [4, this.getAxiosPageInstance().get('/', { params: params })];
                    case 1:
                        response = _a.sent();
                        return [2, new Page(response.data, this.t)];
                }
            });
        });
    };
    Page.prototype.getPreviousPage = function (forceLimit) {
        if (forceLimit === void 0) { forceLimit = false; }
        return __awaiter(this, void 0, void 0, function () {
            var limit, params, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasPrevious())
                            throw new Error('There are no more pages');
                        limit = this.limit;
                        if (this.offset < this.limit && !forceLimit) {
                            limit = this.offset;
                        }
                        params = { limit: limit, offset: 0 };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.getAxiosPageInstance().get('/', {
                                params: params,
                            })];
                    case 2:
                        response = _a.sent();
                        return [2, new Page(response.data, this.t)];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    return Page;
}());

var _this$2 = undefined;
var getArtist = function (id) { return __awaiter(_this$2, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, getAxiosSpotifyInstance().get("/artists/" + id)];
            case 1:
                response = _a.sent();
                return [2, new Artist(response.data)];
        }
    });
}); };
var getSeveralArtists = function (ids) { return __awaiter(_this$2, void 0, void 0, function () {
    var exceptionLink, params, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (ids.length > 50) {
                    exceptionLink = 'https://developer.spotify.com/documentation/web-api/reference/artists/get-several-artists/';
                    throw new Error("The maximum number of artists is 50. See " + exceptionLink + " for details");
                }
                params = { params: { ids: ids } };
                return [4, getAxiosSpotifyInstance().get('/artists', params)];
            case 1:
                response = _a.sent();
                return [2, response.data.artists.map(function (artistJson) { return new Artist(artistJson); })];
        }
    });
}); };
var getArtistAlbums = function (id, offset, limit) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 20; }
    return __awaiter(_this$2, void 0, void 0, function () {
        var params, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = { params: { offset: offset, limit: limit } };
                    return [4, getAxiosSpotifyInstance().get("/artists/" + id + "/albums", params)];
                case 1:
                    response = _a.sent();
                    return [2, new Page(response.data, AlbumSimplified)];
            }
        });
    });
};
var getRelatedArtists = function (id) { return __awaiter(_this$2, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, getAxiosSpotifyInstance().get("/artists/" + id + "/related-artists")];
            case 1:
                response = _a.sent();
                return [2, response.data.artists.map(function (artistJson) { return new Artist(artistJson); })];
        }
    });
}); };
var getArtistTopTracks = function (id) { return __awaiter(_this$2, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, getAxiosSpotifyInstance().get("/artists/" + id + "/top-tracks")];
            case 1:
                response = _a.sent();
                return [2, response.data.tracks.map(function (trackJson) { return new Track(trackJson); })];
        }
    });
}); };

var artists = /*#__PURE__*/Object.freeze({
    getArtist: getArtist,
    getSeveralArtists: getSeveralArtists,
    getArtistAlbums: getArtistAlbums,
    getRelatedArtists: getRelatedArtists,
    getArtistTopTracks: getArtistTopTracks
});

var TrackSimplified = (function () {
    function TrackSimplified(json) {
        this.artists = json.artists.map(function (artistJson) { return new ArtistSimplified(artistJson); });
        this.availableMarkets = json.available_markets;
        this.discNumber = json.disc_number;
        this.durationMs = json.duration_ms;
        this.explicit = json.explicit;
        this.externalUrls = new ExternalUrl(json.external_urls);
        this.href = json.href;
        this.id = json.id;
        this.isPlayable = json.is_playable;
        this.linkedFrom = json.linked_from;
        this.restrictions = json.restrictions;
        this.name = json.name;
        this.previewUrl = json.preview_url;
        this.trackNumber = json.track_number;
        this.type = json.type;
        this.uri = json.uri;
        this.isLocal = json.isLocal;
    }
    Object.defineProperty(TrackSimplified.prototype, "stringArtists", {
        get: function () {
            var artistNames = this.artists.map(function (artist) { return artist.name; });
            return artistNames.join(', ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TrackSimplified.prototype, "length", {
        get: function () {
            var minutes = Math.floor(this.durationMs / 60000);
            var seconds = Math.floor((this.durationMs % 60000) / 1000);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        },
        enumerable: true,
        configurable: true
    });
    return TrackSimplified;
}());

var Album = (function () {
    function Album(json) {
        this.albumType = json.album_type;
        this.artists = json.artists.map(function (artistJson) { return new ArtistSimplified(artistJson); });
        this.availableMarkets = json.available_markets;
        this.copyrights = json.copyrights;
        this.externalIds = new ExternalId(json.external_ids);
        this.externalUrls = new ExternalUrl(json.external_urls);
        this.genres = json.genres;
        this.href = json.href;
        this.id = json.id;
        this.images = json.images.map(function (imageJson) { return new Image(imageJson); });
        this.label = json.label;
        this.name = json.name;
        this.popularity = json.popularity;
        this.releaseDate = json.release_date;
        this.releaseDatePrecision = json.release_date_precision;
        this.tracks = new Page(json.tracks, TrackSimplified);
        this.type = json.type;
        this.uri = json.uri;
    }
    Object.defineProperty(Album.prototype, "stringArtists", {
        get: function () {
            var artistNames = this.artists.map(function (artist) { return artist.name; });
            return artistNames.join(', ');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "releaseYear", {
        get: function () {
            return this.releaseDate.substring(0, 4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Album.prototype, "imageUrl", {
        get: function () {
            return this.images[0].url;
        },
        enumerable: true,
        configurable: true
    });
    return Album;
}());

var _this$3 = undefined;
var getAlbum = function (id) { return __awaiter(_this$3, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, getAxiosSpotifyInstance().get("/albums/" + id)];
            case 1:
                response = _a.sent();
                return [2, new Album(response.data)];
        }
    });
}); };
var getSeveralAlbums = function (ids) { return __awaiter(_this$3, void 0, void 0, function () {
    var exceptionLink, params, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (ids.length > 20) {
                    exceptionLink = 'https://developer.spotify.com/documentation/web-api/reference/albums/get-several-albums/';
                    throw new Error("The maximum number of albums is 20. See " + exceptionLink + " for details");
                }
                params = { params: { ids: ids } };
                return [4, getAxiosSpotifyInstance().get('/albums', params)];
            case 1:
                response = _a.sent();
                return [2, response.data.artists.map(function (albumJson) { return new Album(albumJson); })];
        }
    });
}); };
var getAlbumTracks = function (id, offset, limit) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 20; }
    return __awaiter(_this$3, void 0, void 0, function () {
        var params, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = { params: { offset: offset, limit: limit } };
                    return [4, getAxiosSpotifyInstance().get("/albums/" + id + "/tracks", params)];
                case 1:
                    response = _a.sent();
                    return [2, new Page(response.data, TrackSimplified)];
            }
        });
    });
};

var albums = /*#__PURE__*/Object.freeze({
    getAlbum: getAlbum,
    getSeveralAlbums: getSeveralAlbums,
    getAlbumTracks: getAlbumTracks
});

var PublicUser = (function () {
    function PublicUser(json) {
        this.displayName = json.display_name;
        this.externalUrls = new ExternalUrl(json.external_urls);
        this.followers = new Followers(json.followers);
        this.href = json.href;
        this.id = json.id;
        this.images = json.images.map(function (imageJson) { return new Image(imageJson); });
        this.type = json.type;
        this.uri = json.uri;
    }
    return PublicUser;
}());

var PlaylistTrack = (function () {
    function PlaylistTrack(json) {
        this.addedAt = json.added_at;
        this.addedBy = new PublicUser(json.added_by);
        this.isLocal = json.is_local;
        this.track = new Track(json.track);
    }
    return PlaylistTrack;
}());

var Playlist = (function () {
    function Playlist(json) {
        this.collaborative = json.collaborative;
        this.description = json.description;
        this.externalUrls = new ExternalUrl(json.external_urls);
        this.followers = new Followers(json.followers);
        this.href = json.href;
        this.id = json.id;
        this.images = json.images.map(function (imageJson) { return new Image(imageJson); });
        this.name = json.name;
        this.owner = new PublicUser(json.owner);
        this.public = json.public;
        this.snapshotId = json.snapshot_id;
        this.tracks = new Page(json.tracks, PlaylistTrack);
        this.type = json.type;
        this.uri = json.uri;
    }
    return Playlist;
}());

var PlaylistSimplified = (function () {
    function PlaylistSimplified(json) {
        this.collaborative = json.collaborative;
        this.externalUrls = new ExternalUrl(json.external_urls);
        this.href = json.href;
        this.id = json.id;
        this.images = json.images.map(function (imageJson) { return new Image(imageJson); });
        this.name = json.name;
        this.owner = new PublicUser(json.owner);
        this.public = json.public;
        this.snapshotId = json.snapshot_id;
        this.tracks = json.tracks;
        this.type = json.type;
        this.uri = json.uri;
    }
    Object.defineProperty(PlaylistSimplified.prototype, "totalTracks", {
        get: function () {
            return this.tracks.total;
        },
        enumerable: true,
        configurable: true
    });
    return PlaylistSimplified;
}());

var _this$4 = undefined;
var getPlaylist = function (id) { return __awaiter(_this$4, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, getAxiosSpotifyInstance().get("/plylists/" + id)];
            case 1:
                response = _a.sent();
                return [2, new Playlist(response.data)];
        }
    });
}); };
var getPlaylistTracks = function (id, offset, limit) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 20; }
    return __awaiter(_this$4, void 0, void 0, function () {
        var params, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = { params: { offset: offset, limit: limit } };
                    return [4, getAxiosSpotifyInstance().get("/playlists/" + id + "/tracks", params)];
                case 1:
                    response = _a.sent();
                    return [2, new Page(response.data, PlaylistTrack)];
            }
        });
    });
};
var getUserPlaylists = function (id, offset, limit) {
    if (offset === void 0) { offset = 0; }
    if (limit === void 0) { limit = 20; }
    return __awaiter(_this$4, void 0, void 0, function () {
        var params, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = { params: { offset: offset, limit: limit } };
                    return [4, getAxiosSpotifyInstance().get("/users/" + id + "/playlists", params)];
                case 1:
                    response = _a.sent();
                    return [2, new Page(response.data, PlaylistSimplified)];
            }
        });
    });
};

var playlists = /*#__PURE__*/Object.freeze({
    getPlaylist: getPlaylist,
    getPlaylistTracks: getPlaylistTracks,
    getUserPlaylists: getUserPlaylists
});

var index = __assign({}, driver, tracks, follow, artists, playlists, albums);

module.exports = index;
