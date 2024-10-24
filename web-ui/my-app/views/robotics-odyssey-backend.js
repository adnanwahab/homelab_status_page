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
var path_1 = require("path");
var fs_1 = require("fs");
var bun_1 = require("bun");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        function serveStaticFile(filePath, res) {
            fs_1["default"].readFile(filePath, function (err, data) {
                if (err) {
                    console.error(err);
                    res.statusCode = 404;
                    res.end("File not found");
                }
                else {
                    res.end(data);
                }
            });
        }
        var port, staticDir, dbDir;
        return __generator(this, function (_a) {
            port = 3080;
            staticDir = (0, path_1.join)(__dirname, "static");
            dbDir = (0, path_1.join)(__dirname, "db");
            (0, bun_1.serve)({
                fetch: function (req) {
                    var url = new URL(req.url);
                    var filePath;
                    if (url.pathname.includes("proxy_to_threejs_journey")) {
                        console.log('proxy_to_threejs_journey');
                        return fetch("https://threejs-journey.com/")
                            .then(function (response) { return response.text(); })
                            .then(function (data) { return new Response(data, { status: 200, headers: { "Content-Type": "text/html" } }); })["catch"](function (error) { return new Response("Error fetching data", { status: 500 }); });
                    }
                    if (url.pathname.startsWith("/static")) {
                        filePath = (0, path_1.join)(staticDir, url.pathname.replace("/static", ""));
                    }
                    else if (url.pathname.startsWith("/db")) {
                        filePath = (0, path_1.join)(dbDir, url.pathname.replace("/db", ""));
                    }
                    else {
                        return new Response("Not Found", { status: 404 });
                    }
                    return new Promise(function (resolve) {
                        serveStaticFile(filePath, {
                            end: function (data) { return resolve(new Response(data)); },
                            statusCode: 200
                        });
                    });
                },
                port: port
            });
            console.log("Server is running on http://localhost:".concat(port));
            console.log('main');
            return [2 /*return*/];
        });
    });
}
main();
// import { join } from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import { serve } from "bun";
// import path from "path";
// import { connect_to_livekit } from "./bun-livekit-server.js";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const staticDir = join(__dirname, "static");
// //import Dynamicland from "./DynamicLand.tsx";
// import React from "react";
// import { renderToString } from "react-dom/server";
// import TwitchPlaysPokemonPanel from "./react-server.tsx";
// //rich hickey talks - all favorite blogs - find all devices - export history - script - tailscale - observable-server
// //https://diffusion-policy.cs.columbia.edu/
// // one agent for import demos into repo/archive -> one agent for import demos into obseravable - another agent for magic variables
// const observable_links = {
//   voxels:
//     "https://observablehq.com/embed/@roboticsuniversity/voxels-diffusion-policy-3d?cell=*",
//   //"worrydream": "https://observablehq.com/embed/@roboticsuniversity/worrydream?cell=*",
//   //"dynamicland.org": "https://observablehq.com/embed/@roboticsuniversity/dynamicland.org?cell=*",
//   dynamicland: "https://observablehq.com/embed/@roboticsuniversity/dynamicland?cell=*",
//   "livekit_subscriber": "https://observablehq.com/embed/@roboticsuniversity/livekit?cell=*",
// //  "livekit_subscriber": "https://observablehq.com/embed/@roboticsuniversity/livekit-robotics-tele-guidance?cell=*",
//   alan_how:
//     "https://observablehq.com/embed/@roboticsuniversity/alan-how?cell=*",
//   hardware: "https://observablehq.com/embed/@roboticsuniversity/robotics-hardware?cell=*",
//   prediction:
//     "https://observablehq.com/embed/@roboticsuniversity/3-planning-prediction?cell=*",
//   infra:
//     "https://observablehq.com/embed/@roboticsuniversity/infrastructure-notebook@13?cell=*",
//   democracy:
//     "https://observablehq.com/embed/@roboticsuniversity/collaborative-ui-twitch-plays-robot?cell=*",
//   twitch: TwitchPlaysPokemonPanel,
//   //twitch: "https://observablehq.com/embed/@roboticsuniversity/voxels-diffusion-policy-3d?cell=*",
//   research:
//     "https://observablehq.com/embed/@roboticsuniversity/5000-research-papers?cell=*",
//   //semseg: "https://observablehq.com/embed/@roboticsuniversity/semantic-segmentation-robot?cell=*",
// };
// function stubObservable(name) {
//   return (`
//   <div id="observablehq-fba2beec"></div>
//   <p>Credit: <a href="https://observablehq.com/@roboticsuniversity/dynamicland">DynamicLand by roboticsuniversity</a></p>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
//   <script type="module">
//   import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
//   import define from "https://api.observablehq.com/@roboticsuniversity/dynamicland.js?v=4";
//   new Runtime().module(define, Inspector.into("#observablehq-fba2beec"));
//   </script>`)
// }
// // learn iframes - first
// // learn inspector + runtime 
// // learn react 
// function observable_template(name) {
//   if (name === 'livekit') {
//     return stubObservable(name)
//   }
//   const _ = observable_links[name];
//   if (!_) {
//     return new Error(`No notebook found for ${name}`);
//   }
//   if (typeof _ === "function") {
//     console.log('its a function')
//     return renderToString(React.createElement(_));
//   }
//   return `<h1>${name}</h1><iframe style="background-color: white;" width="100%" height="500" frameborder="0" src="${_}"></iframe>` ;
//   //console.log('name', observable_links[name])
//   const link = observable_links[name];
//   const regex =
//     /https:\/\/observablehq\.com\/embed\/@roboticsuniversity\/collaborative-ui-twitch-plays-robot\?cell=\*/;
//   const idMatch = link.match(/@roboticsuniversity\/([^?]+)/);
//   const id = idMatch ? idMatch[1] : null;
//   if (!id) {
//     return new Error(`Invalid link format for ${name}`);
//   }
//   const js_link = `https://api.observablehq.com/@roboticsuniversity/${id}.js`;
//   return `
//   <div>This is a bun component from robotics-odyssey-backend</div>
//   <div class="observablehq-${id}"></div>
//   <p>Credit: <a href="https://observablehq.com/@roboticsuniversity/${id}">${name}</a></p>
//   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@observablehq/inspector@5/dist/inspector.css">
//   <script type="module">
//   import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
//   import define from "${js_link}";
//   new Runtime().module(define, Inspector.into(".observablehq-${id}"));
//   </script>
//   `;
// }
// const port = 3003;
// const render_everything = async (req) => {
//   const url = req.url;
//   console.log("url", url);
//   const notebook_name = new URL(req.url).pathname.slice(1); //req.url.split("?idk=")[1];
//   let content = "";
//   console.log('notebook_name', notebook_name)
//   if (notebook_name === 'publisher.html') {
//     console.log('publisher.html')
//     content = fs.readFileSync(join(__dirname, '/publisher.html'), 'utf8')
//     return new Response(content, {headers: { "Content-Type": "text/html"}})
//   }
//   if (notebook_name === 'subscriber.html') {
//     console.log('subscriber.html')
//     content = fs.readFileSync(join(__dirname, '/subscriber.html'), 'utf8')
//     return new Response(content, {headers: { "Content-Type": "text/html"}})
//   }
//   // edit language to take safety and humane technolgoy more seriously - kapil
//   if (url.startsWith("http://localhost:3003/static")) {
//     return Bun.file(join(staticDir, url.replace("/static", "")));
//   }
//   //console.log('url', notebook_name === "livekit")
//   //console.log('method', req.method)
//   // make this work for both post + jsonp
//   if (req.method === "GET") {
//     const queryParams = new URLSearchParams(new URL(req.url).search);
//     const params = {};
//     for (const [key, value] of queryParams.entries()) {
//       params[key] = value;
//     }
//     //console.log('Query Parameters:', params);
//     if (notebook_name === "livekit") {
//       //console.log('data', params)
//       const json = await connect_to_livekit(params);
//       //console.log('res', json)
//       return new Response(JSON.stringify(json));
//     }
//   }
//   if (url === "http://localhost:3003/") {
//     content = fs.readFileSync(
//       join(
//         "/Users/shelbernstein/homelab_status_page/views/llama-tools/api_docs.html",
//       ),
//       "utf8",
//     );
//   } else {
//     content = observable_template(notebook_name);
//   }
//   return new Response(content, {
//     headers: {
//       "Content-Type": "text/html",
//     },
//   });
// };
// serve({
//   fetch(req) {
//     return render_everything(req)
//       .then((res) => res)
//       .catch((err) => {
//         console.error(err);
//         return new Response("Error: " + err.message, { status: 500 });
//       });
//   },
//   port: port, // You can change the port if needed
// });
// //console.log(typeof TwitchPlaysPokemonPanel())
// console.log("Bun server is running on http://localhost:" + port);
// //obseravble university
// // uppload diff of notebook - download diff - render automatically - etc
// //Overriding cell values
// //bun run -- update-notebooks
// //creates a jons - observable links
// // run bun script to parse pages and create links
// // all front end componets can use either react or native html/css/js
// //3d react css - lib for obs.
// //https://observablehq.com/@roboticsuniversity/voxels-diffusion-policy-3d
// // : "https://observablehq.com/embed/@roboticsuniversity/voxels-diffusion-policy-3d?cell=*",
// // dynamicland: "https://observablehq.com/embed/@roboticsuniversity/dynamicland?cell=*",
// // livekit: "https://observablehq.com/embed/@roboticsuniversity/livekit-robotics-tele-guidance?cell=*",
// // alan: "https://observablehq.com/embed/@roboticsuniversity/alan-how?cell=*",
// // hardware: "https://observablehq.com/embed/@roboticsuniversity/1-hardware-design-repair?cell=*",
// // prediction: "https://observablehq.com/embed/@roboticsuniversity/3-planning-prediction?cell=*",
// // infra: "https://observablehq.com/embed/@roboticsuniversity/infrastructure-notebook@13?cell=*",
// //livekit: "https://observablehq.com/embed/@roboticsuniversity/livekit-robotics-tele-guidance?cell=*",
