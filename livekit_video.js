import {
    VideoFrame,
    VideoSource,
    LocalVideoTrack,
    Room,
    TrackPublishOptions,
    TrackSource,
    dispose,
} from '@livekit/rtc-node';

import { spawn } from 'child_process';
import ffmpeg from 'ffmpeg-static';

async function send_from_file(room) {
    console.log('Processing WebM file');

    const width = 1280;  // Adjust as needed
    const height = 720;  // Adjust as needed
    const fps = 30;      // Adjust as needed

    // Set up video track
    const source = new VideoSource();
    const track = LocalVideoTrack.createVideoTrack('video', source);
    const options = new TrackPublishOptions();
    options.source = TrackSource.SOURCE_CAMERA;

    console.log('Publishing track', room);
    await room.localParticipant.publishTrack(track, options).then((pub) => pub.waitForSubscription());

    // Use ffmpeg to decode WebM and pipe raw video data
    const ffmpegProcess = spawn(ffmpeg, [
        '-i', './your_webm_file.webm',
        '-f', 'rawvideo',
        '-pix_fmt', 'yuv420p',
        '-s', `${width}x${height}`,
        '-r', fps.toString(),
        '-'
    ]);

    const frameSize = width * height * 1.5;  // For YUV420p format

    ffmpegProcess.stdout.on('data', async (chunk) => {
        for (let i = 0; i < chunk.length; i += frameSize) {
            const frameData = chunk.slice(i, i + frameSize);
            if (frameData.length === frameSize) {
                const frame = new VideoFrame(frameData, width, height);
                await source.captureFrame(frame);
            }
        }
    });

    ffmpegProcess.stderr.on('data', (data) => {
        console.error(`ffmpeg stderr: ${data}`);
    });

    ffmpegProcess.on('close', async (code) => {
        console.log(`ffmpeg process exited with code ${code}`);
        await room.disconnect();
        await dispose();
        console.log('Disconnected');
    });
}

export default send_from_file;
