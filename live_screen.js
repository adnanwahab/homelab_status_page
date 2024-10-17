import {
    AudioFrame,
    AudioSource,
    LocalAudioTrack,
    Room,
    TrackPublishOptions,
    TrackSource,
    dispose,
} from '@livekit/rtc-node';

import { spawn } from 'child_process';
import ffmpeg from 'ffmpeg-static';

async function send_from_screen(room) {
    console.log('Processing MP4 file');

    const sampleRate = 48000; // Standard sample rate for most MP4 files
    const channels = 2; // Assuming stereo audio

    // Set up audio track
    const source = new AudioSource(sampleRate, channels);
    const track = LocalAudioTrack.createAudioTrack('audio', source);
    const options = new TrackPublishOptions();
    options.source = TrackSource.SOURCE_MICROPHONE;

    console.log('Publishing track', room);
    await room.localParticipant.publishTrack(track, options).then((pub) => pub.waitForSubscription());

    // Use ffmpeg to decode MP4 and pipe raw audio data
    const ffmpegProcess = spawn(ffmpeg, [
        '-i', './your_webm_file.webm',  // Replace with your MP4 file path
        '-f', 's16le',
        '-acodec', 'pcm_s16le',
        '-ar', sampleRate.toString(),
        '-ac', channels.toString(),
        '-'
    ]);

    const FRAME_DURATION = 0.02; // 20ms frames
    const numSamples = Math.floor(sampleRate * FRAME_DURATION);
    const frameSize = numSamples * channels * 2; // 2 bytes per sample

    ffmpegProcess.stdout.on('data', async (chunk) => {
        for (let i = 0; i < chunk.length; i += frameSize) {
            const frameData = chunk.slice(i, i + frameSize);
            if (frameData.length === frameSize) {
                const frame = new AudioFrame(
                    new Int16Array(frameData.buffer, frameData.byteOffset, frameData.length / 2),
                    sampleRate,
                    channels,
                    numSamples
                );
                await source.captureFrame(frame);
            }
        }
    });

    ffmpegProcess.stderr.on('data', (data) => {
        console.error(`ffmpeg stderr: ${data}`);
    });

    ffmpegProcess.on('close', async (code) => {
        console.log(`ffmpeg process exited with code ${code}`);
        await source.waitForPlayout();
        await room.disconnect();
        await dispose();
        console.log('Disconnected');
    });
}

export default send_from_screen;
        