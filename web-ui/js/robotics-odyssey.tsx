import React, {useRef, useEffect} from "react";
// import Header from "./views/odyssey/Header.tsx";
import ObservablePreview from "./views/odyssey/ObservablePreview.tsx";
import Footer from "./views/odyssey/Footer.tsx";
import TwitchPlaysPokemonPanel from "./views/odyssey/TwitchPlaysPokemonPanel.tsx";
import TeleGuidance from "./views/odyssey/TeleGuidance.tsx";
import DynamicHow from "./views/odyssey/Dynamichow.tsx";
import PowerPoint from "./views/odyssey/PowerPoints.tsx";
import Box from "./views/odyssey/Box.tsx";
import { Runtime, Inspector} from "@observablehq/runtime";
import Hardware_Picker from "./Hardware_picker.jsx";

function RoboticsOdyssey() {
  return (
    <div className="dark">
      {/* <Header /> */}
      <div className="text-gray-950 antialiased bg-slate-900">
        <div className="overflow-hidden flex justify-center items-center min-h-screen">
          <main>
            {/* <h1 className="text-white glowing-rainbow-text">
              Thanks to BotParty.org + Dynamicland.org!
            </h1> */}

            <div className="">

              <TeleGuidance />{" "}
            </div>
            <div className="" >
              <ObservablePreview></ObservablePreview>
            </div>
            <div className="relative">
              {" "}
              <DynamicHow />{" "}
            </div>
            {/* <PowerPoint />
            <Box /> */}
{/* <UseDirectImport /> */}
            {/* <Footer /> */}
            <Hardware_Picker></Hardware_Picker>

          </main>
        </div>
      </div>
    </div>
  );
}

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
//</link>import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";
import define from "https://api.observablehq.com/@roboticsuniversity/agent-dashboard@77.js?v=4&api_key=d656d272d7f07743922b44815d2905265f91507b";


function UseDirectImport() {
  const ref = useRef();

  const runtime =  new Runtime().module(define, name => {
    if (name === "viewof table") return new Inspector(ref);
  });



  return (<div ref={ref}></div>)
}


export default RoboticsOdyssey;
// tailwind fixed my design skills 
// tailscale fixed my sysm-admin skills 
// 3js journey fixed my grahpics skills 
// fastai fixed my ML skills 
// hackday fix my hardware skilsl

