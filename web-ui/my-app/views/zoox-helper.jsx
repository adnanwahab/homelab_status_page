//import fs from 'fs'
import { promises as fs } from "fs";
const { readFileSync } = require('fs');
const { join } = require('path');
const { execSync } = require('child_process');
//aggents write to this -> keep it down to 200 lines.
import parallel_llm from './parrallel-llm'
//ads = nuclear polymerizaiton of all elements - periodic table.
// first - can you fromat this list into a json of templates  - from observablehq and then tell me which ones  i can use to visualize a codebase of 1 million lines
// 1. i need a dependency module graph
// 2-5. anything else you thinkg that applies
const makeWorkSpaceLocation = (file_name) => path.join(output_put_directory, file_name)
//const templates = fs.readFileSync("/home/adnan/homelab_status_page/web-ui/observable_templates.html")
let first_prompt = "which of these templates can be used to visualize a codebase of 1 million lines of code? - i need a module depeencygraph and things like explanations for all tools inlcuding bazel etc"

const ROOT = '/home/adnan/homelab_status_page/data//intermediate_representation/robotics_knowledge_book_of_future/mini_zoox/';
import path from 'path'

const output_put_directory = '/home/adnan/homelab_status_page/data/intermediate_representation/micro_zoox/'
let index_of_files = {}
//workspace start  - //1million to 500. - show steps
//isaacS comptuer scicence.
let all_files_and_info = [

]
let dependency_graph = {}
let symbols_and_tokens = {} //how functions and tools are used.
let actual_output = {symbols_and_tokens} 

async function getAllFilesAndContent(path_name) {
    const children_file_paths = await fs.promises.readdir(path_name);
    children_file_paths.forEach(file => {
        index_of_files[file] = {}
    });
    console.log('files:', children_file_paths.length);

        // files.map(async (file) => {
        //     const filePath = path.join(path_name, file);
        //     const stats = await fs.promises.stat(filePath);
        //     return { 
        //         file, 
        //         fileSize: stats.size, 
        //         lastModified: stats.mtime 
        //     };
        // })

    children_file_paths.forEach(fp => {
        const child_file_path = path.join(ROOT + fp)
        console.log(child_file_path)
        if (fs.lstatSync(child_file_path).isDirectory()) {
            getAllFilesAndContent(ROOT + fp)
        }
    });
}

console.log('Date:', new Date().toISOString());
const index_file_location = makeWorkSpaceLocation('index.json')
// getAllFilesAndContent(ROOT).then((result) => {
//     fs.writeFileSync(index_file_location, JSON.stringify(index_of_files))
// });
//console.log('index file location:', fs.readFileSync(index_file_location).length);
console.log('Date:', new Date().toISOString());


// Helper function to convert bytes to a more readable format (e.g., KB, MB)
function formatSize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}

// Function to walk through the directory and gather file metadata
async function walkDir(dir, index = {}) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = join(dir, file.name);
    const stats = await fs.stat(fullPath);
    
    if (file.isDirectory()) {
      const children = (await fs.readdir(fullPath)).length;
      index[file.name] = { isDir: true, children: children };
      await walkDir(fullPath, index); // Recursively walk through subdirectories
    } else if (file.isFile()) {
      const contentLength = formatSize(stats.size);
      const dateEdit = stats.mtime.toDateString();
      index[file.name] = {
        isFile: true,
        contentLength: contentLength,
        dateEdit: dateEdit,
      };
    }
  }
  
  return index;
}



const directory = ROOT
const index = await walkDir(directory);
await fs.writeFile(makeWorkSpaceLocation('index.json'), JSON.stringify(index, null, 2));
console.log('Index file has been written to:', makeWorkSpaceLocation('index.json'));


//console.log(JSON.stringify(index, null, 2));



//prediction + autofix if its EASY -> if its between 50-70P then suprevise 
//codium
const cachedIndex = {
    "omlet": 0,
    "hyperion": 0,
    "cozm": 0,
    "BUILD.bazel": 0,
    "vis": 0,
    "cas": 0,
    "continuum": 0,
    "tools": 0,
    "automated_collision_reviewer": 0,
    "imaging": 0,
    "log_mining": 0,
    "logger": 0,
    "vehicle": 0,
    "clams": 0,
    "OWNERS": 0,
    "fakeros": 0,
    "labeling": 0,
    "pipedream": 0,
    "ci": 0,
    "camera": 0,
    "example": 0,
    "hwsi": 0,
    "qa": 0,
    "google": 0,
    "data": 0,
    "mapping": 0,
    "vetur.config.js": 0,
    "teleop": 0,
    "scripts": 0,
    "ride_and_fleet_tools": 0,
    "base": 0,
    "docker_images": 0,
    "bom": 0,
    "vision": 0,
    "alpha_ops": 0,
    "log_tests": 0,
    "prediction": 0,
    "calibration": 0,
    "hap_documentation": 0,
    "WORKSPACE": 0,
    "bin": 0,
    "mined_metric": 0,
    "spectrum": 0,
    "zsaf": 0,
    "third_party": 0,
    "ros_utilities": 0,
    "ml": 0,
    "zlearner": 0,
    "security": 0,
    "rostask": 0,
    ".git": 0,
    "README.md": 0,
    "experimental": 0,
    "knight_industries": 0,
    "web_apps": 0,
    "packages": 0,
    "doc": 0,
    "production": 0,
    "build": 0,
    "carmaker": 0,
    "dispatch": 0,
    "lidar": 0,
    "infra": 0,
    ".DS_Store": 0,
    "localization": 0,
    "argus": 0,
    "fleetdash_v2": 0,
    "tflight": 0,
    "sim": 0,
    "firmware": 0,
    "slack_bots": 0,
    "core": 0,
    "safety_model": 0,
    "radar": 0,
    "mapreduce": 0,
    "kraken": 0
};



  
        //const resultString = JSON.stringify(result);
        //const byteSize = Buffer.byteLength(resultString, 'utf8');
        //console.log(`The result string is ${byteSize} bytes.`);
        //const resultString = JSON.stringify(result);
 
        //console.log(result);
        //fs.writeFileSync(makeWorkSpaceLocation('all_files_and_content.json'), JSON.stringify(result));
    //}).catch((error) => {
        //console.error('Error reading files:', error);
    //});
   

    //console.log(result);

    //fs.writeFileSync(makeWorkSpaceLocation('all_files_and_content.json'), JSON.stringify(result));

    //console.error('Error reading files:', error);



// fs.readdirSync(ROOT).forEach(file => {
//   //console.log(file)
//   index_of_files.push(file)
// })


//let index_file_location = makeWorkSpaceLocation('index.json')



//151 chat GPT thre
// function splitIntoChunks(str, chunkSize) {
// const chunks = [];
// for (let i = 0; i < str.length; i += chunkSize) {
//     chunks.push(str.slice(i, i + chunkSize));
// }
// return chunks;
// }

// const chunkSize = Math.ceil(templates.length / 5);
// const templateChunks = splitIntoChunks(templates, chunkSize);

// async function processChunks() {
//     console.log('starting opeani requests');
//     const results = await Promise.all(
//         templateChunks.map(async (chunk, index) => {
//             return await parallel_llm(first_prompt + chunk);
//         })
//     );

    
//     fs.writeFileSync(makeWorkSpaceLocation('visualization_templates_that_make_sense.txt'), JSON.stringify(results));
//     console.log('iteration done');
// }

//processChunks().catch(error => console.error('Error processing chunks:', error));
//karios + pau + toadStool (mario + zoox + funny)
//monday oct 21 - send to jesse  via resend from _.roboticsodyssey.com
//let me know if this is notebook is cool
//dwarf fortress -> max out livekit 
//can 1000 of good openAI Prompts make 5 milly in 2 years??? - (riich_hichkey+chomksy) understand zoox + 10,000 books related to zoox - everyone = friend - no hierachy -- rainbow dots = option / view

//heroku 4 llama artficats 

















//sorry about the unprofresssional emails 3 years ago, i was on a new presctiption and it took a few weeks to adjust. 


// function Print(user_message){
//     const ts = new Date().toISOString() + " " + user_message;


//     function getLineNumber() {
//         const filePath = join(__dirname, 'zoox-helper.jsx');
//         const fileContent = readFileSync(filePath, 'utf-8');
//         const lines = fileContent.split('\n');
//         const currentLine = new Error().stack.split('\n')[2].split(':')[1];
//         return parseInt(currentLine, 10);
//     }

//     console.log(`Current line number: ${getLineNumber()}`);
//     console.log(`${ts}: ${message}`);

//     //STDOUT -> directory or whatever or api to log-rocket boguht 
// }

