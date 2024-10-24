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
function ObservablePreview() {
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "overflow-hidden", style: { height: "50vh" } }, { children: [(0, jsx_runtime_1.jsx)("iframe", { className: "h-full w-full", src: "http://localhost:3000" }), (0, jsx_runtime_1.jsx)("iframe", { className: "h-full w-full", src: "http://127.0.0.1:3000" })] })));
}
exports["default"] = ObservablePreview;
