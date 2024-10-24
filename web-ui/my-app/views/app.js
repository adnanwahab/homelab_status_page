"use strict";
exports.__esModule = true;
var jsx_runtime_1 = require("hono/jsx/jsx-runtime");
var react_dom_1 = require("react-dom");
var robotics_odyssey_tsx_1 = require("../views/odyssey/robotics-odyssey.tsx");
function App() {
    return ((0, jsx_runtime_1.jsx)(robotics_odyssey_tsx_1["default"], {}));
}
react_dom_1["default"].render((0, jsx_runtime_1.jsx)(App, {}), document.getElementById('app'));
