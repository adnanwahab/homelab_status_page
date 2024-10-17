import React, { useState } from 'react';
import TwitchPlaysPokemonPanel from './TwitchPlaysPokemonPanel';
//import notebook from "@roboticsuniversity/alan_how";
//import notebook2 from "@roboticsuniversity/dynamicland";//"@roboticsuniversity/voxels-diffusion-policy-3d";
// analyze seinfeild - cant be constant comedy - some boring parts -- watch youtube -with vonnegut annotaion - tvroeps is a datum
// kapil gupta was a doctor who discovered presiciptriosn were like sledge hammers for yuor neurons - AUC - attia + sapolsky -> 
// https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
import {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";

import notebook from "https://api.observablehq.com/@roboticsuniversity/alan_how.js?v=4";
import define from "https://api.observablehq.com/@roboticsuniversity/dynamicland.js?v=4";



const AlanHow = () => {
  const viewofModuleNameRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(notebook, name => {
      if (name === "Complex_Systems") return new Inspector(viewofModuleNameRef.current);
      return ["basicRequire","dynamicImport","skypackImport","bundleRun","scavengingForLinks","globalLeaksPattern","pkg"].includes(name);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <div className="bg-slate-900 p-4">
      <div className="text-white"><a href="https://observablehq.com/@roboticsuniversity/alan_how">Alan Kay how?</a></div>
      <div ref={viewofModuleNameRef} />
    </div>
  );
};



function DynamicLand() {
  const viewofModuleNameRef = useRef();
  const viewofModuleNameRef2 = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    runtime.module(define, name => {
      if (name === "staticDynamicland") return new Inspector(viewofModuleNameRef.current);
      if (name === "Seeing_space_datum") return new Inspector(viewofModuleNameRef2.current);

      return ["basicRequire","dynamicImport","skypackImport","bundleRun","scavengingForLinks","globalLeaksPattern","pkg"].includes(name);
    });
    return () => runtime.dispose();
  }, []);

  return (
    <div className="bg-slate-900 p-4">
      <div className="text-white"><a href="https://observablehq.com/@roboticsuniversity/dynamicland">Seeing Space = dynamicland</a></div>
      <div className="grid grid-cols-2 gap-4">
        <div ref={viewofModuleNameRef2} className="overflow-auto" />
        <div ref={viewofModuleNameRef} className="overflow-auto" />
      </div>
    </div>
  );
}




function DynamicHow() {
  return (
    <div className="bg-slate-900 p-4">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-1">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-white lg:rounded-l-[2rem]"></div>
            <div className="relative overflow-hidden rounded-lg lg:rounded-l-[2rem] h-[500px]">
              <AlanHow />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-white lg:rounded-r-[2rem]"></div>
            <div className="relative overflow-hidden rounded-lg lg:rounded-r-[2rem] h-[500px]">
              <DynamicLand />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DynamicHow;
