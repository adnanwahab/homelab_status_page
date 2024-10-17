import React from "react";
import { useRef, useEffect, useState } from "react";
import {
  Runtime,
  Inspector,
} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/@roboticsuniversity/livekit.js?v=4";
import define2 from "https://api.observablehq.com/@roboticsuniversity/robotics-hardware.js?v=4";
import voxelpainter from "https://api.observablehq.com/@roboticsuniversity/alanthree.js?v=4";
import VoxelNotebook from "https://api.observablehq.com/@roboticsuniversity/voxels-diffusion-policy-3d@88.js?v=4";
import prediction_planning_notebook from "https://api.observablehq.com/@roboticsuniversity/3-planning-prediction.js?v=4";
const observable_titles = [
  {title: "Livekit", href: "https://observablehq.com/@roboticsuniversity/livekit"},
  {title: "Robotics Hardware", href: "https://observablehq.com/@roboticsuniversity/robotics-hardware"},
  {title: "Voxel Painter", href: "https://observablehq.com/@roboticsuniversity/alanthree"},
  {title: "Voxel Notebook", href: "https://observablehq.com/@roboticsuniversity/voxels-diffusion-policy-3d"},
]

function ObservableTitle(props) {
  
return <h1 className="text-white">
  <a href={props.href}>{props.title}</a>
  </h1>
} 


function MMO_Prediction_Planning(props) {
  const TwitchPlaysPokemonPanelRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(prediction_planning_notebook, (name) => {
      //console.log(name);
      if (name === "Twitch_chat") return new Inspector(TwitchPlaysPokemonPanelRef.current);
      // if (name === "webrtc") return new Inspector(videoRef.current);
console.log('twitchplays-robots',TwitchPlaysPokemonPanelRef);
    });
    return () => runtime.dispose();
  }, []);
  return (
    <div className="bg-gray-800 text-white p-4 font-mono text-sm bg-slate-900">
    <ObservableTitle title="Prediction Planning" href="https://observablehq.com/@roboticsuniversity/3-planning-prediction"/>
    <div ref={TwitchPlaysPokemonPanelRef} />
    </div>
  );
}

function Livekit() {
  const lOGORef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(define, (name) => {
      //console.log(name);
      if (name === "LOGO") return new Inspector(lOGORef.current);
      // if (name === "webrtc") return new Inspector(videoRef.current);

    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
    <ObservableTitle title="Perception" href="https://observablehq.com/@roboticsuniversity/livekit"/>
      <div ref={lOGORef} />
      {/* <div ref={videoRef} /> */}
 
    </>
  );
}


function RoboticsHardware() {
  const viewofModuleNameRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(define2, (name) => {
      if (name === "LOGO") return new Inspector(viewofModuleNameRef.current);
      //console.log(name);
      //if (name === "viewof moduleName") return new Inspector(viewofModuleNameRef.current);
      return [
        "basicRequire",
        "dynamicImport",
        "skypackImport",
        "bundleRun",
        "scavengingForLinks",
        "globalLeaksPattern",
        "pkg",
      ].includes(name);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
    <ObservableTitle title="Hardware" href="https://observablehq.com/@roboticsuniversity/robotics-hardware"/>


      <div ref={viewofModuleNameRef} />
 


    </>
  );
}

function VoxelPainter() {
  const pointerAndObjectsRef = useRef();
  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(voxelpainter, name => {
      if (name === "pointerAndObjects") return new Inspector(pointerAndObjectsRef.current);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <>
      <div ref={pointerAndObjectsRef} />
    </>
  );
}

function DiffusionVoxelPointCloud() {
  const lOGORef = useRef();
  const nOTCHRef = useRef();
  // const output_threeRef = useRef();
  const render_the_cavasRef = useRef();
  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(VoxelNotebook, name => {
      if (name === "NOTCH") return new Inspector(nOTCHRef.current);
      if (name === "LOGO") return new Inspector(lOGORef.current);

    });
    return () => runtime.dispose();
  }, []);
  //import {output_three} from "@roboticsuniversity/voxels-diffusion-policy-3d"
  //return <></>
  // https://github.com/zed-industries/zed
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* <div ref={output_threeRef} /> */}
      <ObservableTitle title="Simulation + UI" href="https://observablehq.com/@roboticsuniversity/voxels-diffusion-policy-3d"/>


      <div ref={nOTCHRef} />
      <div ref={lOGORef} />
    </div>
  );

  // https://files.hashirama.blog/static/blog/animated_gifs/Animated%20GIF%20optimizer.gif
}

function TeleGuidance() {

  return (
    <div className="bg-slate-900 p-1">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-2">
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg lg:rounded-tl-[2rem] h-[300px]">
              <Livekit />
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-lg lg:rounded-tr-[2rem] h-[300px]">
    
              <MMO_Prediction_Planning />
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-lg lg:rounded-bl-[2rem] h-[300px]">
              <RoboticsHardware />
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-lg lg:rounded-br-[2rem] h-[300px]">
              <DiffusionVoxelPointCloud />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// "The less confident you are, the more serious you have to act."
//"“At every period of history, people have believed things that were just ridiculous, and believed them so strongly that you risked ostracism or even violence by saying otherwise. If our own time were any different, that would be remarkable. As far as I can tell it isn't.”"

const pg = `“Let's start with a test: Do you have any opinions that you would be reluctant to express in front of a group of your peers?

If the answer is no, you might want to stop and think about that. If everything you believe is something you're supposed to believe, could that possibly be a coincidence? Odds are it isn't. Odds are you just think whatever you're told.”`

export default TeleGuidance;

//yarn add "https://api.observablehq.com/@observablehq/module-require-debugger.tgz?v=3"

//bun add "https://api.observablehq.com/@roboticsuniversity/livekit.tgz?v=3"
//import notebook16 from "@roboticsuniversity/dynamicland";
//import notebook8 from "@roboticsuniversity/agent-dashboard";

// prompt - make a puzzle peiece in css
//import TeleGuidanceFrame from './TeleGuidanceFrame';
// import json from './example.json'
// const modules = import.meta.glob('./dir/*.js')
// import init from './example.wasm?init'
// https://v3.vitejs.dev/guide/using-plugins.html
// /Users/shelbernstein/homelab_status_page/views/odyssey/human_robot.txt

//const TwitchPlaysPokemonPanel = React.lazy(() => import("./TwitchPlaysPokemonPanel"));
// import notebook4 from "@roboticsuniversity/3-planning-prediction";
// import notebook5 from "@roboticsuniversity/collaborative-ui-twitch-plays-robot";
// import notebook6 from "@roboticsuniversity/dynamicland";
// import notebook7 from "@roboticsuniversity/alan_how";
// import notebook8 from "@roboticsuniversity/5000-research-papers";
// import notebook9 from "@roboticsuniversity/infrastructure-notebook";
// import notebook10 from "@roboticsuniversity/collaborative-ui-twitch-plays-robot";
// import notebook11 from "@roboticsuniversity/dynamicland";
// import notebook12 from "@roboticsuniversity/alan_how";
// import notebook13 from "@roboticsuniversity/5000-research-papers";
// import notebook14 from "@roboticsuniversity/infrastructure-notebook";

const get_links = () =>
  $$(".listing-grid > * ").map(
    (_) => _.firstElementChild.querySelector("a").href,
  );

const list_of_links = [
  "https://observablehq.com/@roboticsuniversity/5000-research-papers?collection=@roboticsuniversity/robotics-odyssey",
  "https://observablehq.com/@roboticsuniversity/infrastructure-notebook?collection=@roboticsuniversity/robotics-odyssey",
  "https://observablehq.com/@roboticsuniversity/collaborative-ui-twitch-plays-robot?collection=@roboticsuniversity/robotics-odyssey",
  "https://observablehq.com/@roboticsuniversity/dynamicland?collection=@roboticsuniversity/robotics-odyssey",
  "https://observablehq.com/@roboticsuniversity/livekit?collection=@roboticsuniversity/robotics-odyssey",
  "https://observablehq.com/@roboticsuniversity/alan_how?collection=@roboticsuniversity/robotics-odyssey",
  "https://observablehq.com/@roboticsuniversity/robotics-hardware?collection=@roboticsuniversity/robotics-odyssey",
  "https://observablehq.com/@roboticsuniversity/3-planning-prediction?collection=@roboticsuniversity/robotics-odyssey",
  "https://observablehq.com/@roboticsuniversity/voxels-diffusion-policy-3d?collection=@roboticsuniversity/robotics-odyssey",
];

// // bun add "https://api.observablehq.com/@roboticsuniversity/5000-research-papers.tgz"
// bun add "https://api.observablehq.com/@roboticsuniversity/infrastructure-notebook.tgz"
// bun add "https://api.observablehq.com/@roboticsuniversity/collaborative-ui-twitch-plays-robot.tgz"
// bun add "https://api.observablehq.com/@roboticsuniversity/dynamicland.tgz"
// bun add "https://api.observablehq.com/@roboticsuniversity/livekit.tgz"
// bun add "https://api.observablehq.com/@roboticsuniversity/alan_how.tgz"
// bun add "https://api.observablehq.com/@roboticsuniversity/robotics-hardware.tgz"
// bun add "https://api.observablehq.com/@roboticsuniversity/3-planning-prediction.tgz"
// bun add "https://api.observablehq.com/@roboticsuniversity/voxels-diffusion-policy-3d.tgz"
// }https://github.com/tldraw/tldraw
// https://files.hashirama.blog/static/blog/maze.gif
// https://files.hashirama.blog/static/blog/health_wealth.gif
// https://files.hashirama.blog/static/blog/zed_sensor.gif

// https://files.hashirama.blog/static/blog/arm-day1.gif

// // # Bibliography
// 1. notes on side panel - users comments - docs/medium/notion
// 2. twitch plays pokemon
// 3. reddit.com/r/place
// 4. primagen doom
// 5. minesweeper - (people crave this experience)
// 6. mmo/starcraft/sim-city/ animal crossing/ mario-party
// 7. land of lisp / sicp / hackers+painters
// 8. https://observablehq.com/@rreusser/tracing-lamb-modes-in-the-complex-plane
