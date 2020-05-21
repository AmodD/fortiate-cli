#!/usr/bin/env node
'use strict';

const { Command } = require('commander');
const program = new Command();
// const logSymbols = require('log-symbols');
let install = require('./install');
let deploy = require('./deploy');
let git = require('./git');
let setup = require('./setup');
let build = require('./build');

program.version('0.1.0');

try {
  program;
  // .option('-l, --logs [tool]', 'app logs of fortiate-* tool', toollogs);

  install.commands(program);
  setup.commands(program);
  build.commands(program);
  deploy.commands(program);
  git.commands(program);

  program.parse(process.argv);

} catch (err){
  console.error(err);
}

// function toollogs(value, previous) {
//  shell.exec('cat ' + location + value + '/app.log');
// }
