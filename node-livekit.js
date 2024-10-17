const { connect } = require('livekit-server-sdk');
const ffmpeg = require('fluent-ffmpeg');
const { exec } = require('child_process');
//const { Room, LocalVideoTrack, VideoSource, VideoFrame, AudioFrame, AudioSource, LocalAudioTrack, TrackPublishOptions, TrackSource, dispose } = require('@livekit/rtc-node');
const { Readable } = require('stream');
import send_from_file from './livekit-audio'

import send_from_mp4 from './livekit_from_mp4_sample'

import {
    AudioFrame,
    AudioSource,
    LocalAudioTrack,
    Room,
    TrackPublishOptions,
    TrackSource,
    dispose,
    VideoSource,
    LocalVideoTrack,
    VideoFrame,
    RoomEvent
} from '@livekit/rtc-node';

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjkxODEzNDgsImlzcyI6IkFQSXRTYndYdlNqaDRjZiIsIm5hbWUiOiJ0ZXN0XzIiLCJuYmYiOjE3MjkwOTQ5NDgsInN1YiI6InRlc3RfMiIsInZpZGVvIjp7ImNhblVwZGF0ZU93bk1ldGFkYXRhIjpmYWxzZSwicm9vbSI6InJvb20iLCJyb29tQWRtaW4iOnRydWUsInJvb21DcmVhdGUiOnRydWUsInJvb21Kb2luIjp0cnVlLCJyb29tTGlzdCI6dHJ1ZSwicm9vbVJlY29yZCI6dHJ1ZX19.cGhXWsE7aCOw5hoPXlHSeeGCsbsLl2-DA1FkS1GRfl4'
import { config } from 'dotenv';
import { AccessToken } from 'livekit-server-sdk';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
const LIVEKIT_URL = 'wss://omnissiah-university-kmuz0plz.livekit.cloud';
const ROOM_NAME = 'room';
const TOKEN = token; //

const startRTSPStream = async (room) => {
        console.log('Connected to LiveKit room:', room.name);
        console.log('publishing track 1');
        // Set up video track
        const source = new VideoSource();
        const track = LocalVideoTrack.createVideoTrack('rtsp-video', source);
        await room.localParticipant.publishTrack(track)
        .then((pub) => pub.waitForSubscription());
        console.log('publishing track 1');
        const command = ffmpeg('rtsp://127.0.0.1:8554/zed-stream')
            .inputOptions([
                '-rtsp_transport', 'tcp',
                '-re',  // Read input at native frame rate
                '-i', 'rtsp://127.0.0.1:8554/zed-stream'
            ])
            .outputOptions([
                '-f', 'rawvideo',
                '-pix_fmt', 'yuv420p',
                '-r', '30'
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
            if (Math.random() > 0.8) console.log('reading frame');
            setTimeout(readFrame, 33);  // Approximately 30 fps
        };

        readFrame();
        console.log('publishing track 3');
        command.run();
        await source.waitForPlayout();
        await room.disconnect();
        await dispose();
        console.log('disconnected');
};





connect_to_room().catch(console.error);








  
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




  async function connect_to_room() {
    const room = new Room();
  
    console.log('connecting to room');
    await room.connect(LIVEKIT_URL, TOKEN, { autoSubscribe: true, dynacast: true });


    room.on(RoomEvent.ParticipantConnected, (participant) => {
            console.log(`Participant connected: ${participant.identity}`);

            //startRTSPStream(room);

            send_from_mp4(room);
          });
}


// 
//export NVM_DIR="$HOME/.nvm"
//[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
//[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion