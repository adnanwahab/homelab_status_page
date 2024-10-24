import fs from "fs";
import { exec } from "child_process";

async function serveMakeBunCell(req: Request) { 
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

  // If not OPTIONS, process the actual POST request
  if (req.method === "POST") {
      const json = await req.json();
      //console.log("Received JSON:", json);
      // Process your POST request here
      const bun_code = json.bun_code;
    if (!bun_code) {
          return new Response("bun_code parameter is missing", { status: 400 });
        }

        // Use the Function constructor to execute the template string safely
        const result = fs.readFileSync("template_bun_code.js", "utf-8") + bun_code;
        const user_code_file_name = `${json.file_name}.js`;
        
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
          const { stdout, stderr } = await execPromise(`bun run ${user_code_file_name}`);
          
          const json_response = {
            stdout: stdout,
            stderr: stderr,
            error: "",
            streamable: false
          };

          console.log("json_response", json_response);

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
}

export default serveMakeBunCell;