#!/usr/bin/env node

'use strict';

import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { hostname } from 'node:os';
import { URL } from 'node:url';
import process from 'node:process';

const PORT = process.env.PORT || 3000;
let name;

function app(req, res) {
	const METHOD_NOT_ALLOWED = 405;
	const CAT_NAME = 'Kitty';
	
	function handleGet(req, res) {
		if (req.url === '/favicon.ico') {
			res.end();
		} else if (req.url === '/app.css') {
			res.setHeader('Content-Type', 'text/css; charset=utf-8');
			createReadStream('./app.css').pipe(res);
		} else if (req.url === '/app.js') {
			res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
			createReadStream('./app.js').pipe(res);
		} else if (req.url === '/name') {
			res.setHeader('Content-Type', 'text/plain; charset=utf-8');
			res.end(`${name}`);
		} else if (req.url === '/hostname') {
			res.setHeader('Content-Type', 'text/plain; charset=utf-8');
			res.end(`${hostname()}`);
		} else {
			const url = new URL(`http://${hostname()}/${req.url}`);
			name = url.searchParams.get('name') || CAT_NAME;
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			createReadStream('./index.html').pipe(res);
		}
	}
	
	function handleOther(req) {
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.statusCode = METHOD_NOT_ALLOWED;
		res.end(JSON.stringify({
			"status": METHOD_NOT_ALLOWED,
			"message": `Method ${req.method} not allowed.`
		}, null, 4));
	}

	if (req.method === 'GET') {
		handleGet(req, res);
	} else {
		handleOther(req);
	}
}

function printStartMessage() {
	console.log(`Server listening at http://${hostname()}:${PORT}`);
}

function handleExit(signal) {
	console.log(`\nReceived ${signal}, exiting ...`);
	process.exit(0);
}

function main() {
	process.on('SIGINT', handleExit);
	process.on('SIGTERM', handleExit);
	const server = createServer(app);
	server.listen(PORT, printStartMessage);
}

main();
