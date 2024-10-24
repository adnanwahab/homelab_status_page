import fs from "fs";
import { exec } from "child_process";

async function serveMakeDenoCell(req: Request) { 
    //console.log("serveMakeBunCell", req);
      if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204, // No Content
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }
    //https://threejs.org/examples/?q=webgpu#webgpu_tsl_vfx_linkedparticles
    // If not OPTIONS, process the actual POST request
    if (req.method === "POST") {
        const json = await req.json();
        //console.log("Received JSON:", json);
        // Process your POST request here
        const deno_code = json.deno_code;
        const datum = json.datum;
        // console.log("datum", Object.keys(datum));
        // if (!datum) {
        //   return new Response("deno_code parameter is missing", { status: 400 });
        //}
        //console.log("deno_code", deno_code);
      if (!deno_code) {
            return new Response("deno_code parameter is missing", { status: 400 });
          }
  
          // Use the Function constructor to execute the template string safely
          const result = fs.readFileSync("user_code/templates/template_deno_code.js", "utf-8") + deno_code;
          const user_code_file_name = `user_code/tmp/${json.file_name}.ts`;
          
          fs.writeFileSync(user_code_file_name, result);
  
       
          // Wrap the exec function in a Promise
          const execPromise = (command) => {
            return new Promise((resolve, reject) => {
              exec(command, (error, stdout, stderr) => {
                if (error) {
                  reject(error);
                } else {
                  resolve({ stdout, stderr });
                }
              });
            });
          };
  
          try {
            //tip: to pass '--access-all' as a value, use '-- --access-all'
            // let run_coommand = `deno run --allow-all --unstable ${user_code_file_name} ${JSON.stringify(datum)}`

            
            let run_coommand = `deno run --allow-all --unstable /Users/shelbernstein/homelab_status_page/web-ui/user_code/tmp/initial_webgpu_test.ts ${JSON.stringify(datum)}`

            //console.log("run_coommand", run_coommand);
            const { stdout, stderr } = await execPromise(run_coommand);
            
            const json_response = {
              stdout: stdout,
              stderr: stderr,
              error: "",
              streamable: false
            };
  
            //console.log("json_response", json_response);
  
            return new Response(JSON.stringify(json_response), {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Add CORS header
              }
            });
          } catch (error) {
            console.error("Error executing file:", error);
            return new Response(JSON.stringify({ error: "Error executing file" }), {
              status: 500,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Add CORS header
              }
            });
          }
    }

  // try {
  //   const json = await req.json();
  // } catch (error) {

  //   console.error("Error parsing JSON:", error);
  //   return new Response("Invalid JSON in request body", { status: 400 });
  // }
    // const bun_code = json.bun_code;
   
    // console.log("Received bun_code:", bun_code);

    // Process the bun_code here
    // For now, we'll just return a placeholder response
    //return new Response("Method not allowed", { status: 405 });

    return new Response("make bun cell", {
      headers: {
        "Content-Type": "application/json",
      },
    });

}

export default serveMakeDenoCell;