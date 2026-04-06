#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    chromeLocation: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    pageLoadTimeout: 10000
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
server.use(prerender.blockResources());
server.use(prerender.addMetaTags());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
