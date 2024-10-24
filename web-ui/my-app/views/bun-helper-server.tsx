const ollama = require('ollama');
import {$} from 'bun'
import { renderToString } from "react-dom/server";
import React, {lazy } from 'react';
import Bun from 'bun'
import fs from "fs";
import path from "path";
import { connect_to_livekit } from './bun_handlers/bun-livekit-server.js'
import llamaRoutes from './bun_handlers/llama-backend.js'
import CgiRoutes from './bun_handlers/cgi-backend.js'
const port = process.env.PORT || 8002;
console.log(`Server running at http://localhost:${port}`);
import Blag from "./blag.jsx";


function serveBlag(req: Request) { 
  const filePath = path.join(process.cwd(), "js/views/blag.html");
  console.log('filePath', filePath)
  let indexHtmlContent = fs.readFileSync(filePath, "utf-8");

  const blag = indexHtmlContent.replace(
    "{{template blag}}",
    `${renderToString(<Blag />)}`,
  );

  return new Response(blag, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

function on_save_blag(req: Request) { 
  ollama.generate({
    model: "llama3.2",
    prompt: "predict if there are errors before running thiss"
  })
  //run thing 
  ollama.generate({
    //model: "llama3.2",
  model: "llama3.2",
  prompt: "if errors - suggest fixes"
  })
}

async function serveBlagArchive(req: Request) { 
  try {
    const filePath = path.join(process.cwd(), "docs/blag/index.md");
    const markdownContent = fs.readFileSync(filePath, "utf-8");
    const lines = markdownContent.split('\n')
    const docsPath = path.join(process.cwd(), 'docs');
    if (!fs.existsSync(docsPath)) {
      fs.mkdirSync(docsPath, { recursive: true });
    }

    const content = `${lines.map((line, i) => {

      if (line.startsWith('#')) {
        return `<h1>${line.slice(2)}</h1>`;
      }

      const cleanedLine = line.slice(3).replace(/[^a-zA-Z0-9\s-]/g, '').trim();

      if (cleanedLine === ' ') {
        return '';
      }
      const simplifiedLink = cleanedLine.replace(/\s+/g, '-').toLowerCase();

      return `<div><a href="blag/${simplifiedLink}">${cleanedLine}</a></div>`;
    }).join('<br/>')}`;

    return new Response(content, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error('Error in serveBlagArchive:', error);
    return new Response('An error occurred while processing your request', { status: 500 });
  }
}

function saveScreenShare() { 

}

function ReplayAnalyzer() { 
//  startEgress('example-room')
 return (<div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Replay Analyzer</h1>
        
        <div  className="bg-white shadow-md rounded-lg p-6">
            <form className="mb-4">
                <label htmlFor="file-upload" className="block text-gray-700 mb-2">Upload Replay File:</label>
                <input type="file" id="file-upload" className="block w-full text-gray-700 border border-gray-300 rounded p-2" accept=".replay"/>
                
                <button type="submit" className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600">Analyze Replay</button>
            </form>
            
            <div id="analysis-result" className="hidden mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
                <p>Results of the replay analysis will appear here...</p>
            </div>
        </div>

        <footer className="mt-6 text-center">
                <p className="text-gray-500">&copy; 2023 Replay Analyzer. All rights reserved.</p>
        </footer>
        </div>
  );
}
function replay_analyzer(req: Request) { 
  const replay_html = renderToString(<ReplayAnalyzer />)
  return new Response(replay_html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

async function placeholder_screenshare(req: Request) { 
  const screenshot = await req.json();
  const fs = require('fs');
  const path = require('path');

  const screenshotBuffer = Buffer.from(screenshot.screenshot.split(',')[1], 'base64');
  const screenshotPath = path.join(__dirname, 'screenshots', `screenshot-${Date.now()}.png`);

  fs.writeFileSync(screenshotPath, screenshotBuffer);

  return new Response(JSON.stringify({ message: 'Screenshot saved successfully.' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

const CgiRoutesHandlers = Object.fromEntries(
  Object.entries(CgiRoutes).map(([key, value]) => [`/cgi-tools${key}`, value])
);

const llamaRoutesHandlers = Object.fromEntries(
  Object.entries(llamaRoutes).map(([key, value]) => [`/llama-tools${key}`, value])
);
const routes = {
  "/api/placeholder_screenshare": (req: Request) => placeholder_screenshare(req),

  "/api/livekit_connect": (req: Request) => livekit_connect(req),
  "/api/replay_analyzer": (req: Request) => replay_analyzer(req),
  ///"/os/*": (req: Request) => os_automation(req),
  "/": (req: Request) => serveBlag(req),
  "/blag": (req: Request) => serveBlag(req),
  //"/llama-tools": (req: Request) => serveLlamaTools(req),
  //"/cgi-tools": (req: Request) => serveCgiTools(req),
  "/blag-archive": (req: Request) => serveBlagArchive(req),
  ...CgiRoutesHandlers,
  ...llamaRoutesHandlers
 }
 main();

async function main() {
  Bun.serve({
    port,
    fetch,
  });
}

async function fetch(req: Request) {
  const url = new URL(req.url);   

  if (!req.url) {
    console.error('Request URL is undefined');
    return new Response('Invalid request', { status: 400 });
  }
  if (url.pathname.startsWith("/blag/")) {
    const route = url.pathname.replace("/blag/", "");
    const filePath = `./docs/${route}.md`;
    try {
      await Bun.write(filePath, `# ${route}\n\nContent for ${route}`);
      const fileExists = await Bun.file(filePath).exists();
      if (fileExists) {
        return new Response(await Bun.file(filePath).text(), { status: 200 });
      } else {
      const prompt = `Generate a paragraph of PhD level content and 10 citations related to the topic described in the file: ${filePath}`;

      const response = await ollama.chat({
        model: 'llama3.1',
        messages: [{ role: 'user', content: prompt  }],
      })

      const generatedContent = await response.message.content;
      const content = generatedContent.text;

      await Bun.write(filePath, content);
      return new Response(content, { status: 200 });
      } 
    } catch (error) {
      console.error('Error creating file:', error);
      return new Response('An error occurred while creating the file', { status: 500 });
    }
  }
  console.log('url', url.pathname)
  if (url.pathname.startsWith("/assets")) return Bun.file('/Users/shelbernstein/homelab_status_page/web-ui/assets/output.css')

  if (url.pathname.startsWith("/webhook")) return webhook(req)

   if (routes[url.pathname]) { //handles all HTTPS JSON regular bear routes
     return routes[url.pathname](req)
   }
   if (url.pathname.startsWith("/proxy")) {
     const targetUrl = url.pathname.replace("/proxy", "");
     if (targetUrl === "") { 
       return new Response("how to proxy??? - try /proxy/https://google.com", {
         headers: {
           "Content-Type": "text/html",
         },
       });
     }
   }
}


// convert all books to music videos - read aloud + show diagrms - interactive if psosibel 
function webhook(req: Request) { 
  //console.log('webhook', req)
  return new Response('webhook')
}