import dotenv from "dotenv";

async function connect_to_livekit(options) {
  console.log("options", options);
  //if (!options.identity) throw new Error("requester must have an identity");
  if (!options.identity) {
    options.identity = 'anonymous' + Math.random().toString(36).substring(2, 15);
  }
  const token = new AccessToken(apiKey, apiSecret, {
    identity: options.identity,
  });
  token.addGrant({
    room: "example-room",
    roomJoin: true,
    canPublish: true,
  });
  const jwt = await token.toJwt();

  return { token: jwt, wsUrl };
}

export { connect_to_livekit };
// observable is the mueseum the wizards talked about
// see a canvas - add to it


const { EgressClient, RoomCompositeEgressRequest } = require('livekit-server-sdk');
import { spawn } from "bun";

//import {$} from "bun";
//op item list --vault=personal --tags=api --format json
//more tab - auto complete for everything - this repo coudl be good stdlib for robutts - for obs,toolchain(5things linux,go,zig,bun,python,C++,5apis,5apps) -- (english+diagrams) can gen the first 15.
//const api_keys = await $`op item list --vault=personal --tags=api --format json`.json()


// const api_keys = await new Promise((resolve, reject) => {
//   const proc = spawn(["op", "item", "list", "--vault=personal", "--tags=api", "--format", "json"]);
//   let output = "";

//   proc.stdout.on("data", (chunk) => {
//     output += chunk;
//   });

//   proc.on("close", () => {
//     try {
//       resolve(JSON.parse(output));
//     } catch (error) {
//       reject(error);
//     }
//   });

//   proc.on("error", (err) => {
//     reject(err);
//   });
// });

// const livekitHost = api_keys.find(item => item.name === 'LIVEKIT_WS_URL').value
// const apiKey = api_keys.find(item => item.name === 'LIVEKIT_API_KEY').value
// const apiSecret = api_keys.find(item => item.name === 'LIVEKIT_API_SECRET').value
//looking for best practices in mmphenomena --- because that was in importnati in games and cartoons.
//best practice in robotics engineerng - idk?

// const livekitHost = process.env.OPEN_AI_KEY
// const apiKey = process.env.LIVEKIT_API_KEY
// const apiSecret = process.env.LIVEKIT_API_SECRET

const egressClient = new EgressClient(wsUrl, apiKey, apiSecret);
// https://dev.twitch.tv/docs/api/
//microbox + lamasaur - homeage to nanosaur.ai (nanosaur w/ pi)
//localhost -> connects to tailscale serve / funnel -> auto symlink to mothership - 4pb desktopx4
async function startEgress() {
  const request = RoomCompositeEgressRequest.fromPartial({
    roomName: 'example-room',
    layout: 'speaker-dark',
    audioOnly: true,
    fileOutputs: [
      {
        fileType: 'OGG', // LiveKit supports OGG for audio-only recordings
        filepath: '/audio.ogg',
      },
    ],
  });

  const response = await egressClient.startRoomCompositeEgress(request);
  console.log('Egress started with egress ID:', response.egressId);
  return response.egressId
}

export { startEgress }

async function startEgress(roomName) {
  const { EgressClient, RoomServiceClient } = require('livekit-server-sdk');
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.LIVEKIT_WS_URL;

  const egressClient = new EgressClient(wsUrl, apiKey, apiSecret);
  const roomService = new RoomServiceClient(wsUrl, apiKey, apiSecret);

  const request = {
    room_name: roomName,
    // Directly specify the 'file' property here
    file: {
      filepath: `./screen-share.mp4`, // Ensure this path is valid and writable
    },
  };
  try {
    const response = await egressClient.startRoomCompositeEgress(request);
    console.log('Egress started successfully. Response:', response);
  } catch (error) {
    console.error('Error starting egress:', error);
  }
}

async function livekit_connect(req: Request) { 
  const jsonData = {identity: 'voice to prompt?' + Date.now()}
    const identity = jsonData.identity;
    if (!identity) {
      return new Response("Identity parameter is missing", { status: 400 });
    }
  
    const json = await connect_to_livekit(jsonData);
    console.log(json, json);
      return new Response(JSON.stringify(json));
  }
  

export { livekit_connect }



async function save_audio_to_whisper(req: Request) {
  console.log('save_audio_to_whisper called');

  try {
    // Check if the request method is POST
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Get the content type
    const contentType = req.headers.get('content-type');

    let data;
    if (contentType && contentType.includes('application/json')) {
      // If it's JSON data
      data = await req.json();
    } else if (contentType && contentType.includes('multipart/form-data')) {
      // If it's form data (e.g., file upload)
      const formData = await req.formData();
      data = Object.fromEntries(formData);
    } else {
      // For other content types, try to read as text
      data = await req.text();
    }

    console.log('Received data:', data);

    // Process the data (this is where you'd implement your whisper logic)
    // For now, we'll just echo back the received data
    return new Response(JSON.stringify({ message: 'Data received', data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in save_audio_to_whisper:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}