import React, { useRef, useEffect } from "react";
import Header from "../views/Header.js";
import { readFileSync } from "fs";
import Hardware_Picker from "./odysssey/Hardware_picker.jsx";
import ObservablePreview from "./odysssey/ObservablePreview.js";
import Footer from "./odysssey/Footer.jsx";
import TwitchPlaysPokemonPanel from "./odysssey/TwitchPlaysPokemonPanel.js";
import TeleGuidance from "./odyssey/TeleGuidance.js";
import DynamicHow from "./odysssey/DynamicHow.js";
import PowerPoint from "./odysssey/PowerPoints.js";
import Box from "./odysssey/Box.js";
import Sisterschools from "./odysssey/sisterschools.js";
function LLamaCell(props) {
  const {src} = props
  return  (<>

  <iframe width="100%" height="500" frameborder="0"
  src={src}></iframe>

  </>
  )
}



 function LlamaGrid() {

  const  urls = [
    "https://observablehq.com/embed/@roboticsuniversity/perception?cell=*&banner=false",
    "https://observablehq.com/embed/@roboticsuniversity/prediction@106?cell=*",
    "https://observablehq.com/embed/@roboticsuniversity/simulation?cell=*&banner=false", //video games
    "https://observablehq.com/embed/@roboticsuniversity/dynamical-systems-xerox-parc-dynamicland?cell=*&banner=false",

  ]
  console.log(urls)
  
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
        <p className="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          Everything you need to deploy your app
        </p> */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-16 lg:grid-cols-6 grid-rows-2">
          <div className="relative lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
            <LLamaCell src={urls[0]} />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
       
          <div className="relative col-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
            <LLamaCell src={urls[1]} />
     
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
          </div>
          <div className="relative col-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
            <LLamaCell src={urls[2]} />
 
     
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
          </div>
          <div className="relative col-span-6">
            <div className="absolute inset-px rounded-lg bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
            <LLamaCell src={urls[3]} />

            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
          </div>
          {/* <div className="relative col-span-3">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
            <LLamaCell src={urls[4]} />

            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
          </div> */}
        </div>
      </div>
      </div>
  )
}






function RoboticsOdyssey() {
  return (
    <div className="dark">
      {/* <Header /> */}
      <div className="text-gray-950 antialiased bg-slate-900">
        <div className="overflow-hidden flex justify-center items-center min-h-screen">
          <main>
          <h1 className="text-4xl font-bold text-center text-white">Robotics Odyssey - become a Robotics Odyssey</h1>
          {/* <CourseCard /> */}
          <div> by adnan wahab </div>
          <h3 className="text-xl font-bold text-center text-white">93 hours of video to go from absolute beginner to advanced AI+Robotics Engineer</h3>
          <div className="text-center text-white">40 students already enrolled</div>
          <div>5 stars on trust pilot</div>
            <LlamaGrid />
  
    
            <Sisterschools />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}


export default RoboticsOdyssey





const CourseCard = () => {
  return (
    <div className="bg-purple-800 rounded-lg shadow-lg p-6 w-96 mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">93 hours of video</h2>
          <p className="text-sm">
            to go from <span className="font-bold">absolute beginner</span> to{" "}
            <span className="font-bold">advanced Three.js developer.</span>
          </p>
        </div>

        <div className="flex items-center mb-4">
          <span className="text-lg font-semibold mr-2">40,796</span>
          <span>Students already enrolled</span>
        </div>

        <div className="flex items-center mb-4">
          <svg
            className="w-6 h-6 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.982a1 1 0 00.95.69h5.234c.969 0 1.371 1.24.588 1.81l-4.236 3.074a1 1 0 00-.364 1.118l1.618 4.982c.3.921-.755 1.688-1.54 1.118l-4.236-3.074a1 1 0 00-1.176 0l-4.236 3.074c-.785.57-1.84-.197-1.54-1.118l1.618-4.982a1 1 0 00-.364-1.118L.766 9.41c-.783-.57-.381-1.81.588-1.81h5.234a1 1 0 00.95-.69L9.049 2.927z" />
          </svg>
          <span className="ml-2">on Trustpilot</span>
        </div>

        <div className="w-full mb-4">
          <video className="rounded-lg w-full" controls autoPlay loop muted>
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="bg-purple-600 text-center p-4 rounded-lg">
          <span className="text-2xl font-bold">$95</span>
          <p>Access for life, VAT incl.</p>
        </div>
      </div>
    </div>
  );
};


