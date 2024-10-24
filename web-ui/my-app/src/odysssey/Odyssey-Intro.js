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
var react_2 = require("@headlessui/react");
var outline_1 = require("@heroicons/react/24/outline");
var d3 = require("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"); // Updated CDN
// import { interpolateTurbo } from "https://unpkg.com/d3-scale-chromatic@3.0.0/dist/d3-scale-chromatic.min.js";
//let https://underscorejs.org/underscore-esm.js
var makeGradient = function (t) { return 1; };
//const makeGradient = (t) => interpolateTurbo(t)
//get voice modulator - fft - info theory
var navigation = [
// { name: 'Product', href: '#' },
// { name: 'Features', href: '#' },
// { name: 'Marketplace', href: '#' },
// { name: 'Company', href: '#' },
];
var outline_2 = require("@heroicons/react/24/outline");
var react_3 = require("@headlessui/react");
var solid_1 = require("@heroicons/react/20/solid");
var moods = [
    { name: 'Excited', value: 'excited', icon: solid_1.FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
    { name: 'Loved', value: 'loved', icon: solid_1.HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
    { name: 'Happy', value: 'happy', icon: solid_1.FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
    { name: 'Sad', value: 'sad', icon: solid_1.FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
    { name: 'Thumbsy', value: 'thumbsy', icon: solid_1.HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
    { name: 'I feel nothing', value: null, icon: outline_1.XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
];
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
// authenticator only login - otp - no email / password - your phone = good enough - funny QR Code w/ flux
// or tailscale login - key or google login
// https://tailwindui.com/components/application-ui/navigation/command-palettes - probably best one 
// https://tailwindui.com/components/application-ui/forms/form-layouts
function Suggestions_for_Improvement(props) {
    var _a = (0, react_1.useState)(moods[5]), selected = _a[0], setSelected = _a[1];
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-start space-x-4" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "min-w-0 flex-1" }, { children: (0, jsx_runtime_1.jsxs)("form", __assign({ action: "#" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "border-b border-gray-200 focus-within:border-indigo-600" }, { children: [(0, jsx_runtime_1.jsx)("label", __assign({ htmlFor: "comment", className: "sr-only" }, { children: "Add your comment" })), (0, jsx_runtime_1.jsx)("textarea", { id: "comment", name: "comment", rows: 3, placeholder: "Add your comment...", className: "block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6", defaultValue: '', onChange: props.onChange })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex justify-between pt-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center space-x-5" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flow-root" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flow-root" }, { children: (0, jsx_runtime_1.jsxs)(react_3.Listbox, __assign({ value: selected, onChange: setSelected }, { children: [(0, jsx_runtime_1.jsx)(react_3.Label, __assign({ className: "sr-only" }, { children: "Your mood" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative" }, { children: [(0, jsx_runtime_1.jsx)(react_3.ListboxButton, __assign({ className: "relative -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500" }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ className: "flex items-center justify-center" }, { children: selected.value === null ? ((0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(outline_2.FaceSmileIcon, { "aria-hidden": "true", className: "h-6 w-6 flex-shrink-0" }), (0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: "Add your mood" }))] })) : ((0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: classNames(selected.bgColor, 'flex h-8 w-8 items-center justify-center rounded-full') }, { children: (0, jsx_runtime_1.jsx)(selected.icon, { "aria-hidden": "true", className: "h-5 w-5 flex-shrink-0 text-white" }) })), (0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: selected.name }))] })) })) })), (0, jsx_runtime_1.jsx)(react_3.ListboxOptions, __assign({ transition: true, className: "absolute z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:ml-auto sm:w-64 sm:text-sm" }, { children: moods.map(function (mood) { return ((0, jsx_runtime_1.jsx)(react_3.ListboxOption, __assign({ value: mood, className: "relative cursor-default select-none bg-white px-3 py-2 data-[focus]:bg-gray-100" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: classNames(mood.bgColor, 'flex h-8 w-8 items-center justify-center rounded-full') }, { children: (0, jsx_runtime_1.jsx)(mood.icon, { "aria-hidden": "true", className: classNames(mood.iconColor, 'h-5 w-5 flex-shrink-0') }) })), (0, jsx_runtime_1.jsx)("span", __assign({ className: "ml-3 block truncate font-medium" }, { children: mood.name }))] })) }), mood.value)); }) }))] }))] })) }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex-shrink-0" }, { children: (0, jsx_runtime_1.jsx)("button", __assign({ type: "submit", className: "inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" }, { children: "Send" })) }))] }))] })) }))] })));
}
var Thanks = function () {
    return ((0, jsx_runtime_1.jsx)("h1", { className: "text-white glowing-rainbow-text mx-auto" }));
};
function Example() {
    var _a = (0, react_1.useState)(false), mobileMenuOpen = _a[0], setMobileMenuOpen = _a[1];
    var _b = (0, react_1.useState)(""), suggestion = _b[0], setSuggestion = _b[1];
    var _c = (0, react_1.useState)(0), startGradient = _c[0], setStartGradient = _c[1];
    var _d = (0, react_1.useState)(1), endGradient = _d[0], setEndGradient = _d[1];
    // Move these inside the component to ensure they update on re-render
    var from_color = d3.rgb(makeGradient(startGradient)).hex();
    var to_color = d3.rgb(makeGradient(endGradient)).hex();
    // Use a state variable for the gradient string
    var _e = (0, react_1.useState)(''), gradientClass = _e[0], setGradientClass = _e[1];
    // Update the gradient class when colors change
    (0, react_1.useEffect)(function () {
        var newGradientClass = "relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] \n      -translate-x-1/2 bg-gradient-to-tr \n      from-[".concat(from_color, "] to-[").concat(to_color, "] \n      opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]");
        setGradientClass(newGradientClass);
    }, [from_color, to_color]);
    var handleOnChange = function (e) {
        setSuggestion(e.target.value);
        var start = Math.random();
        var end = Math.random();
        setStartGradient(start);
        setEndGradient(end);
        console.log(from_color, to_color);
    };
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "bg-white", style: { maxHeight: "100px" } }, { children: [(0, jsx_runtime_1.jsx)("header", __assign({ className: "absolute inset-x-0 top-0 z-50" }, { children: (0, jsx_runtime_1.jsxs)(react_2.Dialog, __assign({ open: mobileMenuOpen, onClose: setMobileMenuOpen, className: "lg:hidden" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-50" }), (0, jsx_runtime_1.jsxs)(react_2.DialogPanel, __assign({ className: "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "flex items-center justify-between" }, { children: [(0, jsx_runtime_1.jsxs)("a", __assign({ href: "#", className: "-m-1.5 p-1.5" }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: "Your Company" })), (0, jsx_runtime_1.jsx)("img", { alt: "", src: "https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600", className: "h-8 w-auto" })] })), (0, jsx_runtime_1.jsxs)("button", __assign({ type: "button", onClick: function () { return setMobileMenuOpen(false); }, className: "-m-2.5 rounded-md p-2.5 text-gray-700" }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ className: "sr-only" }, { children: "Close menu" })), (0, jsx_runtime_1.jsx)(outline_1.XMarkIcon, { "aria-hidden": "true", className: "h-6 w-6" })] }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "mt-6 flow-root" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "-my-6 divide-y divide-gray-500/10" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "space-y-2 py-6" }, { children: navigation.map(function (item) { return ((0, jsx_runtime_1.jsx)("a", __assign({ href: item.href, className: "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" }, { children: item.name }), item.name)); }) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "py-6" }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "#", className: "-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" }, { children: "Log in" })) }))] })) }))] }))] })) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative isolate px-6 lg:px-8" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ "aria-hidden": "true", className: "absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" }, { children: (0, jsx_runtime_1.jsx)("div", { style: {
                                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                            }, className: "relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" }) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mx-auto max-w-2xl py-8 sm:py-12 lg:py-16" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "hidden sm:mb-8 sm:flex sm:justify-center" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "text-center" }, { children: [(0, jsx_runtime_1.jsxs)("h1", __assign({ className: "text-balance text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl" }, { children: ["Last Missing Piece ", (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://botparty.org", className: "text-indigo-600 underline" }, { children: "200k PRs" })), " + ", (0, jsx_runtime_1.jsx)("a", __assign({ href: "https://dynamicland.org", className: "text-indigo-600 underline" }, { children: "Dynamicland.org" })), "!"] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "flex items-center justify-end gap-x-6" }, { children: (0, jsx_runtime_1.jsx)(Suggestions_for_Improvement, { onChange: handleOnChange }) }))] }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ "aria-hidden": "true", className: "absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" }, { children: (0, jsx_runtime_1.jsx)("div", { style: {
                                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                            }, className: gradientClass }) }))] }))] })));
}
exports["default"] = Example;
