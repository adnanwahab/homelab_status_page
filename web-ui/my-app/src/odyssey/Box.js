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
var d3 = require("d3");
require("./demon-mirror-wall.css");
// In a Vite project, you can import non-JS/TS files like markdown using the `import.meta.glob` or similar methods.
// However, since we can't actually perform file imports here, I'll simulate this by creating a component that 
// represents the readme content.
//import readmeContent from '../../readme.md'; // This is how you might import in a Vite setup
function ReadmeInfo() {
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "p-4 bg-gray-100 rounded-md" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-lg font-bold" }, { children: "Robotics-Odyssey.com" })), (0, jsx_runtime_1.jsx)("p", { children: readmeContent })] })));
}
// import * as THREE from 'three';
var three = {};
var size = 48;
function PeriodicTable() {
    return (0, jsx_runtime_1.jsx)("div", { className: "bg-red-100 w-".concat(size, " h-").concat(size) });
}
function Hafu() {
    (0, jsx_runtime_1.jsx)("img", { src: "/static/reflections.png" });
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ "class": "scene" }, { children: [(0, jsx_runtime_1.jsx)("div", { "class": "mirror" }), (0, jsx_runtime_1.jsx)("div", { "class": "mirror" }), (0, jsx_runtime_1.jsx)("div", { "class": "mirror" }), (0, jsx_runtime_1.jsx)("div", { "class": "mirror" }), (0, jsx_runtime_1.jsx)("div", { "class": "mirror" }), (0, jsx_runtime_1.jsx)("div", { "class": "mirror" }), (0, jsx_runtime_1.jsx)("div", { "class": "mirror" }), (0, jsx_runtime_1.jsx)("div", { "class": "mirror" })] })) });
    //    <div className={`bg-green-100 w-${size} h-${size}`}></div>
}
// https://www.youtube.com/watch?v=lX6JcybgDFo
function BotNDolly() {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-blue-100 w-".concat(size, " h-").concat(size) }, { children: (0, jsx_runtime_1.jsx)("iframe", { width: "560", height: "315", src: "https://www.youtube.com/embed/lX6JcybgDFo?si=MGWz9S046-TL9I1W", title: "YouTube video player", frameBorder: "0" // Corrected to camelCase
            , allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", referrerPolicy: "strict-origin-when-cross-origin" // Corrected to camelCase
            , allowFullScreen // Corrected to camelCase
            : true }) })));
}
function _() {
    return (0, jsx_runtime_1.jsx)("div", { className: "bg-slate-100 w-".concat(size, " h-").concat(size) });
}
// https://www.youtube.com/watch?v=SE1A0Ll9omc
// xyzw
function Box() {
    var elements = d3.shuffle([
        // <PeriodicTable />,
        // <Hafu />,
        (0, jsx_runtime_1.jsx)(BotNDolly, {}, "botndolly"),
        // <_ />,
        // <ReadmeInfo />
    ]);
    return (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex flex-wrap " }, { children: elements }));
    //   return <div className="bg-red-100 w-96 h-96">
    //     <div className="bg-blue-500 w-48 h-48">
    //     <div>
    // top 3 uses className
    // 1. cleaning up the house
    // 2. feeding stray animals 
    // 3. buidling dynamicland
    // 4. vote here for more new usescases 
    //             </div>
    // //     </div>
    //   </div>;
}
exports["default"] = Box;
