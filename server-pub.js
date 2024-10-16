import { serve } from "bun";
import { join } from "path";

const publicDir = join(import.meta.dir, "public");



const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LiveKit Stream Viewer</title>
    <script type="module">
    const videoContainer = document.getElementById('videoContainer');

async function connectToRoom() {
    const roomName = 'room'; // Use the same room name as in your server code
    const token = 'YOUR_CLIENT_TOKEN'; // You'll need to generate this on the server

    try {
        const room = new LivekitClient.Room();
        
        room.on(LivekitClient.RoomEvent.TrackSubscribed, (track, publication, participant) => {
            if (track.kind === 'video') {
                const element = track.attach();
                videoContainer.appendChild(element);
            }
        });

        await room.connect('wss://omnissiah-university-kmuz0plz.livekit.cloud', token);
        console.log('Connected to room:', room.name);
    } catch (error) {
        console.error('Error connecting to room:', error);
    }
}

connectToRoom();
    </script>
</head>
<body>
    <h1>LiveKit Stream Viewer</h1>
    <div id="videoContainer"></div>
    <script src="client.js"></script>
</body>
</html>`

serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;
    
    // Serve index.html for the root path
    if (path === "/") {
      path = "/index.html";
    }

    // Attempt to serve the file from the public directory
    const filePath = join(publicDir, path);
    const file = Bun.file(filePath);

    return new Response(file);
  },
});

console.log("Server running at http://localhost:3000");