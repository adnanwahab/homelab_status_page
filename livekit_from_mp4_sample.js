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

async function send_from_file(room) {
    console.log('Processing WebM file');

    const sampleRate = 48000; // Standard sample rate for WebM files
    const channels = 2; // Assuming stereo audio

    // Set up audio track
    const source = new AudioSource(sampleRate, channels);
    const track = LocalAudioTrack.createAudioTrack('audio', source);
    const options = new TrackPublishOptions();
    options.source = TrackSource.SOURCE_MICROPHONE;

    console.log('Publishing track', room);
    await room.localParticipant.publishTrack(track, options).then((pub) => pub.waitForSubscription());

    // Use ffmpeg to decode WebM and pipe raw audio data, or generate silence if no audio
    const ffmpegProcess = spawn(ffmpeg, [
        '-i', './your_webm_file.webm',  // Replace with your WebM file path
        '-f', 'lavfi',
        '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
        '-shortest',
        '-map', '0:a?',
        '-map', '1:a?',
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

    let stderrOutput = '';
    ffmpegProcess.stderr.on('data', (data) => {
        stderrOutput += data.toString();
        console.error(`ffmpeg stderr: ${data}`);
    });

    return new Promise((resolve, reject) => {
        ffmpegProcess.on('close', async (code) => {
            console.log(`ffmpeg process exited with code ${code}`);
            if (code !== 0) {
                console.error('ffmpeg stderr output:', stderrOutput);
                if (stderrOutput.includes('Output file does not contain any stream')) {
                    console.error('The input file does not contain an audio stream.');
                    // Handle the case where there's no audio (e.g., disconnect and clean up)
                    await room.disconnect();
                    await dispose();
                    console.log('Disconnected due to lack of audio stream');
                    resolve();
                } else {
                    reject(new Error(`ffmpeg process failed with code ${code}`));
                }
            } else {
                await source.waitForPlayout();
                await room.disconnect();
                await dispose();
                console.log('Disconnected');
                resolve();
            }
        });

        ffmpegProcess.on('error', (err) => {
            console.error('ffmpeg process error:', err);
            reject(err);
        });
    });
}

export default send_from_file;
