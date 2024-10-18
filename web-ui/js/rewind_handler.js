//const data_files_path_name = `/System/Volumes/Data/Users/shelbernstein/Library/Application\ Support/com.memoryvault.MemoryVault`
const data_files_path_name = `/Users/shelbernstein/rwind`


const { execSync } = require('child_process');

try {
  const command = `ls /Users/shelbernstein/rwind`
  console.log('command:', command);
  const files = execSync(command).toString();
  console.log('Files:', files);
} catch (error) {
  console.error('Error listing files:', error);
}


// chunks
// db-enc.sqlite3
// db-enc.sqlite3-shm
// db-enc.sqlite3-wal
// snippets
// temp


// import { Database } from 'bun:sqlite';

// function readAllRows(dbPath: string, tableName: string) {
//   const db = new Database(dbPath);
//   const query = db.query(`SELECT * FROM ${tableName}`);
//   const rows = query.all();
//   db.close();
//   return rows;
// }

// const rows = readAllRows('db-enc.sqlite3', 'your_table_name');
// console.log(rows);



// function readRowById(dbPath: string, tableName: string, id: number) {
//     const db = new Database(dbPath);
//     const query = db.query(`SELECT * FROM ${tableName} WHERE id = ?`);
//     const row = query.get(id);
//     db.close();
//     return row;
//   }
  
//   // Usage
//   const row = readRowById('db-enc.sqlite3', 'your_table_name', 1);
//   console.log(row);



// function executeCustomQuery(dbPath: string, sqlQuery: string, params: any[] = []) {
//     const db = new Database(dbPath);
//     const query = db.query(sqlQuery);
//     const result = query.all(...params);
//     db.close();
//     return result;
//   }
  
//   // Usage
//   const result = executeCustomQuery('db-enc.sqlite3', 'SELECT * FROM users WHERE age > ?', [18]);
//   console.log(result);


import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import * as fs from 'fs';
//import ffmpeg from 'fluent-ffmpeg';
//import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

//ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// Function 1: List all .m4a files in the snippets directory
async function listM4AFiles(snippetsDir)  {
  const files = await readdir(snippetsDir);
  return files.filter(file => file.endsWith('.m4a'));
}

// Function 2: Read metadata of an .m4a file
function readM4AMetadata(filePath){
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) reject(err);
      else resolve(metadata);
    });
  });
}

// Function 3: Read and process all .m4a files
// async function processAllM4AFiles(snippetsDir: string): Promise<any[]> {
//   const m4aFiles = await listM4AFiles(snippetsDir);
//   const results = await Promise.all(m4aFiles.map(async (file) => {
//     const filePath = join(snippetsDir, file);
//     const metadata = await readM4AMetadata(filePath);
//     return {
//       name: file,
//       metadata,
//       // You can add more processing here if needed
//     };
//   }));
//   return results;
// }

// Usage
const snippetsDir = join(data_files_path_name, 'snippets');



import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function listSnippets() {
  try {
    const { stdout, stderr } = await execAsync('ls ~/rwind/snippets/*');
    if (stderr) {
      console.error('Error listing snippets:', stderr);
    } else {
      console.log('Snippets:', stdout);
    }
  } catch (error) {
    console.error('Error executing command:', error);
  }
}

async function getFullPathnames() {
  const snippetsDir = []
  try {
    const { stdout, stderr } = await execAsync('ls ~/rwind/snippets/*');
    if (stderr) {
      console.error('Error listing snippets:', stderr);
    } else {
      const files = stdout.split('\n').filter(line => line.trim() !== '');
      let filepath = ''
      files.forEach(file => {
        if (file.endsWith('.m4a')) {

          snippetsDir.push(filepath.slice(0, -1) + '/' + file);
          filepath = ''
        } else {
          filepath = file
        }
      });
    }
  } catch (error) {
    console.error('Error executing command:', error);
  }
  return snippetsDir;
}

let rewound_files = await getFullPathnames();
console.log("rewound", rewound_files);

// processAllM4AFiles(snippetsDir)
//   .then(results => console.log(results))
//   .catch(error => console.error('Error processing .m4a files:', error));

// import { Database } from 'bun:sqlite';

// function listTables(dbPath: string): string[] {
//   const db = new Database(dbPath);
//   const query = db.query("SELECT name FROM sqlite_master WHERE type='table'");
//   const tables = query.all().map(row => row.name);
//   db.close();
//   return tables;
// }

// function readAllRows(dbPath: string, tableName: string) {
//   const db = new Database(dbPath);
//   const query = db.query(`SELECT * FROM ${tableName}`);
//   const rows = query.all();
//   db.close();
//   return rows;
// }

// // Usage
// const dbPath = 'db-enc.sqlite3';
// const tables = listTables(dbPath);
// console.log('Available tables:', tables);

// if (tables.length > 0) {
//   const firstTable = tables[0];
//   console.log(`Reading data from table: ${firstTable}`);
//   const rows = readAllRows(dbPath, firstTable);
//   console.log(rows);
// } else {
//   console.log('No tables found in the database.');
// }

// cursor helper - rules -> import fs from "fs" - fs.readFileSync
// prefer namespaces

//delete mail@adnanwahab.com - today because wizards asked.
//delete verecel - only use vitepress 
//all google account re-direct to eggnog - make youtube helpers for mail@

//sorry - action - align actions with intenions - minutely

// 15gb : shel.bernstein123@gmail.com
// 15gb : eggnog.wahab@gmail.com
//100GB : adnan.f.wahab@gmail.com

//convert evanw into alan kay - https://www.crunchbase.com/person/evan-wallace
//recreate everything adnan deleted - using creative AI - {projection mapping, kapil, famo.us-photo} - 500

// pau > flour.storm 