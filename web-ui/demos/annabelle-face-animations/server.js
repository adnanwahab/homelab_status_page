// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var httpServer = require('http-server');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 8088;        // set our port
var webPort = process.env.WEBPORT || 8081;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

 var EYESTATES = Object.freeze({
        OPEN: 'OPEN',
        CLOSED: 'CLOSED',
        BLINKING: 'BLINKING',
        MID: 'MID'
    });

var faceState = (function() {
    var currentEmotion;
    var isTalking;
    var lastUpdate;
    var eyeState;
    var getState = function () {
        return {
            emotion: currentEmotion,
            isTalking: isTalking,
            lastUpdate: lastUpdate,
            eyeState: eyeState
        };
    };

    var isTalking = function () {
        return isTalking();
    };

    var getEyeState = function () {
        return eyeState;
    };

    var setEmotion = function (emotion) {
        currentEmotion = emotion;
        lastUpdate = Date.now();
    };

    var setTalking = function (talks) {
        isTalking = talks;
        lastUpdate = Date.now();
    };

    var setEyeState = function (state) {
        if (!state) return;
                
        state = state.toUpperCase();

        console.log("in eyestateset")
        if (state == EYESTATES.OPEN ) eyeState == EYESTATES.OPEN;
        if (state == EYESTATES.CLOSED) eyeState == EYESTATES.CLOSED;
        if (state == EYESTATES.BLINKING) eyeState == EYESTATES.BLINKING;
        if (state == EYESTATES.MID) eyeState == EYESTATES.MID;
    };

    eyeState = EYESTATES.BLINKING;

    return {
        getState: getState,
        setEmotion: setEmotion,
        setTalking: setTalking,
        getEyeState: getEyeState,
        setEyeState: setEyeState
    };
});

var face = faceState();

face.setEmotion('happy');
face.setTalking(false);
face.setEyeState(EYESTATES.BLINKING);

router.route('/face')
      .get(function(req,res) {
          res.json(face.getState());
      })
      .put(function(req,res) {
          if (req.body.emotion) face.setEmotion(req.body.emotion);
          if (req.body.isTalking != face.isTalking) face.setTalking(req.body.isTalking);
          if (req.body.eyeState != face.getEyeState()) face.setEyeState(req.body.eyeState);
          res.json(face.getState());
      });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('API running on port ' + port);

pageServer = httpServer.createServer({
        root: ".",
        robots: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        }});
pageServer.listen(webPort);

console.log('Page running on port ' + webPort);