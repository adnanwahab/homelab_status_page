import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "../public/css/output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
  import RoboticsOdyssey from "./robotics-odyssey.tsx";
import CGI_Tools from "./CGI_Tools.jsx";
import LLAMA_Tools from "./LLAMA_Tools.jsx";
import Hardware_Tools from "./Hardware_Tools.jsx";
 import Blog from "./blag.jsx";

const links = [
  { path: "/cgi", component: CGI_Tools },
  { path: "/llama", component: LLAMA_Tools },
  { path: "/hardware", component: Hardware_Tools },
  { path: "/docs", component: Documentation },
  { path: "/math-tools", component: Math_Tools },
  { path: "/blog  ", component: Blog },
];



function Math_Tools () {
  return <div>Math Tools for Mark Chatkhan</div>;
}


function Documentation() {
  const linkElements = links.map((link) => (
    <div key={link.path}>
    <a key={link.path} href={link.path}>
      {link.component.name}
    </a>
    </div>
  ));

  const iframes = links.map((link) => (
    <iframe key={link.path} src={link.path} />
  ));

  // bun, go, react, tailwind 
  // cursor, zed 
  // anything zoox uses 
  // creative_ai tools 
  const tools_i_use = [
    "https://go.dev/doc/",
    "https://bun.sh/docs"
  ]

  const documentation = tools_i_use.map((link) => (
    <iframe key={link} src={link} />
  ));

  return (
    <div>
      <div>Documentation</div>
      <div>{linkElements}</div>
      <div>{iframes}</div>
      <div>{documentation}</div>
    </div>
  );
}

function RoamResearch () {
  return (<><div>Open_problems.robotics</div>
  <img src="/public/dynamic_land_toolchain.png" />
  <div>Roam Research</div>


  
  </>);
}


const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoboticsOdyssey />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/cgi" element={<CGI_Tools />} />
        <Route path="/llama" element={<LLAMA_Tools />} />
        <Route path="/hardware" element={<Hardware_Tools />} />
        <Route path="/math" element={<Math_Tools />} />
        {/* <Route path="/blag" element={<Blog />} /> */}

        {/* <Route path="/course_content"  element={<iframe width="1920" height="1080" src="http://localhost:3000" />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);


//  llama 
// cgi? 
//robotics - you did robotics ? 
// find pau 
// send to YC: JP + mark + eric - 2pm
// send to stork 4pm 


// nolagen - flower for algenernon + naver
//reflect = read only - populate from roam resarch

// function Blog () {
//   return <div>Blog</div>;
// }

//JP + mark + eric - 4pm
//stork + shawn - 6pm
//NVDusty - 8pm
// steam + netflix