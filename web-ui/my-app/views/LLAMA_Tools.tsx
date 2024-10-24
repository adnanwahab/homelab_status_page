import { useRef, useState, useEffect } from 'react';
import {
  Room,
  RoomEvent,
  Track,
  LocalTrack,
  RoomOptions,
} from "livekit-client";

let Livekit = {
  Room,
  RoomEvent,
  Track,

};
/// spoken word = unifies groups from 5 to 100 - written word - 100,000 - pictures = 1 billion - Proof:youtube
async function getLivekitData(identity) {
  const livekit_connect = 'livekit_connect'
    const response = await fetch('/api/livekit_connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identity: identity || 'voice to prompt' }),
    });

    if (!response.ok) {
      console.error('Failed to connect to Livekit:', response.statusText);
      return;
    }

    const data = await response.json();
    //console.log('Connected to Livekit:', data);
    return data
}
//const liveKit_data = await postLivekitConnect();

// livekit video + audio - replay 
async function joinRoom(not_used, audioElement) {
  let screenShareVideo = document.getElementById("screenShareVideo")
  let room = new Room();
  const liveKit_data = await getLivekitData();
  const url = "wss://omnissiah-university-kmuz0plz.livekit.cloud";

  const roomOptions: RoomOptions = {
    adaptiveStream: true,
    dynacast: true,
    publishDefaults: {
      simulcast: true,
      audioEnabled: true,
      videoEnabled: false,
    },
  };

  await room.connect(url, liveKit_data.token, roomOptions);


  takeScreenshot()


  room.on(
    RoomEvent.TrackSubscribed,
    (track, publication, participant) => {
      if (
        track.kind === Track.Kind.Video &&
        track.source === Track.Source.ScreenShare
      ) {
        track.attach(screenShareVideo);


      }
    },
  );

  room.on(
    RoomEvent.TrackUnsubscribed,
    (track, publication, participant) => {
      if (
        track.kind === Track.Kind.Video &&
        track.source === Track.Source.ScreenShare
      ) {
        track.detach(screenShareVideo);
      }
    },
  );

  room.on(RoomEvent.LocalTrackPublished, (publication, participant) => {
    if (publication.kind === Track.Kind.Video && publication.source === Track.Source.ScreenShare) {
      publication.track.attach(screenShareVideo);
    } else if (publication.kind === Track.Kind.Audio && ENABLE_AUDIO_PLAYBACK) {
      publication.track.attach(audioElement);
    }
  });

  room.on(RoomEvent.LocalTrackUnpublished, (publication, participant) => {
    if (publication.kind === Track.Kind.Video && publication.source === Track.Source.ScreenShare) {
      publication.track.detach(screenShareVideo);
    } else if (publication.kind === Track.Kind.Audio && ENABLE_AUDIO_PLAYBACK) {
      publication.track.detach(audioElement);
    }
  });

  await toggleMicrophone(room);
  
  if (ENABLE_SCREEN_SHARE) {
    await toggleScreenShare(room);
  }
}

async function toggleMicrophone(room) {
  const enabled = room.localParticipant.isMicrophoneEnabled;
  console.log(`${enabled ? "stopping" : "starting"} microphone`);
  try {
    await room.localParticipant.setMicrophoneEnabled(!enabled);
  } catch (e) {
    console.error("error toggling microphone", e);
  }
}

async function toggleScreenShare(room) {
  const enabled = room.localParticipant.isScreenShareEnabled;
  console.log(`${enabled ? "stopping" : "starting"} screen share`);
  try {
    await room.localParticipant.setScreenShareEnabled(!enabled, {
      audio: true,
    });
  } catch (e) {
    console.error("error sharing screen", e);
  }
}
//when prompting - do not exceed the threshold of complexity pls 
// job of a human = contain complexity - so AI can be happy. 
// Add this near the top of the file, alongside the ENABLE_SCREEN_SHARE constant
const ENABLE_SCREEN_SHARE = false;
const ENABLE_AUDIO_PLAYBACK = true; // New environment variable
/// show timer of 5 seconds - every httpt - show progress -  over-use asnyc to fetch to 500 GPUs --- test with cheapetst rental 
function LivekitAudio() {
  const screenShareVideo = useRef<HTMLVideoElement>(null);
  const audioElement = useRef<HTMLAudioElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  console.log('LivekitAudio - rendering blah')
  const chunks = [];
    
  const handleStopRecording = () => {
    console.log('stopping recording')
    console.log(chunks)
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }

  function handleRecordButtonPress() {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }
//use 






  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
  }, []);

  async function startRecording() {
    if (!audioContext) return;
    console.log('starting recording')
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);



    recorder.ondataavailable = (e) => chunks.push(e.data);


    recorder.onstop = () => {
      console.log('sending 5 seconds of audio to server')
      sendAudioToServer(chunks);
    };

    recorder.start();
    setIsRecording(true);
    setAudioChunks([]);

    // Stop recording after 5 seconds
    setTimeout(() => { 
      console.log('stopping recording after 5 seconds')
      
      stopRecording()

      }
        , 5000);
  }

  function stopRecording() {
    console.log('stopping recording')

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }
  async function sendAudioToServer(chunks) {
    console.log('sendAudioToServer')

    const audioBlob = new Blob(chunks, { type: 'audio/webm' });

    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');

    try {
      const response = await fetch('/api/save_audio_to_whisper', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Server response:', result);
    } catch (error) {
      console.error('Error sending audio to server:', error);
    }
    return audioBlob
  }

  function handleButtonPress() {
    console.log('Button pressed!');
    joinRoom(screenShareVideo.current, audioElement.current);
    handleRecordButtonPress()
    //rule for ai - if function is not called --- log easoning or ask other helper or supervisor.
  }

  
  return (
    <div>
      <div>
        Audio
        {ENABLE_SCREEN_SHARE ? ' and screen sharing' : ''}
        {ENABLE_AUDIO_PLAYBACK ? ' with playback' : ' without playback'}
        {' with LiveKit'}
      </div>
      {ENABLE_SCREEN_SHARE && <video ref={screenShareVideo} autoPlay muted playsInline />}
      {ENABLE_AUDIO_PLAYBACK && <audio ref={audioElement} autoPlay />}
      <button onClick={handleButtonPress}>Connect to LiveKit</button>
      <br></br>
      <button onClick={handleStopRecording}>Stop Recording!</button>

    </div>
  );
}
function FMA_B_truth() {
  return <div>FMA_B_truth</div>
}
function ghost_in_the_shell() {
  return <div>ghost_in_the_shell</div>
}


function livekit_screenshare() {
  return <div>livekit_screenshare</div>
}

// proxy  use(figma, 2) fun - (gmail, chatGPT)
const actualComponents = Object.entries({

  "livekit_audio": LivekitAudio,
  "FMA_B_truth": FMA_B_truth,
  "ghost_in_the_shell": ghost_in_the_shell,
  "livekit_screenshare": livekit_screenshare,
  // "cognition_engine", - research paper -> diagram -> robot - stixels, waymo, 
    // "import_docs",
  
  });

//click on the component - renders the frame - as a full scren tool 

// const llamaComponents = [
//   "youtube"
// ]

//simplest bun-native build process -
  //for ssr webgpu on 50GPUs for MMO dwarf fortress - 
     // --- simple, standard compliant like d3, and integrate with any robotics infra + observablheq



function Example() {
  //console.log('Example - rendering llama-grid')
  return (
    <div className="bg-slate-700 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-white">Lama-tools.com !!</h2>
        {/* <p className="mt-2 max-w-lg text-pretty text-4xl font-medium tracking-tight text-gray-950 sm:text-5xl">
          10 days of learning llama.
        </p> */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-slate-900 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              {/* <img
                alt=""
                src="https://tailwindui.com/plus/img/component-images/bento-01-performance.png"
                className="h-80 object-cover object-left"
              /> */}
              <LivekitAudio />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-white">LiveKit Voice Agent</h3>
                {/* <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950">Lightning-fast builds</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida justo et nulla efficitur, maximus
                  egestas sem pellentesque.
                </p> */}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
          </div>
          <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-slate-900 lg:rounded-tr-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              {/* <img
                alt=""
                src="https://tailwindui.com/plus/img/component-images/bento-01-releases.png"
                className="h-80 object-cover object-left lg:object-right"
              /> */}
              <div>
             
             <button onClick={handleButtonPress} className="text-white">Connect to LiveKit</button>
             <video id="screenShareVideo" className="w-full h-full" autoPlay muted playsInline />

              </div>
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-white">ObervableHQ Infrastructure</h3>
                {/* <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950">Push to deploy</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus massa, laoreet dapibus ex elit vitae
                  odio.
                </p> */}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-slate-500 lg:rounded-bl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
              {/* <img
                alt=""
                src="https://tailwindui.com/plus/img/component-images/bento-01-speed.png"
                className="h-80 object-cover object-left"
              /> */}
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-white">denoWEBGPU - cognition engine - alan kay game design</h3>
                {/* <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950">Built for power users</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Sed congue eros non finibus molestie. Vestibulum euismod augue.
                </p> */}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-green-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <ReplayAnalyzer />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-white">Replay analyzer</h3>
                {/* <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950">Connect your favorite tools</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Maecenas at augue sed elit dictum vulputate, in nisi aliquam maximus arcu.
                </p> */}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-slate-900 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              {/* <img
                alt=""
                src="https://tailwindui.com/plus/img/component-images/bento-01-network.png"
                className="h-80 object-cover object-center"
              /> */}
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-white">Continuous eval for helpers for robotics - bc learn prediction -coolest field in ai (worory dream said "tools that anticpate rather than obey in 2008" - invent at the intersection of robotics and LLAMA - because LLAMA = self-owned ai - seizing means of productions p2p robots</h3>
                {/* <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950">Globally distributed CDN</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Aenean vulputate justo commodo auctor vehicula in malesuada semper.
                </p> */}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
          </div>
        </div>
      </div>
    </div>
  )
}


import React, { Suspense, lazy } from 'react';

async function handleInputChange(e) {
let typingTimeout;

async function sendRequest(prompt) {
  try {
    const response = await fetch('/ollama', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Server response:', data);
  } catch (error) {
    console.error('Error sending request:', error);
  }

}
const prompt = e.target.value;


  sendRequest(prompt);

// function handleInputChange(e) {
//   clearTimeout(typingTimeout);

//   const prompt = e.target.value;

//   typingTimeout = setTimeout(() => {
//     sendRequest(prompt);
//   }, 1000);
//   }
}

function App() {
  return (
    <div>

      <input type="text" onChange={handleInputChange} />
      <Suspense fallback={<div>Loading...</div>}>
        <Example />
      </Suspense>
    </div>
  );
}
export default App;


// ... (rest of the code remains unchanged)
      // <h1>goal by nov 1 - 1001 useful tools that shorten distance dynamicland</h1>

// export default Example;

// AI seinfeld but with all cartoons ever + robots - questionablecontent.net

// function Backup () {
// async function requestMicrophoneAndSpeechToText() {
//   try {
//     // Request microphone access
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     console.log('Microphone access granted');

//     // Initialize SpeechRecognition
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();

//     recognition.onstart = () => {
//       console.log('Speech recognition started');
//     };

//     recognition.onspeechend = () => {
//       console.log('Speech recognition ended');
//       recognition.stop();
//     };

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       console.log('Speech to text result:', transcript);
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//     };

//     // Start speech recognition
//     recognition.start();
//   } catch (error) {
//     console.error('Error accessing microphone:', error);
//   }
// }
// }


//dating = a game like mounment valley or  the game amro playerd - farm ville 





async function screnshareis_cool ( ) {
 //import {  Livekit }from "https://cdn.jsdelivr.net/npm/livekit-client@2.5.9/+esm";
//  import {
//   Room,
//   RoomEvent,
//   Track,
// } from "https://cdn.jsdelivr.net/npm/livekit-client@2.5.9/+esm";

let Livekit = {
  Room,
  RoomEvent,
  Track,
};

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjkxOTU3MjEsImlzcyI6IkFQSXRTYndYdlNqaDRjZiIsIm5hbWUiOiJzY3JlZW5fc2hhcmUiLCJuYmYiOjE3MjkxMDkzMjEsInN1YiI6InNjcmVlbl9zaGFyZSIsInZpZGVvIjp7ImNhblVwZGF0ZU93bk1ldGFkYXRhIjp0cnVlLCJyb29tIjoicm9vbSIsInJvb21BZG1pbiI6dHJ1ZSwicm9vbUNyZWF0ZSI6dHJ1ZSwicm9vbUpvaW4iOnRydWUsInJvb21MaXN0Ijp0cnVlLCJyb29tUmVjb3JkIjp0cnVlfX0.Ub3VigeCkaL4sG4cdw7VaPfaHECuMg8buy6u38xqZPQ";

const livekit_connect = 'livekit_connect'

let room;
//const button = document.getElementById("share");
//button.addEventListener("click", joinRoom);
joinRoom()
async function joinRoom() {
  room = new Room();
  //console.log('room', room.name)
  const url = "wss://omnissiah-university-kmuz0plz.livekit.cloud";
  const  datum = await getLivekitData('identity')


  await room.connect(url, datum.token);

  room.on(
    RoomEvent.TrackSubscribed,
    (track, publication, participant) => {
      if (
        track.kind === Track.Kind.Video &&
        track.source === Track.Source.ScreenShare
      ) {
        track.attach(screenShareVideo);
      }
    },
  );

  room.on(
    RoomEvent.TrackUnsubscribed,
    (track, publication, participant) => {
      if (
        track.kind === Track.Kind.Video &&
        track.source === Track.Source.ScreenShare
      ) {
        track.detach(screenShareVideo);
      }
    },
  );

  room.on(RoomEvent.LocalTrackPublished, (publication, participant) => {
    if (
      publication.kind === Track.Kind.Video &&
      publication.source === Track.Source.ScreenShare
    ) {
      publication.track.attach(screenShareVideo);
    }
  });

  room.on(RoomEvent.LocalTrackUnpublished, (publication, participant) => {
    if (
      publication.kind === Track.Kind.Video &&
      publication.source === Track.Source.ScreenShare
    ) {
      publication.track.detach(screenShareVideo);
    }
  });
  toggleScreenShare(room);
}

async function toggleScreenShare(room) {
  const enabled = room.localParticipant.isScreenShareEnabled;
  console.log(`${enabled ? "stopping" : "starting"} screen share`);
  try {
    await room.localParticipant.setScreenShareEnabled(!enabled, {
      audio: true,
    });
  } catch (e) {
    console.error("error sharing screen", e);
  }
}
//private tracker - 1tb animated stories(comics, hn, cartoons)
// 1 tb - robot actions
// 1tb research ppapers and books - discussion.
// 1tb intermediate represenstaiton
//we 'll meet someday.
// you'll be megaman x, and i'll be one of dr lights - helpers in the capsule.
// all of you will be mega manx. you'll have boots, armor, and hellmet.
// you win. i lost. i was weak. i am weak. i will always be weak.
// but mega man x  will always be strong. because the world needs everyone to be a  champion.
//mass effect, matt, shodan, and the 3 factions and inner circle and 3 pyramid = mega man x * 1 million. you win.
//i dont believe in spiritaulity, i believe in science and art - those are the answer krishnamurtih and so on sought.
//self sacrifice is okay sometimes. if a lion attacks your tribe - it might be the only answer
// until dynamicland.
//rest easy, dynamicland is here.

}







function handleButtonPress() {
  console.log('button pressed')
  screnshareis_cool()
}


function ReplayAnalyzer() {
  



  return (<><div>Replay Analyzer</div>
  <iframe src="/api/replay_analyzer"></iframe>
  </>)



}

function takeScreenshot() { 

  console.log('screenshot taken')

  

    function captureScreenshot() {
      const video = document.getElementById('screenShareVideo');
      
      // Ensure the video has loaded metadata
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
        const dataURL = canvas.toDataURL('image/png');

        const img = document.createElement('img');
        img.src = dataURL;
        document.body.appendChild(img);
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'screenshot.png';
        link.click();




        // Continue with extracting image data
      } else {
        // Video metadata not loaded yet
        video.addEventListener('loadeddata', captureScreenshot);
      }


    }



    captureScreenshot()


  // setInterval(() => {

  //   const screenshot = document.body.toDataURL('image/png');
  //   fetch('/api/placeholder_screenshare', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ screenshot }),
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log('Screenshot sent:', data))
  //   .catch(error => console.error('Error sending screenshot:', error));
  // }, 5000);
}

console.log('llama-grid loaded')

//import routes from './bun_handlers/llama-backend.tsx';


//replay then autocommit - walk!!
//
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjkxOTU3MjEsImlzcyI6IkFQSXRTYndYdlNqaDRjZiIsIm5hbWUiOiJzY3JlZW5fc2hhcmUiLCJuYmYiOjE3MjkxMDkzMjEsInN1YiI6InNjcmVlbl9zaGFyZSIsInZpZGVvIjp7ImNhblVwZGF0ZU93bk1ldGFkYXRhIjp0cnVlLCJyb29tIjoicm9vbSIsInJvb21BZG1pbiI6dHJ1ZSwicm9vbUNyZWF0ZSI6dHJ1ZSwicm9vbUpvaW4iOnRydWUsInJvb21MaXN0Ijp0cnVlLCJyb29tUmVjb3JkIjp0cnVlfX0.Ub3VigeCkaL4sG4cdw7VaPfaHECuMg8buy6u38xqZPQ";
// ramble to rewind database - lots of  bear notes -> helper can reogranize into a gant chart.
const proxy_docs = [
  // "https://bun.sh/docs/runtime/bunfig#run-bun-auto-alias-node-to-bun", 
  // "https://google.com", 
  // "https://youtube.com", 
  // "https://github.com", 
  // "https://openai.com", 
  // "https://bun.sh/docs", 
  // "https://reflect.app",
  // "https://zed.dev/docs/multibuffers",
  // "https://colab.research.google.com/",
  // "http://hashirama.blog",
  // "https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros1/raspberry_pi_setup.html",
  // "http://llama-tools.com",
  // "https://replicate.com/black-forest-labs/flux-1.1-pro",
  // "https://x.com/home",
  // "https://ai.google.dev/edge/mediapipe/solutions/guide",
  // "https://observablehq.com/d/396854ba12551e3a",
  // "https://paulgraham.com/swan.html",
  // "https://worrydream.com/SeeingSpaces/SeeingSpaces.jpg",
  // "https://robertheaton.com/archive/",
  // "https://chatgpt.com/c/671358b5-9ffc-8013-bffd-11fd2f7bf1a1",
  // "https://www.youtube.com/watch?v=CZim0p_etvM",
  // "https://dynamicland.org/2024/FAQ/",
  // "https://tailwindcss.com/docs/animation",
  // "https://observablehq.com/@mbostock/rainbow-pack",
  // "https://worrydream.com/LadderOfAbstraction/",
  // "https://reflect.app/g/awahab/19102024",
  // "https://developer.nvidia.com/sdk-manager",
  // "https://login.nvgs.nvidia.com/v1/error?preferred_nvidia=true&context=reset&theme=Bright&locale=en-US&prompt=default&email=eggnog.wahab@gmail.com&key=eyJhbGciOiJIUzI1NiJ9.eyJzZSI6IjhsQzUiLCJ0b2tlbklkIjoiMTI5NzIwMjUyNzMxMjE2NjkxMiIsImV4cCI6MTcyOTM1MTE5MCwib3QiOiIxMjk3MjAyNTU1NTMyODczNzI4IiwianRpIjoiNTljNjEwZGUtMzg2Zi00ZTYzLWEzNGUtNDdjZDM3ZWQ0N2Q1In0.32bu8bBYxJhTwcoJ-a9uQ1c3IpoarslXbdfUEPzOAtU&client_id=323893095789756813&code=82bea1d181ad43fb993d3af2b432b449&id=c035c24e-ed9e-4e7b-a7e8-faa0caaee637&multipleOrigin=false&isAutoInit=false&jarvis_error=%7B%22error%22:%22CREDENTIALS_EXPIRED%22%7D",
  // "https://chatgpt.com/c/6713bf25-6d78-8013-b29b-8ad79f6af262",
  // "https://ubuntu.com/download/server/thank-you?version=24.04.1&architecture=amd64&lts=true",
  // "https://www.google.com/search?q=ubuntu+2404&rlz=1C5CHFA_enUS1125US1125&oq=ubuntu+2404+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDU4NzRqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8",
  // "https://github.com/mitchellh/nixos-config",
  // "https://resend.com/emails",
  // "https://chatgpt.com/c/6713c608-74ec-8013-b77f-7769630cb45f",
  // "https://wiki.ubuntu.com/ARM/Server/Install?_gl=1*t9dj9w*_gcl_au*NDc0NDc3NzMuMTcyOTM0NzUxOQ..&_ga=2.99606046.1295490594.1729347516-1204181597.1729347516",
  // "https://docs.trossenrobotics.com/interbotix_xsarms_docs/ros_interface/ros1/raspberry_pi_setup.html",
  // "https://www.youtube.com/watch?v=CZim0p_etvM",
  // "https://scholar.google.com/",
];
