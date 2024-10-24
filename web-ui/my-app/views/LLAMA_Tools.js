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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var jsx_runtime_1 = require("hono/jsx/jsx-runtime");
var react_1 = require("react");
var livekit_client_1 = require("livekit-client");
var Livekit = {
    Room: livekit_client_1.Room,
    RoomEvent: livekit_client_1.RoomEvent,
    Track: livekit_client_1.Track
};
/// spoken word = unifies groups from 5 to 100 - written word - 100,000 - pictures = 1 billion - Proof:youtube
function getLivekitData(identity) {
    return __awaiter(this, void 0, void 0, function () {
        var livekit_connect, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    livekit_connect = 'livekit_connect';
                    return [4 /*yield*/, fetch('/api/livekit_connect', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ identity: identity || 'voice to prompt' })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error('Failed to connect to Livekit:', response.statusText);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    //console.log('Connected to Livekit:', data);
                    return [2 /*return*/, data];
            }
        });
    });
}
//const liveKit_data = await postLivekitConnect();
// livekit video + audio - replay 
function joinRoom(not_used, audioElement) {
    return __awaiter(this, void 0, void 0, function () {
        var screenShareVideo, room, liveKit_data, url, roomOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    screenShareVideo = document.getElementById("screenShareVideo");
                    room = new livekit_client_1.Room();
                    return [4 /*yield*/, getLivekitData()];
                case 1:
                    liveKit_data = _a.sent();
                    url = "wss://omnissiah-university-kmuz0plz.livekit.cloud";
                    roomOptions = {
                        adaptiveStream: true,
                        dynacast: true,
                        publishDefaults: {
                            simulcast: true,
                            audioEnabled: true,
                            videoEnabled: false
                        }
                    };
                    return [4 /*yield*/, room.connect(url, liveKit_data.token, roomOptions)];
                case 2:
                    _a.sent();
                    takeScreenshot();
                    room.on(livekit_client_1.RoomEvent.TrackSubscribed, function (track, publication, participant) {
                        if (track.kind === livekit_client_1.Track.Kind.Video &&
                            track.source === livekit_client_1.Track.Source.ScreenShare) {
                            track.attach(screenShareVideo);
                        }
                    });
                    room.on(livekit_client_1.RoomEvent.TrackUnsubscribed, function (track, publication, participant) {
                        if (track.kind === livekit_client_1.Track.Kind.Video &&
                            track.source === livekit_client_1.Track.Source.ScreenShare) {
                            track.detach(screenShareVideo);
                        }
                    });
                    room.on(livekit_client_1.RoomEvent.LocalTrackPublished, function (publication, participant) {
                        if (publication.kind === livekit_client_1.Track.Kind.Video && publication.source === livekit_client_1.Track.Source.ScreenShare) {
                            publication.track.attach(screenShareVideo);
                        }
                        else if (publication.kind === livekit_client_1.Track.Kind.Audio && ENABLE_AUDIO_PLAYBACK) {
                            publication.track.attach(audioElement);
                        }
                    });
                    room.on(livekit_client_1.RoomEvent.LocalTrackUnpublished, function (publication, participant) {
                        if (publication.kind === livekit_client_1.Track.Kind.Video && publication.source === livekit_client_1.Track.Source.ScreenShare) {
                            publication.track.detach(screenShareVideo);
                        }
                        else if (publication.kind === livekit_client_1.Track.Kind.Audio && ENABLE_AUDIO_PLAYBACK) {
                            publication.track.detach(audioElement);
                        }
                    });
                    return [4 /*yield*/, toggleMicrophone(room)];
                case 3:
                    _a.sent();
                    if (!ENABLE_SCREEN_SHARE) return [3 /*break*/, 5];
                    return [4 /*yield*/, toggleScreenShare(room)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function toggleMicrophone(room) {
    return __awaiter(this, void 0, void 0, function () {
        var enabled, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    enabled = room.localParticipant.isMicrophoneEnabled;
                    console.log("".concat(enabled ? "stopping" : "starting", " microphone"));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, room.localParticipant.setMicrophoneEnabled(!enabled)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error("error toggling microphone", e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function toggleScreenShare(room) {
    return __awaiter(this, void 0, void 0, function () {
        var enabled, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    enabled = room.localParticipant.isScreenShareEnabled;
                    console.log("".concat(enabled ? "stopping" : "starting", " screen share"));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, room.localParticipant.setScreenShareEnabled(!enabled, {
                            audio: true
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.error("error sharing screen", e_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//when prompting - do not exceed the threshold of complexity pls 
// job of a human = contain complexity - so AI can be happy. 
// Add this near the top of the file, alongside the ENABLE_SCREEN_SHARE constant
var ENABLE_SCREEN_SHARE = false;
var ENABLE_AUDIO_PLAYBACK = true; // New environment variable
/// show timer of 5 seconds - every httpt - show progress -  over-use asnyc to fetch to 500 GPUs --- test with cheapetst rental 
function LivekitAudio() {
    var screenShareVideo = (0, react_1.useRef)(null);
    var audioElement = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(false), isRecording = _a[0], setIsRecording = _a[1];
    var _b = (0, react_1.useState)(null), audioContext = _b[0], setAudioContext = _b[1];
    var _c = (0, react_1.useState)(null), mediaRecorder = _c[0], setMediaRecorder = _c[1];
    var _d = (0, react_1.useState)([]), audioChunks = _d[0], setAudioChunks = _d[1];
    console.log('LivekitAudio - rendering blah');
    var chunks = [];
    var handleStopRecording = function () {
        console.log('stopping recording');
        console.log(chunks);
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };
    function handleRecordButtonPress() {
        if (isRecording) {
            stopRecording();
        }
        else {
            startRecording();
        }
    }
    //use 
    (0, react_1.useEffect)(function () {
        var context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);
    }, []);
    function startRecording() {
        return __awaiter(this, void 0, void 0, function () {
            var stream, recorder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!audioContext)
                            return [2 /*return*/];
                        console.log('starting recording');
                        return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ audio: true })];
                    case 1:
                        stream = _a.sent();
                        recorder = new MediaRecorder(stream);
                        setMediaRecorder(recorder);
                        recorder.ondataavailable = function (e) { return chunks.push(e.data); };
                        recorder.onstop = function () {
                            console.log('sending 5 seconds of audio to server');
                            sendAudioToServer(chunks);
                        };
                        recorder.start();
                        setIsRecording(true);
                        setAudioChunks([]);
                        // Stop recording after 5 seconds
                        setTimeout(function () {
                            console.log('stopping recording after 5 seconds');
                            stopRecording();
                        }, 5000);
                        return [2 /*return*/];
                }
            });
        });
    }
    function stopRecording() {
        console.log('stopping recording');
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    }
    function sendAudioToServer(chunks) {
        return __awaiter(this, void 0, void 0, function () {
            var audioBlob, formData, response, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('sendAudioToServer');
                        audioBlob = new Blob(chunks, { type: 'audio/webm' });
                        formData = new FormData();
                        formData.append('audio', audioBlob, 'audio.webm');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch('/api/save_audio_to_whisper', {
                                method: 'POST',
                                body: formData
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("HTTP error! status: ".concat(response.status));
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        result = _a.sent();
                        console.log('Server response:', result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error sending audio to server:', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, audioBlob];
                }
            });
        });
    }
    function handleButtonPress() {
        console.log('Button pressed!');
        joinRoom(screenShareVideo.current, audioElement.current);
        handleRecordButtonPress();
        //rule for ai - if function is not called --- log easoning or ask other helper or supervisor.
    }
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { children: ["Audio", ENABLE_SCREEN_SHARE ? ' and screen sharing' : '', ENABLE_AUDIO_PLAYBACK ? ' with playback' : ' without playback', ' with LiveKit'] }), ENABLE_SCREEN_SHARE && (0, jsx_runtime_1.jsx)("video", { ref: screenShareVideo, autoPlay: true, muted: true, playsInline: true }), ENABLE_AUDIO_PLAYBACK && (0, jsx_runtime_1.jsx)("audio", { ref: audioElement, autoPlay: true }), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: handleButtonPress }, { children: "Connect to LiveKit" })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: handleStopRecording }, { children: "Stop Recording!" }))] }));
}
function FMA_B_truth() {
    return (0, jsx_runtime_1.jsx)("div", { children: "FMA_B_truth" });
}
function ghost_in_the_shell() {
    return (0, jsx_runtime_1.jsx)("div", { children: "ghost_in_the_shell" });
}
function livekit_screenshare() {
    return (0, jsx_runtime_1.jsx)("div", { children: "livekit_screenshare" });
}
// proxy  use(figma, 2) fun - (gmail, chatGPT)
var actualComponents = Object.entries({
    "livekit_audio": LivekitAudio,
    "FMA_B_truth": FMA_B_truth,
    "ghost_in_the_shell": ghost_in_the_shell,
    "livekit_screenshare": livekit_screenshare
});
//click on the component - renders the frame - as a full scren tool 
// const llamaComponents = [
//   "youtube"
// ]
//simplest bun-native build process -
//for ssr webgpu on 50GPUs for MMO dwarf fortress - 
// --- simple, standard compliant like d3, and integrate with any robotics infra + observablheq
function Example() {
    //console.log('Example - rendering llama-grid')
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "bg-slate-700 py-24 sm:py-32" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8" }, { children: [(0, jsx_runtime_1.jsx)("h2", __assign({ className: "text-base/7 font-semibold text-white" }, { children: "Lama-tools.com !!" })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative lg:col-span-3" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-px rounded-lg bg-slate-900 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]" }, { children: [(0, jsx_runtime_1.jsx)(LivekitAudio, {}), (0, jsx_runtime_1.jsx)("div", __assign({ className: "p-10 pt-4" }, { children: (0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm/4 font-semibold text-white" }, { children: "LiveKit Voice Agent" })) }))] })), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative lg:col-span-3" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-px rounded-lg bg-slate-900 lg:rounded-tr-[2rem]" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]" }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", __assign({ onClick: handleButtonPress, className: "text-white" }, { children: "Connect to LiveKit" })), (0, jsx_runtime_1.jsx)("video", { id: "screenShareVideo", className: "w-full h-full", autoPlay: true, muted: true, playsInline: true })] }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "p-10 pt-4" }, { children: (0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm/4 font-semibold text-white" }, { children: "ObervableHQ Infrastructure" })) }))] })), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative lg:col-span-2" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-px rounded-lg bg-slate-500 lg:rounded-bl-[2rem]" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "p-10 pt-4" }, { children: (0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm/4 font-semibold text-white" }, { children: "denoWEBGPU - cognition engine - alan kay game design" })) })) })), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative lg:col-span-2" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-px rounded-lg bg-green-800" }), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]" }, { children: [(0, jsx_runtime_1.jsx)(ReplayAnalyzer, {}), (0, jsx_runtime_1.jsx)("div", __assign({ className: "p-10 pt-4" }, { children: (0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm/4 font-semibold text-white" }, { children: "Replay analyzer" })) }))] })), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "relative lg:col-span-2" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-px rounded-lg bg-slate-900 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" }), (0, jsx_runtime_1.jsx)("div", __assign({ className: "relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]" }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "p-10 pt-4" }, { children: (0, jsx_runtime_1.jsx)("h3", __assign({ className: "text-sm/4 font-semibold text-white" }, { children: "Continuous eval for helpers for robotics - bc learn prediction -coolest field in ai (worory dream said \"tools that anticpate rather than obey in 2008\" - invent at the intersection of robotics and LLAMA - because LLAMA = self-owned ai - seizing means of productions p2p robots" })) })) })), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" })] }))] }))] })) })));
}
var react_2 = require("react");
function handleInputChange(e) {
    return __awaiter(this, void 0, void 0, function () {
        function sendRequest(prompt) {
            return __awaiter(this, void 0, void 0, function () {
                var response, data, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, fetch('/ollama', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ prompt: prompt })
                                })];
                        case 1:
                            response = _a.sent();
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            console.log('Server response:', data);
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            console.error('Error sending request:', error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var typingTimeout, prompt;
        return __generator(this, function (_a) {
            prompt = e.target.value;
            sendRequest(prompt);
            return [2 /*return*/];
        });
    });
}
function App() {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", onChange: handleInputChange }), (0, jsx_runtime_1.jsx)(react_2.Suspense, __assign({ fallback: (0, jsx_runtime_1.jsx)("div", { children: "Loading..." }) }, { children: (0, jsx_runtime_1.jsx)(Example, {}) }))] }));
}
exports["default"] = App;
// ... (rest of the code remains unchanged)
// <h1>goal by nov 1 - 1001 useful tools that shorten distance dynamicland</h1>
// export default Example;
// AI seinfeld but with all cartoons ever + robots - questionablecontent.net
// function Backup () {
// async function requestMicrophoneAndSpeechToText() {
//   try {
//     // Request microphone access
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     console.log('Microphone access granted');
//     // Initialize SpeechRecognition
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.onstart = () => {
//       console.log('Speech recognition started');
//     };
//     recognition.onspeechend = () => {
//       console.log('Speech recognition ended');
//       recognition.stop();
//     };
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       console.log('Speech to text result:', transcript);
//     };
//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//     };
//     // Start speech recognition
//     recognition.start();
//   } catch (error) {
//     console.error('Error accessing microphone:', error);
//   }
// }
// }
//dating = a game like mounment valley or  the game amro playerd - farm ville 
function screnshareis_cool() {
    return __awaiter(this, void 0, void 0, function () {
        function joinRoom() {
            return __awaiter(this, void 0, void 0, function () {
                var url, datum;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            room = new livekit_client_1.Room();
                            url = "wss://omnissiah-university-kmuz0plz.livekit.cloud";
                            return [4 /*yield*/, getLivekitData('identity')];
                        case 1:
                            datum = _a.sent();
                            return [4 /*yield*/, room.connect(url, datum.token)];
                        case 2:
                            _a.sent();
                            room.on(livekit_client_1.RoomEvent.TrackSubscribed, function (track, publication, participant) {
                                if (track.kind === livekit_client_1.Track.Kind.Video &&
                                    track.source === livekit_client_1.Track.Source.ScreenShare) {
                                    track.attach(screenShareVideo);
                                }
                            });
                            room.on(livekit_client_1.RoomEvent.TrackUnsubscribed, function (track, publication, participant) {
                                if (track.kind === livekit_client_1.Track.Kind.Video &&
                                    track.source === livekit_client_1.Track.Source.ScreenShare) {
                                    track.detach(screenShareVideo);
                                }
                            });
                            room.on(livekit_client_1.RoomEvent.LocalTrackPublished, function (publication, participant) {
                                if (publication.kind === livekit_client_1.Track.Kind.Video &&
                                    publication.source === livekit_client_1.Track.Source.ScreenShare) {
                                    publication.track.attach(screenShareVideo);
                                }
                            });
                            room.on(livekit_client_1.RoomEvent.LocalTrackUnpublished, function (publication, participant) {
                                if (publication.kind === livekit_client_1.Track.Kind.Video &&
                                    publication.source === livekit_client_1.Track.Source.ScreenShare) {
                                    publication.track.detach(screenShareVideo);
                                }
                            });
                            toggleScreenShare(room);
                            return [2 /*return*/];
                    }
                });
            });
        }
        function toggleScreenShare(room) {
            return __awaiter(this, void 0, void 0, function () {
                var enabled, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            enabled = room.localParticipant.isScreenShareEnabled;
                            console.log("".concat(enabled ? "stopping" : "starting", " screen share"));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, room.localParticipant.setScreenShareEnabled(!enabled, {
                                    audio: true
                                })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_3 = _a.sent();
                            console.error("error sharing screen", e_3);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var Livekit, livekit_connect, room;
        return __generator(this, function (_a) {
            Livekit = {
                Room: livekit_client_1.Room,
                RoomEvent: livekit_client_1.RoomEvent,
                Track: livekit_client_1.Track
            };
            livekit_connect = 'livekit_connect';
            //const button = document.getElementById("share");
            //button.addEventListener("click", joinRoom);
            joinRoom();
            return [2 /*return*/];
        });
    });
}
function handleButtonPress() {
    console.log('button pressed');
    screnshareis_cool();
}
function ReplayAnalyzer() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { children: "Replay Analyzer" }), (0, jsx_runtime_1.jsx)("iframe", { src: "/api/replay_analyzer" })] }));
}
function takeScreenshot() {
    console.log('screenshot taken');
    function captureScreenshot() {
        var video = document.getElementById('screenShareVideo');
        // Ensure the video has loaded metadata
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA
            var canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            var dataURL = canvas.toDataURL('image/png');
            var img = document.createElement('img');
            img.src = dataURL;
            document.body.appendChild(img);
            var link = document.createElement('a');
            link.href = dataURL;
            link.download = 'screenshot.png';
            link.click();
            // Continue with extracting image data
        }
        else {
            // Video metadata not loaded yet
            video.addEventListener('loadeddata', captureScreenshot);
        }
    }
    captureScreenshot();
    // setInterval(() => {
    //   const screenshot = document.body.toDataURL('image/png');
    //   fetch('/api/placeholder_screenshare', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ screenshot }),
    //   })
    //   .then(response => response.json())
    //   .then(data => console.log('Screenshot sent:', data))
    //   .catch(error => console.error('Error sending screenshot:', error));
    // }, 5000);
}
console.log('llama-grid loaded');
//import routes from './bun_handlers/llama-backend.tsx';
//replay then autocommit - walk!!
//
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjkxOTU3MjEsImlzcyI6IkFQSXRTYndYdlNqaDRjZiIsIm5hbWUiOiJzY3JlZW5fc2hhcmUiLCJuYmYiOjE3MjkxMDkzMjEsInN1YiI6InNjcmVlbl9zaGFyZSIsInZpZGVvIjp7ImNhblVwZGF0ZU93bk1ldGFkYXRhIjp0cnVlLCJyb29tIjoicm9vbSIsInJvb21BZG1pbiI6dHJ1ZSwicm9vbUNyZWF0ZSI6dHJ1ZSwicm9vbUpvaW4iOnRydWUsInJvb21MaXN0Ijp0cnVlLCJyb29tUmVjb3JkIjp0cnVlfX0.Ub3VigeCkaL4sG4cdw7VaPfaHECuMg8buy6u38xqZPQ";
// ramble to rewind database - lots of  bear notes -> helper can reogranize into a gant chart.
var proxy_docs = [
// "https://bun.sh/docs/runtime/bunfig#run-bun-auto-alias-node-to-bun", 
// "https://google.com", 
// "https://youtube.com", 
// "https://github.com", 
// "https://openai.com", 
// "https://bun.sh/docs", 
// "https://reflect.app",
// "https://zed.dev/docs/multibuffers",
// "https://colab.research.google.com/",
// "http://hashirama.blog",
// "https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros1/raspberry_pi_setup.html",
// "http://llama-tools.com",
// "https://replicate.com/black-forest-labs/flux-1.1-pro",
// "https://x.com/home",
// "https://ai.google.dev/edge/mediapipe/solutions/guide",
// "https://observablehq.com/d/396854ba12551e3a",
// "https://paulgraham.com/swan.html",
// "https://worrydream.com/SeeingSpaces/SeeingSpaces.jpg",
// "https://robertheaton.com/archive/",
// "https://chatgpt.com/c/671358b5-9ffc-8013-bffd-11fd2f7bf1a1",
// "https://www.youtube.com/watch?v=CZim0p_etvM",
// "https://dynamicland.org/2024/FAQ/",
// "https://tailwindcss.com/docs/animation",
// "https://observablehq.com/@mbostock/rainbow-pack",
// "https://worrydream.com/LadderOfAbstraction/",
// "https://reflect.app/g/awahab/19102024",
// "https://developer.nvidia.com/sdk-manager",
// "https://login.nvgs.nvidia.com/v1/error?preferred_nvidia=true&context=reset&theme=Bright&locale=en-US&prompt=default&email=eggnog.wahab@gmail.com&key=eyJhbGciOiJIUzI1NiJ9.eyJzZSI6IjhsQzUiLCJ0b2tlbklkIjoiMTI5NzIwMjUyNzMxMjE2NjkxMiIsImV4cCI6MTcyOTM1MTE5MCwib3QiOiIxMjk3MjAyNTU1NTMyODczNzI4IiwianRpIjoiNTljNjEwZGUtMzg2Zi00ZTYzLWEzNGUtNDdjZDM3ZWQ0N2Q1In0.32bu8bBYxJhTwcoJ-a9uQ1c3IpoarslXbdfUEPzOAtU&client_id=323893095789756813&code=82bea1d181ad43fb993d3af2b432b449&id=c035c24e-ed9e-4e7b-a7e8-faa0caaee637&multipleOrigin=false&isAutoInit=false&jarvis_error=%7B%22error%22:%22CREDENTIALS_EXPIRED%22%7D",
// "https://chatgpt.com/c/6713bf25-6d78-8013-b29b-8ad79f6af262",
// "https://ubuntu.com/download/server/thank-you?version=24.04.1&architecture=amd64&lts=true",
// "https://www.google.com/search?q=ubuntu+2404&rlz=1C5CHFA_enUS1125US1125&oq=ubuntu+2404+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDU4NzRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8",
// "https://github.com/mitchellh/nixos-config",
// "https://resend.com/emails",
// "https://chatgpt.com/c/6713c608-74ec-8013-b77f-7769630cb45f",
// "https://wiki.ubuntu.com/ARM/Server/Install?_gl=1*t9dj9w*_gcl_au*NDc0NDc3NzMuMTcyOTM0NzUxOQ..&_ga=2.99606046.1295490594.1729347516-1204181597.1729347516",
// "https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros1/raspberry_pi_setup.html",
// "https://www.youtube.com/watch?v=CZim0p_etvM",
// "https://scholar.google.com/",
];
