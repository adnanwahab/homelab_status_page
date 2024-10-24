const { EgressClient, RoomCompositeEgressRequest } = require('livekit-server-sdk');
import { spawn } from "bun";
const { exec } = require('child_process');
const { execSync } = require('child_process');
import { $ } from "bun";
import { renderToString } from "react-dom/server";
import React from "react";
import Bun from 'bun'
const { spawn } = require("child_process");
import Blag from "./blag.jsx";
//import RoboticsOdyssey from "views/odyssey/robotics-odyssey.tsx";
import fs from "fs";
import path from "path";
import { watch } from "fs";
import { connect_to_livekit } from './bun_handlers/bun-livekit-server.js'
import llamaRoutes from './bun_handlers/llama-backend.jsx'
import CgiRoutes from './bun_handlers/cgi-backend.js'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexHtmlPath = path.resolve(__dirname, 'views', 'index.html');
console.log('indexHtmlPath', indexHtmlPath)
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
import LlamaGrid from './llama-grid.tsx';
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

// const egressClient = new EgressClient(livekitHost, apiKey, apiSecret);
// // https://dev.twitch.tv/docs/api/
// //microbox + microsaur -
// //localhost -> connects to tailscale serve / funnel -> auto symlink to mothership - 4pb desktopx4
// async function startEgress() {
//   const request = RoomCompositeEgressRequest.fromPartial({
//     roomName: 'example-room',
//     layout: 'speaker-dark',
//     audioOnly: true,
//     fileOutputs: [
//       {
//         fileType: 'OGG', // LiveKit supports OGG for audio-only recordings
//         filepath: '/audio.ogg',
//       },
//     ],
//   });

//   const response = await egressClient.startRoomCompositeEgress(request);
//   console.log('Egress started with egress ID:', response.egressId);
//   return response.egressId
// }


// Resolve the path to index.html


function serveLlamaTools(req: Request) { 
  const content = indexHtmlContent + renderToString(<LlamaGrid />) //+ 'miranda';
  return new Response(content, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}




const CgiRoutesHandlers = Object.fromEntries(
  Object.entries(CgiRoutes).map(([key, value]) => [`/cgi-tools${key}`, value])
);

const llamaRoutesHandlers = Object.fromEntries(
  Object.entries(llamaRoutes).map(([key, value]) => [`/llama-tools${key}`, value])
);
//fn.name and 1m list of functions - each one cool - eval each for usefulness - find all fn in bun,py,etc --- be safe with CRIU any other kernel extension research papers like jetpack_nix
//log every shell exec, and  thing carefully and make infrastrcture easy to restart (immutable important parts + highly dynamicland parts)
// async function os_automation(req: Request) { 
//   const cmd =  new URL(req.url).searchParams.get('cmd');
//   // const is_safe = await Bun.$(`ollama prompt "is this command safe to run on my computer? - estimate "`).text();  
//   // if (is_safe.toLowerCase().includes("no")) {  // add error why?? 
//   //   return new Response(`command seems not safe sorry, email eggnog.wahab@gmail.com or text '+1 (346) 697-0747 ' with this timestamp ${Date.now()}`, { status: 400 });
//   // }
//   // place hodler - b4 + after - criu - 
//   //return new Response(await Bun.$`${cmd}`.text());

//   return new Response(`tbc`)
// }


async function os_automation(req) {
  const { method } = req;

  // Handle OPTIONS requests for CORS preflight
  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204, // No Content
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // https://bun.sh/docs/api/file-system-router
    // Ensure the request method is correct
    if (req.method !== "POST") {
      console.log("Invalid request method. POST expected.");
    }

    // Check if request body exists
    if (!req.body) {
      console.log("No request body found");
    }


  //console.log('req', req)
  const jsonData = await req.json().catch(err =>  console.log('shits fucked', err) );

  console.log(' os jsonData', jsonData.cmd);

  //$.escape (escape strings)

  const { stdout, stderr, exitCode } = await $`${jsonData.cmd}`
      .quiet()
      .nothrow()
     
      const data = { stdout, stderr, exitCode }
      

    const _ = require('lodash');

    const responseValue = _.mapValues(data, value => value.toString());
    return new Response( JSON.stringify(responseValue), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  //console.log('req', req);
  // console.log('os_automation');
  // let jsonData;
  // try {
  //   
  // } catch (error) {
  //   console.error('Error parsing JSON:', error);
  //   return new Response('Invalid JSON input', { status: 400 });
  // }
  // console.log('jsonData', jsonData);

  // const cmd = jsonData?.cmd;
  // if (!cmd) {
  //   return new Response('No command provided', { status: 400 });
  // }

  // try {
  //   

  //   const data = { stdout, stderr, exitCode };
//
  // } catch (error) {
  //   console.error('Error executing command:', error);
  //   return new Response('Error executing command', { status: 500 });
  // }
}

// steps -> dist bundle -> store those in intermediate impresiteaont

async function serveVite(req: Request) { 
  const targetUrl = `http://localhost:8001}`;
  const response = await fetch(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.body
  });

  const headers = new Headers(response.headers);
  headers.set('X-Proxy-By', 'course_handler');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}


function serve404(req: Request) { 
  return new Response(`404 - not found`, { status: 404 });
}

async function livekit_connect(req: Request) { 
  const jsonData = await req.json();
console.log('Received JSON data:', jsonData);

  const identity = jsonData.identity;
  if (!identity) {
    return new Response("Identity parameter is missing", { status: 400 });
  }

  const json = await connect_to_livekit(jsonData);
  console.log(json, json);
    return new Response(JSON.stringify(json));
}

const routes = {
  "/livekit_connect": (req: Request) => livekit_connect(req),
  //vr if done 
  ///"/os/*": (req: Request) => os_automation(req),
  
  "/docs": (req: Request) => docs_response(routes),
  "/": (req: Request) => serveBlag(req),
  "/robotics-odyssey": (req: Request) => serveRoboticsOdyssey(req),
  "/blag": (req: Request) => serveBlag(req),
  "/llama-tools": (req: Request) => serveLlamaTools(req),
  "/cgi-tools": (req: Request) => serveCgiTools(req),
  "/vite/*": (req: Request) => serveVite(req),
  "404": (req: Request) => serve404(req),
  ...CgiRoutesHandlers,
  ...llamaRoutesHandlers
 }
// DWIM  agents ----- psobiltis

const docs_response = (routes) => { 
  const routes_links = Object.keys(routes).map(
    key => `<li><a href=${key}>${key}</a></li>`
  );
  const content = `<html><body>docs - please thank you
${routes_links.join("\n")}
</body></html>`


return new Response(content, {
  headers: {
    "Content-Type": "text/html",
  },
});
}

function serveCgiTools(req: Request) { 
  return  docs_response(CgiRoutes)
}

// convert all books to music videos - read aloud + show diagrms - interactive if psosibel 
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
function webhook(req: Request) { 
  //console.log('webhook', req)
  return new Response('webhook')
}

async function proxy(req: Request) {
   const url = new URL(req.url);   
   console.log('url', url.pathname)
   if (url.pathname.startsWith("/webhook")) return webhook(req)
   

  //  if (url.pathname.startsWith("/_not_vite")) {
  //    const targetUrl = `http://localhost:8001${url.pathname}`;

  //    try {
  //      const response = await fetch(targetUrl, {
  //        method: req.method,
  //        headers: req.headers,
  //        body: req.method !== "GET" && req.method !== "HEAD" ? req.body : null,
  //      });

  //      // Create a new response with the original body but new headers
  //      const newResponse = new Response(response.body, {
  //        status: response.status,
  //        statusText: response.statusText,
  //        headers: new Headers(response.headers),
  //      });

  //      // Remove any problematic headers
  //      newResponse.headers.delete('content-encoding');
  //      newResponse.headers.delete('content-length');

  //      return newResponse;
  //    } catch (error) {
  //      console.error('Error proxying to Vite server:', error);
  //      return new Response('Error proxying request', { status: 500 });
  //    }
  //  }




   //if (url.pathname.startsWith("/webhook")) return webhook(req);
   if (url.pathname.startsWith("/os_automation")) return os_automation(req);

    if (url.pathname.startsWith("/api/save_audio_to_whisper")) return save_audio_to_whisper(req);
   //console.log('url.pathname', url.pathname.startsWith("/llama_backend"), url.pathname)
//    let pathy = url.pathname 

//    const isDeno = pathy.slice(1,5) === 'deno';
// console.log('pathy', pathy)
//    if (isDeno) { 
//     console.log('Proxying to Deno server');
//     const targetUrl = `http://localhost:3000${pathy}`;

//     try {
//       const response = await fetch(targetUrl, {
//         method: req.method,
//         headers: req.headers,
//         body: req.method !== "GET" && req.method !== "HEAD" ? req.body : null,
//       });

//       // Create a new response with the original body but new headers
//       const newResponse = new Response(response.body, {
//         status: response.status,
//         statusText: response.statusText,
//         headers: new Headers(response.headers),
//       });

//       // Remove any problematic headers
//       newResponse.headers.delete('content-encoding');
//       newResponse.headers.delete('content-length');

//       return newResponse;
//     } catch (error) {
//       console.error('Error proxying to Deno server:', error);
//       return new Response('Error proxying request', { status: 500 });
//     }
//   }  /// move to file

   

    if (routes[url.pathname]) { //handles all HTTPS JSON regular bear routes
      return routes[url.pathname](req)
    }

    //console.log('url.pathname', url.pathname, url.pathname.startsWith("/proxy"))
    //llama in the request handler ?!??!?! 
    if (url.pathname.startsWith("/proxy")) {
      const targetUrl = url.pathname.replace("/proxy", "");
      if (targetUrl === "") { 
        return new Response("how to proxy??? - try /proxy/https://google.com", {
          headers: {
            "Content-Type": "text/html",
          },
        });
      }
     
    }



// console.log('404 has occured :(', fs.writeFileSync('/home/adnan/derp/intermediate_representation/404_routes.json', JSON.stringify(routes)))
//if 404 - write to json - observlbe scheudle 10min - gen all routes - 1 secon 500 seconds -90 moduels - 5 demos each - guitar ---- coolest 

}

// (nanosaur factory)
// peteer attia - rhonda patrick ----- bill nye

const port = 8080;
async function main() {
  Bun.serve({
    port,
    fetch: proxy,
    // websocket: handle_websocket
  });
}
//console.log('compile time checks: ' ,'typeof default_response === string' , typeof default_response === 'string');
main();
console.log("Server running at http://localhost", port);

async function serveRoboticsOdyssey(req: Request) { 
  //const component_name = "views/odyssey/index.html"
  return new Response('', {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
// writers are thinks, coders a thinkers, designers are ithnks ->>>> use your instrument of MIND > GOD 
function serveBlag(req: Request) { 
  
//  const pathname = `/home/adnan/homelab_status_page/web-ui/views/llama-tools/livekit_speech_to_fn_call.html`

  //const previous_filePath = path.join(process.cwd(), "views/odyssey/blag.html");
  let indexHtmlContent = fs.readFileSync(path.resolve(__dirname, './views/blag.html'), "utf-8");

  const blag = indexHtmlContent.replace(
    "{{template blag}}",
    `${renderToString(<Blag />)}`,
  );

  return new Response(blag, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}




function makeReactApp(component_name) {
  const filePath = path.join(__dirname, component_name);

  let indexHtmlContent = fs.readFileSync(filePath, "utf-8");

      //const App = () => <RoboticsOdyssey />;
      const App = () => { return <div>course_handler</div> }
      let html = indexHtmlContent.replace(
        "{{template roboticsodyssey}}",
        `${renderToString(<App />)}`,
      );
      return html
}

//tic tac toe not stephane and anyone who blah -> they have to recruit the most knowleable  they  know
// iq lead weight , hardw ork = gem stones ?

///robots nee dt o browweserewb - how else will they know when law changes a --- are they suppseod to wait for some guy to look it up and doit ?!?!?! 
// geofences shure but what about liek what kylge
//augment reflect -> okay[ ], good[] , better[]  ----- pefect - tomorow ???? 5 impossibel things before preakfeast 
//figure out atuhenticaitors - try anyone 0 make own - make fulxu QR vodce

//rainbow amaterasu --  no golden path ------ 
//404 that llamas - and says """wrong route friend, hwodd you get here??? also did you mean?? coundown 5 sconds -> aut oroute to most porbable - prediction "
//tools that predict not obey -> people that predictionot obey their nature and the world 
//https://underscorejs.org/underscore-esm.js


// async function static_files(req: Request) {
//   const url = new URL(req.url);    
//   //const files = fs.readdirSync(url.pathname.slice(1));
//   let dir_name = path.join(process.cwd(), url.pathname.slice(1));
//   console.log(dir_name);
//   console.log("Current working directory:", process.cwd());
//   const stats = fs.statSync(dir_name);
//   //dont duplicate - if is direcory - readisync - if its a file - split and then read-dir-sync
//   if (stats.isDirectory()) {
//     const files = fs.readdirSync(dir_name);
//     return new Response(`Files in user_code: ${files.join(", ")}`, {
//       headers: {
//         "Content-Type": "text/plain",
//       },
//     });
//   }
//   return new Response(Bun.file(dir_name));
// }
// the intelillgence age is here - and the repsonsibliey of intellegnetn peple is to use it 
// alan - everyoen has infintie intleigenice ive thoguht this isince 5 years old - sister disagreeed -  show sister this 
// your were one of the msartest girls ive met - just used it for emotional intelligence because thats why you liked 
//-read sneuro -  



//live in a magical scientifc mystery.