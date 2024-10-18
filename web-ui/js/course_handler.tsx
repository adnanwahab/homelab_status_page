// server.js
import { renderToString } from "react-dom/server";
import React from "react";
import { serve } from "bun";


//import RoboticsOdyssey from "views/odyssey/robotics-odyssey.tsx";
import fs from "fs";
import path from "path";
import { watch } from "fs";

import { connect_to_livekit } from './bun_handlers/bun-livekit-server.js'


// let routes = {
//   framesplitter: "views/framesplitter",
//   css_webgl_animation_from_paper_image:
//     "views/css_webgl_animation_from_paper_image",
//   make1e9jobs: "views/make1e9jobs",
//   vr_ghost_in_shell: "views/vr_ghost_in_shell",
//   object_search: "views/object_search",
//   particles: "views/particles",
//   cloud_flare: "views/cloud_flare",
//   perspective_transformation: "views/perspective_transformation",
//   "bumble-flow": "views/bumble-flow",
//   "jsonp-yt-instant-everything": "views/jsonp-yt-instant-everything",
//   "request-5k": "views/request-5k",
//   all_tools_in_obs: "views/all_tools_in_obs",
//   ffmpeg_vid_to_img: "views/ffmpeg_vid_to_img",
//   portfolio: "views/portfolio",
// };




//export default html;

function makeReactApp() {
  const filePath = path.join(__dirname, "views/odyssey/index.html");

let indexHtmlContent = fs.readFileSync(filePath, "utf-8");

      //const App = () => <RoboticsOdyssey />;
      const App = () => { return <div>course_handler</div> }
      let html = indexHtmlContent.replace(
        "{{template roboticsodyssey}}",
        `${renderToString(<App />)}`,
      );
      return html
}

const { spawn } = require("child_process");


function docker_run(){ 
  const containerName = "zed2i-container";
  const imageName = "<zed-container>";  // Replace with your ZED Docker image
  
  const dockerRunArgs = [
    "run", 
    "--rm",
    "--runtime", "nvidia",
    "--gpus", "all",
    "--network", "host",
    "--env", "DISPLAY=$DISPLAY",
    "--volume", "/tmp/.X11-unix:/tmp/.X11-unix:rw",
    "--device", "/dev/video0", // Adjust if using another device
    "--name", containerName,
    imageName,
    "/bin/bash"
  ];
  
  console.log("Starting Jetson container for ZED 2i...");
  
  const dockerProcess = spawn("docker", dockerRunArgs);
  
  dockerProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
  
  dockerProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  
  dockerProcess.on("close", (code) => {
    console.log(`Docker process exited with code ${code}`);
  });

}

async function handle_livekit_connect(req: Request) { 
  const identity = url.searchParams.get("identity");
  if (!identity) {
    return new Response("Identity parameter is missing", { status: 400 });
  }

  const json = await connect_to_livekit();
  console.log(json, json);
    return new Response(JSON.stringify(json));
}

async function serveRoboticsOdyssey(req: Request) { 
  return new Response(makeReactApp(), {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

async function serveMakeBunCell(req: Request) { 
  //console.log("serveMakeBunCell", req);
    if (req.method === "OPTIONS") {
      return new Response(null, {
          status: 204, // No Content
          headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
          },
      });
  }

  // If not OPTIONS, process the actual POST request
  if (req.method === "POST") {
      const json = await req.json();
      console.log("Received JSON:", json);
      // Process your POST request here
      const bun_code = json.bun_code;
    if (!bun_code) {
          return new Response("bun_code parameter is missing", { status: 400 });
        }

      try {
        // Use the Function constructor to execute the template string safely
        const result = new Function(bun_code)(fs);
        console.log("Execution result:", result);
      } catch (error) {
        console.error("Error executing bun_code:", error);
        return new Response("Error executing bun_code", { status: 500 });
      }


      return new Response("Bun cell processed", { status: 200 });
  }




  // try {
  //   const json = await req.json();
  // } catch (error) {

  //   console.error("Error parsing JSON:", error);
  //   return new Response("Invalid JSON in request body", { status: 400 });
  // }
    // const bun_code = json.bun_code;
   
    // console.log("Received bun_code:", bun_code);

    // Process the bun_code here
    // For now, we'll just return a placeholder response
    return new Response("Method not allowed", { status: 405 });

    return new Response("make bun cell", {
      headers: {
        "Content-Type": "text/html",
      },
    });

}

async function make_docs(req: Request) { 
  return new Response("make_docs", {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

const routes = {
  //"/": (req: Request) => make_docs,
  "/livekit_connect": (req: Request) => handle_livekit_connect(req),
  "/robotics-odyssey": (req: Request) => serveRoboticsOdyssey(req),
  "/make-bun-cell": (req: Request) => serveMakeBunCell(req),
 }
const routes_links = Object.keys(routes).map(
  key => `<li><a href=${key}>${key}</a></li>`
)

 const default_response = `<html><body>docs - please thank you
 

${routes_links.join("\n")}

 </body></html>`


 console.log('compile time checks: ' ,'typeof default_response === string' , typeof default_response === 'string');
async function proxy(req: Request) {
   const url = new URL(req.url);    
   console.log("req url", url.pathname);
    // if (url.pathname === "/") return routes["/"](req)

  //   if (url.pathname === '/livekit_connect') return handle_livekit_connect(req)
  
  //   if (url.pathname === "/robotics-odyssey") return routes["/robotics-odyssey"](req)

      if (url.pathname === "/make-bun-cell") return routes["/make-bun-cell"](req)

  // if (url.pathname === "/sse") {}

  // return routes["/"](req)
  return new Response(default_response, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}


const port = 8080;
async function main() {
  serve({
    port,
    fetch: proxy,
  });
 
}
main();

console.log("Server running at http://localhost", port);
