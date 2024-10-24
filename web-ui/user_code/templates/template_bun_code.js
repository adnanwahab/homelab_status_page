
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import async_hooks from 'async_hooks';
import buffer from 'buffer';
import child_process from 'child_process';
import cluster from 'cluster';
import console from 'console';
import constants from 'constants';
import crypto from 'crypto';
import dgram from 'dgram';
import dns from 'dns';
import domain from 'domain';
import events from 'events';
import http from 'http';
import http2 from 'http2';
import https from 'https';
import inspector from 'inspector';
import module from 'module';
import net from 'net';
import os from 'os';
import perf_hooks from 'perf_hooks';
import process from 'process';
import punycode from 'punycode';
import querystring from 'querystring';
import readline from 'readline';
import repl from 'repl';
import stream from 'stream';
import string_decoder from 'string_decoder';
import sys from 'sys';
import timers from 'timers';
import tls from 'tls';
import trace_events from 'trace_events';
import tty from 'tty';
import url from 'url';
import util from 'util';
import v8 from 'v8';
import vm from 'vm';
import worker_threads from 'worker_threads';
import zlib from 'zlib';


//user code goes here
// File Read/Write
	// •	fs.readFile(path, [options], callback) - Reads the contents of a file asynchronously.
	// •	fs.readFileSync(path, [options]) - Reads the file contents synchronously.
	// •	fs.writeFile(file, data, [options], callback) - Writes data to a file asynchronously.
	// •	fs.writeFileSync(file, data, [options]) - Writes data to a file synchronously.
	// •	fs.appendFile(file, data, [options], callback) - Appends data to a file asynchronously.
	// •	fs.appendFileSync(file, data, [options]) - Appends data to a file synchronously.
	// 2.	Directory Operations
	// •	fs.readdir(path, [options], callback) - Reads the contents of a directory.
	// •	fs.readdirSync(path, [options]) - Synchronously reads the contents of a directory.
	// •	fs.mkdir(path, [options], callback) - Creates a directory.
	// •	fs.mkdirSync(path, [options]) - Creates a directory synchronously.
	// •	fs.rmdir(path, callback) - Removes a directory.
	// •	fs.rmdirSync(path) - Removes a directory synchronously.
	// 3.	File Metadata
	// •	fs.stat(path, callback) - Gets file stats asynchronously (size, permissions, etc.).
	// •	fs.statSync(path) - Gets file stats synchronously.
	// •	fs.lstat(path, callback) - Like stat but for symbolic links.
	// •	fs.lstatSync(path) - Synchronously gets stats for symbolic links.
	// 4.	File/Directory Removal
	// •	fs.unlink(path, callback) - Deletes a file asynchronously.
	// •	fs.unlinkSync(path) - Deletes a file synchronously.
	// •	fs.rm(path, [options], callback) - Removes files or directories asynchronously (newer Node versions).
	// •	fs.rmSync(path, [options]) - Removes files or directories synchronously.
	// 5.	File Manipulation
	// •	fs.rename(oldPath, newPath, callback) - Renames a file or directory asynchronously.
	// •	fs.renameSync(oldPath, newPath) - Renames a file or directory synchronously.
	// •	fs.copyFile(src, dest, [mode], callback) - Copies a file asynchronously.
	// •	fs.copyFileSync(src, dest, [mode]) - Copies a file synchronously.
	// •	fs.truncate(path, len, callback) - Truncates a file to a specified length.
	// •	fs.truncateSync(path, len) - Synchronously truncates a file to a specified length.
	// •	fs.symlink(target, path, [type], callback) - Creates a symbolic link.
	// •	fs.symlinkSync(target, path, [type]) - Creates a symbolic link synchronously.
	// 6.	File Descriptors
	// •	fs.open(path, flags, [mode], callback) - Opens a file for reading or writing.
	// •	fs.openSync(path, flags, [mode]) - Synchronously opens a file for reading or writing.
	// •	fs.close(fd, callback) - Closes a file descriptor asynchronously.
	// •	fs.closeSync(fd) - Closes a file descriptor synchronously.
	// •	fs.fstat(fd, callback) - Gets file stats using a file descriptor.
	// •	fs.fstatSync(fd) - Gets file stats synchronously using a file descriptor.
	// •	fs.fsync(fd, callback) - Synchronizes a file’s in-core state with the storage device asynchronously.
	// •	fs.fsyncSync(fd) - Synchronizes a file’s state synchronously


