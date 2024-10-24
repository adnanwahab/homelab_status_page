const { exec } = require('child_process');
const { execSync } = require('child_process');
import { $ } from "bun";
const { spawn } = require("child_process");

async function os_automation(req) {
    const { method } = req;
  
    // Handle OPTIONS requests for CORS preflight
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204, // No Content
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }
  
    // https://bun.sh/docs/api/file-system-router
      // Ensure the request method is correct
      if (req.method !== "POST") {
        console.log("Invalid request method. POST expected.");
      }
  
      // Check if request body exists
      if (!req.body) {
        console.log("No request body found");
      }
  
  
    //console.log('req', req)
    const jsonData = await req.json().catch(err =>  console.log('shits fucked', err) );
  
    console.log(' os jsonData', jsonData.cmd);
  
    //$.escape (escape strings)
  
    const { stdout, stderr, exitCode } = await $`${jsonData.cmd}`
        .quiet()
        .nothrow()
       
        const data = { stdout, stderr, exitCode }
        
  
      const _ = require('lodash');
  
      const responseValue = _.mapValues(data, value => value.toString());
      return new Response( JSON.stringify(responseValue), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
  }