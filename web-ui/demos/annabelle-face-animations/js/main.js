/* global window */

(function () {
    'use strict';
    var console = window.console;
    var document = window.document;
    var URLSearchParams = window.URLSearchParams;

    var FACE_CONTROLLER = window.robotface.facecontroller;
    var CONNECTION_MANAGER = window.robotface.connectionmanager;
    var ANIMATION_ENGINE = window.robotface.animationengine;

    console.log('[Lifecycle] Main JS loading');

    /*
     * Helper functions
     */

    var toggleAndNavigate = function (searchParams, paramName) {
        if (searchParams.has(paramName)) {
            searchParams.delete(paramName);
        } else {
            searchParams.set(paramName, '');
        }
        window.location.search = searchParams.toString();
    };

    var findElementsById = function (elementNames) {
        var elements = {};

        elementNames.forEach(function (elementName) {
            var queryResult = document.getElementById(elementName);
            if (queryResult === null) {
                console.log('Cannot find element with name', elementName);
            } else {
                elements[elementName] = queryResult;
            }
        });

        return elements;
    };

    var domReady = function (readyCallback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', readyCallback);
        } else {
            readyCallback();
        }
    };

    var createFullscreenPointerLockCommand = function () {
        var testElement = document.body;
        var noop = function () {
            // Intentionally left blank
        };

        var fullscreenFunction = testElement.requestFullscreen ||
            testElement.mozRequestFullScreen ||
            testElement.webkitRequestFullscreen ||
            testElement.msRequestFullscreen ||
            noop;

        var pointerlockFunction = testElement.requestPointerLock ||
            testElement.mozRequestPointerLock ||
            noop;

        if (fullscreenFunction === noop) {
            console.log('[Fullscreen] No Fullscreen API found');
        }

        if (pointerlockFunction === noop) {
            console.log('[PointerLock] No Pointer Lock API found');
        }

        return function (el) {
            fullscreenFunction.call(el);
            pointerlockFunction.call(el);
        };
    };

    var createMessageValidator = function (messageProcessor) {
        // Parses the JSON message and verifies the following fields.
        // Returns undefined if the message is invalid.
        // {
        //     "emotion": <string>,
        //     "isTalking": <boolean>
        // }
        var processMessage = function (message) {
            if (typeof message !== 'object' || message === null) {
                console.error('[Validator] Message should be an object with keys:', message);
                return;
            }

            if (typeof message.emotion !== 'string') {
                console.error('[Validator] Message has invalid emotion:', message.emotion);
                return;
            }

            if (typeof message.isTalking !== 'boolean') {
                console.error('[Validator] Message has invalid isTalking parameter:', message.isTalking);
                return;
            }

            messageProcessor.processMessage(message);
        };

        return {
            processMessage: processMessage
        };
    };

    var main = function () {
        console.log('[Lifecycle] Main started');

        var searchParams = new URLSearchParams(document.location.search);
        var requestFullscreen = createFullscreenPointerLockCommand();
        var els = findElementsById([
            'face',
            'controlpanel',
            'fullscreen',
            'largeface',
            'console',
            'noconnect',
            'benchmark',
            'cycle',
            'random',
            'emotioncontroller'
        ]);

        // Data flow: Connection Manager -> Message Validator -> Animation Engine -> Face Controller

        // Setup Face Controller
        var faceController = FACE_CONTROLLER.createFaceController(els.face);
        
        // Setup Animation Engine
        var animationEngine;

        if (searchParams.has('benchmark')) {
            animationEngine = ANIMATION_ENGINE.createFaceBenchmarkAnimationEngine(faceController);
        } else if (searchParams.has('cycle')) {
            animationEngine = ANIMATION_ENGINE.createCycleAnimationEngine(faceController);
        } else if (searchParams.has('random')) {
            animationEngine = ANIMATION_ENGINE.createSingleRandomFaceAnimationEngine(faceController);
        } else {
            animationEngine = ANIMATION_ENGINE.createDirectMessageAnimationEngine(faceController);
        }

        // Setup Message Validator
        var messageValidator = createMessageValidator(animationEngine);

        // Setup Connection Manager
        var connectionManager;
        if (searchParams.has('localstate')) {
            connectionManager = CONNECTION_MANAGER.createLocalConnectionManager('',messageValidator);
        } else {
            var httpConnectionUrl = els.face.dataset.httpConnectionUrl;
            connectionManager = CONNECTION_MANAGER.createPollingHTTPConnectionManager(httpConnectionUrl, messageValidator);
        }
        if (!searchParams.has('showtime')) {
                // Setup Page Control Panel
                els.fullscreen.addEventListener('click', function () {
                    requestFullscreen(els.face);
                    els.face.classList.add('large-face');
                });

                els.largeface.addEventListener('click', function () {
                    els.face.classList.toggle('large-face');
                });

                els.console.addEventListener('click', function () {
                    toggleAndNavigate(searchParams, 'debug');
                });

                els.noconnect.addEventListener('click', function () {
                    toggleAndNavigate(searchParams, 'noconnect');
                });

                els.benchmark.addEventListener('click', function () {
                    toggleAndNavigate(searchParams, 'benchmark');
                });

                els.cycle.addEventListener('click', function () {
                    toggleAndNavigate(searchParams, 'cycle');
                });

                els.random.addEventListener('click', function () {
                    toggleAndNavigate(searchParams, 'random');
                });

                var allEmotions = faceController.getAllFaceEmotions();
                var allEmotionsFragment = document.createDocumentFragment();

                allEmotions.forEach(function (emotionName) {
                    var emotionButton = document.createElement('button');
                    emotionButton.textContent = emotionName;
                    emotionButton.classList.add('emotioncontrol');

                    allEmotionsFragment.appendChild(emotionButton);
                });

                els.emotioncontroller.appendChild(allEmotionsFragment);
                els.emotioncontroller.addEventListener('click', function (evt) {
                    if (evt.target.classList.contains('emotioncontrol') === false) {
                        return;
                    }

                    faceController.setFaceEmotion(evt.target.textContent);
                });
        } else {
            els.controlpanel.remove();
            els.face.classList.add('large-face');
        }
    
        connectionManager.start();
        
    };

    // Start-up main after the DOM has loaded
    domReady(main);
}());
