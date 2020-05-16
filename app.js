#!/usr/bin/env node
'use strict';

const { Command } = require('commander');
const program = new Command();
// const logSymbols = require('log-symbols');
let install = require('./install');
let deploy = require('./deploy');
// let git = require('./git');
let setup = require('./setup');
let build = require('./build');
const location = '/usr/local/lib/node_modules/fortiate-';
const deployerlocation = '/usr/local/lib/node_modules/deployer/app.js';

program.version('0.1.0');

try {
  program;
  // .option('-l, --logs [tool]', 'app logs of fortiate-* tool', toollogs);

  install.commands(program, location);
  setup.commands(program, location);
  build.commands(program);
  deploy.commands(program, deployerlocation);
  // git.commands(program, shell);

  program.parse(process.argv);

} catch (err){
  console.error(err);
}

// function toollogs(value, previous) {
//  shell.exec('cat ' + location + value + '/app.log');
// }
