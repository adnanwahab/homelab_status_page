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
var jsx_runtime_1 = require("hono/jsx/jsx-runtime");
var staticDir = (0, node_path_1.join)("static/");
var node_path_1 = require("node:path");
var fs = require("fs");
var path = require("path");
var bun_main_server_tsx_1 = require("../bun_main_server.tsx");
//const identity = url.searchParams.get("identity");
//console.log('identity', identity)
// console.log("req url", url.pathname);
// if (url.pathname === "/blag" || url.pathname === "/") return routes["/blag"](req)
//  if (url.pathname === "/docs") return response_404(req)
// if (url.pathname === '/livekit_connect') return handle_livekit_connect(req)  
// if (url.pathname === "/robotics-odyssey") return routes["/robotics-odyssey"](req)
// if (url.pathname == '/favicon.ico') return new Response(Bun.file('public/images/favicon.svg'))
//   //web-ui/public/images/favicon.svg//
// if (url.pathname === "/make_bun_cell") return routes["/make_bun_cell"](req)
// if (url.pathname === "/make_deno_cell") return routes["/make_deno_cell"](req)
// if (url.pathname === "/make_python_cell") return routes["/make_python_cell"](req)
// if (url.pathname.includes("/user_code")) return static_files(req)
// if (url.pathname === "/archive") return routes["/archive-blog"](req)
//if (url.pathname === "/obs-zed-prediction-mode") return routes["/llama-tools"](req) --- FOUNDATION -> RE_READ -> convert the tv show to graphic novel - guyaka girls
// if (url.pathname === "/llama-tools") return routes["/llama-tools"](req)
// if (url.pathname === "/llama-tools") return routes["/llama-tools"](req)
// if (url.pathname === "/cgi-tools") return routes["/cgi-tools"](req);
//if (url.pathname === "/science-tools*") return new Response("sciente-tools")  // redictrect - to all users contribute anytihn they wantnt //?! - they nsicee odnt 
// if (url.pathname === "/manifest.json") {
//   return new Response(JSON.stringify({"IDK":10}), {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
// try gpt then just redirect to 3 bun rpoceses in one bun file - started by systemd - a script... like levles 
// delete new relic 
//return response_404(routes)
function history_search(req) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
var routes = {
    "/iframe_for_bret_victor": function () {
        return new Response(JSON.stringify({
            url: "https://worrydream.com"
        }), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    "/progress_to_archiving_all_of_worryDream": function () {
        return new Response(JSON.stringify({
            progress: 0.1,
            total_disk_usage: "unknown" // Replace "unknown" with the actual disk usage if available
        }), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    },
    "/private_trackers_web_torrent_apply_creative_ai_to_all_of_it": function (req) { return history_search(req); },
    "/history_search": function (req) { return history_search(req); },
    //"/livekit_connect": (req: Request) => livekit_connect(req),
    "/livekit_speech_to_fn_call": livekit_speech_to_fn_call,
    '/livekit_screenshare': function () {
        //let pathname = join(process.cwd(), 'views', 'llama-tools', 'screenshare.html')
        var pathname = "/home/adnan/homelab_status_page/web-ui/views/llama-tools/screenshare.html";
        console.log('pathname', pathname);
        var html = fs.readFileSync(pathname, 'utf8');
        /// view all 
        return new Response(html, {
            headers: {
                "Content-Type": "text/html"
            }
        });
    },
    '/view_all_screenshares': function () {
        //let pathname = join(process.cwd(), 'views', 'llama-tools', 'screenshare.html')
        var pathname = "/home/adnan/homelab_status_page/web-ui/views/llama-tools/view_all_screenshares.html";
        console.log('pathname', pathname);
        var html = fs.readFileSync(pathname, 'utf8');
        /// view all 
        return new Response(html, {
            headers: {
                "Content-Type": "text/html"
            }
        });
    },
    "/_private_routes_for_local_host": livekit_speech_to_fn_call,
    "/cognition_engine": function () { return new Response("blahblah"); },
    "/replay_analyzer": function () { return new Response("blahblah"); },
    "/logs_viewer": function () { return new Response("blahblah"); },
    "/import_docs": function () { return new Response("blahblah"); },
    "/script_obs": function () { return new Response("blahblah"); },
    "/for_jp": function () { return new Response("blahblah"); },
    "/index": function () { return new Response("blahblah"); },
    "/api_docs": function () { return new Response("blahblah"); },
    "/flirtflow": function () { return new Response("blahblah"); },
    "/rich_hickey": function () { return new Response("blahblah"); },
    "/fix-bot-ops-with-llama-tools": function (req) { return identity(req); },
    "/continuous_eval": function (req) { return continuous_eval(req); },
    "/vow_of_silence": function (req) { return identity(req); },
    "/serve_proxy_docs_regular_iframe": function (req) { return serve_proxy_docs_regular_iframe(req); },
    "/save-livekit-data": function (req) { return save_livekit_data(req); },
    "/docs": function (req) { return response_404(req); },
    "_outlier_agent": function (req) { return serveOutlierAgent(req); },
    "_optimizely_playwright_supervision": function (req) { return serveOptimizelyPlaywrightSupervision(req); },
    "/make_bun_cell": function (req) { return (0, bun_main_server_tsx_1.serveMakeBunCell)(req); },
    "/make_deno_cell": function (req) { return (0, bun_main_server_tsx_1.serveMakeDenoCell)(req); },
    "/make_python_cell": function (req) { return (0, bun_main_server_tsx_1.serveMakePythonCell)(req); },
    "/fix-bot-ops-with-llama-tools": function (req) { return identity(req); },
    "/continuous_eval": function (req) { return continuous_eval(req); },
    "/vow_of_silence": function (req) { return identity(req); },
    "/serve_proxy_docs_regular_iframe": function (req) { return serve_proxy_docs_regular_iframe(req); },
    "/save-livekit-data": function (req) { return save_livekit_data(req); },
    "/docs": function (req) { return response_404(req); },
    "_outlier_agent": function (req) { return serveOutlierAgent(req); },
    "_optimizely_playwright_supervision": function (req) { return serveOptimizelyPlaywrightSupervision(req); },
    "/make_bun_cell": function (req) { return (0, bun_main_server_tsx_1.serveMakeBunCell)(req); },
    "/make_deno_cell": function (req) { return (0, bun_main_server_tsx_1.serveMakeDenoCell)(req); },
    "/make_python_cell": function (req) { return (0, bun_main_server_tsx_1.serveMakePythonCell)(req); }
};
function serveOptimizelyPlaywrightSupervision() {
    //livekit webrtc the tab 
}
// "eye_tracker": () => {},
// "pose_estimation": () => {},
// "sound-fx-dashboard": () => {},
// "/serve_proxy_docs": (req: Request) => serve_proxy_docs(req),
// https://bun.sh/guides
//compile time check theese
//console.log('CgiRoutesHandlers', CgiRoutesHandlers)
//Response.json
//    return new Response(file("index.html"));
//    return Response.redirect("/redirected");
// doc = https://caddyserver.com/docs/
// vooting particles color 
function serve_proxy_docs(req) {
    var html_string = proxy_docs.map(function (doc) { return "<div><iframe src=".concat("/proxy/" + doc, "></iframe></div>"); }).join("\n");
    console.log('html_string', html_string);
    return new Response(html_string, {
        headers: {
            "Content-Type": "text/html"
        }
    });
}
function serveOutlierAgent() {
}
function serve_proxy_docs_regular_iframe(req) {
    var html_string = proxy_docs.map(function (doc) { return "<div><iframe src=".concat(doc, "></iframe></div>"); }).join("\n");
    console.log('html_string', html_string);
    return new Response(html_string, {
        headers: {
            "Content-Type": "text/html"
        }
    });
}
var identity = function (req) { }; //agents please - code this
// import FlirtFlow from '../views/jsx/flirtflow'; // Adjust the path if necessary
function continuous_eval(req) {
    return new Response("continuous_eval", {
        headers: {
            "Content-Type": "text/html"
        }
    });
}
var response_404 = function () {
    return docs_response(routes);
};
var llamatoolsir = (0, node_path_1.join)("views", "llama-tools");
function App() {
    return (0, jsx_runtime_1.jsx)("div", { children: "hello world" });
}
//export default App;
var save_livekit_data = function (req) {
    var data = req.body;
    Bun.write('data.json', JSON.stringify(data, null, 2));
    return new Response('Data saved successfully', { status: 200 });
};
function livekit_speech_to_fn_call(req) {
    //what is rpc 
    //send audio p primary function -> use from app
    // from phone ---- speak -> 
    // send to server -> whisper -> find the function - call it -> schedules an gent 
    //let pathname = join(process.cwd(), 'views', 'llama-tools', 'screenshare.html')
    var pathname = "/home/adnan/homelab_status_page/web-ui/views/llama-tools/livekit_speech_to_fn_call.html";
    console.log('pathname', pathname);
    var html = fs.readFileSync(pathname, 'utf8');
    /// view all 
    return new Response(html, {
        headers: {
            "Content-Type": "text/html"
        }
    });
}
exports["default"] = routes;
