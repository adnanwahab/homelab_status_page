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

folders.forEach((_) => {
  fs.writeFileSync(
    `course_content/src/${_}.md`,
    `---
title: ${_}
---
`,
  );
});
