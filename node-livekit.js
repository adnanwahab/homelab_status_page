const { connect } = require('livekit-server-sdk');
const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');
//const { Room, LocalVideoTrack, VideoSource, VideoFrame, AudioFrame, AudioSource, LocalAudioTrack, TrackPublishOptions, TrackSource, dispose } = require('@livekit/rtc-node');
const { Readable } = require('stream');

// Your LiveKit server credentials
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjkxODEzNDgsImlzcyI6IkFQSXRTYndYdlNqaDRjZiIsIm5hbWUiOiJ0ZXN0XzIiLCJuYmYiOjE3MjkwOTQ5NDgsInN1YiI6InRlc3RfMiIsInZpZGVvIjp7ImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwicm9vbSI6InJvb20iLCJyb29tQWRtaW4iOnRydWUsInJvb21DcmVhdGUiOnRydWUsInJvb21Kb2luIjp0cnVlLCJyb29tTGlzdCI6dHJ1ZSwicm9vbVJlY29yZCI6dHJ1ZX19.cGhXWsE7aCOw5hoPXlHSeeGCsbsLl2-DA1FkS1GRfl4'

import {
    AudioFrame,
    AudioSource,
    LocalAudioTrack,
    Room,
    TrackPublishOptions,
    TrackSource,
    dispose,
  } from '@livekit/rtc-node';
  import { config } from 'dotenv';
  import { AccessToken } from 'livekit-server-sdk';
  import { readFileSync } from 'node:fs';
  import { join } from 'node:path';


// Start capturing RTSP stream with FFmpeg
const startRTSPStream = async () => {
    
  
        await room.connect(LIVEKIT_URL, token, { autoSubscribe: true, dynacast: true });
        console.log('Connected to LiveKit room:', room.name);

        // Set up video track
        const source = new VideoSource();
        const track = LocalVideoTrack.createVideoTrack('rtsp-video', source);
        await room.localParticipant.publishTrack(track);

        // Initialize FFmpeg to capture from the RTSP stream
        const command = ffmpeg('rtsp://127.0.0.1:8554/stream')
            .inputOptions(['-rtsp_transport', 'tcp'])
            .outputOptions([
                '-f rawvideo',
                '-pix_fmt yuv420p',
                '-r 30'  // Adjust frame rate as needed
            ])
            .outputFormat('rawvideo');

        const stream = command.pipe();
        const readableStream = new Readable().wrap(stream);

        // Function to read video frames
        const readFrame = async () => {
            const chunk = readableStream.read(1920 * 1080 * 1.5);  // Adjust size based on your video resolution
            if (chunk) {
                const frame = new VideoFrame(chunk, 1920, 1080, 0);  // Adjust width and height
                await source.captureFrame(frame);
            }
            setTimeout(readFrame, 33);  // Approximately 30 fps
        };

        readFrame();

        command.run();

        // Handle room events
        room.on('trackPublished', (track, publication, participant) => {
            console.log(`Track published by ${participant.identity}: ${track.kind}`);
        });


};

// Start streaming
startRTSPStream();








  
  // create access token from API credentials
//   const token = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
//     identity: 'example-participant',
//   });
//   token.addGrant({
//     room: 'example-room',
//     roomJoin: true,
//     roomCreate: true,
//     canPublish: true,
//   });
  //const jwt = await token.toJwt();
  
  // set up room


  const LIVEKIT_URL = 'wss://omnissiah-university-kmuz0plz.livekit.cloud';
const ROOM_NAME = 'room';

const TOKEN = token; //

async function send_from_file() {
  //console.log('connected to room', room);
  
  // read relevant metadata from wav file
  // this example assumes valid encoding little-endian
  const sample = readFileSync(join(process.cwd(), './speex.wav'));
  console.log('reading wav file');

  const channels = sample.readUInt16LE(22);
  const sampleRate = sample.readUInt32LE(24);
  const dataSize = sample.readUInt32LE(40) / 2;
  
  // set up audio track
  const source = new AudioSource(sampleRate, channels);
  const track = LocalAudioTrack.createAudioTrack('audio', source);
  const options = new TrackPublishOptions();
  const buffer = new Int16Array(sample.buffer);
  options.source = TrackSource.SOURCE_MICROPHONE;
  await room.localParticipant.publishTrack(track, options).then((pub) => pub.waitForSubscription());
  
  let written = 44; // start of WAVE data stream
  const FRAME_DURATION = 1; // write 1s of audio at a time
  const numSamples = sampleRate * FRAME_DURATION;
  while (written < dataSize) {
    const available = dataSize - written;
    const frameSize = Math.min(numSamples, available);
  
    const frame = new AudioFrame(
      buffer.slice(written, written + frameSize),
      sampleRate,
      channels,
      Math.trunc(frameSize / channels),
    );
    await source.captureFrame(frame);
    written += frameSize;
  }
  await source.waitForPlayout();
  
  await room.disconnect();
  await dispose();
  console.log('disconnected');
}

//send_from_file().catch(console.error);

