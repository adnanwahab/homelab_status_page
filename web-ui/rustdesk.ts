// bun init rustdesk-api
// cd rustdesk-api
// bun add ws # WebSocket library for communication
// bun add @types/ws # TypeScript definitions for ws

// https://rustdesk.com/web/
import WebSocket from 'ws';

class RustDeskClient {
  private ws: WebSocket;

  constructor(serverUrl: string) {
    this.ws = new WebSocket(serverUrl);

    this.ws.on('open', () => {
      console.log('Connected to RustDesk server');
    });

    this.ws.on('message', (data: WebSocket.Data) => {
      console.log('Received:', data);
      // Handle incoming messages here
    });

    this.ws.on('close', () => {
      console.log('Disconnected from RustDesk server');
    });

    this.ws.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });
  }

  // Add methods to interact with RustDesk here
}

// Usage example
const client = new RustDeskClient('ws://your-rustdesk-server:21114');