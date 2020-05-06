#!/usr/bin/env node
'use strict';

const { Command } = require('commander');
const program = new Command();
const shell = require('shelljs');
const logSymbols = require('log-symbols');
let deployer = require('./deployer');
let git = require('./git');
let kafka = require('./kafka');
let logs = require('./logs');
let setup = require('./setup');
var spawn = require('child_process').spawn;
const location = '/usr/local/lib/node_modules/fortiate-';
const deployerlocation = '/usr/local/lib/node_modules/deployer/app.js';

program.version('0.1.0');

try {
  program
  .option('-d, --debug', 'output extra debugging')
  .option('-t, --test', 'self test')
  .option('-u, --update [tool]', 'update fortiate-* tool', update)
  .option('-i, --install [tool]', 'install fortiate-* tool', install)
  .option('-l, --logs [tool]', 'app logs of fortiate-* tool', toollogs);

  //  client.commands(program);
  deployer.commands(program, deployerlocation);
  git.commands(program, shell);
  //  installer.commands(program, shell);
  kafka.commands(program, location);
  logs.createcommand(program);
  setup.commands(program, location);

  program.parse(process.argv);

  if (program.debug) console.log(program.opts());
  if (program.test){
    console.log('test option called');
    shell.cd('/usr/local/lib/node_modules/fortiate');
    shell.exec('npm test --color always');
  }

  // if (!program.args.length) program.help();

} catch (err){
  console.error(err);
}

function install(value, previous) {
  try {

    spawn('npm', ['install', 'github:fortiate/fortiate-' + value, '-g'], {
      cwd: __dirname,
      stdio: 'inherit',
    });// eos

    // shell.exec("npm install github:fortiate/fortiate-"+ value +" -g");

  } catch (err){
    console.error(err);
    console.log(logSymbols.error, 'Error installing fortiate-' + value);
  }

}

function update(value, previous) {
  try {
    spawn('npm', ['install', 'github:fortiate/fortiate-' + value, '-g'], {
      cwd: __dirname,
      stdio: 'inherit',
    });// eos

    // shell.exec("npm update github:fortiate/fortiate-"+ value +" -g");

  } catch (err){
    console.error(err);
    console.log(logSymbols.error, 'Error installing fortiate-' + value);
  }

}

function toollogs(value, previous) {
  shell.exec('cat ' + location + value + '/app.log');

}
