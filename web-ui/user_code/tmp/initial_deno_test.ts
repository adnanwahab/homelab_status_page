// Deno-compatible imports
import  fs from "node:fs";
import  path from "node:path";
import  assert from "node:assert";
import  crypto from "node:crypto";
import  events from "node:events";
import  os from "node:os";
import  process from "node:process";
import  stream from "node:stream";
import  timers from "node:timers";
import  url from "node:url";
import  util from "node:util";


// Additional Deno-specific imports
// import { 
//     errors,
//     ffi,
//     fetch,
//     gpu,
//     serve,
//     io,
//     jupyter,
//     net,
//     permissions,
//     runtime,
//     subprocess,
//     testing,
//     websocket
//   } from "https://deno.land/x/deno/mod.ts";

// ... user code goes here


console.log(fs.readdirSync('./'))