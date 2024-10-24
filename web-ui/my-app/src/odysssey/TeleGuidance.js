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
var d3_1 = require("d3"); // Add this import statement
var runtime_js_1 = require("https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js");
var define = await (0, d3_1.require)("https://api.observablehq.com/@roboticsuniversity/livekit.js?v=4");
var define2 = await (0, d3_1.require)("https://api.observablehq.com/@roboticsuniversity/robotics-hardware.js?v=4");
var voxelpainter = await (0, d3_1.require)("https://api.observablehq.com/@roboticsuniversity/alanthree.js?v=4");
var VoxelNotebook = await (0, d3_1.require)("https://api.observablehq.com/@roboticsuniversity/voxels-diffusion-policy-3d@88.js?v=4");
var prediction_planning_notebook = await (0, d3_1.require)("https://api.observablehq.com/@roboticsuniversity/3-planning-prediction.js?v=4");
var observable_titles = [
    {
        title: "Perception Module",
        href: "https://observablehq.com/@roboticsuniversity/livekit"
    },
    {
        title: "Robotics Hardware",
        href: "https://observablehq.com/@roboticsuniversity/robotics-hardware"
    },
    {
        title: "Voxel Painter",
        href: "https://observablehq.com/@roboticsuniversity/alanthree"
    },
    {
        title: "Voxel Notebook",
        href: "https://observablehq.com/@roboticsuniversity/voxels-diffusion-policy-3d"
    },
];
function ObservableTitle(props) {
    return ((0, jsx_runtime_1.jsx)("h1", __assign({ className: "text-white" }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: props.href }, { children: props.title })) })));
}
function MMO_Prediction_Planning(props) {
    var TwitchPlaysPokemonPanelRef = (0, react_1.useRef)();
    var Karpathy_AI_ClassRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var runtime = new runtime_js_1.Runtime();
        runtime.module(prediction_planning_notebook, function (name) {
            //console.log(name);
            if (name === "Twitch_chat")
                return new runtime_js_1.Inspector(TwitchPlaysPokemonPanelRef.current);
            // if (name === "webrtc") return new Inspector(videoRef.current);
            //console.log("twitchplays-robots", TwitchPlaysPokemonPanelRef);
            // if (name === "Karpathy_AI_Class")
            //   return new Inspector(Karpathy_AI_ClassRef.current);
        });
        return function () { return runtime.dispose(); };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-gray-800 text-white p-4 font-mono text-sm bg-slate-900" }, { children: [(0, jsx_runtime_1.jsx)(ObservableTitle, { title: "Prediction Planning", href: "https://observablehq.com/@roboticsuniversity/3-planning-prediction" }), (0, jsx_runtime_1.jsx)("div", { "class": "hidden", ref: TwitchPlaysPokemonPanelRef }), (0, jsx_runtime_1.jsx)("iframe", { width: "560", height: "315", src: "https://www.youtube.com/embed/PaCmpygFfXo?si=pamD56WkBAsJBEPF", title: "YouTube video player", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", referrerpolicy: "strict-origin-when-cross-origin", allowfullscreen: true }), "`"] })));
}
function Perception_Module() {
    var lOGORef = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var runtime = new runtime_js_1.Runtime();
        runtime.module(define, function (name) {
            //console.log(name);
            if (name === "LOGO")
                return new runtime_js_1.Inspector(lOGORef.current);
            // if (name === "webrtc") return new Inspector(videoRef.current);
        });
        return function () { return runtime.dispose(); };
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ObservableTitle, { title: "Perception", href: "https://observablehq.com/@roboticsuniversity/livekit" }), (0, jsx_runtime_1.jsx)("div", { ref: lOGORef })] }));
}
function RoboticsHardware() {
    var viewofModuleNameRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var runtime = new runtime_js_1.Runtime();
        runtime.module(define2, function (name) {
            if (name === "LOGO")
                return new runtime_js_1.Inspector(viewofModuleNameRef.current);
            //console.log(name);
            //if (name === "viewof moduleName") return new Inspector(viewofModuleNameRef.current);
            return [
                "basicRequire",
                "dynamicImport",
                "skypackImport",
                "bundleRun",
                "scavengingForLinks",
                "globalLeaksPattern",
                "pkg",
            ].includes(name);
        });
        return function () { return runtime.dispose(); };
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ObservableTitle, { title: "Hardware", href: "https://observablehq.com/@roboticsuniversity/robotics-hardware" }), (0, jsx_runtime_1.jsx)("div", { ref: viewofModuleNameRef })] }));
}
function VoxelPainter() {
    var pointerAndObjectsRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var runtime = new runtime_js_1.Runtime();
        runtime.module(voxelpainter, function (name) {
            if (name === "pointerAndObjects")
                return new runtime_js_1.Inspector(pointerAndObjectsRef.current);
        });
        return function () { return runtime.dispose(); };
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { ref: pointerAndObjectsRef }) }));
}
function DiffusionVoxelPointCloud() {
    var lOGORef = (0, react_1.useRef)();
    var nOTCHRef = (0, react_1.useRef)();
    var idk = (0, react_1.useRef)();
    // const output_threeRef = useRef();
    var render_the_cavasRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var runtime = new runtime_js_1.Runtime();
        runtime.module(VoxelNotebook, function (name) {
            if (name === "NOTCH")
                return new runtime_js_1.Inspector(nOTCHRef.current);
            if (name === "voxelPainter")
                return new runtime_js_1.Inspector(lOGORef.current);
            if (name === "voxelPainter")
                return new runtime_js_1.Inspector(idk.current);
        });
        return function () { return runtime.dispose(); };
    }, []);
    //import {output_three} from "@roboticsuniversity/voxels-diffusion-policy-3d"
    //return <></>
    // https://github.com/zed-industries/zed
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ObservableTitle, { title: "Simulation + UI", href: "https://observablehq.com/@roboticsuniversity/voxels-diffusion-policy-3d" }), (0, jsx_runtime_1.jsx)(ObservableTitle, { title: "Stixels", href: "https://observablehq.com/@roboticsuniversity/stixels" }), (0, jsx_runtime_1.jsxs)("div", __assign({ "class": "grid grid-cols-2 gap-4" }, { children: [(0, jsx_runtime_1.jsx)("img", { className: "w-48 h-48", src: "https://files.hashirama.blog/derp/static_assets/static/blog/future-city.gif" }), (0, jsx_runtime_1.jsx)("div", { style: { width: "100px", height: "100px" }, ref: nOTCHRef }), (0, jsx_runtime_1.jsx)("div", { "class": "w-4", ref: lOGORef }), (0, jsx_runtime_1.jsx)("div", { "class": "w-4", ref: idk }), (0, jsx_runtime_1.jsx)("img", { src: "https://files.hashirama.blog/voxel.png" })] }))] }));
    // https://files.hashirama.blog/static/blog/animated_gifs/Animated%20GIF%20optimizer.gif
}
function TeleGuidance() {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ "class": "bg-slate-900 p-1" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ "class": "mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ "class": "grid gap-4 lg:grid-cols-2 lg:grid-rows-2" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ "class": "relative" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ "class": "relative overflow-hidden rounded-lg lg:rounded-tl-[2rem] h-[300px]" }, { children: [(0, jsx_runtime_1.jsx)("img", { src: "https://files.hashirama.blog/derp/static_assets/static/blog/zed_sensor.gif", className: "w-48 h-48 object-cover" }), (0, jsx_runtime_1.jsx)("video", { id: "screenshare" }), (0, jsx_runtime_1.jsx)(Perception_Module, {})] })) })), (0, jsx_runtime_1.jsx)("div", __assign({ "class": "relative" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ "class": "relative overflow-hidden rounded-lg lg:rounded-tr-[2rem] h-[300px]" }, { children: (0, jsx_runtime_1.jsx)(MMO_Prediction_Planning, {}) })) })), (0, jsx_runtime_1.jsx)("div", __assign({ "class": "relative" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ "class": "relative overflow-hidden rounded-lg lg:rounded-bl-[2rem] h-[300px]" }, { children: (0, jsx_runtime_1.jsx)(RoboticsHardware, {}) })) })), (0, jsx_runtime_1.jsx)("div", __assign({ "class": "relative" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ "class": "relative overflow-hidden rounded-lg lg:rounded-br-[2rem] h-[300px]" }, { children: (0, jsx_runtime_1.jsx)(DiffusionVoxelPointCloud, {}) })) }))] })) })) })));
}
// "The less confident you are, the more serious you have to act."
//"“At every period of history, people have believed things that were just ridiculous, and believed them so strongly that you risked ostracism or even violence by saying otherwise. If our own time were any different, that would be remarkable. As far as I can tell it isn't.”"
var pg = "\u201CLet's start with a test: Do you have any opinions that you would be reluctant to express in front of a group of your peers?\n\nIf the answer is no, you might want to stop and think about that. If everything you believe is something you're supposed to believe, could that possibly be a coincidence? Odds are it isn't. Odds are you just think whatever you're told.\u201D";
exports["default"] = TeleGuidance;
//yarn add "https://api.observablehq.com/@observablehq/module-require-debugger.tgz?v=3"
//bun add "https://api.observablehq.com/@roboticsuniversity/livekit.tgz?v=3"
//import notebook16 from "@roboticsuniversity/dynamicland";
//import notebook8 from "@roboticsuniversity/agent-dashboard";
// prompt - make a puzzle peiece in css
//import TeleGuidanceFrame from './TeleGuidanceFrame';
// import json from './example.json'
// const modules = import.meta.glob('./dir/*.js')
// import init from './example.wasm?init'
// https://v3.vitejs.dev/guide/using-plugins.html
// /Users/shelbernstein/homelab_status_page/views/odyssey/human_robot.txt
//const TwitchPlaysPokemonPanel = React.lazy(() => import("./TwitchPlaysPokemonPanel"));
// import notebook4 from "@roboticsuniversity/3-planning-prediction";
// import notebook5 from "@roboticsuniversity/collaborative-ui-twitch-plays-robot";
// import notebook6 from "@roboticsuniversity/dynamicland";
// import notebook7 from "@roboticsuniversity/alan_how";
// import notebook8 from "@roboticsuniversity/5000-research-papers";
// import notebook9 from "@roboticsuniversity/infrastructure-notebook";
// import notebook10 from "@roboticsuniversity/collaborative-ui-twitch-plays-robot";
// import notebook11 from "@roboticsuniversity/dynamicland";
// import notebook12 from "@roboticsuniversity/alan_how";
// import notebook13 from "@roboticsuniversity/5000-research-papers";
// import notebook14 from "@roboticsuniversity/infrastructure-notebook";
var get_links = function () {
    return $$(".listing-grid > * ").map(function (_) { return _.firstElementChild.querySelector("a").href; });
};
var list_of_links = [
    "https://observablehq.com/@roboticsuniversity/5000-research-papers?collection=@roboticsuniversity/robotics-odyssey",
    "https://observablehq.com/@roboticsuniversity/infrastructure-notebook?collection=@roboticsuniversity/robotics-odyssey",
    "https://observablehq.com/@roboticsuniversity/collaborative-ui-twitch-plays-robot?collection=@roboticsuniversity/robotics-odyssey",
    "https://observablehq.com/@roboticsuniversity/dynamicland?collection=@roboticsuniversity/robotics-odyssey",
    "https://observablehq.com/@roboticsuniversity/livekit?collection=@roboticsuniversity/robotics-odyssey",
    "https://observablehq.com/@roboticsuniversity/alan_how?collection=@roboticsuniversity/robotics-odyssey",
    "https://observablehq.com/@roboticsuniversity/robotics-hardware?collection=@roboticsuniversity/robotics-odyssey",
    "https://observablehq.com/@roboticsuniversity/3-planning-prediction?collection=@roboticsuniversity/robotics-odyssey",
    "https://observablehq.com/@roboticsuniversity/voxels-diffusion-policy-3d?collection=@roboticsuniversity/robotics-odyssey",
];
