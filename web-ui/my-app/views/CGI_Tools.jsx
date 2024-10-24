import Dashboard from './Dashboard.jsx';

function ReplayAnalyzer () {

  return <div>Replay Analyzer</div>;
}


function GitVisualizer () {
  // periodidc 
 return {
  "route": "hash",
  "title": "Git Visualizer",
  "description": "Git Visualizer",
  "iframe": "http://localhost:3000",
 }
}

function ParticleMorphTargetFromVideo () {
  return <div>Particle Morph Target From Video</div>;
  
}

function VoiceReactiveParticles () {
  return <><div>Voice Reactive Particles</div>
  
  <iframe src="http://localhost:49564/voice_reactive_particles" />
  </>
  ;
}


function CGI_Tools () {
    const panels = [
      //{ id: "livekit_audio", title: "LiveKit Audio" },
      //{ id: "cognition_engine", title: "Cognition Engine" },
  //    { id: "logs_viewer", title: "Logs Viewer" },
    //  { id: "import_docs", title: "Import Docs" },
      // { id: "Particle_morph_target_from_video", title: "Particle morph target from video" },
      { id: "livekit_agent", title: "livekit" , component: livekit_agent},
      { id: "voice_reactive_particles", title: "voice reactive particles" },
      { id: "Git Visualier", title: "Git Visualier-screenshot->iframe" },
      { id: "Replay analyzer", title: "Replay analyzer" , component: ReplayAnalyzer},
      // { id: "blag", title: "blag" , component: Blog},
    ]; 
    return (<><div>CGI Tool for John Patrick Whitaker</div>
            <div><Dashboard panels={panels} /></div>
            {/* <div><RoamResearch /></div> */}
            </>)
  }

export default CGI_Tools;