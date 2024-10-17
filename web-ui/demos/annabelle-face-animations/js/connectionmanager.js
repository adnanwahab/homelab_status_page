/* global window */

(function () {
    'use strict';
    window.robotface.connectionmanager = {};

    var console = window.console;
    var setTimeout = window.setTimeout;
    var fetch = window.fetch;
    var CONNECTION_MANAGER = window.robotface.connectionmanager;

    var localQueue;

    CONNECTION_MANAGER.createLocalConnectionManager = function (dataUrl, messageProcessor) {
        var POLLING_INTERVAL_MS = 250;
        var fetchData = function () { 
            if (!localQueue.isEmpty()) {
               messageProcessor.processMessage(localQueue.dequeue());
            }
            setTimeout(fetchData, POLLING_INTERVAL_MS);
        }
        var start = function () {
            localQueue = Queue(); 
            setTimeout(fetchData, POLLING_INTERVAL_MS);
        }
        var stop = function(){}

        return {
            start: start,
            stop: stop
        }
    };

    CONNECTION_MANAGER.setLocalState = function (state) {
       localQueue.enqueue(state);
    };

    CONNECTION_MANAGER.createPollingHTTPConnectionManager  = function (dataUrl, messageProcessor) {
        var POLLING_INTERVAL_MS = 250,
            FETCH_IMMEDIATELY_MS = 0;
        var HTTP_SUCCESS_MIN = 200,
            HTTP_SUCCESS_MAX = 299;

        var STATES = Object.freeze({
            READY: 'READY',
            RUNNING: 'RUNNING',
            STOPPING: 'STOPPING'
        });

        var state = STATES.READY;

        // Interesting, can't abort a running fetch: https://github.com/whatwg/fetch/issues/27
        var fetchData = function () {
            console.log("start fetch state is ", state)
            if (state !== STATES.RUNNING && state !== STATES.STOPPING) {
                console.error('[Fetch] Expected to be RUNNING or STOPPING but instead in following state:', state);
            }

            if (state === STATES.STOPPING) {
                state = STATES.READY;
                console.log('[Fetch] Finished stopping requests');
                return;
            }

            fetch(dataUrl).then(function (response) {
                console.log("response.status is ", response.status);
                if (response.status >= HTTP_SUCCESS_MIN && response.status <= HTTP_SUCCESS_MAX) {
                    return response;
                }
                throw new Error(response.statusText);
            }).then(function (response) {
                return response.json();
            }).then(function (message) {
                messageProcessor.processMessage(message);
                setTimeout(fetchData, POLLING_INTERVAL_MS);
            }).catch(function (error) {
                console.error('[Fetch] Request failure', error);
                setTimeout(fetchData, POLLING_INTERVAL_MS);
            });
        };

        var start = function () {
            if (state !== STATES.READY) {
                console.error('[Fetch] Cannot start requests, must be in READY state, but in state', state);
                return;
            }
            state = STATES.RUNNING;
            console.log("transitioned to running state is ", state)
            setTimeout(fetchData, FETCH_IMMEDIATELY_MS);
        };

        var stop = function () {
            if (state !== STATES.RUNNING) {
                console.error('[Fetch] Cannot stop requests, must be in RUNNING state, but in state', state);
                return;
            }

            state = STATES.STOPPING;
            console.log('[Fetch] Stopping requests');
        };

        return {
            start: start,
            stop: stop
        };
    };
}());


function Queue(){

  var queue  = [];
  var offset = 0;

  var getLength = function(){
    return (queue.length - offset);
  }

  var isEmpty = function(){
    return (queue.length == 0);
  }


  var enqueue = function(item){
    queue.push(item);
  }

  var dequeue = function(){

    // if the queue is empty, return immediately
    if (queue.length == 0) return undefined;

    // store the item at the front of the queue
    var item = queue[offset];

    // increment the offset and remove the free space if necessary
    if (++ offset * 2 >= queue.length){
      queue  = queue.slice(offset);
      offset = 0;
    }

    // return the dequeued item
    return item;

  }

  var peek = function(){
    return (queue.length > 0 ? queue[offset] : undefined);
  }
  return {
      isEmpty: isEmpty,
      enqueue: enqueue,
      dequeue: dequeue
  };
}

// // WebSocket Default Server Url
// var WS_DEFAULT_URL = 'ws://localhost:64526';

// // Reconnection Timeout (milliseconds)
// var RECONNECT_TIMEOUT = 250;

// var createConnectionManager = function (webSocketUrl, commandCallback) {
//     if (typeof webSocketUrl !== 'string' || typeof commandCallback !== 'function') {
//         throw new Error('[WebSocket] A websocket url and message command callback function required');
//     }

//     var socket, socketOpen, socketClose, socketError;

//     var create = function () {
//         if (socket !== undefined) {
//             console.info('[WebSocket] create already called, ignoring');
//             return;
//         }

//         console.info('[WebSocket] create', webSocketUrl);

//         socket = new WebSocket(webSocketUrl);
//         socket.addEventListener('open', socketOpen);
//         socket.addEventListener('message', commandCallback);
//         socket.addEventListener('close', socketClose);
//         socket.addEventListener('error', socketError);
//     };

//     var remove = function () {
//         console.info('[WebSocket] remove');

//         if (socket !== undefined) {
//             socket.removeEventListener('open', socketOpen);
//             socket.removeEventListener('message', commandCallback);
//             socket.removeEventListener('close', socketClose);
//             socket.removeEventListener('error', socketError);
//             socket.close();
//             socket = undefined;
//         }
//     };

//     var reconnect = function () {
//         console.info('[WebSocket] reconnect');
//         remove();
//         setTimeout(create, RECONNECT_TIMEOUT);
//     };

//     socketOpen = function (evt) {
//         console.info('[WebSocket] open', evt);
//         // No opening message
//     };

//     socketClose = function (evt) {
//         console.info('[WebSocket] close', evt);
//         reconnect();
//     };

//     socketError = function (evt) {
//         console.info('[WebSocket] error', evt);
//         reconnect();
//     };

//     var send = function (message) {
//         if (socket !== undefined) {
//             console.info('[WebSocket] Attempted to send message when no connection, ignoring');
//             return;
//         }

//         socket.send(message);
//     };

//     return {
//         send: send,
//         start: create
//     };
// };
