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
//<svg class="docker_logo " id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2334.44 537.22"><defs><style>.cls-1 { fill: #1d63ed; stroke-width: 0px; }</style></defs>
//</g></svg>
var Docker_logo = "m664.01,223.35c-16.55-11.14-60.03-15.89-91.64-7.38-1.7-31.49-17.94-58.03-47.65-81.17l-10.99-7.38-7.33,11.07c-14.4,21.86-20.47,51-18.33,77.49,1.7,16.32,7.37,34.66,18.33,47.97-41.15,23.87-79.07,18.45-247.03,18.45H.06c-.76,37.93,5.34,110.88,51.73,170.27,5.12,6.56,10.74,12.91,16.84,19.02,37.72,37.77,94.71,65.47,179.93,65.54,130,.12,241.39-70.16,309.15-240.07,22.3.37,81.15,3.99,109.95-51.66.7-.94,7.33-14.76,7.33-14.76l-10.98-7.38Zm-494.72-39.14h-72.92v72.92h72.92v-72.92Zm94.21,0h-72.92v72.92h72.92v-72.92Zm94.21,0h-72.92v72.92h72.92v-72.92Zm94.21,0h-72.92v72.92h72.92v-72.92Zm-376.82,0H2.16v72.92h72.92v-72.92Zm94.21-92.11h-72.92v72.92h72.92v-72.92Zm94.21,0h-72.92v72.92h72.92v-72.92Zm94.21,0h-72.92v72.92h72.92v-72.92ZM357.7,0h-72.92v72.92h72.92V0Z\"></path><g><path class=\"cls-1\" d=\"m2329.93,424.7c0,18.94-14.87,33.81-34.21,33.81s-34.42-14.87-34.42-33.81,15.27-33.4,34.42-33.4,34.21,14.87,34.21,33.4Zm-60.08,0c0,14.87,11,26.68,26.07,26.68s25.46-11.81,25.46-26.47-10.8-26.89-25.65-26.89-25.87,12.02-25.87,26.68Zm20.58,17.52h-7.74v-33.4c3.04-.61,7.33-1.02,12.82-1.02,6.32,0,9.16,1.02,11.61,2.45,1.84,1.42,3.26,4.07,3.26,7.33,0,3.67-2.85,6.52-6.91,7.74v.41c3.24,1.21,5.08,3.66,6.1,8.14,1.01,5.09,1.62,7.13,2.45,8.35h-8.35c-1.02-1.22-1.64-4.27-2.65-8.15-.61-3.66-2.65-5.29-6.93-5.29h-3.66v13.45Zm.2-18.94h3.66c4.28,0,7.74-1.42,7.74-4.88,0-3.06-2.23-5.11-7.13-5.11-2.03,0-3.46.21-4.27.43v9.56Z\"></path><path class=\"cls-1\" d=\"m1017.65,86.68c-4.79-4.68-10.54-7.06-17.43-7.06s-12.81,2.38-17.42,7.06c-4.62,4.68-6.88,10.68-6.88,17.83v119.4c-23.7-19.59-51.05-29.47-82.16-29.47-36.16,0-67.08,13.06-92.7,39.27-25.62,26.12-38.34,57.72-38.34,94.78s12.81,68.57,38.34,94.78c25.62,26.12,56.46,39.27,92.7,39.27s66.74-13.06,92.7-39.27c25.62-25.86,38.34-57.45,38.34-94.78V104.5c0-7.15-2.35-13.15-7.15-17.83Zm-48.18,274.11v.18c-4.27,10.15-10.11,19.06-17.51,26.65-7.4,7.68-16.12,13.68-26.05,18.18-10.02,4.5-20.65,6.71-32.06,6.71s-22.3-2.21-32.32-6.71c-10.02-4.5-18.65-10.5-25.96-18.09-7.32-7.59-13.15-16.5-17.42-26.65-4.27-10.24-6.45-21.09-6.45-32.57s2.18-22.33,6.45-32.57c4.27-10.24,10.11-19.06,17.42-26.65,7.32-7.59,16.03-13.59,25.96-18.09,10.02-4.5,20.74-6.71,32.32-6.71s22.04,2.21,32.06,6.71c10.02,4.5,18.65,10.5,26.05,18.18,7.4,7.68,13.24,16.59,17.51,26.65,4.27,10.15,6.45,20.92,6.45,32.39s-2.18,22.33-6.45,32.39Z\"></path><path class=\"cls-1\" d=\"m2100.26,277.04c-6.36-15.89-16.05-30.27-28.76-43.16l-.17-.09c-25.88-26.12-56.82-39.27-92.7-39.27s-67.09,13.06-92.71,39.27c-25.62,26.12-38.33,57.72-38.33,94.78s12.81,68.57,38.33,94.78c25.62,26.12,56.47,39.27,92.71,39.27,32.92,0,61.41-10.85,85.64-32.56,4.69-4.94,7.06-10.94,7.06-17.92s-2.26-13.15-6.89-17.83c-4.61-4.68-10.45-7.06-17.42-7.06-6.09.18-11.5,2.21-16.11,6.27-7.32,6.35-15.25,11.21-23.87,14.39-8.63,3.18-18.04,4.77-28.31,4.77-9.07,0-17.78-1.41-26.05-4.32-8.29-2.91-16.03-6.89-22.92-12.09-6.98-5.21-12.98-11.38-18.12-18.71-5.14-7.24-9.06-15.27-11.67-24.09h185.32c6.87,0,12.62-2.38,17.42-7.06,4.8-4.68,7.15-10.68,7.15-17.83,0-18.53-3.24-35.74-9.58-51.54Zm-200.48,26.65c2.53-8.74,6.36-16.77,11.5-24.09,5.15-7.24,11.24-13.5,18.21-18.71,7.06-5.21,14.72-9.18,23.17-12.09,8.44-2.91,17.06-4.32,25.97-4.32s17.51,1.41,25.86,4.32c8.37,2.91,16.05,6.88,22.92,12.09,6.98,5.21,13.07,11.38,18.21,18.71,5.22,7.24,9.16,15.27,11.86,24.09h-157.71Z\"></path><path class=\"cls-1\" d=\"m2327.99,211.29c-4.36-4.32-9.85-7.68-16.47-10.15-6.62-2.47-13.85-4.15-21.78-5.12-7.84-.97-15.25-1.41-22.12-1.41-15.61,0-30.24,2.56-44,7.68-13.77,5.12-26.49,12.44-38.17,21.97v-4.76c0-6.88-2.35-12.71-7.15-17.56-4.78-4.85-10.45-7.32-17.15-7.32s-12.64,2.47-17.42,7.32c-4.8,4.85-7.15,10.77-7.15,17.56v218.25c0,6.88,2.35,12.71,7.15,17.56,4.78,4.85,10.53,7.32,17.42,7.32s12.45-2.47,17.15-7.32c4.8-4.85,7.15-10.77,7.15-17.56v-109.17c0-11.65,2.18-22.59,6.45-32.83,4.27-10.24,10.11-19.06,17.51-26.65,7.42-7.59,16.13-13.59,26.05-17.92,10.02-4.41,20.66-6.62,32.08-6.62s22.2,2.03,32.06,6c3.91,1.77,7.32,2.65,10.28,2.65,3.4,0,6.62-.62,9.58-1.94,2.96-1.32,5.58-3.09,7.76-5.38,2.18-2.29,3.91-4.94,5.22-8.03,1.31-3,2.01-6.27,2.01-9.8,0-6.88-2.18-12.44-6.53-16.77h.08Z\"></path><path class=\"cls-1\" d=\"m1304.98,277.12c-6.36-15.8-15.86-30.27-28.66-43.33-25.87-26.12-56.8-39.27-92.7-39.27s-67.08,13.06-92.7,39.27c-25.62,26.12-38.33,57.72-38.33,94.78s12.81,68.57,38.33,94.78c25.62,26.12,56.46,39.27,92.7,39.27s66.74-13.06,92.7-39.27c25.62-25.86,38.34-57.45,38.34-94.78-.18-18.53-3.4-35.65-9.67-51.45Zm-45.65,83.66v.18c-4.27,10.15-10.11,19.06-17.51,26.65-7.4,7.68-16.12,13.68-26.05,18.18-9.93,4.5-20.65,6.71-32.06,6.71s-22.3-2.21-32.32-6.71c-10.02-4.5-18.65-10.5-25.96-18.09-7.32-7.59-13.15-16.5-17.42-26.65-4.27-10.24-6.45-21.09-6.45-32.57s2.18-22.33,6.45-32.57c4.27-10.24,10.11-19.06,17.42-26.65,7.32-7.59,16.03-13.59,25.96-18.09,10.02-4.5,20.74-6.71,32.32-6.71s22.04,2.21,32.06,6.71c10.02,4.5,18.65,10.5,26.05,18.18,7.4,7.68,13.24,16.59,17.51,26.65,4.27,10.15,6.45,20.92,6.45,32.39s-2.18,22.33-6.45,32.39Z\"></path><path class=\"cls-1\" d=\"m1829.11,219.41c0-3.35-.7-6.53-2-9.53-1.31-3-3.05-5.73-5.23-8.03-2.18-2.29-4.79-4.15-7.75-5.38-2.96-1.23-6.18-1.94-9.58-1.94-4.88,0-9.24,1.24-13.07,3.8l-139.92,93.11V104.68c0-7.06-2.35-12.97-7.14-17.83-4.79-4.85-10.45-7.32-17.16-7.32s-12.63,2.47-17.43,7.32c-4.79,4.85-7.14,10.77-7.14,17.83v332.71c0,6.88,2.35,12.8,7.14,17.74,4.79,4.94,10.54,7.41,17.43,7.41s12.46-2.47,17.16-7.41c4.79-4.94,7.14-10.86,7.14-17.74v-86.4l28.58-19.15,108.12,124.17c4.36,4.32,9.85,6.44,16.38,6.44,3.4,0,6.62-.62,9.58-1.94,2.96-1.24,5.58-3.09,7.75-5.38,2.18-2.29,3.92-4.94,5.23-8.03,1.31-3,2-6.27,2-9.53,0-6.53-2.26-12.36-6.8-17.47l-100.63-115.87,98.01-65.13c6.27-4.32,9.32-10.94,9.32-19.86v.18Z\"></path><path class=\"cls-1\" d=\"m1414.85,269.09c7.49-7.59,16.21-13.59,26.23-17.92,10.02-4.41,20.65-6.62,32.06-6.62,10.28,0,19.78,1.77,28.58,5.29,8.71,3.53,17.08,8.74,25,15.53,4.7,3.79,10.02,5.73,15.94,5.73,7.06,0,12.81-2.38,17.43-7.15,4.62-4.77,6.88-10.77,6.88-17.92s-2.79-13.77-8.45-18.88c-24.05-21.71-52.53-32.57-85.38-32.57-36.16,0-67.08,13.06-92.7,39.27-25.62,26.12-38.33,57.72-38.33,94.78s12.81,68.57,38.33,94.78c25.62,26.12,56.46,39.27,92.7,39.27,32.76,0,61.25-10.85,85.38-32.57,5.14-5.29,7.76-11.38,7.76-18.44s-2.27-13.15-6.88-17.83c-4.62-4.68-10.45-7.06-17.42-7.06-5.92.18-11.07,1.94-15.42,5.29-7.84,6.88-16.03,12-24.83,15.44-8.71,3.44-18.21,5.12-28.58,5.12-11.41,0-22.04-2.21-32.06-6.62-10.02-4.41-18.73-10.41-26.23-17.91-7.49-7.5-13.42-16.5-17.69-26.65-4.27-10.24-6.45-21.18-6.45-32.83s2.18-22.59,6.45-32.83c4.27-10.24,10.19-19.06,17.69-26.65v-.09Z";
function Pricing() {
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ "class": "bg-gray-800 text-white p-8 flex-auto" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ "class": "text-xl font-bold mb-4" }, { children: "45 Hours of Free Content to learn how to build your own Robot" })), (0, jsx_runtime_1.jsxs)("div", __assign({ "class": "flex space-x-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ "class": "flex flex-col items-center" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ "class": "bg-gray-700 p-4 rounded-full" }, { children: (0, jsx_runtime_1.jsx)("img", { width: "25px", src: "https://i1.sndcdn.com/artworks-000658049383-bs9n5k-t500x500.jpg" }) })), (0, jsx_runtime_1.jsx)("span", __assign({ "class": "mt-2" }, { children: "$25 buy once" }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ "class": "flex flex-col items-center" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ "class": "bg-gray-700 p-4 rounded-full" }, { children: (0, jsx_runtime_1.jsxs)("svg", __assign({ "class": "__rptl-header-logo", "aria-hidden": "true", focusable: "false", height: "44", width: "100", viewBox: "0 0 141 128", xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-labelledby": "__rptl-header-logo" }, { children: [(0, jsx_runtime_1.jsx)("title", __assign({ id: "__rptl-header-logo" }, { children: "Raspberry Pi" })), (0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsx)("path", { d: "M99.9 73.5c-.6-5.9-3.2-11.2-7-13.9-.7-2.4-1.8-4.5-3.2-6.3-.2-2.8-1.4-8.2-6.9-13 .6-.5 1.2-1.2 1.6-1.9 4.6-2 7.8-6.3 8.2-9.5 2.4-2.4 3.8-5.3 4-8.2.1-1.4-.2-2.6-.7-3.7 2-2.2 2.7-4.8 1.8-7.2-1.4-4-6.2-6.5-12.6-6.8-1.7-1.6-4.1-2.4-7-2.4-1.2 0-2.5.2-3.8.5-1-.5-2.3-.8-3.7-.8-2.4 0-5.1.7-7.1 1.9-.4-.2-.6-.2-.9-.2-3.2 0-6.4 2.2-8 3.5-1.6 1.3-3.1 2.8-4.2 4.4-1.2-1.6-2.6-3.1-4.2-4.4-1.6-1.3-4.8-3.5-8-3.5-.3 0-.6 0-.9.1C35.3.9 32.6.2 30.2.2c-1.4 0-2.7.3-3.7.8-1.3-.3-2.6-.5-3.8-.5-2.9 0-5.3.8-7 2.4-6.4.3-11.2 2.8-12.6 6.8-.9 2.5-.2 5.1 1.8 7.2-.5 1.1-.8 2.3-.7 3.7.1 2.9 1.5 5.8 4 8.2.4 3.2 3.6 7.5 8.2 9.5.4.8 1 1.4 1.6 1.9-5.5 4.8-6.7 10.2-6.9 13-1.5 1.8-2.6 3.9-3.2 6.3-3.8 2.8-6.4 8-7 13.9-.6 5.9 1 11.4 4.3 14.8.4 2.6 2 6.1 3.6 8.2.3 4.5 2.2 8.8 5.4 12.4 3.2 3.6 7.4 6.1 11.9 7 2.7 2.5 5.6 4.3 9.5 5.9 1.7 1.7 6.6 5.8 14.9 5.8s13.2-4.1 14.9-5.8c3.9-1.6 6.8-3.3 9.5-5.9 4.5-.9 8.7-3.4 11.9-7 3.2-3.6 5.1-8 5.4-12.4 1.6-2.1 3.1-5.6 3.6-8.2 3-3.4 4.7-8.9 4.1-14.7Zm-22.2-18c-3.9-2.1-7.6-5.2-10.3-8.7-3.7-4.4-1.3-6.4 4.5-5.3 4.3 1.1 8.5 4.5 10.2 8.6 2.2 5.6.6 8.2-4.4 5.4ZM62.4 8.6c.3-.1.7.2.6.5-.2 1.5.8 1.3 1 1.1 2.4-3 4.9-3.6 7.2-3.4.4 0 .6.5.3.8-.9 1.3.1 1.6.4 1.3 3.7-2.3 7.2-2.3 8.5-1.3.3.2.3.6 0 .8-1.4 1.2-.6 1.7-.1 1.6 3.7-1.3 8.9-.2 10.7 1.4.2.2.2.6 0 .8-2.3 2-3.4 3.6-3.9 6.8-.1.9 1.4.7 2 .5.3-.1.6.2.6.5.1 2.1-2 4.5-5 6.5-.4.3-.3.9.6.9.4 0 .6.4.4.8-1.1 2-2.5 3.9-7.5 5.2-.5.1-.5.8-.1 1 .4.2.4.6.2.9-5 4.3-17.6 2.6-19.2-4.6 0-.1 0-.3.1-.4 3-4 9.9-11.8 20.9-15.9.4-.2.3-.8-.2-.8-10.5 1.5-18 7.4-22.6 13.6-.2.2-.4.3-.7.1-8-4.2-1.4-16.5 5.8-18.7Zm-12 31.9c1.6 0 5.6.1 9.8 3.4 7 5.8-1 10-9.8 10s-16.8-4.1-9.8-10c4.2-3.3 8.2-3.4 9.8-3.4ZM14.9 28.2c-.2-.3 0-.7.4-.8.9 0 1-.7.6-.9-3-2-5.1-4.4-5-6.5 0-.3.3-.6.6-.5.6.2 2.1.3 2-.5-.5-3.2-1.6-4.8-3.9-6.8-.2-.2-.2-.6 0-.8 1.8-1.5 7-2.7 10.7-1.4.5.2 1.2-.4-.1-1.6-.2-.2-.2-.6 0-.8 1.3-1 4.9-1 8.5 1.3.4.2 1.3 0 .4-1.3-.2-.3-.1-.8.3-.8 2.3-.2 4.8.5 7.2 3.4.2.3 1.1.5 1-1.1 0-.4.3-.6.6-.5 7.2 2.2 13.8 14.5 5.7 18.7-.2.1-.5.1-.7-.1-4.4-6.2-11.8-12.1-22.5-13.7-.5-.1-.6.6-.2.8 11 4.1 17.9 11.9 20.9 15.9.1.1.1.3.1.4-1.6 7.2-14.2 8.9-19.2 4.6-.3-.2-.3-.7.2-.9.4-.2.4-.8-.1-1-5-1.3-6.4-3.1-7.5-5.1Zm3.6 21.9c1.8-4.1 5.9-7.5 10.2-8.6 5.8-1.1 8.2.9 4.5 5.3-2.8 3.4-6.4 6.5-10.3 8.7-4.8 2.8-6.4.2-4.4-5.4ZM8.4 80.8c-1.6-4.2-1.2-9.4 1.2-13.4 2.6-4.4 5.2-4.2 6.2-.5 1.3 4.9.8 10.8-1.4 15.5-1.9 3.8-4.3 2.5-6-1.6Zm18.7 28.6c-6.2-1.3-11.5-7.6-11.8-14 1-22.6 33.7 17.9 11.8 14Zm.7-28.3c-5.5-3.2-6.9-10.9-3.2-17.3s11.1-9 16.6-5.9c5.5 3.2 6.9 10.9 3.2 17.3-3.7 6.5-11.2 9.1-16.6 5.9Zm31.7 37c-2.6 1.9-5.7 3-9.1 3-3.4 0-6.6-1.1-9.1-3-5.4-3.8 0-8.1 9.1-8.1s14.5 4.3 9.1 8.1Zm-9.1-13.8c-7 0-12.7-4.9-12.7-10.9s5.7-10.9 12.7-10.9c7 0 12.7 4.9 12.7 10.9s-5.7 10.9-12.7 10.9Zm6-29c-3.7-6.4-2.2-14.2 3.2-17.3 5.5-3.2 12.9-.5 16.6 5.9 3.7 6.4 2.2 14.2-3.2 17.3-5.5 3.1-12.9.5-16.6-5.9Zm17.2 34.1c-21.9 3.9 10.8-36.7 11.8-14-.2 6.4-5.5 12.7-11.8 14Zm18.8-28.6c-1.7 4.1-4.1 5.4-6.1 1.6-2.2-4.6-2.7-10.5-1.4-15.5 1-3.7 3.7-3.9 6.2.5 2.5 4 2.9 9.1 1.3 13.4Z", id: "a" }) }), (0, jsx_runtime_1.jsxs)("g", __assign({ fill: "none", "fill-rule": "evenodd" }, { children: [(0, jsx_runtime_1.jsx)("mask", __assign({ id: "b", fill: "#fff" }, { children: (0, jsx_runtime_1.jsx)("use", { "xlink:href": "#a" }) })), (0, jsx_runtime_1.jsxs)("g", __assign({ mask: "url(#b)", "fill-rule": "nonzero" }, { children: [(0, jsx_runtime_1.jsx)("path", { fill: "#E30A33", d: "M-14.6.1h127.9v21.3H-14.6z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#F18E43", d: "M-14.6 21.4h127.9v21.3H-14.6z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#F9DF53", d: "M-14.6 42.7h127.9V64H-14.6z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#008F58", d: "M-14.6 64h127.9v21.3H-14.6z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#3098D4", d: "M-14.6 85.3h127.9v21.3H-14.6z" }), (0, jsx_runtime_1.jsx)("path", { fill: "#A03E7E", d: "M-14.6 106.7h127.9V128H-14.6z" })] }))] }))] })) })), (0, jsx_runtime_1.jsx)("span", __assign({ "class": "mt-2" }, { children: "$141 for pi-saur" }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ "class": "flex flex-col items-center" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ "class": "bg-gray-700 p-4 rounded-full" }, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://nanosaur.ai/assets/images/nanosaur-logo.png", width: "100px", height: "100px" }) })), (0, jsx_runtime_1.jsx)("span", __assign({ "class": "mt-2" }, { children: "$300 for nanosaur.ai by Rafello Bonghaleii" }))] }))] }))] })));
}
var navigation = {
    solutions: [],
    support: [],
    company: [],
    legal: [],
    social: [
        {
            name: "hackaday",
            href: "https://hackaday.io/roboticsodyssey",
            icon: function (props) { return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "\uD83C\uDF08\uD83E\uDDD9\uD83C\uDFFB\uD83E\uDD16\uD83E\uDD96\uD83C\uDF08" })); }
        },
        {
            name: "twitter",
            href: "https://x.com/roboticsodyssey",
            icon: function (props) { return ((0, jsx_runtime_1.jsx)("svg", __assign({ fill: "currentColor", viewBox: "0 0 24 24" }, props, { children: (0, jsx_runtime_1.jsx)("path", { d: "M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" }) }))); }
        },
        {
            name: "YouTube",
            href: "https://www.youtube.com/@Robotics-Odyssey",
            icon: function (props) { return ((0, jsx_runtime_1.jsx)("svg", __assign({ fill: "currentColor", viewBox: "0 0 24 24" }, props, { children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z", clipRule: "evenodd" }) }))); }
        },
    ]
};
//https://codepen.io/shironitus/pen/QWyNBqx
function Docker_pricing() {
    //console -> homepage
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex flex-col gap-4 flex-auto" }, { children: [(0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm font-semibold leading-6 text-white" }, { children: "$25 1 time fee for 95 hours of Video + 172 Notebooks" })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "mt-2 text-sm leading-6 text-gray-300" }, { children: "or $141 for a nanosaur.ai (raspberry pi instead of jetson nano for now)" })), (0, jsx_runtime_1.jsxs)("form", __assign({ className: "mt-6 sm:flex sm:max-w-md" }, { children: [(0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: "email-address", className: "sr-only" }, { children: "Email address" })), (0, jsx_runtime_1.jsx)("input", { id: "email-address", name: "email-address", type: "email", required: true, placeholder: "eggnog@gmail.com", autoComplete: "email", className: "w-48min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-64 sm:text-sm sm:leading-6 " }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0" }, { children: (0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", className: "flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" }, { children: "Sign up" })) }))] }))] })));
}
function Example() {
    return ((0, jsx_runtime_1.jsxs)("footer", __assign({ "aria-labelledby": "footer-heading", className: "bg-gray-900" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ id: "footer-heading", className: "sr-only" }, { children: "Footer" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mx-auto max-w-7xl px-6 pb-8 " }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "xl:grid xl:grid-cols-3 xl:gap-8" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-8 xl:col-span-2 hidden" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mt-10 xl:mt-0 flex flex-col gap-4" }, { children: [(0, jsx_runtime_1.jsx)(Pricing, {}), (0, jsx_runtime_1.jsx)(Docker_pricing, {})] }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "border-t border-white/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "flex space-x-6 md:order-2" }, { children: navigation.social.map(function (item) { return ((0, jsx_runtime_1.jsxs)("a", __assign({ href: item.href, className: "text-gray-500 hover:text-gray-400" }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: item.name })), (0, jsx_runtime_1.jsx)(item.icon, { "aria-hidden": "true", className: "h-6 w-6" })] }), item.name)); }) })), (0, jsx_runtime_1.jsx)("p", __assign({ className: "mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0" }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://calendly.com/robotics-odyssey" }, { children: "Office Hours with Pau" })) }))] }))] }))] })));
}
exports["default"] = Example;
