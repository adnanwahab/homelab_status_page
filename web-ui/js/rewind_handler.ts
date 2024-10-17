

const data_files_path_name = `/System/Volumes/Data/Users/shelbernstein/Library/Application\ Support/com.memoryvault.MemoryVault`


const { execSync } = require('child_process');

try {
  const command = `ls ~/rwind`
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


import { Database } from 'bun:sqlite';

function readAllRows(dbPath: string, tableName: string) {
  const db = new Database(dbPath);
  const query = db.query(`SELECT * FROM ${tableName}`);
  const rows = query.all();
  db.close();
  return rows;
}

const rows = readAllRows('db-enc.sqlite3', 'your_table_name');
console.log(rows);



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


// import { readdir, readFile } from 'fs/promises';
// import { join } from 'path';

// async function readSnippets(snippetsDir: string) {
//   const snippetFiles = await readdir(snippetsDir);
//   const snippets = await Promise.all(
//     snippetFiles.map(async (file) => {
//       const content = await readFile(join(snippetsDir, file), 'utf-8');
//       return { name: file, content };
//     })
//   );
//   return snippets;
// }

// // Usage
// const snippets = await readSnippets('snippets');
// console.log(snippets);



// import { readdir, readFile } from 'fs/promises';
// import { join } from 'path';

// async function readChunks(chunksDir: string) {
//   const chunkFiles = await readdir(chunksDir);
//   const chunks = await Promise.all(
//     chunkFiles.map(async (file) => {
//       const content = await readFile(join(chunksDir, file));
//       return { name: file, content };
//     })
//   );
//   return chunks;
// }

// // Usage
// const chunks = await readChunks('chunks');
// console.log(chunks);


//world transforming mind 