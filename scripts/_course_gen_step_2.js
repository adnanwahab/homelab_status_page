import { OpenAI } from "openai";
import { join } from "path";
import fs from "fs";

const openai_api_key = process.env.OPENAI_KEY;

const client = new OpenAI({
  apiKey: openai_api_key,
});

const output_dir = "course_content/src";

function parseGPT(results) {
  const comp = results;
  if (comp.choices.length === 0) {
    return null;
  }

  const messageContent = comp.choices[0].message.content;
  return messageContent;
}

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

const queryFileExt = {
  demos: "js",
  threejs: "js",
  khanacademy: "js",
  observable: "js",
  d3js: "js",
  research_papers: "md",
  visualizations: "md",
  videos: "md",
  tweets: "md",
  docs: "md",
  websites: "md",
};

//  Twitter  LinkedIn  Github  YouTube  Instagram  Email  Terms

async function processChunk(folderName, index) {
  const prompt =
    Object.values(queries)[index] +
    `generate a diagram from the folder name ${folderName} `;
  console.log(prompt);
  const processed = "hello";
  // const chatCompletion = await client.chat.completions.create({
  //   model: 'gpt-4o-mini',
  //   messages: [{ role: 'user', content: prompt }],
  // });
  // const processed = parseGPT(chatCompletion);
  const outputFilePath = join(input_dir, folderName, `${index}.md`);
  let dummy_path =
    "data/course_intermediate/" + folderName + "/" + index + ".md";
  //await Bun.write(outputFilePath, processed);
  console.log(dummy_path);
}

async function processAllFilesInDirectory() {
  const modules = JSON.parse(
    fs.readFileSync(join("data/odyssey/modules.json")),
  ).modules;

  console.log(modules);

  const startTime = Date.now();

  const endTime = Date.now();
  console.log(
    `processing all files in directory took ${endTime - startTime} milliseconds`,
  );

  modules.slice(3).forEach((module) => {
    //console.log(module);
    const human_name = module.name.replace(/&| /g, "-");
    console.log(human_name);
    const currentModulePath = join(
      "data",
      "intermediate-representaiton",
      human_name,
    );

    fs.mkdirSync(currentModulePath, { recursive: true });
  });
}

await processAllFilesInDirectory();
const folders = fs.readdirSync("data/intermediate-representaiton");

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

//console.log("Observable Config:", observableConfig);

const _ = [
  {
    name: "Machine Perception",
    pages: [
      { name: "Object Detection", path: "object-detection" },
      { name: "Camera Calibration", path: "camera-calibration" },
      { name: "Vision Transformers", path: "vision-transformers" },
    ],
  },
  {
    name: "Planning & Prediction",
    pages: [
      { name: "Attention Mechanisms", path: "attention-mechanisms" },
      { name: "Motion Trajectory Prediction", path: "motion-prediction" },
      { name: "LLMs vs Classical Planning", path: "llms-vs-classical" },
    ],
  },
  {
    name: "Simulation",
    pages: [
      { name: "Unreal Engine and Isaac ROS", path: "unreal-isaac" },
      { name: "Sim2Real Generalization", path: "sim2real" },
      { name: "Manipulation Policy Evaluation", path: "policy-evaluation" },
    ],
  },
  {
    name: "User Interfaces and Command Systems",
    pages: [
      { name: "Tele-guidance and Remote Control", path: "tele-guidance" },
      { name: "Command and Control Interface", path: "command-control" },
      { name: "Interactive Debugging", path: "interactive-debugging" },
    ],
  },
  {
    name: "Real World Applications",
    pages: [
      { name: "Cat Food", path: "cat-food" },
      { name: "Agriculture and Logistics", path: "agri-logistics" },
      { name: "House Building and Gardening", path: "house-garden" },
      { name: "Aqua Robotics", path: "aqua-robotics" },
    ],
  },
  {
    name: "Foundations of Hardware Design & Repair & Maintenance",
    pages: [
      { name: "Assembly", path: "assembly-disassembly" },
      { name: "Kinematics and Dynamics", path: "kinematics-dynamics" },
      { name: "Essential Robotics Tools", path: "robotics-tools" },
      { name: "Fault Diagnosis", path: "fault-diagnosis" },
      { name: "Motor and Sensor Repair", path: "motor-sensor-repair" },
      { name: "Preventative Maintenance", path: "preventative-maintenance" },
    ],
  },
  {
    name: "Electrical Engineering Essentials",
    pages: [
      { name: "Power Management", path: "power-management" },
      { name: "Embedded Systems", path: "embedded-systems" },
      { name: "Communication Protocols", path: "communication-protocols" },
    ],
  },
];

// {
//   name: "Building Robotics UI",
//   pages: [
//     { name: "Tele-guidance and Remote Control", path: "tele-guidance" }
//     // {name: "Command and Control Interface", path: "command-control"},
//     // {name: "Interactive Debugging", path: "interactive-debugging"}
//   ]
// }
//
const frontMatter = (path) => `---
  title: ${path}
---
   `;

_.forEach((_) => {
  _.pages.forEach((_) => {
    const page = _;

    fs.writeFileSync(
      `course_content/src/${page.path}.md`,
      frontMatter(page.name),
    );
  });
});
