import fs from "fs";
import path from "path";
import { Ollama } from "ollama";

const ollama = new Ollama();
// Agent 1: Unused File Marker
async function findUnusedFiles(directory) {
  const files = getAllFiles(directory);
  const unusedFiles = [];

  for (const file of files) {
    const fileContent = fs.readFileSync(file, "utf-8");
    const response = await ollama.generate({
      model: "llama3.2",
      prompt: `Analyze the following file and determine if it's used or not in the project. Consider imports, function calls, and references. Respond with only "USED" or "UNUSED":\n\n${fileContent}`,
    });

    const result = response.trim().toUpperCase();
    if (result === "UNUSED") {
      unusedFiles.push(file);
    }
  }

  return unusedFiles;
}


// Agent 2: Comment Quality Evaluator
async function moveComments(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  console.log('acorn', filePath)
  //install -g uglify-js
  // const response = await ollama.generate({
  //   model: "codellama:13b",
  //   prompt: `Evaluate the following code comments and suggest improvements or removal of unnecessary ones:\n\n${fileContent}`,
  // });

  const acorn = require("acorn");
  const acornWalk = require("acorn-walk");

  let comments = [];
  let ast = acorn.parse(fileContent, {
    onComment: comments,
    locations: true,
  });

  acornWalk.simple(ast, {
    Program(node) {
      node.body = node.body.filter((stmt) => stmt.type !== "CommentLine" && stmt.type !== "CommentBlock");
    },
  });

  let newFileContent = acorn.generate(ast);
  console.log(newFileContent)
  //fs.writeFileSync(filePath, newFileContent);
  return { newFileContent, comments };
  // Process the response and return suggestions
}

function getAllFiles(directory) {
  let files = [];
  let entries = fs.readdirSync(directory, { withFileTypes: true });
  const ignore_list = ['node_modules', 'dist', 'docs', 'user_code'];

  //console.log(ignore_list)

  ignore_list.forEach(ignore => {   
    entries = entries.filter(entry => entry.name !== ignore);
  });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}


async function runAllAgents(directory) {
  const root_dir = '/home/adnan/homelab_status_page/web-ui/';
  const ignore_list = ['node_modules', 'dist', 'docs', 'user_code', 'obs3-breakout' ,'js'];
  let files = getAllFiles(root_dir, ignore_list);

  files = files.filter(file => !['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'].includes(path.extname(file).toLowerCase()));
  console.log(files.length);

  //fs.writeFileSync('concatenated_files.txt', concatenatedContent);
  //console.log(concatenatedContent.length)

  //const unusedFiles = await findUnusedFiles(directory);
  //saveSuggestions({ unused_files: unusedFiles }, "unused_files.json");

  //const directorySuggestions = await suggestDirectorySimplifications(directory);
  //saveSuggestions({ directory_suggestions: directorySuggestions }, "directory_suggestions.json");
  let count = {
    comments: {},
    by_extension: {},

  }

  files.forEach(file => {
    if (path.extname(file) === '.js' || path.extname(file) === '.ts' || path.extname(file) === '.jsx' || path.extname(file) === '.tsx') {   
      count.by_extension[path.extname(file)] =(count.by_extension[path.extname(file)] || 0) + fs.readFileSync(file, 'utf-8').length
      //count['comments'][file] = moveComments(file)
      count[file] = fs.readFileSync(file, 'utf-8').length
    }
  });

  //console.log(count)

  // ... run other agents and save their suggestions ...
  fs.writeFileSync('files.json', JSON.stringify(count, null, 2));

  //anthropci ---- 200k maximum
  //gemini 2 million token context window
}

runAllAgents()