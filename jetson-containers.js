// make robotics + connectivity as easy as tailwind

// make robotics + connectivity as easy as tailwind
import { spawn } from 'child_process';

const CONTAINER_ID = '34320163bee6007af1c94a8db92a7d3f4fe0ad84c64a9369693cb9dc9b43792d';

function connectToContainer() {
  const dockerExec = spawn('docker', ['exec', CONTAINER_ID, '/bin/bash']);

  dockerExec.stdout.on('data', (data) => {
    console.log(`Container output: ${data}`);
  });

  dockerExec.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
  });

  dockerExec.on('close', (code) => {
    console.log(`Docker exec process exited with code ${code}`);
  });

  return dockerExec;
}

// Function to start RTSP stream (you'll need to implement this)
function startRTSPStream(dockerExec) {
  // Implementation depends on your specific RTSP setup
  // This is a placeholder - you'll need to adjust based on your needs
  dockerExec.stdin.write('gst-launch-1.0 videotestsrc ! x264enc ! rtph264pay ! udpsink host=127.0.0.1 port=8554\n');
}

// Main execution
//const containerConnection = connectToContainer();
//startRTSPStream(containerConnection);


//start a company with 5-100 people equal shares with their own robot factory.

//doker exec 34320163bee6 /bin/bash

//docker exec 34320163bee6 /bin/bash

const containerConnection = connectToContainer();
// https://zenphoton.com/#AAQAAkACAAEgfwADAhsAmwF6ASn/AAABDQFRArQB7v8AAAFeAPMBXgHI/wAA
// startRTSPStream(containerConnection);
// UN Sustainable Development Goals

// Capture an image after a short delay to ensure the stream is running
setTimeout(() => {
  const streamUrl = 'rtsp://localhost:8555';
  const outputFile = 'captured_frame.jpg';
  
  captureImageFromStream(streamUrl, outputFile)
    .then(() => console.log('Image capture completed'))
    .catch(error => console.error('Image capture failed:', error));
}, 5000); // 

function captureImageFromStream(streamUrl, outputFile) {
    return new Promise((resolve, reject) => {
      const ffmpegCommand = `ffmpeg -y -i ${streamUrl} -vframes 1 ${outputFile}`;
      
      exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`FFmpeg error: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`FFmpeg stderr: ${stderr}`);
        }
        console.log(`Image captured: ${outputFile}`);
        resolve(outputFile);
      });
    });
  }

  const _ = 'ffmpeg -y -i rtsp://localhost:8555 -vframes 1 captured_frame.jpg'

  //exec(_)

  gst-launch-1.0 rtspsrc location=rtsp://localhost:8555 latency=0 ! decodebin ! fpsdisplaysink

  //docker exec 34320163bee6 /bin/bash
  //ffmpeg -y -i rtsp://localhost:8555 -vframes 1 captured_frame.jpg
  //docker cp 34320163bee6:/captured_frame.jpg ./

  let identity = 'publisher'
  let room_name = 'room'
  let steps = [
  
  `lk room join --identity publisher --publish h264://127.0.0.1:8554 ${room_name}`,

  `lk token create --join --room <room_name> --identity ${identity}`

  ]



  //'lk token create --api-key <PROJECT_KEY> --api-secret <PROJECT_SECRET> --room test_room --identity test_user --valid-for 24h'
  'lk token create   --room room --identity test_user --valid-for 24h'

  //vocab - my bad, roger that, type.

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjkxODEzNDgsImlzcyI6IkFQSXRTYndYdlNqaDRjZiIsIm5hbWUiOiJ0ZXN0XzIiLCJuYmYiOjE3MjkwOTQ5NDgsInN1YiI6InRlc3RfMiIsInZpZGVvIjp7ImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwicm9vbSI6InJvb20iLCJyb29tQWRtaW4iOnRydWUsInJvb21DcmVhdGUiOnRydWUsInJvb21Kb2luIjp0cnVlLCJyb29tTGlzdCI6dHJ1ZSwicm9vbVJlY29yZCI6dHJ1ZX19.cGhXWsE7aCOw5hoPXlHSeeGCsbsLl2-DA1FkS1GRfl4'


// vow of work ethic
// vow of receptivity
////









////
//------------last resort
// walk - vow of silence
  // stop