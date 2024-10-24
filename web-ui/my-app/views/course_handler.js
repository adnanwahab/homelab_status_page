"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var _a = require('livekit-server-sdk'), EgressClient = _a.EgressClient, RoomCompositeEgressRequest = _a.RoomCompositeEgressRequest;
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var bun_1 = require("bun");
var server_1 = require("react-dom/server");
var bun_2 = require("bun");
var spawn = require("child_process").spawn;
var blag_jsx_1 = require("./blag.jsx");
//import RoboticsOdyssey from "views/odyssey/robotics-odyssey.tsx";
var fs_1 = require("fs");
var path_1 = require("path");
var bun_livekit_server_js_1 = require("./bun_handlers/bun-livekit-server.js");
var llama_backend_jsx_1 = require("./bun_handlers/llama-backend.jsx");
var cgi_backend_js_1 = require("./bun_handlers/cgi-backend.js");
var url_1 = require("url");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1["default"].dirname(__filename);
var indexHtmlPath = path_1["default"].resolve(__dirname, 'views', 'index.html');
console.log('indexHtmlPath', indexHtmlPath);
var indexHtmlContent = fs_1["default"].readFileSync(indexHtmlPath, 'utf-8');
var llama_grid_tsx_1 = require("./llama-grid.tsx");
//import {$} from "bun";
//op item list --vault=personal --tags=api --format json
//more tab - auto complete for everything - this repo coudl be good stdlib for robutts - for obs,toolchain(5things linux,go,zig,bun,python,C++,5apis,5apps) -- (english+diagrams) can gen the first 15.
//const api_keys = await $`op item list --vault=personal --tags=api --format json`.json()
// const api_keys = await new Promise((resolve, reject) => {
//   const proc = spawn(["op", "item", "list", "--vault=personal", "--tags=api", "--format", "json"]);
//   let output = "";
//   proc.stdout.on("data", (chunk) => {
//     output += chunk;
//   });
//   proc.on("close", () => {
//     try {
//       resolve(JSON.parse(output));
//     } catch (error) {
//       reject(error);
//     }
//   });
//   proc.on("error", (err) => {
//     reject(err);
//   });
// });
// const livekitHost = api_keys.find(item => item.name === 'LIVEKIT_WS_URL').value
// const apiKey = api_keys.find(item => item.name === 'LIVEKIT_API_KEY').value
// const apiSecret = api_keys.find(item => item.name === 'LIVEKIT_API_SECRET').value
//looking for best practices in mmphenomena --- because that was in importnati in games and cartoons.
//best practice in robotics engineerng - idk?
// const livekitHost = process.env.OPEN_AI_KEY
// const apiKey = process.env.LIVEKIT_API_KEY
// const apiSecret = process.env.LIVEKIT_API_SECRET
// const egressClient = new EgressClient(livekitHost, apiKey, apiSecret);
// // https://dev.twitch.tv/docs/api/
// //microbox + microsaur -
// //localhost -> connects to tailscale serve / funnel -> auto symlink to mothership - 4pb desktopx4
// async function startEgress() {
//   const request = RoomCompositeEgressRequest.fromPartial({
//     roomName: 'example-room',
//     layout: 'speaker-dark',
//     audioOnly: true,
//     fileOutputs: [
//       {
//         fileType: 'OGG', // LiveKit supports OGG for audio-only recordings
//         filepath: '/audio.ogg',
//       },
//     ],
//   });
//   const response = await egressClient.startRoomCompositeEgress(request);
//   console.log('Egress started with egress ID:', response.egressId);
//   return response.egressId
// }
// Resolve the path to index.html
function serveLlamaTools(req) {
    var content = indexHtmlContent + (0, server_1.renderToString)((0, jsx_runtime_1.jsx)(llama_grid_tsx_1["default"], {})); //+ 'miranda';
    return new Response(content, {
        headers: {
            "Content-Type": "text/html"
        }
    });
}
var CgiRoutesHandlers = Object.fromEntries(Object.entries(cgi_backend_js_1["default"]).map(function (_a) {
    var key = _a[0], value = _a[1];
    return ["/cgi-tools".concat(key), value];
}));
var llamaRoutesHandlers = Object.fromEntries(Object.entries(llama_backend_jsx_1["default"]).map(function (_a) {
    var key = _a[0], value = _a[1];
    return ["/llama-tools".concat(key), value];
}));
//fn.name and 1m list of functions - each one cool - eval each for usefulness - find all fn in bun,py,etc --- be safe with CRIU any other kernel extension research papers like jetpack_nix
//log every shell exec, and  thing carefully and make infrastrcture easy to restart (immutable important parts + highly dynamicland parts)
// async function os_automation(req: Request) { 
//   const cmd =  new URL(req.url).searchParams.get('cmd');
//   // const is_safe = await Bun.$(`ollama prompt "is this command safe to run on my computer? - estimate "`).text();  
//   // if (is_safe.toLowerCase().includes("no")) {  // add error why?? 
//   //   return new Response(`command seems not safe sorry, email eggnog.wahab@gmail.com or text '+1 (346) 697-0747 ' with this timestamp ${Date.now()}`, { status: 400 });
//   // }
//   // place hodler - b4 + after - criu - 
//   //return new Response(await Bun.$`${cmd}`.text());
//   return new Response(`tbc`)
// }
function os_automation(req) {
    return __awaiter(this, void 0, void 0, function () {
        var method, jsonData, _a, stdout, stderr, exitCode, data, _, responseValue;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    method = req.method;
                    // Handle OPTIONS requests for CORS preflight
                    if (method === "OPTIONS") {
                        return [2 /*return*/, new Response(null, {
                                status: 204,
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                                    "Access-Control-Allow-Headers": "Content-Type"
                                }
                            })];
                    }
                    // https://bun.sh/docs/api/file-system-router
                    // Ensure the request method is correct
                    if (req.method !== "POST") {
                        console.log("Invalid request method. POST expected.");
                    }
                    // Check if request body exists
                    if (!req.body) {
                        console.log("No request body found");
                    }
                    return [4 /*yield*/, req.json()["catch"](function (err) { return console.log('shits fucked', err); })];
                case 1:
                    jsonData = _b.sent();
                    console.log(' os jsonData', jsonData.cmd);
                    return [4 /*yield*/, (0, bun_1.$)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), jsonData.cmd).quiet()
                            .nothrow()];
                case 2:
                    _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr, exitCode = _a.exitCode;
                    data = { stdout: stdout, stderr: stderr, exitCode: exitCode };
                    _ = require('lodash');
                    responseValue = _.mapValues(data, function (value) { return value.toString(); });
                    return [2 /*return*/, new Response(JSON.stringify(responseValue), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' }
                        })];
            }
        });
    });
}
// steps -> dist bundle -> store those in intermediate impresiteaont
function serveVite(req) {
    return __awaiter(this, void 0, void 0, function () {
        var targetUrl, response, headers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetUrl = "http://localhost:8001}";
                    return [4 /*yield*/, fetch(targetUrl, {
                            method: req.method,
                            headers: req.headers,
                            body: req.body
                        })];
                case 1:
                    response = _a.sent();
                    headers = new Headers(response.headers);
                    headers.set('X-Proxy-By', 'course_handler');
                    return [2 /*return*/, new Response(response.body, {
                            status: response.status,
                            statusText: response.statusText,
                            headers: headers
                        })];
            }
        });
    });
}
function serve404(req) {
    return new Response("404 - not found", { status: 404 });
}
function livekit_connect(req) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonData, identity, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.json()];
                case 1:
                    jsonData = _a.sent();
                    console.log('Received JSON data:', jsonData);
                    identity = jsonData.identity;
                    if (!identity) {
                        return [2 /*return*/, new Response("Identity parameter is missing", { status: 400 })];
                    }
                    return [4 /*yield*/, (0, bun_livekit_server_js_1.connect_to_livekit)(jsonData)];
                case 2:
                    json = _a.sent();
                    console.log(json, json);
                    return [2 /*return*/, new Response(JSON.stringify(json))];
            }
        });
    });
}
var routes = __assign(__assign({ "/livekit_connect": function (req) { return livekit_connect(req); }, 
    //vr if done 
    ///"/os/*": (req: Request) => os_automation(req),
    "/docs": function (req) { return docs_response(routes); }, "/": function (req) { return serveBlag(req); }, "/robotics-odyssey": function (req) { return serveRoboticsOdyssey(req); }, "/blag": function (req) { return serveBlag(req); }, "/llama-tools": function (req) { return serveLlamaTools(req); }, "/cgi-tools": function (req) { return serveCgiTools(req); }, "/vite/*": function (req) { return serveVite(req); }, "404": function (req) { return serve404(req); } }, CgiRoutesHandlers), llamaRoutesHandlers);
// DWIM  agents ----- psobiltis
var docs_response = function (routes) {
    var routes_links = Object.keys(routes).map(function (key) { return "<li><a href=".concat(key, ">").concat(key, "</a></li>"); });
    var content = "<html><body>docs - please thank you\n".concat(routes_links.join("\n"), "\n</body></html>");
    return new Response(content, {
        headers: {
            "Content-Type": "text/html"
        }
    });
};
function serveCgiTools(req) {
    return docs_response(cgi_backend_js_1["default"]);
}
// convert all books to music videos - read aloud + show diagrms - interactive if psosibel 
function save_audio_to_whisper(req) {
    return __awaiter(this, void 0, void 0, function () {
        var contentType, data, formData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('save_audio_to_whisper called');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    // Check if the request method is POST
                    if (req.method !== 'POST') {
                        return [2 /*return*/, new Response('Method not allowed', { status: 405 })];
                    }
                    contentType = req.headers.get('content-type');
                    data = void 0;
                    if (!(contentType && contentType.includes('application/json'))) return [3 /*break*/, 3];
                    return [4 /*yield*/, req.json()];
                case 2:
                    // If it's JSON data
                    data = _a.sent();
                    return [3 /*break*/, 7];
                case 3:
                    if (!(contentType && contentType.includes('multipart/form-data'))) return [3 /*break*/, 5];
                    return [4 /*yield*/, req.formData()];
                case 4:
                    formData = _a.sent();
                    data = Object.fromEntries(formData);
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, req.text()];
                case 6:
                    // For other content types, try to read as text
                    data = _a.sent();
                    _a.label = 7;
                case 7:
                    console.log('Received data:', data);
                    // Process the data (this is where you'd implement your whisper logic)
                    // For now, we'll just echo back the received data
                    return [2 /*return*/, new Response(JSON.stringify({ message: 'Data received', data: data }), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' }
                        })];
                case 8:
                    error_1 = _a.sent();
                    console.error('Error in save_audio_to_whisper:', error_1);
                    return [2 /*return*/, new Response(JSON.stringify({ error: 'Internal server error' }), {
                            status: 500,
                            headers: { 'Content-Type': 'application/json' }
                        })];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function webhook(req) {
    //console.log('webhook', req)
    return new Response('webhook');
}
function proxy(req) {
    return __awaiter(this, void 0, void 0, function () {
        var url, targetUrl;
        return __generator(this, function (_a) {
            url = new URL(req.url);
            console.log('url', url.pathname);
            if (url.pathname.startsWith("/webhook"))
                return [2 /*return*/, webhook(req)
                    //  if (url.pathname.startsWith("/_not_vite")) {
                    //    const targetUrl = `http://localhost:8001${url.pathname}`;
                    //    try {
                    //      const response = await fetch(targetUrl, {
                    //        method: req.method,
                    //        headers: req.headers,
                    //        body: req.method !== "GET" && req.method !== "HEAD" ? req.body : null,
                    //      });
                    //      // Create a new response with the original body but new headers
                    //      const newResponse = new Response(response.body, {
                    //        status: response.status,
                    //        statusText: response.statusText,
                    //        headers: new Headers(response.headers),
                    //      });
                    //      // Remove any problematic headers
                    //      newResponse.headers.delete('content-encoding');
                    //      newResponse.headers.delete('content-length');
                    //      return newResponse;
                    //    } catch (error) {
                    //      console.error('Error proxying to Vite server:', error);
                    //      return new Response('Error proxying request', { status: 500 });
                    //    }
                    //  }
                    //if (url.pathname.startsWith("/webhook")) return webhook(req);
                ];
            //  if (url.pathname.startsWith("/_not_vite")) {
            //    const targetUrl = `http://localhost:8001${url.pathname}`;
            //    try {
            //      const response = await fetch(targetUrl, {
            //        method: req.method,
            //        headers: req.headers,
            //        body: req.method !== "GET" && req.method !== "HEAD" ? req.body : null,
            //      });
            //      // Create a new response with the original body but new headers
            //      const newResponse = new Response(response.body, {
            //        status: response.status,
            //        statusText: response.statusText,
            //        headers: new Headers(response.headers),
            //      });
            //      // Remove any problematic headers
            //      newResponse.headers.delete('content-encoding');
            //      newResponse.headers.delete('content-length');
            //      return newResponse;
            //    } catch (error) {
            //      console.error('Error proxying to Vite server:', error);
            //      return new Response('Error proxying request', { status: 500 });
            //    }
            //  }
            //if (url.pathname.startsWith("/webhook")) return webhook(req);
            if (url.pathname.startsWith("/os_automation"))
                return [2 /*return*/, os_automation(req)];
            if (url.pathname.startsWith("/api/save_audio_to_whisper"))
                return [2 /*return*/, save_audio_to_whisper(req)];
            //console.log('url.pathname', url.pathname.startsWith("/llama_backend"), url.pathname)
            //    let pathy = url.pathname 
            //    const isDeno = pathy.slice(1,5) === 'deno';
            // console.log('pathy', pathy)
            //    if (isDeno) { 
            //     console.log('Proxying to Deno server');
            //     const targetUrl = `http://localhost:3000${pathy}`;
            //     try {
            //       const response = await fetch(targetUrl, {
            //         method: req.method,
            //         headers: req.headers,
            //         body: req.method !== "GET" && req.method !== "HEAD" ? req.body : null,
            //       });
            //       // Create a new response with the original body but new headers
            //       const newResponse = new Response(response.body, {
            //         status: response.status,
            //         statusText: response.statusText,
            //         headers: new Headers(response.headers),
            //       });
            //       // Remove any problematic headers
            //       newResponse.headers.delete('content-encoding');
            //       newResponse.headers.delete('content-length');
            //       return newResponse;
            //     } catch (error) {
            //       console.error('Error proxying to Deno server:', error);
            //       return new Response('Error proxying request', { status: 500 });
            //     }
            //   }  /// move to file
            if (routes[url.pathname]) { //handles all HTTPS JSON regular bear routes
                return [2 /*return*/, routes[url.pathname](req)];
            }
            //console.log('url.pathname', url.pathname, url.pathname.startsWith("/proxy"))
            //llama in the request handler ?!??!?! 
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
        });
    });
}
// (nanosaur factory)
// peteer attia - rhonda patrick ----- bill nye
var port = 8080;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            bun_2["default"].serve({
                port: port,
                fetch: proxy
            });
            return [2 /*return*/];
        });
    });
}
//console.log('compile time checks: ' ,'typeof default_response === string' , typeof default_response === 'string');
main();
console.log("Server running at http://localhost", port);
function serveRoboticsOdyssey(req) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            //const component_name = "views/odyssey/index.html"
            return [2 /*return*/, new Response('', {
                    headers: {
                        "Content-Type": "text/html"
                    }
                })];
        });
    });
}
// writers are thinks, coders a thinkers, designers are ithnks ->>>> use your instrument of MIND > GOD 
function serveBlag(req) {
    //  const pathname = `/home/adnan/homelab_status_page/web-ui/views/llama-tools/livekit_speech_to_fn_call.html`
    //const previous_filePath = path.join(process.cwd(), "views/odyssey/blag.html");
    var indexHtmlContent = fs_1["default"].readFileSync(path_1["default"].resolve(__dirname, './views/blag.html'), "utf-8");
    var blag = indexHtmlContent.replace("{{template blag}}", "".concat((0, server_1.renderToString)((0, jsx_runtime_1.jsx)(blag_jsx_1["default"], {}))));
    return new Response(blag, {
        headers: {
            "Content-Type": "text/html"
        }
    });
}
function makeReactApp(component_name) {
    var filePath = path_1["default"].join(__dirname, component_name);
    var indexHtmlContent = fs_1["default"].readFileSync(filePath, "utf-8");
    //const App = () => <RoboticsOdyssey />;
    var App = function () { return (0, jsx_runtime_1.jsx)("div", { children: "course_handler" }); };
    var html = indexHtmlContent.replace("{{template roboticsodyssey}}", "".concat((0, server_1.renderToString)((0, jsx_runtime_1.jsx)(App, {}))));
    return html;
}
var templateObject_1;
