function LLAMA_Tools () {
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
  return (
    <>
          <div>LLAMA Tools for Eric Levin</div>
          <div><Dashboard panels={panels} /></div>
          </>

  );
}

export default LLAMA_Tools;