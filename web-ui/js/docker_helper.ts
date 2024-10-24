import { spawn } from "child_process";

function docker_run(){ 
  const containerName = "zed2i-container";
  const imageName = "<zed-container>";  // Replace with your ZED Docker image
  
  const dockerRunArgs = [
    "run", 
    "--rm",
    "--runtime", "nvidia",
    "--gpus", "all",
    "--network", "host",
    "--env", "DISPLAY=$DISPLAY",
    "--volume", "/tmp/.X11-unix:/tmp/.X11-unix:rw",
    "--device", "/dev/video0", // Adjust if using another device
    "--name", containerName,
    imageName,
    "/bin/bash"
  ];
  
  console.log("Starting Jetson container for ZED 2i...");
  
  const dockerProcess = spawn("docker", dockerRunArgs);
  
  dockerProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
  
  dockerProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  
  dockerProcess.on("close", (code) => {
    console.log(`Docker process exited with code ${code}`);
  });

}

export default docker_run;