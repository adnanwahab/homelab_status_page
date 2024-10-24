import React, { useRef, useEffect } from "react";
import Header from "../views/Header.js";
import { readFileSync } from "fs";
import Hardware_Picker from "./odysssey/Hardware_picker.jsx";
import ObservablePreview from "./odysssey/ObservablePreview.js";

import TwitchPlaysPokemonPanel from "./odysssey/TwitchPlaysPokemonPanel.js";
import TeleGuidance from "./odyssey/TeleGuidance.js";
import DynamicHow from "./odysssey/DynamicHow.js";
import PowerPoint from "./odysssey/PowerPoints.js";
import Box from "./odysssey/Box.js";
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
  
    
            <Sister_schools />
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



import React from "react";

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
//<svg class="docker_logo " id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2334.44 537.22"><defs><style>.cls-1 { fill: #1d63ed; stroke-width: 0px; }</style></defs>
//</g></svg>
const Docker_logo = `m664.01,223.35c-16.55-11.14-60.03-15.89-91.64-7.38-1.7-31.49-17.94-58.03-47.65-81.17l-10.99-7.38-7.33,11.07c-14.4,21.86-20.47,51-18.33,77.49,1.7,16.32,7.37,34.66,18.33,47.97-41.15,23.87-79.07,18.45-247.03,18.45H.06c-.76,37.93,5.34,110.88,51.73,170.27,5.12,6.56,10.74,12.91,16.84,19.02,37.72,37.77,94.71,65.47,179.93,65.54,130,.12,241.39-70.16,309.15-240.07,22.3.37,81.15,3.99,109.95-51.66.7-.94,7.33-14.76,7.33-14.76l-10.98-7.38Zm-494.72-39.14h-72.92v72.92h72.92v-72.92Zm94.21,0h-72.92v72.92h72.92v-72.92Zm94.21,0h-72.92v72.92h72.92v-72.92Zm94.21,0h-72.92v72.92h72.92v-72.92Zm-376.82,0H2.16v72.92h72.92v-72.92Zm94.21-92.11h-72.92v72.92h72.92v-72.92Zm94.21,0h-72.92v72.92h72.92v-72.92Zm94.21,0h-72.92v72.92h72.92v-72.92ZM357.7,0h-72.92v72.92h72.92V0Z"></path><g><path class="cls-1" d="m2329.93,424.7c0,18.94-14.87,33.81-34.21,33.81s-34.42-14.87-34.42-33.81,15.27-33.4,34.42-33.4,34.21,14.87,34.21,33.4Zm-60.08,0c0,14.87,11,26.68,26.07,26.68s25.46-11.81,25.46-26.47-10.8-26.89-25.65-26.89-25.87,12.02-25.87,26.68Zm20.58,17.52h-7.74v-33.4c3.04-.61,7.33-1.02,12.82-1.02,6.32,0,9.16,1.02,11.61,2.45,1.84,1.42,3.26,4.07,3.26,7.33,0,3.67-2.85,6.52-6.91,7.74v.41c3.24,1.21,5.08,3.66,6.1,8.14,1.01,5.09,1.62,7.13,2.45,8.35h-8.35c-1.02-1.22-1.64-4.27-2.65-8.15-.61-3.66-2.65-5.29-6.93-5.29h-3.66v13.45Zm.2-18.94h3.66c4.28,0,7.74-1.42,7.74-4.88,0-3.06-2.23-5.11-7.13-5.11-2.03,0-3.46.21-4.27.43v9.56Z"></path><path class="cls-1" d="m1017.65,86.68c-4.79-4.68-10.54-7.06-17.43-7.06s-12.81,2.38-17.42,7.06c-4.62,4.68-6.88,10.68-6.88,17.83v119.4c-23.7-19.59-51.05-29.47-82.16-29.47-36.16,0-67.08,13.06-92.7,39.27-25.62,26.12-38.34,57.72-38.34,94.78s12.81,68.57,38.34,94.78c25.62,26.12,56.46,39.27,92.7,39.27s66.74-13.06,92.7-39.27c25.62-25.86,38.34-57.45,38.34-94.78V104.5c0-7.15-2.35-13.15-7.15-17.83Zm-48.18,274.11v.18c-4.27,10.15-10.11,19.06-17.51,26.65-7.4,7.68-16.12,13.68-26.05,18.18-10.02,4.5-20.65,6.71-32.06,6.71s-22.3-2.21-32.32-6.71c-10.02-4.5-18.65-10.5-25.96-18.09-7.32-7.59-13.15-16.5-17.42-26.65-4.27-10.24-6.45-21.09-6.45-32.57s2.18-22.33,6.45-32.57c4.27-10.24,10.11-19.06,17.42-26.65,7.32-7.59,16.03-13.59,25.96-18.09,10.02-4.5,20.74-6.71,32.32-6.71s22.04,2.21,32.06,6.71c10.02,4.5,18.65,10.5,26.05,18.18,7.4,7.68,13.24,16.59,17.51,26.65,4.27,10.15,6.45,20.92,6.45,32.39s-2.18,22.33-6.45,32.39Z"></path><path class="cls-1" d="m2100.26,277.04c-6.36-15.89-16.05-30.27-28.76-43.16l-.17-.09c-25.88-26.12-56.82-39.27-92.7-39.27s-67.09,13.06-92.71,39.27c-25.62,26.12-38.33,57.72-38.33,94.78s12.81,68.57,38.33,94.78c25.62,26.12,56.47,39.27,92.71,39.27,32.92,0,61.41-10.85,85.64-32.56,4.69-4.94,7.06-10.94,7.06-17.92s-2.26-13.15-6.89-17.83c-4.61-4.68-10.45-7.06-17.42-7.06-6.09.18-11.5,2.21-16.11,6.27-7.32,6.35-15.25,11.21-23.87,14.39-8.63,3.18-18.04,4.77-28.31,4.77-9.07,0-17.78-1.41-26.05-4.32-8.29-2.91-16.03-6.89-22.92-12.09-6.98-5.21-12.98-11.38-18.12-18.71-5.14-7.24-9.06-15.27-11.67-24.09h185.32c6.87,0,12.62-2.38,17.42-7.06,4.8-4.68,7.15-10.68,7.15-17.83,0-18.53-3.24-35.74-9.58-51.54Zm-200.48,26.65c2.53-8.74,6.36-16.77,11.5-24.09,5.15-7.24,11.24-13.5,18.21-18.71,7.06-5.21,14.72-9.18,23.17-12.09,8.44-2.91,17.06-4.32,25.97-4.32s17.51,1.41,25.86,4.32c8.37,2.91,16.05,6.88,22.92,12.09,6.98,5.21,13.07,11.38,18.21,18.71,5.22,7.24,9.16,15.27,11.86,24.09h-157.71Z"></path><path class="cls-1" d="m2327.99,211.29c-4.36-4.32-9.85-7.68-16.47-10.15-6.62-2.47-13.85-4.15-21.78-5.12-7.84-.97-15.25-1.41-22.12-1.41-15.61,0-30.24,2.56-44,7.68-13.77,5.12-26.49,12.44-38.17,21.97v-4.76c0-6.88-2.35-12.71-7.15-17.56-4.78-4.85-10.45-7.32-17.15-7.32s-12.64,2.47-17.42,7.32c-4.8,4.85-7.15,10.77-7.15,17.56v218.25c0,6.88,2.35,12.71,7.15,17.56,4.78,4.85,10.53,7.32,17.42,7.32s12.45-2.47,17.15-7.32c4.8-4.85,7.15-10.77,7.15-17.56v-109.17c0-11.65,2.18-22.59,6.45-32.83,4.27-10.24,10.11-19.06,17.51-26.65,7.42-7.59,16.13-13.59,26.05-17.92,10.02-4.41,20.66-6.62,32.08-6.62s22.2,2.03,32.06,6c3.91,1.77,7.32,2.65,10.28,2.65,3.4,0,6.62-.62,9.58-1.94,2.96-1.32,5.58-3.09,7.76-5.38,2.18-2.29,3.91-4.94,5.22-8.03,1.31-3,2.01-6.27,2.01-9.8,0-6.88-2.18-12.44-6.53-16.77h.08Z"></path><path class="cls-1" d="m1304.98,277.12c-6.36-15.8-15.86-30.27-28.66-43.33-25.87-26.12-56.8-39.27-92.7-39.27s-67.08,13.06-92.7,39.27c-25.62,26.12-38.33,57.72-38.33,94.78s12.81,68.57,38.33,94.78c25.62,26.12,56.46,39.27,92.7,39.27s66.74-13.06,92.7-39.27c25.62-25.86,38.34-57.45,38.34-94.78-.18-18.53-3.4-35.65-9.67-51.45Zm-45.65,83.66v.18c-4.27,10.15-10.11,19.06-17.51,26.65-7.4,7.68-16.12,13.68-26.05,18.18-9.93,4.5-20.65,6.71-32.06,6.71s-22.3-2.21-32.32-6.71c-10.02-4.5-18.65-10.5-25.96-18.09-7.32-7.59-13.15-16.5-17.42-26.65-4.27-10.24-6.45-21.09-6.45-32.57s2.18-22.33,6.45-32.57c4.27-10.24,10.11-19.06,17.42-26.65,7.32-7.59,16.03-13.59,25.96-18.09,10.02-4.5,20.74-6.71,32.32-6.71s22.04,2.21,32.06,6.71c10.02,4.5,18.65,10.5,26.05,18.18,7.4,7.68,13.24,16.59,17.51,26.65,4.27,10.15,6.45,20.92,6.45,32.39s-2.18,22.33-6.45,32.39Z"></path><path class="cls-1" d="m1829.11,219.41c0-3.35-.7-6.53-2-9.53-1.31-3-3.05-5.73-5.23-8.03-2.18-2.29-4.79-4.15-7.75-5.38-2.96-1.23-6.18-1.94-9.58-1.94-4.88,0-9.24,1.24-13.07,3.8l-139.92,93.11V104.68c0-7.06-2.35-12.97-7.14-17.83-4.79-4.85-10.45-7.32-17.16-7.32s-12.63,2.47-17.43,7.32c-4.79,4.85-7.14,10.77-7.14,17.83v332.71c0,6.88,2.35,12.8,7.14,17.74,4.79,4.94,10.54,7.41,17.43,7.41s12.46-2.47,17.16-7.41c4.79-4.94,7.14-10.86,7.14-17.74v-86.4l28.58-19.15,108.12,124.17c4.36,4.32,9.85,6.44,16.38,6.44,3.4,0,6.62-.62,9.58-1.94,2.96-1.24,5.58-3.09,7.75-5.38,2.18-2.29,3.92-4.94,5.23-8.03,1.31-3,2-6.27,2-9.53,0-6.53-2.26-12.36-6.8-17.47l-100.63-115.87,98.01-65.13c6.27-4.32,9.32-10.94,9.32-19.86v.18Z"></path><path class="cls-1" d="m1414.85,269.09c7.49-7.59,16.21-13.59,26.23-17.92,10.02-4.41,20.65-6.62,32.06-6.62,10.28,0,19.78,1.77,28.58,5.29,8.71,3.53,17.08,8.74,25,15.53,4.7,3.79,10.02,5.73,15.94,5.73,7.06,0,12.81-2.38,17.43-7.15,4.62-4.77,6.88-10.77,6.88-17.92s-2.79-13.77-8.45-18.88c-24.05-21.71-52.53-32.57-85.38-32.57-36.16,0-67.08,13.06-92.7,39.27-25.62,26.12-38.33,57.72-38.33,94.78s12.81,68.57,38.33,94.78c25.62,26.12,56.46,39.27,92.7,39.27,32.76,0,61.25-10.85,85.38-32.57,5.14-5.29,7.76-11.38,7.76-18.44s-2.27-13.15-6.88-17.83c-4.62-4.68-10.45-7.06-17.42-7.06-5.92.18-11.07,1.94-15.42,5.29-7.84,6.88-16.03,12-24.83,15.44-8.71,3.44-18.21,5.12-28.58,5.12-11.41,0-22.04-2.21-32.06-6.62-10.02-4.41-18.73-10.41-26.23-17.91-7.49-7.5-13.42-16.5-17.69-26.65-4.27-10.24-6.45-21.18-6.45-32.83s2.18-22.59,6.45-32.83c4.27-10.24,10.19-19.06,17.69-26.65v-.09Z`

function Pricing() {
  return (
    <div class="bg-gray-800 text-white p-8 flex-auto">
      <h2 class="text-xl font-bold mb-4">45 Hours of Free Content to learn how to build your own Robot</h2>
      {/* <p class="mb-6">Self Driving Pet Cat</p> */}
      <div class="flex space-x-4">
        <div class="flex flex-col items-center">
          <div class="bg-gray-700 p-4 rounded-full">
           <img width="25px" src="https://i1.sndcdn.com/artworks-000658049383-bs9n5k-t500x500.jpg" />
          </div>
          <span class="mt-2">$25 buy once</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="bg-gray-700 p-4 rounded-full">
         <svg class="__rptl-header-logo" aria-hidden="true" focusable="false" height="44" width="100" viewBox="0 0 141 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="__rptl-header-logo"><title id="__rptl-header-logo">Raspberry Pi</title><defs><path d="M99.9 73.5c-.6-5.9-3.2-11.2-7-13.9-.7-2.4-1.8-4.5-3.2-6.3-.2-2.8-1.4-8.2-6.9-13 .6-.5 1.2-1.2 1.6-1.9 4.6-2 7.8-6.3 8.2-9.5 2.4-2.4 3.8-5.3 4-8.2.1-1.4-.2-2.6-.7-3.7 2-2.2 2.7-4.8 1.8-7.2-1.4-4-6.2-6.5-12.6-6.8-1.7-1.6-4.1-2.4-7-2.4-1.2 0-2.5.2-3.8.5-1-.5-2.3-.8-3.7-.8-2.4 0-5.1.7-7.1 1.9-.4-.2-.6-.2-.9-.2-3.2 0-6.4 2.2-8 3.5-1.6 1.3-3.1 2.8-4.2 4.4-1.2-1.6-2.6-3.1-4.2-4.4-1.6-1.3-4.8-3.5-8-3.5-.3 0-.6 0-.9.1C35.3.9 32.6.2 30.2.2c-1.4 0-2.7.3-3.7.8-1.3-.3-2.6-.5-3.8-.5-2.9 0-5.3.8-7 2.4-6.4.3-11.2 2.8-12.6 6.8-.9 2.5-.2 5.1 1.8 7.2-.5 1.1-.8 2.3-.7 3.7.1 2.9 1.5 5.8 4 8.2.4 3.2 3.6 7.5 8.2 9.5.4.8 1 1.4 1.6 1.9-5.5 4.8-6.7 10.2-6.9 13-1.5 1.8-2.6 3.9-3.2 6.3-3.8 2.8-6.4 8-7 13.9-.6 5.9 1 11.4 4.3 14.8.4 2.6 2 6.1 3.6 8.2.3 4.5 2.2 8.8 5.4 12.4 3.2 3.6 7.4 6.1 11.9 7 2.7 2.5 5.6 4.3 9.5 5.9 1.7 1.7 6.6 5.8 14.9 5.8s13.2-4.1 14.9-5.8c3.9-1.6 6.8-3.3 9.5-5.9 4.5-.9 8.7-3.4 11.9-7 3.2-3.6 5.1-8 5.4-12.4 1.6-2.1 3.1-5.6 3.6-8.2 3-3.4 4.7-8.9 4.1-14.7Zm-22.2-18c-3.9-2.1-7.6-5.2-10.3-8.7-3.7-4.4-1.3-6.4 4.5-5.3 4.3 1.1 8.5 4.5 10.2 8.6 2.2 5.6.6 8.2-4.4 5.4ZM62.4 8.6c.3-.1.7.2.6.5-.2 1.5.8 1.3 1 1.1 2.4-3 4.9-3.6 7.2-3.4.4 0 .6.5.3.8-.9 1.3.1 1.6.4 1.3 3.7-2.3 7.2-2.3 8.5-1.3.3.2.3.6 0 .8-1.4 1.2-.6 1.7-.1 1.6 3.7-1.3 8.9-.2 10.7 1.4.2.2.2.6 0 .8-2.3 2-3.4 3.6-3.9 6.8-.1.9 1.4.7 2 .5.3-.1.6.2.6.5.1 2.1-2 4.5-5 6.5-.4.3-.3.9.6.9.4 0 .6.4.4.8-1.1 2-2.5 3.9-7.5 5.2-.5.1-.5.8-.1 1 .4.2.4.6.2.9-5 4.3-17.6 2.6-19.2-4.6 0-.1 0-.3.1-.4 3-4 9.9-11.8 20.9-15.9.4-.2.3-.8-.2-.8-10.5 1.5-18 7.4-22.6 13.6-.2.2-.4.3-.7.1-8-4.2-1.4-16.5 5.8-18.7Zm-12 31.9c1.6 0 5.6.1 9.8 3.4 7 5.8-1 10-9.8 10s-16.8-4.1-9.8-10c4.2-3.3 8.2-3.4 9.8-3.4ZM14.9 28.2c-.2-.3 0-.7.4-.8.9 0 1-.7.6-.9-3-2-5.1-4.4-5-6.5 0-.3.3-.6.6-.5.6.2 2.1.3 2-.5-.5-3.2-1.6-4.8-3.9-6.8-.2-.2-.2-.6 0-.8 1.8-1.5 7-2.7 10.7-1.4.5.2 1.2-.4-.1-1.6-.2-.2-.2-.6 0-.8 1.3-1 4.9-1 8.5 1.3.4.2 1.3 0 .4-1.3-.2-.3-.1-.8.3-.8 2.3-.2 4.8.5 7.2 3.4.2.3 1.1.5 1-1.1 0-.4.3-.6.6-.5 7.2 2.2 13.8 14.5 5.7 18.7-.2.1-.5.1-.7-.1-4.4-6.2-11.8-12.1-22.5-13.7-.5-.1-.6.6-.2.8 11 4.1 17.9 11.9 20.9 15.9.1.1.1.3.1.4-1.6 7.2-14.2 8.9-19.2 4.6-.3-.2-.3-.7.2-.9.4-.2.4-.8-.1-1-5-1.3-6.4-3.1-7.5-5.1Zm3.6 21.9c1.8-4.1 5.9-7.5 10.2-8.6 5.8-1.1 8.2.9 4.5 5.3-2.8 3.4-6.4 6.5-10.3 8.7-4.8 2.8-6.4.2-4.4-5.4ZM8.4 80.8c-1.6-4.2-1.2-9.4 1.2-13.4 2.6-4.4 5.2-4.2 6.2-.5 1.3 4.9.8 10.8-1.4 15.5-1.9 3.8-4.3 2.5-6-1.6Zm18.7 28.6c-6.2-1.3-11.5-7.6-11.8-14 1-22.6 33.7 17.9 11.8 14Zm.7-28.3c-5.5-3.2-6.9-10.9-3.2-17.3s11.1-9 16.6-5.9c5.5 3.2 6.9 10.9 3.2 17.3-3.7 6.5-11.2 9.1-16.6 5.9Zm31.7 37c-2.6 1.9-5.7 3-9.1 3-3.4 0-6.6-1.1-9.1-3-5.4-3.8 0-8.1 9.1-8.1s14.5 4.3 9.1 8.1Zm-9.1-13.8c-7 0-12.7-4.9-12.7-10.9s5.7-10.9 12.7-10.9c7 0 12.7 4.9 12.7 10.9s-5.7 10.9-12.7 10.9Zm6-29c-3.7-6.4-2.2-14.2 3.2-17.3 5.5-3.2 12.9-.5 16.6 5.9 3.7 6.4 2.2 14.2-3.2 17.3-5.5 3.1-12.9.5-16.6-5.9Zm17.2 34.1c-21.9 3.9 10.8-36.7 11.8-14-.2 6.4-5.5 12.7-11.8 14Zm18.8-28.6c-1.7 4.1-4.1 5.4-6.1 1.6-2.2-4.6-2.7-10.5-1.4-15.5 1-3.7 3.7-3.9 6.2.5 2.5 4 2.9 9.1 1.3 13.4Z" id="a"></path></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"></use></mask><g mask="url(#b)" fill-rule="nonzero"><path fill="#E30A33" d="M-14.6.1h127.9v21.3H-14.6z"></path><path fill="#F18E43" d="M-14.6 21.4h127.9v21.3H-14.6z"></path><path fill="#F9DF53" d="M-14.6 42.7h127.9V64H-14.6z"></path><path fill="#008F58" d="M-14.6 64h127.9v21.3H-14.6z"></path><path fill="#3098D4" d="M-14.6 85.3h127.9v21.3H-14.6z"></path><path fill="#A03E7E" d="M-14.6 106.7h127.9V128H-14.6z"></path></g></g></svg>
          </div>
          <span class="mt-2">$141 for pi-saur</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="bg-gray-700 p-4 rounded-full">
          <img src="https://nanosaur.ai/assets/images/nanosaur-logo.png" width="100px" height="100px" />
        
          </div>
          <span class="mt-2">$300 for nanosaur.ai by Rafello Bonghaleii</span>
        </div>

      </div>
      {/* <img style={{width: "500px"}} src="https://nanosaur.ai/assets/images/nanosaur-wireframe-bw.png" /> */}
    </div>
  );
}

const navigation = {
  solutions: [

  ],
  support: [


  ],
  company: [

  ],
  legal: [

    
  ],
  social: [
    {
      name: "hackaday", //hardware - main thing to contribute to
      href: "https://hackaday.io/roboticsodyssey",
      icon: (props) => (
        <>
        🌈🧙🏻🤖🦖🌈
        </>
 
      ),
    },

    {
      name: "twitter", 
      href: "https://x.com/roboticsodyssey",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },

    {
      name: "YouTube", //50% hardware -50% ML
      href: "https://www.youtube.com/@Robotics-Odyssey",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};
//https://codepen.io/shironitus/pen/QWyNBqx
function Docker_pricing() {
  //console -> homepage
  return   (<div className="flex flex-col gap-4 flex-auto">
  <h3 className="text-sm font-semibold leading-6 text-white">
      $25 1 time fee for 95 hours of Video + 172 Notebooks
    </h3>
    <p className="mt-2 text-sm leading-6 text-gray-300">
      or $141 for a nanosaur.ai (raspberry pi instead of jetson nano for now)
    </p>
    <form className="mt-6 sm:flex sm:max-w-md">
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        id="email-address"
        name="email-address"
        type="email"
        required
        placeholder="eggnog@gmail.com"
        autoComplete="email"
        className="w-48min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-64 sm:text-sm sm:leading-6 "
      />
      <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Sign up
        </button>
        </div>
      </form>
    </div>)
}

 function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-900">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 ">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2 hidden"></div>

          <div className="mt-10 xl:mt-0 flex flex-col gap-4">
          <Pricing />
          <Docker_pricing />
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-400"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="h-6 w-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
            <a href="https://calendly.com/robotics-odyssey">Office Hours with Pau</a>
          </p>
        </div>
      </div>
    </footer>
  );
}


function Sister_schools() {
  const width = 250;
  const height = 250;
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-white">
         Sister Schools
        </h2>
        <div className="mx-auto  grid max-w-lg grid-cols-8 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none ">
          <a href="https://dynamicland.org/2024/Intro/">
            <img
              alt="Transistor"
              src="https://yt3.googleusercontent.com/ytc/AIdro_n2PcLV-HnzLgM6ek5Bga1fF9BQjTzkBSoEmbHLMr2KNA=s160-c-k-c0x00ffffff-no-rj"
              width={width}
              height={height}
              className="col-span-2 w-full object-contain lg:col-span-1"
            />
          </a>
          <a href="https://waymo.com">
            <img
              alt="Reform"
              src="https://waymo.com/v2/static/images/logo-with-text-vertical.svg"
              width={width}
              height={height}
              className="col-span-2 w-full object-contain lg:col-span-1"
            />
          </a>
          <a href="https://ycombinator.com">
            <img
              alt="Tuple"
              src="https://pbs.twimg.com/profile_images/1623777064821358592/9CApQWXe_400x400.png"
              width={width}
              height={height}
              className="col-span-2  w-full object-contain lg:col-span-1"
            />
          </a>
          {/* <a href="https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book.html">
            <img
              alt="SavvyCal"
              src="https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/graphics/main-banner.gif"
            width={width}
              height={height}
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
          </a> */}
    
          {/* <a href="https://threejs-journey.com"> */}
  
          {/* <Three_js_journey /> */}
          {/* </a> */}
          <a href="https://deeptlas.ai">
          <img
            alt="deepatlas"
            src="https://www.deepatlas.ai/images/logo-white.svg"
            width={width}
            height={height}
            className="col-span-2 col-start-2  w-full object-contain sm:col-start-auto lg:col-span-1"
          />
        
          </a>
        </div>
      </div>
    </div>
  )
}

function Three_js_journey(props) {


  return (
                    <div class="logo"><svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 58.5 66.6" style="enable-background:new 0 0 58.5 66.6;" xml:space="preserve">
    <path class="face-1" d="M23.1,55.7l16.1-9.3c0,0,0,0,0,0c1.1-0.7,1.8-1.9,1.8-3.1l0.1-19.1L23.1,34.4V55.7z"></path>
    <path class="face-2" d="M21.3,10L2.9,20.5l18,10.2l18.4-10.5c0,0,0,0-0.1,0l-17.4-10C21.7,10.1,21.5,10.1,21.3,10z"></path>
    <path class="face-3" d="M1.8,46.7L18,56.6c0,0,0,0,0,0c0.3,0.2,0.5,0.3,0.8,0.3V34.5L0,23.8v19.7C0,44.9,0.7,46.1,1.8,46.7z"></path>
    <path class="triangle-1" d="M56.8,30.4l-11.4-6.6l-0.1,19.2l11.5-6.7c1-0.6,1.7-1.7,1.7-2.9C58.5,32.1,57.9,31,56.8,30.4z"></path>
    <path class="triangle-2" d="M0,50.7v12.6c0,1.2,0.6,2.3,1.7,2.9c0.5,0.3,1.1,0.5,1.7,0.5c0.6,0,1.2-0.2,1.7-0.5l10.4-6L0,50.7z"></path>
    <path class="triangle-3" d="M16.4,7L5.1,0.5c-1-0.6-2.3-0.6-3.4,0C0.6,1.1,0,2.2,0,3.4v13.2L16.4,7z"></path>
    </svg>
</div>
                 
                    

              )
}