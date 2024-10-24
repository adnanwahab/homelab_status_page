import { Context, Hono } from 'hono'
import { html } from 'hono/html'
import { AccessToken } from "livekit-server-sdk";
import odyssey from './robotics-odyssey.jsx'
import grid from './llama-tools.jsx'
import fs from 'fs'
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { basicAuth } from 'hono/basic-auth';
import { etag } from 'hono/etag';
import { serveStatic } from 'hono/serve-static';
import { jwt } from 'hono/jwt';
import { cors } from 'hono/cors';
import * as utils from './utils.js'
const app = new Hono()
import Sister_schools from './odyssey/sisterschools.tsx'
app.use(logger())
app.onError((err, c) => {
  console.error(err); // Log the error for debugging
  const errorMessage = {
    message: err.message,
    stack: err.stack, // Include stack trace for line numbers
    // You can add more details here if needed
  };
  return c.json(errorMessage, 500); // Send a JSON response with the error details
});
// specify path
app.use('*', cors())
app.all('/llama-tools', (c) => {
  return c.html( fs.readFileSync('./src/llama-tools/llama-tools.html', 'utf8'))
})
app.all('/odyssey*', (c) => {
  const is_html = odyssey()
  return c.html(utils.Layout(is_html))
})
//app.use('/static/*', serveStatic({ root: './src' }))


app.all('/iframe/*', (c) => {
  let basename = c.req.path.split('/').pop()
  console.log('basename', basename)
  let html = ''
  if (basename == 'livekit_audio.html') {
      html = fs.readFileSync('./src/llama-tools/livekit_audio.html', 'utf8')
  }
  if (basename == 'livekit_view_all.html') {
    html = fs.readFileSync('./src/llama-tools/livekit_view_all.html', 'utf8')
  } 
   if (basename == 'livekit_share.html') {
    html = fs.readFileSync('./src/llama-tools/livekit_share.html', 'utf8')
  }

  if (basename == 'replay_analyzer.html') {
    html = fs.readFileSync('./src/llama-tools/replay_analyzer.html', 'utf8')
  }
  return c.html(html)
})


app.all('/view_all', (c) => {
  let html = fs.readFileSync('./src/llama-tools/livekit_view_all.html', 'utf8')
  return c.html(html)
})

app.all('/share', (c) => {
  let html = fs.readFileSync('./src/llama-tools/livekit_share.html', 'utf8')
  return c.html(html)
})

app.all('/', async (c) => {
  return c.html(fs.readFileSync('./src/llama-tools/blag.html', 'utf8'))
})

app.all('/views/*', async (c) => {
  console.log(c.req.path)

  const html = fs.readFileSync('src/'+c.req.path, 'utf8')
  return c.html(html)
})

// app.get('/api/replay_analyzer', (c) => c.json({'Pretty Blog API': 1}));
console.log('app', 'hono', Date.now())

app.fire()
export default app

//app.get('/api/magic_llama', (c) => c.json({'Pretty Blog API': 1}));
//app.get('/api/measure_magic_llama', (c) => c.json({'Pretty Blog API': 1}))

const apiKey = process.env.LIVEKIT_API_KEY
const apiSecret = process.env.LIVEKIT_API_SECRET
const wsUrl = process.env.LIVEKIT_WS_URL
app.post('/livekit_connect', async (c) => {
  console.log('livekit_connect');

  // Identity creation with timestamp to avoid conflicts
  const jsonData = { identity: 'voice to prompt?' + Date.now() };
  const identity = jsonData.identity;

  if (!identity) {
    return c.text("Identity parameter is missing", 400);
  }

  // Connecting to LiveKit
  const json = await connect_to_livekit(jsonData);
  console.log('Generated token and wsUrl:', json);

  return c.json(json);
});

// Function to generate token and connect to LiveKit
async function connect_to_livekit(options: { identity: string }) {
  console.log("options", options);

  // Default identity if not provided
  if (!options.identity) {
    options.identity = 'anonymous' + Math.random().toString(36).substring(2, 15);
  }

  // Creating a new AccessToken
  const token = new AccessToken(apiKey, apiSecret, {
    identity: options.identity,
  });

  // Add grant to the token (e.g., room access)
  token.addGrant({
    room: "example-room",  // Replace with your actual room name
    roomJoin: true,
    canPublish: true,
  });

  // Generate the JWT token
  const jwt = await token.toJwt();

  // Return token and WebSocket URL
  return { token: jwt, wsUrl };
}

// Starting the server
app.fire();

// -- obs_react_notebook_component -- 10 stars - make 
//3d css react tw



// john dinu - queueing theory
