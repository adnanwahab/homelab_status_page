import React from "react";
import ReactDOM from "react-dom/client";
// import App from "../views/odyssey/robotics-odyssey.tsx";
import { StrictMode } from "react";
import "../public/css/output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Dashboard() {
  const panels = [
    { id: "livekit_audio", title: "LiveKit Audio" },
    { id: "cognition_engine", title: "Cognition Engine" },
    { id: "logs_viewer", title: "Logs Viewer" },
    { id: "import_docs", title: "Import Docs" },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {panels.map((panel) => (
            <div key={panel.id} className="relative lg:col-span-4">
              <div className="absolute inset-px rounded-lg bg-white"></div>
              <div className="relative flex h-full flex-col overflow-hidden">
                <div className={`container-${panel.id}`}></div>
                <iframe src={`/llama-backend/${panel.id}`}></iframe>
                <div className="p-10 pt-4"></div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



console.log("main.js");


function CGI_Tools () {
  return (<div>CGI Tool</div>
  
<div>

<Dashboard />
</div>
  )
}
function LLAMA_Tools () {
  return <div>LLAMA Tools</div>;
}
function Hardware_Tools () {
  return <div>Hardware Tools</div>;
}
function Math_Tools () {
  return <div>Math Tools</div>;
}
const links = [
  { path: "/cgi", component: CGI_Tools },
  { path: "/llama", component: LLAMA_Tools },
  { path: "/hardware", component: Hardware_Tools },
  { path: "/documentation", component: Documentation },
  { path: "/math-tools", component: Math_Tools },

];

function Documentation() {
  const linkElements = links.map((link) => (
    <div key={link.path}>
    <a key={link.path} href={link.path}>
      {link.component.name}
    </a>
    </div>
  ));

  return (
    <div>
      <div>Documentation</div>
      <div>{linkElements}</div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <StrictMode>


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Documentation />} />
        <Route path="/cgi" element={<CGI_Tools />} />
        <Route path="/llama" element={<LLAMA_Tools />} />
        <Route path="/hardware" element={<Hardware_Tools />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
);


//  llama 
// cgi? 
//robotics - you did robotics ? 
// find pau 
// send to JP + mark + eric - 2pm
// send to stork 4pm 
