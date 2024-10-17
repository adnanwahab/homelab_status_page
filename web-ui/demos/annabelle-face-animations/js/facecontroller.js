/* global window */

(function () {
    'use strict';
    window.robotface.facecontroller = {};

    var console = window.console;
    var FACE_CONTROLLER = window.robotface.facecontroller;

    var findParentWithDatasetName = function (element, datasetName) {
        var currParent;
        for (currParent = element.parentElement; currParent !== null; currParent = currParent.parentElement) {
            if (currParent.dataset[datasetName] !== undefined) {
                return currParent;
            }
        }

        return undefined;
    };

    // Creates a config object extending from another object
    var createAndPopulateConfig = function (defaultConfig, element, parentConfig) {
        var config = Object.create(parentConfig);

        Object.keys(defaultConfig).forEach(function (name) {
            if (element.dataset[name] !== undefined) {
                if (isFinite(element.dataset[name])) {
                    config[name] = parseFloat(element.dataset[name]);
                } else {
                    config[name] = element.dataset[name];
                }
            }
        });

        return config;
    };

    FACE_CONTROLLER.createFaceController = function (faceElement) {
        // Base config
        var defaultConfig = {
            startingFrame: 0
        };

        // KeyKey maps to look-up names
        var partNames = {};
        var emotionNames = {};

        // Current emotion of face used for all parts
        var currentEmotion;

        // Current selected frames
        // currentFrames[partName] = frameReference
        var currentFrames = {};

        // Reference Trees
        var element = {
            // face = faceReference
            face: faceElement,
            // parts[partName] = partReference
            parts: {},
            // emotions[partName][emotionName] = emotionReference
            emotions: {},
            // frames[partName][emotionName][frameIndex] = frameReference
            frames: {}
        };

        var config = {
            // face = faceConfig
            face: createAndPopulateConfig(defaultConfig, element.face, defaultConfig),
            // parts[partName] = partConfig
            parts: {},
            // emotions[partName][emotionName] = emotionConfig
            emotions: {},
            // frames[partName][emotionName][frameIndex] = frameConfig
            frames: {}
        };

        // This function is sketchy at best, does nothing to handle errors in dom setup
        // Also hammers the dom pretty hard with queries
        // I swear I can do this performantly, I just don't want to right now o.o
        var gatherParts = function () {
            var EMPTY_ARRAY = 0;

            console.time('[FaceController] gather parts');

            Array.prototype.slice.call(element.face.querySelectorAll('[data-part]')).forEach(function (partElement) {
                var partName = partElement.dataset.part;

                partNames[partName] = partName;

                element.parts[partName] = partElement;
                element.emotions[partName] = {};
                element.frames[partName] = {};

                config.parts[partName] = createAndPopulateConfig(defaultConfig, partElement, config.face);
                config.emotions[partName] = {};
                config.frames[partName] = {};
            });

            Array.prototype.slice.call(element.face.querySelectorAll('[data-emotion]')).forEach(function (emotionElement) {
                var emotionName = emotionElement.dataset.emotion;
                var parentPartElement = findParentWithDatasetName(emotionElement, 'part');
                var parentPartName = parentPartElement.dataset.part;

                emotionNames[emotionName] = emotionName;

                element.emotions[parentPartName][emotionName] = emotionElement;
                element.frames[parentPartName][emotionName] = [];

                config.emotions[parentPartName][emotionName] = createAndPopulateConfig(defaultConfig, emotionElement, config.parts[parentPartName]);
                config.frames[parentPartName][emotionName] = [];
            });

            // hehe, lol, i wonder how long this monstrosity takes ¯\_(ツ)_/¯
            Object.keys(partNames).forEach(function (partName) {
                currentFrames[partName] = undefined;

                Object.keys(emotionNames).forEach(function (emotionName) {
                    var query = '[data-part="' + partName + '"] [data-emotion="' + emotionName + '"] [data-frame]';
                    var frameElements = Array.prototype.slice.call(element.face.querySelectorAll(query));

                    if (frameElements.length === EMPTY_ARRAY) {
                        console.error('[FaceController] missing frames for part', partName, 'and emotion', emotionName);
                        return;
                    }

                    frameElements.forEach(function (frameElement) {
                        var frameIndex = frameElement.dataset.frame;
                        element.frames[partName][emotionName][frameIndex] = frameElement;
                        config.frames[partName][emotionName][frameIndex] = createAndPopulateConfig(defaultConfig, frameElement, config.emotions[partName][emotionName]);
                    });

                    // TODO Need to verify continuity of array
                });
            });

            console.timeEnd('[FaceController] gather parts');

            console.group('FaceController] Detected pieces');
            console.log('[FaceController]: parts', Object.keys(partNames).join(', '));
            console.log('[FaceController]: emotions', Object.keys(emotionNames).join(', '));
            console.log('[FaceController]: elements', element);
            console.log('[FaceController]: config', config);
            console.groupEnd();
        };

        // Animations have a startingFrame, direction, and a cycle
        // startingFrame: 0, 1, 2, 'last'
        // cycle: 'loop' or 'reverse' //not implemented
        // direction: 'increment' or 'decrement' //not implemented
        // Animation position is a fractional completion from 0 - 1
        var setAnimationPositionForPart = function (partName, position) {
            if (partNames[partName] === undefined) {
                console.error('[FaceController] Attempting to reset invalid part', partName);
                return;
            }

            var numFrames = element.frames[partName][currentEmotion].length;
            var startIndex = config.emotions[partName][currentEmotion].startingFrame;

            if (startIndex === 'last') {
                startIndex = numFrames - 1;
            } else if (startIndex < 0 || startIndex > numFrames - 1) {
                startIndex = 0;
            }

            // Assumes loop and increment for now
            // TODO actually use startIndex
            var frameIndex = Math.round((numFrames - 1) * position);
            var newFrame = element.frames[partName][currentEmotion][frameIndex];

            if (currentFrames[partName] !== newFrame) {
                if (currentFrames[partName] !== undefined) {
                    currentFrames[partName].removeAttribute('data-selected');
                }

                currentFrames[partName] = newFrame;
                currentFrames[partName].setAttribute('data-selected', '');
            }

            // // If a current frame has not been chosen yet use a temporary one
            // if (currentFrames[partName] === undefined) {
            //     currentFrames[partName] = element.frames[partName][currentEmotion][0];
            //     currentFrames[partName].setAttribute('data-selected', '');
            // }

            // var startingFrameIndex = config.parts[partName].startingFrame;

            // var startingFrame = element.frames[partName][currentEmotion][startingFrameIndex];

            // if (currentFrames[partName] !== startingFrame) {
            //     currentFrames[partName].removeAttribute('data-selected');
            //     currentFrames[partName] = startingFrame;
            //     currentFrames[partName].setAttribute('data-selected', '');
            // }
        };

        var getAllFaceEmotions = function () {
            return Object.keys(emotionNames);
        };

        var getFaceEmotion = function () {
            return currentEmotion;
        };

        var setFaceEmotion = function (emotionName) {
            if (emotionNames[emotionName] === undefined) {
                console.error('[FaceController] Ignoring attempt to set invalid emotion', emotionName);
                return;
            }

            if (currentEmotion === emotionName) {
                return;
            }

            currentEmotion = emotionName;
            element.face.dataset.emotion = currentEmotion;

            Object.keys(currentFrames).forEach(function (partName) {
                setAnimationPositionForPart(partName, 0.0);
            });
        };

        var setRandomFaceEmotion = function () {
            var emotionArr = Object.keys(emotionNames);
            var randomEmotionIndex = Math.round(Math.random() * (emotionArr.length - 1));
            var randomEmotion = emotionArr[randomEmotionIndex];
            setFaceEmotion(randomEmotion);
        };

        var setupInitialState = function () {
            var FIRST_EMOTION = 0;

            // Get a valid starting emotion for the face
            var faceEmotion = emotionNames[element.face.dataset.emotion];

            if (faceEmotion === undefined) {
                faceEmotion = Object.keys(emotionNames)[FIRST_EMOTION];
            }

            // Clear any selected frames
            var selectedFrames = Array.prototype.slice.call(element.face.querySelectorAll('[data-frame][data-selected]'));
            selectedFrames.forEach(function (frame) {
                frame.removeAttribute('data-selected');
            });

            // Set the initial emotion
            setFaceEmotion(faceEmotion);
        };

        gatherParts();
        setupInitialState();

        return {
            setFaceEmotion: setFaceEmotion,
            getFaceEmotion: getFaceEmotion,
            setRandomFaceEmotion: setRandomFaceEmotion,
            setAnimationPositionForPart: setAnimationPositionForPart,
            getAllFaceEmotions: getAllFaceEmotions
        };
    };
}());
