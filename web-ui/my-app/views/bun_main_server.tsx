const port = 3333;

Bun.serve({
  websocket: {
    open(ws) {
      console.log("WebSocket connection opened");
    },
    message(ws, message) {
      console.log("Received message:", message);
      // Handle the WebSocket message here
      // You might want to forward this to your Vite server if needed
    },
    close(ws, code, message) {
      console.log("WebSocket connection closed");
    },
  },
  port, // The port your proxy server will listen on
  async fetch(req) {
    const url = new URL(req.url);
    url.port = "8001"; // Forward to Vite server's port
    url.hostname = "localhost"; // Assuming Vite is running locally

if (url.pathname === '/ollama') {
  return new Response(JSON.stringify({ message: 'ok' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

if (url.pathname.startsWith('/api')) {
  // return new Response(JSON.stringify({ message: 'ok' }), {
  //   headers: { 'Content-Type': 'application/json' },
  // });
  // Proxy the entire request to port 8080
  url.port = "8003"; // Forward to the server running on port 8080
  url.hostname = "localhost"; // Assuming the server is running locally

  try {
    // Forward the request to the server running on port 8080
    const response = await fetch(url.toString(), {
      method: req.method,
      headers: req.headers,
      body: req.body,
      duplex: 'half', // Necessary for streaming request bodies
    });

    return response; // Return the server's response to the client
  } catch (error) {
    console.error('Error proxying request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

    try {
      // Forward the request to the Vite server
      const response = await fetch(url.toString(), {
        method: req.method,
        headers: req.headers,
        body: req.body,
        duplex: 'half', // Necessary for streaming request bodies
      });

      return response; // Return the Vite server's response to the client
    } catch (error) {
      console.error('Error proxying request:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },

});
console.log("server running on port", port);



import { spawn } from 'child_process';

function startBunHelperServer() {
  const bunHelperServer = spawn('bun', ['js/bun-helper-server.tsx', '--port', '8002'], {
    stdio: 'inherit',
  });

  bunHelperServer.on('close', (code) => {
    console.log(`bun-helper-server.tsx process exited with code ${code}`);
  });

  bunHelperServer.on('error', (err) => {
    console.error('Failed to start bun-helper-server.tsx:', err);
  });

  const fs = require('fs');

  fs.watch('js', { recursive: true }, (eventType, filename) => {
    if (filename) {
      console.log(`File changed: ${filename}. Restarting bun-helper-server...`);
      bunHelperServer.kill();
      startBunHelperServer();
    }
  });
}

startBunHelperServer();
