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
var runtime_1 = require("@observablehq/runtime");
var dynamicland_1 = require("@roboticsuniversity/dynamicland");
var react_1 = require("react");
function Dynamicland() {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var runtime = new runtime_1.Runtime();
        runtime.module(dynamicland_1["default"], runtime_1.Inspector.into(ref.current));
        return function () { return runtime.dispose(); };
        p;
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { ref: ref }), (0, jsx_runtime_1.jsxs)("p", { children: ["Credit: ", (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://observablehq.com/@roboticsuniversity/dynamicland" }, { children: "DynamicLand by roboticsuniversity" }))] })] }));
}
exports["default"] = Dynamicland;
