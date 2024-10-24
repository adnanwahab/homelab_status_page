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
//import notebook from "@roboticsuniversity/alan_how";
//import notebook2 from "@roboticsuniversity/dynamicland";//"@roboticsuniversity/voxels-diffusion-policy-3d";
// analyze seinfeild - cant be constant comedy - some boring parts -- watch youtube -with vonnegut annotaion - tvroeps is a datum
// kapil gupta was a doctor who discovered presiciptriosn were like sledge hammers for yuor neurons - AUC - attia + sapolsky -> 
// https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
var react_1 = require("react");
var d3_min_js_1 = require("https://cdn.jsdelivr.net/npm/d3@7.4.4/dist/d3.min.js");
var notebook = d3_min_js_1.d3.require("https://api.observablehq.com/@roboticsuniversity/alan_how.js?v=4");
var define = d3_min_js_1.d3.require("https://api.observablehq.com/@roboticsuniversity/dynamicland.js?v=4");
var runtime_js_1 = require("https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js");
d3_min_js_1.d3.require();
var AlanHow = function () {
    var viewofModuleNameRef = (0, react_1.useRef)();
    var viewofModuleNameRef2 = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var runtime = new runtime_js_1.Runtime();
        runtime.module(notebook, function (name) {
            if (name === "Complex_Systems")
                return new runtime_js_1.Inspector(viewofModuleNameRef.current);
            if (name === "change_in_groups")
                return new runtime_js_1.Inspector(viewofModuleNameRef2.current);
            return ["basicRequire", "dynamicImport", "skypackImport", "bundleRun", "scavengingForLinks", "globalLeaksPattern", "pkg"].includes(name);
        });
        return function () { return runtime.dispose(); };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-slate-900 p-4" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "text-white" }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://observablehq.com/@roboticsuniversity/alan_how" }, { children: "Alan Kay how?" })) })), (0, jsx_runtime_1.jsx)("div", { ref: viewofModuleNameRef }), (0, jsx_runtime_1.jsx)("div", { ref: viewofModuleNameRef2 })] })));
};
function DynamicLand() {
    var viewofModuleNameRef = (0, react_1.useRef)();
    var viewofModuleNameRef2 = (0, react_1.useRef)();
    var viewofModuleNameRef3 = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var runtime = new runtime_js_1.Runtime();
        runtime.module(define, function (name) {
            if (name === "staticDynamicland")
                return new runtime_js_1.Inspector(viewofModuleNameRef.current);
            if (name === "Seeing_space")
                return new runtime_js_1.Inspector(viewofModuleNameRef2.current);
            if (name === "ladder_")
                return new runtime_js_1.Inspector(viewofModuleNameRef3.current);
            return ["basicRequire", "dynamicImport", "skypackImport", "bundleRun", "scavengingForLinks", "globalLeaksPattern", "pkg"].includes(name);
        });
        return function () { return runtime.dispose(); };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-slate-900 p-4" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "text-white" }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://observablehq.com/@roboticsuniversity/dynamicland" }, { children: "Seeing Space = dynamicland" })) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "grid grid-cols-2 gap-4" }, { children: [(0, jsx_runtime_1.jsx)("div", { ref: viewofModuleNameRef2, className: "overflow-auto" }), (0, jsx_runtime_1.jsx)("div", { ref: viewofModuleNameRef, className: "overflow-auto" }), (0, jsx_runtime_1.jsx)("div", { ref: viewofModuleNameRef3, className: "overflow-auto" })] }))] })));
}
function DynamicHow() {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-slate-900 p-4" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "grid gap-4 lg:grid-cols-2 lg:grid-rows-1" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 rounded-lg bg-white lg:rounded-l-[2rem]" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "relative overflow-hidden rounded-lg lg:rounded-l-[2rem] h-[500px]" }, { children: (0, jsx_runtime_1.jsx)(AlanHow, {}) }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 rounded-lg bg-white lg:rounded-r-[2rem]" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "relative overflow-hidden rounded-lg lg:rounded-r-[2rem] h-[500px]" }, { children: (0, jsx_runtime_1.jsx)(DynamicLand, {}) }))] }))] })) })) })));
}
exports["default"] = DynamicHow;
