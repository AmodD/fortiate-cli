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

    await spawning(tool,branchpath);

    if (tool === 'build') shell.exec('pm2 restart app');
    // shell.exec("npm install github:fortiate/fortiate-"+ value +" -g");

  });

}

async function spawning(tool,branchpath) {
      spawn('npm', ['install', 'github:fortiate/fortiate-' + tool + branchpath, '-g'], {
        cwd: __dirname,
        stdio: 'inherit',
      });// eos
}

module.exports.commands = commands;
