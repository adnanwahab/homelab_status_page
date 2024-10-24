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
exports.__esModule = true;
var jsx_runtime_1 = require("hono/jsx/jsx-runtime");
var react_1 = require("react");
var OdysseyIntro = function () { };
var Footer_jsx_1 = require("./odysssey/Footer.jsx");
//import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
//import define from "https://api.observablehq.com/@observablehq/hello-world.js?v=4";
var sisterschools_js_1 = require("./odysssey/sisterschools.js");
//const  OdysseyIntro  =  require('https://files.hashirama.blog/homelab_status_page/web-ui/my-app/src/odysssey/OdysseyIntro.ts');
//import   OdysseyIntro  from 'homelaodysssey/OdysseyIntro.ts'
function LLamaCell(props) {
    var src = props.src;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("iframe", { width: "100%", height: "500", frameborder: "0", src: src }) }));
}
function LlamaGrid() {
    // https://observablehq.com/@roboticsuniversity/perception
    // <iframe width="100%" height="500" frameborder="0"
    // src="h"></iframe> 
    // <iframe width="100%" height="500" frameborder="0"
    // src="https://observablehq.com/embed/@roboticsuniversity/simulation?cell=*&banner=false"></iframe>
    var urls = [
        "https://observablehq.com/embed/@roboticsuniversity/perception?cell=*&banner=false",
        "https://observablehq.com/embed/@roboticsuniversity/prediction@106?cell=*",
        "https://observablehq.com/embed/@roboticsuniversity/simulation?cell=*&banner=false",
        "https://observablehq.com/embed/@roboticsuniversity/dynamical-systems-xerox-parc-dynamicland?cell=*&banner=false",
    ];
    console.log(urls);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mt-10 grid grid-cols-2 gap-4 sm:mt-16 lg:grid-cols-6 grid-rows-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative lg:col-span-2" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]" }, { children: (0, jsx_runtime_1.jsx)(LLamaCell, { src: urls[0] }) }))] })), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative col-span-2" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]" }, { children: (0, jsx_runtime_1.jsx)(LLamaCell, { src: urls[1] }) })), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative col-span-2" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]" }, { children: (0, jsx_runtime_1.jsx)(LLamaCell, { src: urls[2] }) })), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative col-span-6" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-px rounded-lg bg-white" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]" }, { children: (0, jsx_runtime_1.jsx)(LLamaCell, { src: urls[3] }) })), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" })] }))] })) })) })));
}
function RoboticsOdyssey() {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "dark" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "text-gray-950 antialiased bg-slate-900" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "overflow-hidden flex justify-center items-center min-h-screen" }, { children: (0, jsx_runtime_1.jsxs)("main", { children: [(0, jsx_runtime_1.jsx)(sisterschools_js_1["default"], {}), (0, jsx_runtime_1.jsx)(Footer_jsx_1["default"], {})] }) })) })) })));
}
// magic proxy + es6 proxy iframe --> 500 notebooks - being inscribed to and imbued with --- acutally anything --- 2x fly.io gpu for 
//$1000 for on-demand rendering + used compute for 200k llama-requests to refine notebook + hand edit for 10 hours a day for 10 days 
/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
//</link>import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
// import define from "https://api.observablehq.com/@roboticsuniversity/agent-dashboard@77.js?v=4&api_key=d656d272d7f07743922b44815d2905265f91507b";
function UseDirectImport() {
    var ref = (0, react_1.useRef)();
    var runtime = new Runtime().module(define, function (name) {
        if (name === "viewof table")
            return new Inspector(ref);
    });
    return (0, jsx_runtime_1.jsx)("div", { ref: ref });
}
exports["default"] = RoboticsOdyssey;
