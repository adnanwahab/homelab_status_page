import { OpenAI } from "openai";
import { join } from "path";
import fs from "fs";

const openai_api_key = process.env.OPENAI_KEY;

const client = new OpenAI({
  apiKey: openai_api_key,
});


function parseGPT(results) {
  const comp = results;
  if (comp.choices.length === 0) {
    return null;
  }

  const messageContent = comp.choices[0].message.content;
  return messageContent;
}

const course_modules = [
  {
    name: "1. Perception",
    pages: [
      { name: "Object Detection", path: "perception/object-detection" },
      { name: "Camera Calibration", path: "perception/camera-calibration" },
      { name: "Vision Transformers", path: "perception/vision-transformers" },
    ],
  },
  {
    name: "2. Planning & Prediction",
    pages: [
      { name: "Motion Trajectory Prediction", path: "planning/motion-prediction" },
      { name: "LLMs vs Classical Planning", path: "planning/llms-vs-classical" },
    ],
  },
  {
    name: "3. Simulation and UI",
    pages: [
      { name: "Unreal Engine and Isaac ROS", path: "simulation/unreal-isaac" },
      { name: "Sim2Real Generalization", path: "simulation/sim2real" },
      { name: "Manipulation Policy Evaluation", path: "simulation/policy-evaluation" },
      { name: "Robotics Learning", path: "simulation/robot-learning-simulation-and-environment-and-trajectory-planning" },
      { name: "Environment and Trajectory Planning", path: "simulation/environment-and-trajectory-planning" },
    ],
  },
  {
    name: "4. Hardware",
    pages: [
      { name: "Assembly", path: "hardware/assembly-disassembly" },
      { name: "Kinematics and Dynamics", path: "hardware/kinematics-dynamics" },

      { name: "Preventative Maintenance", path: "hardware/preventative-maintenance" },

    ],
  },
  {
    name: "5. Real World Applications",
    pages: [
      { name: "Cat Food", path: "cat-food" },
      { name: "Agriculture and Logistics", path: "agri-logistics" },
      { name: "House Building and Gardening", path: "house-garden" },
      { name: "Science & Math Magic", path: "science-math-magic" },
    ],
  },
];

const queries = {
  desmos: "gen a javascript code to visualize topic like desmos ",
  threejs: "gen a javascript code to visualize topic like threejs ",
  khanacademy: "gen a javascript code to visualize topic like khanacademy",
  observable: "gen a javascript code to visualize topic like observable",
  d3js: "gen a javascript code to visualize topic like d3js",
  research_papers: "links to any related research papers",
  visualizations: "links to any visualizaions ",
  videos: "links to videos",
  tweets: "links to tweets or any social media ",
  docs: "docs / websites ",
};

async function processChunk(folderName, index) {
  const prompt =
    Object.values(queries)[index] +
    `generate a diagram from the folder name ${folderName} `;

  const chatCompletion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });
  const processed = parseGPT(chatCompletion);
  let dummy_path =
    "course_content/src/" + folderName + "/" + index + ".md";
  return processed;
}

async function processAllFilesInDirectory() {
  for (const module of course_modules) {
    const human_name = module.name.slice(3).replace(/&| /g, "-");
    const currentModulePath = join(
      "course_content/src",
      human_name,
    );

    const pagePromises = module.pages.map((page, index) => 
      processChunk(page.name, index)
    );

    const processedPages = await Promise.all(pagePromises);

      const pathname = join(currentModulePath  + ".md")
      console.log(content);
      let content = 
      fs.readFileSyncFileSync(pathname, content) +  processedPages.join('');
      fs.writeFileSync(pathname, content);
  }
}


const startTime = Date.now();
console.log("starting");
await processAllFilesInDirectory();
const endTime = Date.now();
console.log(
  `processing all files in directory took ${endTime - startTime} milliseconds`,
);
//const folders = fs.readdirSync("data/intermediate-representaiton");

// folders.forEach((_) => {
//   fs.writeFileSync(
//     `course_content/src/${_}.md`,
//     `---
// title: ${_}
// ---
// `,
//   );
// });

import observableConfig from "../../course_content/observablehq.config.js";


// const frontMatter = (path) => `---
//   title: ${path}
// ---
//    `;

// _.forEach((_) => {
//   _.pages.forEach((_) => {
//     const page = _;

//     fs.writeFileSync(
//       `course_content/src/${page.path}.md`,
//       frontMatter(page.name),
//     );
//   });
// });
