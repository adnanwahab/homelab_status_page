import fs from "fs";
import { exec } from "child_process";

async function serveMakePythonCell(req: Request) { 
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
        const python_code = json.python_code;
        console.log("python_code!", python_code);
      if (!python_code) {
            return new Response("python_code parameter is missing", { status: 400 });
          }
  
          // Use the Function constructor to execute the template string safely
          const result = fs.readFileSync("template_python.py", "utf-8") + python_code;
          console.log("result", result);
          const user_code_file_name = `${json.file_name}.py`;
          
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
            console.log("before exec");

            //tip: to pass '--access-all' as a value, use '-- --access-all'
            let run_command = `python3 ${user_code_file_name}`
            //console.log("run_coommand", run_coommand);
            const { stdout, stderr } = await execPromise(run_command);
            
            const json_response = {
              stdout: stdout,
              stderr: stderr,
              error: "",
              streamable: false
            };
  
  
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

    return new Response("make bun cell", {
      headers: {
        "Content-Type": "application/json",
      },
    });

}

export default serveMakePythonCell;