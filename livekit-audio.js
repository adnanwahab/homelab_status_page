
 async function send_from_file(room) {
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
  console.log('publishing track',room);
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

export default send_from_file