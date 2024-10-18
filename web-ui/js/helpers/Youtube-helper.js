

async function downloadYoutubeVideo(url) {
  const { spawn } = require('child_process');
  const fs = require('fs');
  const path = require('path');



  if (!url || typeof url !== 'string') {
    throw new Error('Invalid YouTube URL');
  }

  const videoId = new URL(url).searchParams.get('v');
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  const outputPath = path.resolve(__dirname, `${videoId}.mp4`);

  const ytdlProcess = spawn('bun', ['run', 'ytdl-core', url, '-o', outputPath]);

  ytdlProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ytdlProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ytdlProcess.on('close', (code) => {
    if (code === 0) {
      console.log(`Video downloaded successfully to ${outputPath}`);
    } else {
      console.error(`ytdl-core process exited with code ${code}`);
    }
  });
}


export default downloadYoutubeVideo;

