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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
var hono_1 = require("hono");
var livekit_server_sdk_1 = require("livekit-server-sdk");
var robotics_odyssey_jsx_1 = require("./robotics-odyssey.jsx");
var fs_1 = require("fs");
var logger_1 = require("hono/logger");
var cors_1 = require("hono/cors");
var utils = require("./utils.js");
var app = new hono_1.Hono();
app.use((0, logger_1.logger)());
app.onError(function (err, c) {
    console.error(err); // Log the error for debugging
    var errorMessage = {
        message: err.message,
        stack: err.stack
    };
    return c.json(errorMessage, 500); // Send a JSON response with the error details
});
// specify path
app.use('*', (0, cors_1.cors)());
app.all('/llama-tools', function (c) {
    return c.html(fs_1["default"].readFileSync('./src/llama-tools/llama-tools.html', 'utf8'));
});
app.all('/odyssey*', function (c) {
    var is_html = (0, robotics_odyssey_jsx_1["default"])();
    return c.html(utils.Layout(is_html));
});
app.all('/iframe/*', function (c) {
    var basename = c.req.path.split('/').pop();
    console.log('basename', basename);
    var html = '';
    if (basename == 'livekit_audio.html') {
        html = fs_1["default"].readFileSync('./src/llama-tools/livekit_audio.html', 'utf8');
    }
    if (basename == 'livekit_view_all.html') {
        html = fs_1["default"].readFileSync('./src/llama-tools/livekit_view_all.html', 'utf8');
    }
    if (basename == 'livekit_share.html') {
        html = fs_1["default"].readFileSync('./src/llama-tools/livekit_share.html', 'utf8');
    }
    if (basename == 'replay_analyzer.html') {
        html = fs_1["default"].readFileSync('./src/llama-tools/replay_analyzer.html', 'utf8');
    }
    return c.html(html);
});
app.all('/', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, c.html(fs_1["default"].readFileSync('./src/llama-tools/blag.html', 'utf8'))];
    });
}); });
app.all('/views/*', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var html;
    return __generator(this, function (_a) {
        console.log(c.req.path);
        html = fs_1["default"].readFileSync('src/' + c.req.path, 'utf8');
        return [2 /*return*/, c.html(html)];
    });
}); });
// app.get('/api/replay_analyzer', (c) => c.json({'Pretty Blog API': 1}));
console.log('app', 'hono', Date.now());
app.fire();
exports["default"] = app;
//app.get('/api/magic_llama', (c) => c.json({'Pretty Blog API': 1}));
//app.get('/api/measure_magic_llama', (c) => c.json({'Pretty Blog API': 1}))
var apiKey = process.env.LIVEKIT_API_KEY;
var apiSecret = process.env.LIVEKIT_API_SECRET;
var wsUrl = process.env.LIVEKIT_WS_URL;
app.post('/livekit_connect', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonData, identity, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('livekit_connect');
                jsonData = { identity: 'voice to prompt?' + Date.now() };
                identity = jsonData.identity;
                if (!identity) {
                    return [2 /*return*/, c.text("Identity parameter is missing", 400)];
                }
                return [4 /*yield*/, connect_to_livekit(jsonData)];
            case 1:
                json = _a.sent();
                console.log('Generated token and wsUrl:', json);
                return [2 /*return*/, c.json(json)];
        }
    });
}); });
// Function to generate token and connect to LiveKit
function connect_to_livekit(options) {
    return __awaiter(this, void 0, void 0, function () {
        var token, jwt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("options", options);
                    // Default identity if not provided
                    if (!options.identity) {
                        options.identity = 'anonymous' + Math.random().toString(36).substring(2, 15);
                    }
                    token = new livekit_server_sdk_1.AccessToken(apiKey, apiSecret, {
                        identity: options.identity
                    });
                    // Add grant to the token (e.g., room access)
                    token.addGrant({
                        room: "example-room",
                        roomJoin: true,
                        canPublish: true
                    });
                    return [4 /*yield*/, token.toJwt()];
                case 1:
                    jwt = _a.sent();
                    // Return token and WebSocket URL
                    return [2 /*return*/, { token: jwt, wsUrl: wsUrl }];
            }
        });
    });
}
// Starting the server
app.fire();
// -- obs_react_notebook_component -- 10 stars - make 
//3d css react tw
// john dinu - queueing theory
