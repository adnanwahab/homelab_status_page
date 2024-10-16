const { connect } = require('livekit-server-sdk');
const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');

// Your LiveKit server credentials
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjkxODEzNDgsImlzcyI6IkFQSXRTYndYdlNqaDRjZiIsIm5hbWUiOiJ0ZXN0XzIiLCJuYmYiOjE3MjkwOTQ5NDgsInN1YiI6InRlc3RfMiIsInZpZGVvIjp7ImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwicm9vbSI6InJvb20iLCJyb29tQWRtaW4iOnRydWUsInJvb21DcmVhdGUiOnRydWUsInJvb21Kb2luIjp0cnVlLCJyb29tTGlzdCI6dHJ1ZSwicm9vbVJlY29yZCI6dHJ1ZX19.cGhXWsE7aCOw5hoPXlHSeeGCsbsLl2-DA1FkS1GRfl4'



// Start capturing RTSP stream with FFmpeg
const startRTSPStream = async () => {
    const room = new Room();
    await room.connect(LIVEKIT_URL, token, { autoSubscribe: true, dynacast: true });
  try {
    // Initialize FFmpeg to capture from the RTSP stream
    const command = ffmpeg('rtsp://127.0.0.1:8554/stream')
      .inputOptions([
        '-rtsp_transport', 'tcp',
      ])
      .outputFormat('flv') // Use FLV for WebRTC compatibility
      .on('error', (err) => {
        console.error('Error with FFmpeg: ', err.message);
      });

    // Pipe the stream to stdout to process with LiveKit
    command.output('-').pipe();
    
    // Connect to the LiveKit room
    const room = await connect(LIVEKIT_URL, TOKEN, { autoSubscribe: false });
    console.log('Connected to LiveKit room:', room.name);

    // Handle streaming using LiveKit SDK
    room.on('trackPublished', (track, publication, participant) => {
      console.log(`Track published by ${participant.identity}: ${track.kind}`);
    });

    // Use the command to capture video/audio from FFmpeg
    command.run();
  } catch (error) {
    console.error('Error starting RTSP stream:', error);
  }
};

// Start streaming
//startRTSPStream();







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
  
  config();
  
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

function send_from_file () {

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