import { html } from 'hono/html'
import { AccessToken } from "livekit-server-sdk";
const app = new Hono()
import odyssey from './robotics-odyssey.js'
import fs from 'fs'
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { basicAuth } from 'hono/basic-auth';
import { etag } from 'hono/etag';
import { serveStatic } from 'hono/serve-static';
import { jwt } from 'hono/jwt';
import { cors } from 'hono/cors';
import { Context, Hono } from 'hono'
import { WebhookReceiver } from 'livekit-server-sdk';
import { LiveKitClient } from 'livekit-server-sdk';
import * as utils from './utils.js'
import { serveStatic } from 'hono/bun'


import { $ } from "bun"

const apiKey = process.env.LIVEKIT_API_KEY
const apiSecret = process.env.LIVEKIT_API_SECRET
const wsUrl = process.env.LIVEKIT_WS_URL

const home = process.env.HOME


const derp = `${home}/derp`

const start_audio_publish = async function () {
    const timestamp = Date.now();
    const outputPath = `${derp}/recordings/audio-${timestamp}.mp3`;
}

const start_audio_egress = async function () {
    const timestamp = Date.now();
    const outputPath = `${derp}/recordings/audio-${timestamp}.mp3`;
    
    const result = await $`lk egress start \
      --url ${wsUrl} \
      --api-key ${apiKey} \
      --api-secret ${apiSecret} \
      --audio-only \
      --output ${outputPath}`;

    console.log('Audio egress started:', result);
    return outputPath;
}
export { start_audio_egress }
const start_egress_screeshare = async function () {
 
}

// const json_keys = await $`op item list --tags api --format json`.json()
// const shit = `#!/bin/bash

// # Fetch all item IDs tagged with 'api'
// item_ids=$(op item list --tags api --format json | jq -r '.[].id')

// # Loop through each item ID and retrieve the notes
// for id in $item_ids; do
//   # Get the item details in JSON
//   item_details=$(op item get "$id" --format json)
  
//   # Extract the title and notes
//   title=$(echo "$item_details" | jq -r '.overview.title')
//   notes=$(echo "$item_details" | jq -r '.notesPlain')
  
//   echo "------------------------------"
//   echo "Title: $title"
//   echo "Notes:"
//   echo "$notes"
//   echo "------------------------------"
// done`

const fetchApiItems = async () => {
    const itemIds = await $`op item list --tags api --format json`.json();
    
    for (const item of itemIds) {
      const itemDetails = await $`op item get ${item.id} --format json`.json();
      
      const title = itemDetails.overview.title;
      const notes = itemDetails.notesPlain;
      
      console.log("------------------------------");
      console.log("Title:", title);
      console.log("Notes:", notes);
      console.log("------------------------------");
    }
  }
  
  // Call the function to fetch items
//   const api_keys = await fetchApiItems();
//   console.log('api_keys', api_keys)
  



const receiver = new WebhookReceiver('apikey', 'apisecret');

export const webhook_receiver = async (c: Context) => {

    console.log('Webhook received:', );

    const auth_header = c.req.header('Authorization')
    //console.log('auth_header', auth_header)
    //console.log(c.json())

 
    return c.json({ success: true });
  }

  async function connect_to_livekit(options: { identity: string }) {
    console.log("options", options);
  
    // Default identity if not provided
    if (!options.identity) {
      options.identity = 'anonymous' + Math.random().toString(36).substring(2, 15);
    }
  
    // Creating a new AccessToken
    const token = new AccessToken(apiKey, apiSecret, {
      identity: options.identity,
    });
  
    // Add grant to the token (e.g., room access)
    token.addGrant({
      room: "example-room",  // Replace with your actual room name
      roomJoin: true,
      canPublish: true,
    });
  
    // Generate the JWT token
    const jwt = await token.toJwt();
  
    // Return token and WebSocket URL
    return { token: jwt, wsUrl };
  }

  export  const Layout = (content: string)  => html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://unpkg.com/htmx.org@1.9.3"></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Hono + htmx</title>
    </head>
    <body>
    
    ${content}
 
    </body>
  </html>
`
//  <a class="float-right" href="https://buy.stripe.com/test_28o6oZelUe8g2HubII">pay via stripe </a><
//after 1k signups - lower price to course by 10% by 1k till $5 for life.
//only need 20k per year -  (20k / 100) = (goal: 200per year) - rest -> reinveest to hardware
//1 buy per day = all beings (awaken + flourish)
//1000 users is 1000/20 = 50 years of free service.



export const indexPage = `<div>
    <h1> hono index </h1>
    <div>
    <li> add magic iframe -- htmx + some observable links --- grid %s 
    <li> auto refresh like vite 
    <li> add livekit screenshare 
     holman 
    </div>
  </div>`

  export const livekit_connect = async (c) => {
    console.log('livekit_connect');
  
    // Identity creation with timestamp to avoid conflicts
    const jsonData = { identity: 'voice to prompt?' + Date.now() };
    const identity = jsonData.identity;
  
    if (!identity) {
      return c.text("Identity parameter is missing", 400);
    }
  
    // Connecting to LiveKit
    const json = await connect_to_livekit(jsonData);
    //console.log('Generated token and wsUrl:', json);
  
    return c.json(json);
  }


  // the wizards are humans too -- shodan was right.
const blog = `<div class="bg-slate-900 font-white">
  <div class="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none h-full">
    <div class="w-[108rem] flex-none flex justify-end">
      <picture>
        <source srcset="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif" type="image/avif" />
        <img src="https://tailwindcss.com/_next/static/media/docs-dark@tinypng.1bbe175e.png" alt="" class="w-[90rem] flex-none max-w-none block" decoding="async" />
      </picture>
    </div>
  </div>
  <div class="text-center space-y-5 border-gray-700 border-2-b border-slate-700"></div>
  <div class="flex min-h-full bg-slate-900">
    <div class="flex w-full flex-col">
      <div class="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        <div class="hidden md:relative md:block md:flex-none border-gray-700 border-r-2">
          <div class="absolute inset-y-0 right-0 w-[50vw]"></div>
          <div class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block"></div>
          <div class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block"></div>
          <div class="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-24 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
            <nav class="text-base lg:text-sm">
              <ul role="list" class="space-y-9">
                <li>
                  <ul role="list" class="mt-2 space-y-2 lg:mt-4 lg:space-y-4">
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500" href="/">Posts</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/about">About</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="https://twitter.com/adnan_wahab_">Twitter</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/subscribe">Subscribe</a>
                    </li>
                    <li class="relative">
                      <a class="block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300" href="/">___</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div class="mt-8 relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
          <div class="bg-gray-900 text-gray-400">
              <div><a href="/odyssey">Robotics Odyssey</a></div>
    <div><a href="/llama-tools">llamatools</a></div>
    <div><a href="/blag">blag</a></div>
            <div class="container mx-auto px-4">
              <section class="mb-6">
                <h2 id="memory-updated" class="text-3xl font-bold mb-4">
                  <a id="memory-updated" href="https://robotics-odysey.com"> i dedicated my life to turning bret's dreams into reality.</a>
                </h2>
                <ul class="list-none pl-0 space-y-2">
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline"></a>
                  </li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4">Robotics Sensors</h2>
                <ul class="list-none pl-0 space-y-2">
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">zed-2i</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">realsense</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">roomba</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">lidar</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">camera</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">flash_compute_observableHQ_all_pages</a></li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4">Robotic Manipulators</h2>
                <ul class="list-none pl-0 space-y-2">
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline">trossen</a>
                    <a href="https://github.com/wuphilipp/gello_mechanical">GitHub Link</a>
                  </li>
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline">gello</a>
                    <a href="https://github.com/wuphilipp/gello_mechanical">GitHub Link</a>
                  </li>
                  <li>
                    <a href="/?" class="text-xl text-gray-400 hover:underline">shadow</a>
                    <a href="https://github.com/wuphilipp/gello_mechanical">GitHub Link</a>
                  </li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4">Robotic Locomotion</h2>
                <ul class="list-none pl-0 space-y-2">
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">roomba</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">segway</a></li>
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline">wheelchair</a></li>
                </ul>
              </section>

              <section class="mb-6">
                <h2 class="text-3xl font-bold mb-4"></h2>
                <ul class="list-none pl-0 space-y-2">
                  <li><a href="/?" class="text-xl text-gray-400 hover:underline"></a></li>
                </ul>
              </section>

              <section class="mb-6">
                <section class="">
                  <div><a href="/llama-tools">LLama Tools</a></div>
                  <div><a href="/cgi-tools">Computer Graphics Tools</a></div>
                  <div><a href="/hardware-tools">Hardware Tools</a></div>
                </section>
                <a href="/blag-archive" class="border border-gray-600 py-2 px-4 text-gray-400 hover:bg-gray-800 inline-block">View full archive (174 essays)</a>
                <section class="py-6 border-t border-gray-700 mt-12 border-t-2">
                  <h2 class="text-3xl font-bold mb-4 text-gray-400">Get new essays sent to you</h2>
                  <p class="text-xl text-gray-400 mb-4">Subscribe to my receive updates on Robotic Hardware, Published twice weekly.</p>
                  <form action="#" method="post" class="mb-4">
                    <div class="flex space-x-2">
                      <input type="email" placeholder="Your email address" class="flex-1 p-3 bg-gray-800 border border-gray-600 text-gray-400" />
                      <button type="submit" class="bg-green-900 text-white py-2 px-4 hover:bg-green-600">Subscribe</button>
                    </div>
                  </form>
                </section>
              </section>
            </div>
          </div>
        </div>

        <div id="display" class="relative flex h-full max-w-full flex-1 flex-col overflow-hidden hidden"></div>
      </div>
      <!-- put footer here -->
    </div>
  </div>
</div>`
  
  export { blog }
  
  



  import { Resend } from 'resend';



async function send_email() {

  const html = `
  <div>
    <p>hello world</p>
    <img src="https://static.observableusercontent.com/files/d7ab4a84d60a51a3a75d9bf4504892e87fdf65623d3b470667f3394b2cb89655e00cf89d06e8af2b18707147600ae47eda028f155125513255563bed4324e65a" />
      <img src="https://lh3.googleusercontent.com/fife/ALs6j_Gz895WHEvnqeZiUqUwamfStJi4CQ2ALtalPaz3sPp9f-1S-qg2mvVyVqZ8qTuAZu3TzKKZbJV4oRUyhIJFmHyWvBq0slOkelPmZRj3QzcVTfG7OZDqzqS2OGUw2zik2lEx7nvsu0aB3IJE-LhaISgQKiehcsX9lTwM9Fa3FZHg4JRUehIJnRP6J5dc8DMLdN7Qw1ajKzF9NSpY6nUrxU5QR8S8G2ZhpINRGpo4juJsQ0MzyuWxr7qPWACina3U81w5mjg48mzfIUgmR4qv0fDL_rkzbQIBS3OuPpnxVYc3H1nDp8rzwinchPXYm7qbfjs4nWbFa1iOZnjWL2yo2hkAuku79iD2gymNskuAkCtB0VkvZew0BWEf8vfAtySK6u1PJGyXV36WJHBoUuResgiGvJeohrnXXTxiqBhp6Jp17I-GC3pw2MCopagLkdJm2gOuFl8PD0fYGun1iWlRCUTcftKm3yf8XBC2ITMKtdDUJKQavQz6C4Ky1W7RrliH5C0MJMbLUaBZ64jvUpoHyw03vHRerMHswqpvxvb7m7PgANT5YNaD7nYX2g4RBHM-neR-OM6gSL414NSgZ34io-ZDJ3v9sfs1vsSgUzA3qLcWWBX9EggfRAAjn_AE53hyoNONekC5gSR0C57l0tJunQfwQBbnhYcS88NljqGVxT7qG3ddCGRA2GRMYNqPJScfWeZhyaNwZhmsQD9G2dtn3LTBFLM49a2-QpnsCISu7G3ijNyobZ502DiYq-GIoAfWjV5j-vCTiLa695W0l7D2GPzJmKF2HOUgzb-xZkdTQMLs9PN91CBBojUEiryJbz4otWiGCSiErWmADnrZKPYzYJUKo_R7T2OSccgsuzy-cqECcCG9TEFcqkXnre8Qh8kzKYh1Rh5djdeuUVnKFMLSo4P5S38oqczsOLRv5-q_dmpumZtGJSdy1jFHu0MD0Dm3qD8mbiEb9fsKQxmElvUcZ3Z-5LAz_TPl4_XDky9nbQUScdfyNsveQJArl6AfhWV3OaA7sTTs9fJgttaqJEe4MTT5ZQ7qFaPA2bB1Fy6h82J3cmAwYBLiEi4wBkrelXdQqwXeERfP5xCpGsC94IhRe8op4LBZVuKxLSElxxT2plxfOKtuOMmrvkuqRDlknCUS5V4yOCei0wbpsNvzrK1EJqDHPkZ3Fb0yK1KT2OdqNTdnRXkEFgjsy68F2QXkEFYKYu7MauObxMDx1BRh_Vu734sgdWELaCSEvRuTEYCmHO68WmQuUdstTgAo_rh2YvzYW7ySGLrznZDnvNsLMG0mVPogVhsUXhbj1jiuXgnFMxWP5MZVsFqYyC-CcZgugDiR0-eZ5hLEXxmRtxInp7owk6trtMB0Kbz9eHF7QbVS_xqwZhzj6GG9_ZXfm7PADziMJi_n0tWBLpO3zeeRN2HUFI6mqQVvmNpDRa5neMR5Q9URFrfN-WjN8GUV7CbgJ-2u1Djy9CP0Ztvc6hTOvekZFbhx9EvsV23DzxzS2oPHByw3UEEZ9t_EhRtBTu8K7cOY7tG6nesD8XnAa9n0T8VrkqP6BMDxLVhMmri7YcEaCmHoYgJQkSQvFxAlv7HV_HvQRm6NH7dKXgEuAyfSUADnWRAn5vjTmLutCfZrdhW7aJBGkqe7b7io9zkFlnw0SsqqWGz-8B2CC22TIyakPgKMFtxLpvO6huSbQdiXtCvU5m7PF_zFaVJKfrlQ5sdxReVebBwMQ13k4aHNvXPwtVevhq0WBgDWKGwiLw=w1436-h934" />
    <img src="https://drive.google.com/u/0/drive-viewer/AKGpiha49m26sbYpfd-1FG8VuDPKeu-eTlUhdyjp-F9FaZ3Imgi1XR-9eap8S2WjegSMQuAX6nbnBkzNalJofXObNXV44He5Pnc4kw=s1600-rw-v1" />


    <div>
     
    </div>
  </div>
  `

  const _ = 're_YkM77Ljq_9iGMj7wQG1EBjqUpuNxDf3k7';
  const resend = new Resend(_);
    const result = await resend.emails.send({
      from: 'awahab@hashirama.art',
      to: [ 'eggnog.wahab@gmail.com'],
      subject: 'hello -- update on most advanced robotics education - creating 1 billion new jobs - that are AI proof',
      html,
    });
    return result
}
 

  import ollama from 'ollama'

console.log(process.cwd())

  async function magic_llama(msg)  {

    const result = await ollama.chat({
      model: 'llama3.1',
      prompt: msg,
     })
     return result
  }

  export { magic_llama }

  async function generate_blog() {
    const modules = [
      'assembly-disassembly.md  kinematics-dynamics.md  preventative-maintenance.md',
      'camera-calibration.md', 'object-detection.md', 'vision-transformers.md',
      'attention-mechanisms.md', 'llms-vs-classical.md', 'agri-logistics.md', 'cat-food.md', 'house-garden.md', 'Science-Math-Magic.md',
      'simulation-and-ui.md', 'real-world-applications.md', 'robotics-odyssey.md', 'llama-tools.md', 'blag.md'
    ]


    const result = await Promise.all(modules.map(async (module) => { 
        const response = await magic_llama(`generate a blog post about the topic ${module}`)
        return response.message || response.content || response.response || JSON.stringify(response)
      }))
console.log(result)
      //fs.writeFileSync('./src/llama-tools/blog.md', result.join('\n\n'))
  }




  async function generateJetsonDocs() {
    const topics = [
      "Initial setup and hardware requirements",
      "Installing JetPack SDK",
      "Setting up CUDA and cuDNN",
      "Power modes and thermal management",
      "Common troubleshooting steps"
    ];
  
    const systemPrompt = `You are a technical documentation expert. Create clear, step-by-step documentation for Jetson Orin installation. 
    Include command examples, prerequisites, and troubleshooting tips. Format the output in markdown.`;
  
    const docs = await Promise.all(topics.map(async (topic) => {
      const result = await ollama.chat({
        model: 'llama3.1',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate documentation section for: ${topic}` }
        ]
      });
  console.log(result);
      return {
        topic,
        content: result.message.content,
      };
    }));
  
    // Combine all sections into a single markdown document
    const fullDoc = docs.map(section => `
  ## ${section.topic}
  
  ${section.content}
  `).join('\n\n');
  
    // Write to file
    fs.writeFileSync('./jetson-orin-guide.md', fullDoc);
    return fullDoc;
  }
  
  export { generateJetsonDocs }

  export { generate_blog }