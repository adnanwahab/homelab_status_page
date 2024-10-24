const staticDir = join("static/");
import { join } from "node:path";
const fs = require("fs");
const path = require("path");
import React from "react";
import { renderToString } from "react-dom/server";
import { identity, continuous_eval, serve_proxy_docs_regular_iframe, save_livekit_data, response_404, serveOutlierAgent, serveOptimizelyPlaywrightSupervision, serveMakeBunCell, serveMakeDenoCell, serveMakePythonCell } from '../bun_main_server.tsx';
import serveMakeDenoCell from './serveMakeDenoCell.ts'
import serveMakePythonCell from './serveMakePythonCell.ts'
import serveMakeBunCell from './bun_helper.ts'
import docker_run from './docker_helper.ts'

  //const identity = url.searchParams.get("identity");
  //console.log('identity', identity)
  // console.log("req url", url.pathname);
// if (url.pathname === "/blag" || url.pathname === "/") return routes["/blag"](req)
//  if (url.pathname === "/docs") return response_404(req)
// if (url.pathname === '/livekit_connect') return handle_livekit_connect(req)  
// if (url.pathname === "/robotics-odyssey") return routes["/robotics-odyssey"](req)
// if (url.pathname == '/favicon.ico') return new Response(Bun.file('public/images/favicon.svg'))
//   //web-ui/public/images/favicon.svg//
// if (url.pathname === "/make_bun_cell") return routes["/make_bun_cell"](req)
// if (url.pathname === "/make_deno_cell") return routes["/make_deno_cell"](req)
// if (url.pathname === "/make_python_cell") return routes["/make_python_cell"](req)
// if (url.pathname.includes("/user_code")) return static_files(req)
// if (url.pathname === "/archive") return routes["/archive-blog"](req)
//if (url.pathname === "/obs-zed-prediction-mode") return routes["/llama-tools"](req) --- FOUNDATION -> RE_READ -> convert the tv show to graphic novel - guyaka girls
// if (url.pathname === "/llama-tools") return routes["/llama-tools"](req)
// if (url.pathname === "/llama-tools") return routes["/llama-tools"](req)
// if (url.pathname === "/cgi-tools") return routes["/cgi-tools"](req);
//if (url.pathname === "/science-tools*") return new Response("sciente-tools")  // redictrect - to all users contribute anytihn they wantnt //?! - they nsicee odnt 
// if (url.pathname === "/manifest.json") {
//   return new Response(JSON.stringify({"IDK":10}), {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
// try gpt then just redirect to 3 bun rpoceses in one bun file - started by systemd - a script... like levles 
// delete new relic 
//return response_404(routes)

async function history_search(req: Request) { 
  // const jsonData = await req.json();
  // console.log('Received JSON data:', jsonData);
}

const routes = {
  "/iframe_for_bret_victor": () => {
    return new Response(JSON.stringify({
      url: "https://worrydream.com"
    }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  "/progress_to_archiving_all_of_worryDream": () => {
    return new Response(JSON.stringify({
      progress: 0.1,
      total_disk_usage: "unknown" // Replace "unknown" with the actual disk usage if available
    }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    },

    "/private_trackers_web_torrent_apply_creative_ai_to_all_of_it": (req: Request) => history_search(req),


  "/history_search": (req: Request) => history_search(req),

  //"/livekit_connect": (req: Request) => livekit_connect(req),

  "/livekit_speech_to_fn_call": livekit_speech_to_fn_call,

  '/livekit_screenshare': () => {

    

    //let pathname = join(process.cwd(), 'views', 'llama-tools', 'screenshare.html')
    const pathname = `/home/adnan/homelab_status_page/web-ui/views/llama-tools/screenshare.html`
    console.log('pathname', pathname)
    const html = fs.readFileSync(pathname, 'utf8');

    /// view all 
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },

  '/view_all_screenshares': () => {

    //let pathname = join(process.cwd(), 'views', 'llama-tools', 'screenshare.html')
    const pathname = `/home/adnan/homelab_status_page/web-ui/views/llama-tools/view_all_screenshares.html`
    console.log('pathname', pathname)
    const html = fs.readFileSync(pathname, 'utf8');

    /// view all 
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
  "/_private_routes_for_local_host": livekit_speech_to_fn_call,

  "/cognition_engine": () => new Response("blahblah"),
  "/replay_analyzer": () => new Response("blahblah"),
  "/logs_viewer": () => new Response("blahblah"),
  "/import_docs": () => new Response("blahblah"),
  "/script_obs": () => new Response("blahblah"),
  "/for_jp": () => new Response("blahblah"),
  "/index": () => new Response("blahblah"),
  "/api_docs": () => new Response("blahblah"),
  "/flirtflow": () => new Response("blahblah"),
  "/rich_hickey": () => new Response("blahblah"),
  "/fix-bot-ops-with-llama-tools": (req: Request) => identity(req),  //prediction
  "/continuous_eval": (req: Request) => continuous_eval(req),  //prediction
  "/vow_of_silence": (req: Request) => identity(req),
  "/serve_proxy_docs_regular_iframe": (req: Request) => serve_proxy_docs_regular_iframe(req),
  "/save-livekit-data": (req: Request) => save_livekit_data(req),
  "/docs": (req: Request) => response_404(req),
  "_outlier_agent": (req: Request) => serveOutlierAgent(req),
  "_optimizely_playwright_supervision": (req: Request) => serveOptimizelyPlaywrightSupervision(req),
  "/make_bun_cell": (req: Request) => serveMakeBunCell(req),
  "/make_deno_cell": (req: Request) => serveMakeDenoCell(req),
  "/make_python_cell": (req: Request) => serveMakePythonCell(req),
  "/fix-bot-ops-with-llama-tools": (req: Request) => identity(req),  //prediction
  "/continuous_eval": (req: Request) => continuous_eval(req),  //prediction
  "/vow_of_silence": (req: Request) => identity(req),
  "/serve_proxy_docs_regular_iframe": (req: Request) => serve_proxy_docs_regular_iframe(req),
  "/save-livekit-data": (req: Request) => save_livekit_data(req),
  "/docs": (req: Request) => response_404(req),
  "_outlier_agent": (req: Request) => serveOutlierAgent(req),
  "_optimizely_playwright_supervision": (req: Request) => serveOptimizelyPlaywrightSupervision(req),
  "/make_bun_cell": (req: Request) => serveMakeBunCell(req),
  "/make_deno_cell": (req: Request) => serveMakeDenoCell(req),
  "/make_python_cell": (req: Request) => serveMakePythonCell(req)
};
function serveOptimizelyPlaywrightSupervision() {
  //livekit webrtc the tab 
}
  // "eye_tracker": () => {},
  // "pose_estimation": () => {},
  // "sound-fx-dashboard": () => {},
  // "/serve_proxy_docs": (req: Request) => serve_proxy_docs(req),
 

// https://bun.sh/guides

//compile time check theese
//console.log('CgiRoutesHandlers', CgiRoutesHandlers)




//Response.json
//    return new Response(file("index.html"));
//    return Response.redirect("/redirected");


// doc = https://caddyserver.com/docs/

// vooting particles color 

function serve_proxy_docs(req: Request) { 
  const html_string = proxy_docs.map(doc => `<div><iframe src=${"/proxy/" + doc}></iframe></div>`).join("\n")
  console.log('html_string', html_string)

  return new Response(html_string, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

function serveOutlierAgent() {

}



function serve_proxy_docs_regular_iframe(req: Request) { 
  const html_string = proxy_docs.map(doc => `<div><iframe src=${doc}></iframe></div>`).join("\n")
  console.log('html_string', html_string)

  return new Response(html_string, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

const identity = (req: Request) => {} //agents please - code this
// import FlirtFlow from '../views/jsx/flirtflow'; // Adjust the path if necessary
function continuous_eval(req: Request) { 
  return new Response("continuous_eval", {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
const response_404 = () => { 
  return docs_response(routes)
}

const llamatoolsir = join("views", "llama-tools");

function App() {
  return <div>hello world</div>;
}

//export default App;
const save_livekit_data = (req: Request) => {
  const data = req.body;
  Bun.write('data.json', JSON.stringify(data, null, 2));
  return new Response('Data saved successfully', { status: 200 });
}

function livekit_speech_to_fn_call(req) {
  //what is rpc 
  //send audio p primary function -> use from app
  // from phone ---- speak -> 
  // send to server -> whisper -> find the function - call it -> schedules an gent 
 
    

    //let pathname = join(process.cwd(), 'views', 'llama-tools', 'screenshare.html')
    const pathname = `/home/adnan/homelab_status_page/web-ui/views/llama-tools/livekit_speech_to_fn_call.html`
    console.log('pathname', pathname)
    const html = fs.readFileSync(pathname, 'utf8');

    /// view all 
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
}



export default routes

// const path_maker = (route) => join(llamatoolsir, route + ".html");
// const goodOnesFiles = routes.map(path_maker);

// const compile_time_file_checker = (file) => {
//   return goodOnesFiles.includes(path_maker(file));
// };

// const filtered_good_ones_files = routes.filter(compile_time_file_checker);
// console.log("Files in goodOnesDir:", filtered_good_ones_files.length);
// console.log("filtered,  goodOnesFiles", compile_time_file_checker("index"));

// const render_page = (page_name) => {
//   console.log("page_name", page_name);
//   //if (page_name === 'flirtflow') {
//   const html = renderToString(<App></App>); // Change Render to FlirtFlowPanel
//   console.log("html", html);
//   return html;
//   //}

//   const page_path = path_maker(page_name);
//   if (filtered_good_ones_files.includes(page_name.replace("/", ""))) {
//     // Remove leading slash
//     return fs.readFileSync(page_path, "utf8");
//   } else {
//     return "404";
//   }
// };
// const port = 8004
// Bun.serve({
//   port: port,
//   async fetch(req) {
//     let url = new URL(req.url).pathname;
//     console.log("url", url);
//     if (url === "/") url = "index";
//     if (url.startsWith("/static")) {
//       // Remove .pathname
//       return Bun.file(join(staticDir, url.replace("/static", "")));
//     }
//     return new Response(render_page(url), {
//       headers: { "Content-Type": "text/html" },
//     });
//   },
// });

// console.log("running llama-backend on port " + port);
// const socket = new WebSocket('ws://your-websocket-server-url');

// // Event listener for when the connection is open
// socket.addEventListener('open', function (event) {
//     console.log('Connected to WebSocket server');
// });

// // Event listener for when a message is received from the server
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

// Event listener for when the connection is closed
// socket.addEventListener('close', function (event) {
//     console.log('Disconnected from WebSocket server');
// });

// // Event listener for when an error occurs
// socket.addEventListener('error', function (event) {
//     console.error('WebSocket error: ', event);
// });
