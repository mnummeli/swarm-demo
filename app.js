'use strict';

function get(url) {
	return new Promise((resolve) => {
		function reqListener() {
			return resolve(this.responseText);
		}
		const req = new XMLHttpRequest();
		req.addEventListener("load", reqListener);
		req.open("GET", url);
		req.send();
	});
}

async function main() {
	const nameSpan = document.getElementById('name');
	const hostNameSpan = document.getElementById('hostname');
	const name = await get('/name');
	document.title = `Hello ${name}!`;
	nameSpan.innerHTML = name;
	const hostname = await get('/hostname');
	hostNameSpan.innerHTML = hostname;
	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'magenta'];
	let i = 0.0;
	nameSpan.style.position = 'relative';
	hostNameSpan.style.position = 'relative';
	setInterval(() => {
		nameSpan.style.top = i + 'em';
		nameSpan.style.color = colors[Math.floor(i)];
		hostNameSpan.style.top = (6.0 - i) + 'em';
		i = i + .1;
		if (i >= colors.length) {
			i = 0;
		}
	}, 100);
}

window.onload = main;