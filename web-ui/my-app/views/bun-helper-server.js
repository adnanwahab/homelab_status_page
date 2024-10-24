"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var jsx_runtime_1 = require("hono/jsx/jsx-runtime");
var ollama = require('ollama');
var server_1 = require("react-dom/server");
var bun_1 = require("bun");
var fs_1 = require("fs");
var path_1 = require("path");
var llama_backend_js_1 = require("./bun_handlers/llama-backend.js");
var cgi_backend_js_1 = require("./bun_handlers/cgi-backend.js");
var port = process.env.PORT || 8002;
console.log("Server running at http://localhost:".concat(port));
var blag_jsx_1 = require("./blag.jsx");
function serveBlag(req) {
    var filePath = path_1["default"].join(process.cwd(), "js/views/blag.html");
    console.log('filePath', filePath);
    var indexHtmlContent = fs_1["default"].readFileSync(filePath, "utf-8");
    var blag = indexHtmlContent.replace("{{template blag}}", "".concat((0, server_1.renderToString)((0, jsx_runtime_1.jsx)(blag_jsx_1["default"], {}))));
    return new Response(blag, {
        headers: {
            "Content-Type": "text/html"
        }
    });
}
function on_save_blag(req) {
    ollama.generate({
        model: "llama3.2",
        prompt: "predict if there are errors before running thiss"
    });
    //run thing 
    ollama.generate({
        //model: "llama3.2",
        model: "llama3.2",
        prompt: "if errors - suggest fixes"
    });
}
function serveBlagArchive(req) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, markdownContent, lines, docsPath, content;
        return __generator(this, function (_a) {
            try {
                filePath = path_1["default"].join(process.cwd(), "docs/blag/index.md");
                markdownContent = fs_1["default"].readFileSync(filePath, "utf-8");
                lines = markdownContent.split('\n');
                docsPath = path_1["default"].join(process.cwd(), 'docs');
                if (!fs_1["default"].existsSync(docsPath)) {
                    fs_1["default"].mkdirSync(docsPath, { recursive: true });
                }
                content = "".concat(lines.map(function (line, i) {
                    if (line.startsWith('#')) {
                        return "<h1>".concat(line.slice(2), "</h1>");
                    }
                    var cleanedLine = line.slice(3).replace(/[^a-zA-Z0-9\s-]/g, '').trim();
                    if (cleanedLine === ' ') {
                        return '';
                    }
                    var simplifiedLink = cleanedLine.replace(/\s+/g, '-').toLowerCase();
                    return "<div><a href=\"blag/".concat(simplifiedLink, "\">").concat(cleanedLine, "</a></div>");
                }).join('<br/>'));
                return [2 /*return*/, new Response(content, {
                        headers: {
                            "Content-Type": "text/html"
                        }
                    })];
            }
            catch (error) {
                console.error('Error in serveBlagArchive:', error);
                return [2 /*return*/, new Response('An error occurred while processing your request', { status: 500 })];
            }
            return [2 /*return*/];
        });
    });
}
function saveScreenShare() {
}
function ReplayAnalyzer() {
    //  startEgress('example-room')
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "max-w-4xl mx-auto p-6" }, { children: [(0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-3xl font-bold text-center text-gray-800 mb-6" }, { children: "Replay Analyzer" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-white shadow-md rounded-lg p-6" }, { children: [(0, jsx_runtime_1.jsxs)("form", __assign({ className: "mb-4" }, { children: [(0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: "file-upload", className: "block text-gray-700 mb-2" }, { children: "Upload Replay File:" })), (0, jsx_runtime_1.jsx)("input", { type: "file", id: "file-upload", className: "block w-full text-gray-700 border border-gray-300 rounded p-2", accept: ".replay" }), (0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", className: "mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600" }, { children: "Analyze Replay" }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ id: "analysis-result", className: "hidden mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700" }, { children: (0, jsx_runtime_1.jsx)("p", { children: "Results of the replay analysis will appear here..." }) }))] })), (0, jsx_runtime_1.jsx)("footer", __assign({ className: "mt-6 text-center" }, { children: (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-gray-500" }, { children: "\u00A9 2023 Replay Analyzer. All rights reserved." })) }))] })));
}
function replay_analyzer(req) {
    var replay_html = (0, server_1.renderToString)((0, jsx_runtime_1.jsx)(ReplayAnalyzer, {}));
    return new Response(replay_html, {
        headers: {
            "Content-Type": "text/html"
        }
    });
}
function placeholder_screenshare(req) {
    return __awaiter(this, void 0, void 0, function () {
        var screenshot, fs, path, screenshotBuffer, screenshotPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    screenshot = _a.sent();
                    fs = require('fs');
                    path = require('path');
                    screenshotBuffer = Buffer.from(screenshot.screenshot.split(',')[1], 'base64');
                    screenshotPath = path.join(__dirname, 'screenshots', "screenshot-".concat(Date.now(), ".png"));
                    fs.writeFileSync(screenshotPath, screenshotBuffer);
                    return [2 /*return*/, new Response(JSON.stringify({ message: 'Screenshot saved successfully.' }), {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })];
            }
        });
    });
}
var CgiRoutesHandlers = Object.fromEntries(Object.entries(cgi_backend_js_1["default"]).map(function (_a) {
    var key = _a[0], value = _a[1];
    return ["/cgi-tools".concat(key), value];
}));
var llamaRoutesHandlers = Object.fromEntries(Object.entries(llama_backend_js_1["default"]).map(function (_a) {
    var key = _a[0], value = _a[1];
    return ["/llama-tools".concat(key), value];
}));
var routes = __assign(__assign({ "/api/placeholder_screenshare": function (req) { return placeholder_screenshare(req); }, "/api/livekit_connect": function (req) { return livekit_connect(req); }, "/api/replay_analyzer": function (req) { return replay_analyzer(req); }, 
    ///"/os/*": (req: Request) => os_automation(req),
    "/": function (req) { return serveBlag(req); }, "/blag": function (req) { return serveBlag(req); }, 
    //"/llama-tools": (req: Request) => serveLlamaTools(req),
    //"/cgi-tools": (req: Request) => serveCgiTools(req),
    "/blag-archive": function (req) { return serveBlagArchive(req); } }, CgiRoutesHandlers), llamaRoutesHandlers);
main();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            bun_1["default"].serve({
                port: port,
                fetch: fetch
            });
            return [2 /*return*/];
        });
    });
}
function fetch(req) {
    return __awaiter(this, void 0, void 0, function () {
        var url, route, filePath, fileExists, _a, prompt_1, response, generatedContent, content, error_1, targetUrl;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    url = new URL(req.url);
                    if (!req.url) {
                        console.error('Request URL is undefined');
                        return [2 /*return*/, new Response('Invalid request', { status: 400 })];
                    }
                    if (!url.pathname.startsWith("/blag/")) return [3 /*break*/, 11];
                    route = url.pathname.replace("/blag/", "");
                    filePath = "./docs/".concat(route, ".md");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, , 11]);
                    return [4 /*yield*/, bun_1["default"].write(filePath, "# ".concat(route, "\n\nContent for ").concat(route))];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, bun_1["default"].file(filePath).exists()];
                case 3:
                    fileExists = _b.sent();
                    if (!fileExists) return [3 /*break*/, 5];
                    _a = Response.bind;
                    return [4 /*yield*/, bun_1["default"].file(filePath).text()];
                case 4: return [2 /*return*/, new (_a.apply(Response, [void 0, _b.sent(), { status: 200 }]))()];
                case 5:
                    prompt_1 = "Generate a paragraph of PhD level content and 10 citations related to the topic described in the file: ".concat(filePath);
                    return [4 /*yield*/, ollama.chat({
                            model: 'llama3.1',
                            messages: [{ role: 'user', content: prompt_1 }]
                        })];
                case 6:
                    response = _b.sent();
                    return [4 /*yield*/, response.message.content];
                case 7:
                    generatedContent = _b.sent();
                    content = generatedContent.text;
                    return [4 /*yield*/, bun_1["default"].write(filePath, content)];
                case 8:
                    _b.sent();
                    return [2 /*return*/, new Response(content, { status: 200 })];
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _b.sent();
                    console.error('Error creating file:', error_1);
                    return [2 /*return*/, new Response('An error occurred while creating the file', { status: 500 })];
                case 11:
                    console.log('url', url.pathname);
                    if (url.pathname.startsWith("/assets"))
                        return [2 /*return*/, bun_1["default"].file('/Users/shelbernstein/homelab_status_page/web-ui/assets/output.css')];
                    if (url.pathname.startsWith("/webhook"))
                        return [2 /*return*/, webhook(req)];
                    if (routes[url.pathname]) { //handles all HTTPS JSON regular bear routes
                        return [2 /*return*/, routes[url.pathname](req)];
                    }
                    if (url.pathname.startsWith("/proxy")) {
                        targetUrl = url.pathname.replace("/proxy", "");
                        if (targetUrl === "") {
                            return [2 /*return*/, new Response("how to proxy??? - try /proxy/https://google.com", {
                                    headers: {
                                        "Content-Type": "text/html"
                                    }
                                })];
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// convert all books to music videos - read aloud + show diagrms - interactive if psosibel 
function webhook(req) {
    //console.log('webhook', req)
    return new Response('webhook');
}
