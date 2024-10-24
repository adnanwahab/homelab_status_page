import { serve } from 'bun';
import { connect_to_livekit } from '../bun-livekit-server';
import { AccessToken } from "livekit-server-sdk";
const port = 8888;
const apiKey = "APIXi25c9hddrpj";
const apiSecret = "1HfgfXWoORWUUN5jM0SxUcLjiGa4HqXJPKZKcvyjkNi";
const wsUrl = "wss://omnissiah-university-kmuz0plz.livekit.cloud";
serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    // Set CORS headers to allow requests from specific origins
    const allowedOrigins = [
      'https://roboticsuniversity.static.observableusercontent.com',
      'https://jupyter.hashirama.blog'
    ];

    const origin = req.headers.get('Origin');
    if (allowedOrigins.includes(origin)) {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    const { token, wsUrl } = await connect_to_livekit(apiKey, apiSecret);  

    console.log("path asdfs", token, wsUrl);

    return new Response(JSON.stringify({ token, wsUrl }), {
      headers: { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'      
          }
    });
  },
});

//most apologetic + dilligent.
async function connect_to_livekit(apiKey, apiSecret, ) {
  const token = new AccessToken(apiKey, apiSecret, {
    identity: "math.random()" + Math.random(),
  });
  token.addGrant({
    room: "example-room",
    roomJoin: true,
    canPublish: true,
  });
  const jwt = await token.toJwt();

  return { token: jwt, wsUrl };
}

console.log(`Server is running at as  http://localhost:${port}`);

