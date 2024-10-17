/* global window */

(function () {
    'use strict';
    window.robotface.animationengine = {};
    var BLINKTIME = 600.0;
    var setTimeout = window.setTimeout;
    var requestAnimationFrame = window.requestAnimationFrame;
    var ANIMATION_ENGINE = window.robotface.animationengine;

    // This animation engine ignores messages and instead changes
    // faces randomly on requestAnimationFrame
    ANIMATION_ENGINE.createFaceBenchmarkAnimationEngine = function (faceController) {
        requestAnimationFrame(function randomFace () {
            faceController.setRandomFaceEmotion();
            requestAnimationFrame(randomFace);
        });
        return {
            processMessage: function () {
                // Ignore messages
            }
        };
    };

    ANIMATION_ENGINE.createSingleRandomFaceAnimationEngine = function (faceController) {
        faceController.setRandomFaceEmotion();

        return {
            processMessage: function () {
                // Ignore messages
            }
        };
    };

    ANIMATION_ENGINE.createCycleAnimationEngine = function (faceController) {
        var FACE_CHANGE_PERIOD_MS = 1500;
        var emotions = faceController.getAllFaceEmotions();
        var currEmotionIndex = 0;
        var lastTime;
        var PART_ANIMATION_PERIOD_MS = 300;

        requestAnimationFrame(function advanceAnimation (currTime) {
            if (lastTime === undefined) {
                lastTime = currTime;
            }

            if (currTime - lastTime > PART_ANIMATION_PERIOD_MS) {
                lastTime = currTime;
            }

            var animationPosition = (currTime - lastTime) / PART_ANIMATION_PERIOD_MS;
            faceController.setAnimationPositionForPart('mouth', animationPosition);
            faceController.setAnimationPositionForPart('eyes', animationPosition);
            requestAnimationFrame(advanceAnimation);
        });

        setTimeout(function setNextFace () {
            faceController.setFaceEmotion(emotions[currEmotionIndex]);

            currEmotionIndex += 1;

            if (currEmotionIndex >= emotions.length) {
                currEmotionIndex = 0;
            }

            setTimeout(setNextFace, FACE_CHANGE_PERIOD_MS);
        }, FACE_CHANGE_PERIOD_MS);

        return {
            processMessage: function () {
                // Ignore messages
            }
        };
    };

    ANIMATION_ENGINE.createDirectMessageAnimationEngine = function (faceController) {
        var currentEmotion = faceController.getFaceEmotion();
        var isTalking = false;
        var eyeState = "BLINKING"; 

        var randomBlink = function() {
            var base = Math.random();
            if (base < 0.25 || base > 0.75) {
                return (base * 3000) + 
                    ((base < 0.25) ? 2000 : 7000) ;   
            } else {
               return (base * 2000) + 3000;
            }
        }

        var blinkVal = function(elapsed) {
            //y=(x-0.5)^2/(0.25)
            var x = elapsed / BLINKTIME;
            return Math.min(Math.pow(x - 0.5,2) / 0.25, 1.0)
        } 
        var blinkPlan = function() {
            var start; 
            var nextBlink;
            
            var resetBlink =  function() {
                start = 0;
                nextBlink = Date.now() + randomBlink();
            }

            var blinkState = function() {
                var now = Date.now();
                if (now > nextBlink) { //reset
                    start = now;
                    nextBlink = now + randomBlink();
                } 
                return blinkVal(Date.now() - start);
            };

            
            resetBlink();

            return {
                blinkState: blinkState,
                resetBlink: resetBlink
            }
        };

        var randomMouth = function () {
            var base = Math.random();
            return (base * 200) + 80;
        }
        var speakPlan = function () {
            var nextToggle;
            var isOpen;

            var resetMouth =  function() {
                isOpen = false;
                nextToggle = Date.now() + randomMouth();
            }

            var speakState = function() {
                var now = Date.now();
                if (now > nextToggle) { 
                    nextToggle = now + randomMouth();
                    isOpen = !isOpen;
                } 

                return isOpen;
            };

            
            resetMouth();

            return {
                resetMouth: resetMouth,
                speakState: speakState
            }
        };
        
 
        var bPlan = blinkPlan();
        var sPlan = speakPlan();

        faceController.setAnimationPositionForPart('mouth', 0.0);
        faceController.setAnimationPositionForPart('eyes', 0.0);

        // Would love a more advanced blinking model but this works for now:
        // between each blink is an interval of 2–10 seconds; actual rates vary by individual averaging around 10 blinks per minute in a laboratory setting
        // source: https://en.wikipedia.org/wiki/blinking

        var lastEmotion;
        var lastMouth = 0.0;
        var lastEye = 0.0;

        requestAnimationFrame(function processAnimations () {

            var animationUpdate = false;

            if (!lastEmotion || currentEmotion !== lastEmotion) {
                animationUpdate = true;
                faceController.setFaceEmotion(currentEmotion);
            }

            var mouth = 0.0;
            if (isTalking) {
                mouth = sPlan.speakState();
            }
            if (lastMouth != mouth) {
                animationUpdate = true;
                faceController.setAnimationPositionForPart('mouth', mouth);
            } 

            var actualEyeState = 1;

            if (eyeState === "BLINKING") {
                actualEyeState = bPlan.blinkState();
            } else if (eyeState === "CLOSED") {
                actualEyeState = 0.0;
            } else if (eyeState === "MID") {
                actualEyeState = 0.5;
            }

            if (lastEye != actualEyeState) {
                 animationUpdate = true;
                 faceController.setAnimationPositionForPart('eyes', actualEyeState);
            }
           
            lastEye = actualEyeState;
            lastMouth = mouth;
            lastEmotion = currentEmotion;
            if (!animationUpdate) {
                setTimeout(processAnimations,50);
            } else {
                requestAnimationFrame(processAnimations);
            }
        });

        var processMessage = function (message) {
            if (message.isTalking != isTalking) {
                sPlan.resetMouth();
            }
            isTalking = message.isTalking;
            currentEmotion = message.emotion;
            if (message.eyeState && message.eyeState !== eyeState) {
                eyeState = message.eyeState;
                if (eyeState === "BLINKING") {
                    bPlan.resetBlink();
                }
            }
        };

        return {
            processMessage: processMessage
        };
    };
}());
