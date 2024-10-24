"use strict";
exports.__esModule = true;
var jsx_runtime_1 = require("hono/jsx/jsx-runtime");
var TwitchPlaysPokemonPanel_1 = require("../src/TwitchPlaysPokemonPanel");
function TeleGuidanceFrame(props) {
    var src = props.link;
    if (typeof src === 'function') {
        console.log("returning twitch pane");
        return (0, jsx_runtime_1.jsx)(TwitchPlaysPokemonPanel_1["default"], {});
    }
    console.log("returning iframe", src);
    //src = "https://observablehq.com/embed/@roboticsuniversity/alan-how?cell=*"
    return ((0, jsx_runtime_1.jsx)("iframe", { style: { backgroundColor: 'white' }, className: "h-80 object-cover object-left w-full", src: src }));
}
exports["default"] = TeleGuidanceFrame;
