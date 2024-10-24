import React from "react";
import Dashboard from "./Dashboard.jsx";


function livekit_agent () {
  return <div>___</div>;
}
function Hardware_Tools () {
  // zed2i 
  //roomba
  const panels = [

    { id: "trossen_robot", title: "trossen_robot" , component: livekit_agent},
    { id: "zed2i", title: "zed2i" , component: livekit_agent},
    { id: "roomba", title: "roomba" , component: livekit_agent},
    { id: "webgpu - deno ", title: "webgpu - deno " },

  ]; 
  return (
    <>
          <div>Hardware Tools for Arthur Simon Art</div>
          <div><Dashboard panels={panels} /></div>
          </>

  );
}

export default Hardware_Tools;