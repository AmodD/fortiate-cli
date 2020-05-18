'use strict';

var spawn = require('child_process').spawn;
const shell = require('shelljs');

function commands(program) {

  program
  .command('install <tool> [branch]')
  .description('installs and updates fortiate tools with respect to the given branch')
  .action(async(tool, branch) => {

    let branchpath = '';
    if (typeof branch !== 'undefined') branchpath = '.git#' + branch;


    let spawning = new Promise((resolve, reject) => {
      spawn('npm', ['install', 'github:fortiate/fortiate-' + tool + branchpath, '-g'], {
        cwd: __dirname,
        stdio: 'inherit',
      });// eos
    });

    await spawning;

    if (tool === 'build') shell.exec('pm2 restart app');
    // shell.exec("npm install github:fortiate/fortiate-"+ value +" -g");

  });

}


module.exports.commands = commands;
