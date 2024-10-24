import { spawn } from 'child_process';
const fs = require('fs');
const buns = []
const port = 3333;
//const parlay_to_vite = make_parlay('bun')
//const parlay_to_api = make_parlay(3002, 'bun', 'js/bun-helper-server.tsx')

const cpus = navigator.hardwareConcurrency; // Number of CPU cores


Bun.serve({
  websocket: make_ws(),
  port,
  fetch(req) {
    //console.log('fetch', req)
    const url = new URL(req.url);
    console.log('bun-main', url.pathname)
  
    if (url.pathname === '/favicon.ico') {
      return new Response(null, { status: 404 });
    }
  if (url.pathname.startsWith('/api')) return parlay_to_api(req, url)
  else 
  return parlay_to_vite(req, url)
  
  }, 
});
console.log("server running on port", port);


 function make_ws ()  {
  return { 
  open(ws) { console.log("WebSocket connection opened"); },
  message(ws, message) { console.log("Received message:", message) },
  close(ws, code, message) { console.log("WebSocket connection closed"); },
  }
}

 function make_parlay(process_name) {
  const bunHelperServer = startBunHelperServer(process_name, false)
  buns.push(bunHelperServer);

  return async function (req, url) {
    console.log('parlay', url, port)
    url.port = port; // Forward to Vite server's port
    url.hostname = "localhost"; // Assuming Vite is running locally
    
    const response = await fetch(url.toString(), {
      method: req.method,
      headers: req.headers,
      body: req.body,
      duplex: 'half', // Necessary for streaming request bodies
    });

  return response;
  }
}

function startBunHelperServer(bun_name, other_args) {
  const bunHelperServer = spawn(bun_name, [...other_args], {
    stdio: 'inherit',
  });

  bunHelperServer.on('close', (code) => {
    console.log(`bun-helper-server.tsx process exited with code ${code}`);
  });

  bunHelperServer.on('error', (err) => {
    console.error('Failed to start bun-helper-server.tsx:', err);
  });
  return bunHelperServer
}


async function parlay_to_vite(req, url) {
  console.log('parlay', url, port)
  url.port = 8002; // Forward to Vite server's port
  url.hostname = "localhost"; // Assuming Vite is running locally
  
  const response = await fetch(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body,
    duplex: 'half', // Necessary for streaming request bodies
  });

return response;
}

async function parlay_to_api(req, url) {
  //console.log('parlay', url, port)
  url.port = 3002; // Forward to Vite server's port
  url.hostname = "localhost"; // Assuming Vite is running locally
  
  const response = await fetch(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body,
    duplex: 'half', // Necessary for streaming request bodies
  });

return response;
}