#!/usr/bin/env node
'use strict';

const { Command } = require('commander');
const program = new Command();
const shell = require('shelljs');
const logSymbols = require('log-symbols');
let client = require('./client');
let deployer = require('./deployer');
let git = require('./git');
let kafka = require('./kafka');
let logs = require('./logs');
let installer = require('./installer');
let setup = require('./setup');
const deployerlocation = '/usr/local/lib/node_modules/deployer';

program.version('0.1.0');

program
.option('-d, --debug', 'output extra debugging')
.option('-t, --test', 'self test');

client.commands(program);
deployer.commands(program, shell, logSymbols, deployerlocation);
git.commands(program, shell);
kafka.commands(program, shell);
logs.commands(program, shell);
installer.commands(program, shell);
setup.commands(program, shell, logSymbols);

program.parse(process.argv);

if (program.debug) console.log(program.opts());
if (program.test){
  console.log('test option called');
  shell.cd('/usr/local/lib/node_modules/fortiate');
  shell.exec('npm test --color always');
}

if (!program.args.length) program.help();
