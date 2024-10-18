const { exec } = require('child_process');
import { renderToString } from "react-dom/server";
import React from "react";
import { serve } from "bun";
const { spawn } = require("child_process");
import Blag from "./blag.jsx";
//import RoboticsOdyssey from "views/odyssey/robotics-odyssey.tsx";
import fs from "fs";
import path from "path";
import { watch } from "fs";
import { connect_to_livekit } from './bun_handlers/bun-livekit-server.js'
import serveMakeDenoCell from './serveMakeDenoCell.ts'
import serveMakePythonCell from './serveMakePythonCell.ts'

import serveMakeBunCell from './bun_helper.ts'
import docker_run from './docker_helper.ts'

let cgi_tools = {
  framesplitter: "views/framesplitter",
  object_search: "views/object_search",

    // vr_ghost_in_shell: "views/vr_ghost_in_shell",

  // css_webgl_animation_from_paper_image:
  //   "views/css_webgl_animation_from_paper_image",
  // particles: "views/particles",
  // cloud_flare: "views/cloud_flare",
  // perspective_transformation: "views/perspective_transformation",
  // "jsonp-yt-instant-everything": "views/jsonp-yt-instant-everything",
  // all_tools_in_obs: "views/all_tools_in_obs",
  // ffmpeg_vid_to_img: "views/ffmpeg_vid_to_img",
};

function serveBlag(req: Request) { 
  const filePath = path.join(__dirname, "views/odyssey/blag.html");
  let indexHtmlContent = fs.readFileSync(filePath, "utf-8");

  const blag = indexHtmlContent.replace(
    "{{template blag}}",
    `${renderToString(<Blag />)}`,
  );
console.log(req.url);
  return new Response(blag, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}


const routes = {
  //"/": (req: Request) => make_docs,
  "/livekit_connect": (req: Request) => handle_livekit_connect(req),
  "/robotics-odyssey": (req: Request) => serveRoboticsOdyssey(req),
  "/make_bun_cell": (req: Request) => serveMakeBunCell(req),
  "/make_deno_cell": (req: Request) => serveMakeDenoCell(req),
  "/make_python_cell": (req: Request) => serveMakePythonCell(req),
  "/blag": (req: Request) => serveBlag(req),
  //...cgi_tools
 }
const routes_links = Object.keys(routes).map(
  key => `<li><a href=${key}>${key}</a></li>`
)

 const response_404 = `<html><body>docs - please thank you
 

${routes_links.join("\n")}

 </body></html>`

 async function static_files(req: Request) {
  const url = new URL(req.url);    
  //const files = fs.readdirSync(url.pathname.slice(1));
  let dir_name = path.join(process.cwd(), url.pathname.slice(1));
  console.log(dir_name);
  console.log("Current working directory:", process.cwd());
  const stats = fs.statSync(dir_name);
  //dont duplicate - if is direcory - readisync - if its a file - split and then read-dir-sync
  if (stats.isDirectory()) {
    const files = fs.readdirSync(dir_name);
    return new Response(`Files in user_code: ${files.join(", ")}`, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  return new Response(Bun.file(dir_name));
}

async function proxy(req: Request) {
   const url = new URL(req.url);    
   console.log("req url", url.pathname);
    // if (url.pathname === "/") return routes["/"](req)
    if (url.pathname === '/livekit_connect') return handle_livekit_connect(req)  
    if (url.pathname === "/robotics-odyssey") return routes["/robotics-odyssey"](req)
    if (url.pathname == '/favicon.ico') return new Response(Bun.file('public/images/favicon.svg'))

      //web-ui/public/images/favicon.svg//
    if (url.pathname === "/make_bun_cell") return routes["/make_bun_cell"](req)
    if (url.pathname === "/make_deno_cell") return routes["/make_deno_cell"](req)
    if (url.pathname === "/make_python_cell") return routes["/make_python_cell"](req)
    if (url.pathname.includes("/user_code")) return static_files(req)

    if (url.pathname === "/blag" || url.pathname === "/") return routes["/blag"](req)

      if (url.pathname === "/archive") return routes["/archive-blog"](req)

  return new Response(response_404, {
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
console.log('compile time checks: ' ,'typeof default_response === string' , typeof default_response === 'string');
main();
console.log("Server running at http://localhost", port);



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


async function make_docs(req: Request) { 
  return new Response("make_docs", {
    headers: {
      "Content-Type": "text/html",
    },
  });
}