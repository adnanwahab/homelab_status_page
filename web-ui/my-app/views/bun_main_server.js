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
var port = 3333;
Bun.serve({
    websocket: {
        open: function (ws) {
            console.log("WebSocket connection opened");
        },
        message: function (ws, message) {
            console.log("Received message:", message);
            // Handle the WebSocket message here
            // You might want to forward this to your Vite server if needed
        },
        close: function (ws, code, message) {
            console.log("WebSocket connection closed");
        }
    },
    port: port,
    fetch: function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, error_1, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = new URL(req.url);
                        url.port = "8001"; // Forward to Vite server's port
                        url.hostname = "localhost"; // Assuming Vite is running locally
                        if (url.pathname === '/ollama') {
                            return [2 /*return*/, new Response(JSON.stringify({ message: 'ok' }), {
                                    headers: { 'Content-Type': 'application/json' }
                                })];
                        }
                        if (!url.pathname.startsWith('/api')) return [3 /*break*/, 4];
                        // return new Response(JSON.stringify({ message: 'ok' }), {
                        //   headers: { 'Content-Type': 'application/json' },
                        // });
                        // Proxy the entire request to port 8080
                        url.port = "8003"; // Forward to the server running on port 8080
                        url.hostname = "localhost"; // Assuming the server is running locally
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch(url.toString(), {
                                method: req.method,
                                headers: req.headers,
                                body: req.body,
                                duplex: 'half'
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response]; // Return the server's response to the client
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error proxying request:', error_1);
                        return [2 /*return*/, new Response('Internal Server Error', { status: 500 })];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, fetch(url.toString(), {
                                method: req.method,
                                headers: req.headers,
                                body: req.body,
                                duplex: 'half'
                            })];
                    case 5:
                        response = _a.sent();
                        return [2 /*return*/, response]; // Return the Vite server's response to the client
                    case 6:
                        error_2 = _a.sent();
                        console.error('Error proxying request:', error_2);
                        return [2 /*return*/, new Response('Internal Server Error', { status: 500 })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
});
console.log("server running on port", port);
var child_process_1 = require("child_process");
function startBunHelperServer() {
    var bunHelperServer = (0, child_process_1.spawn)('bun', ['js/bun-helper-server.tsx', '--port', '8002'], {
        stdio: 'inherit'
    });
    bunHelperServer.on('close', function (code) {
        console.log("bun-helper-server.tsx process exited with code ".concat(code));
    });
    bunHelperServer.on('error', function (err) {
        console.error('Failed to start bun-helper-server.tsx:', err);
    });
    var fs = require('fs');
    fs.watch('js', { recursive: true }, function (eventType, filename) {
        if (filename) {
            console.log("File changed: ".concat(filename, ". Restarting bun-helper-server..."));
            bunHelperServer.kill();
            startBunHelperServer();
        }
    });
}
startBunHelperServer();
