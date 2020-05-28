'use strict';

// var spawn = require('child_process').spawn;
const shell = require('shelljs');

function commands(program) {

  program
  .command('install <tool> [branch]')
  .description('installs and updates fortiate tools with respect to the given branch')
  .action(async(tool, branch) => {

    let branchpath = '';
    if (typeof branch !== 'undefined') branchpath = '.git#' + branch;

    let spawning = (tool, branchpath) => new Promise(resolve => {
      shell.exec('npm install github:fortiate/fortiate-' + tool + branchpath + ' -g');

      // spawn('npm', ['install', 'github:fortiate/fortiate-' + tool + branchpath, '-g'], {
      //   cwd: __dirname,
      //   stdio: 'inherit',
      // });// eos
    });

    const doSpawning = async(tool, branchpath) => {
      return await spawning(tool, branchpath);
    }

    /*doSpawning(tool, branchpath).then((result) => {

      shell.exec('pm2 restart app');

    }).catch((error) => {
      console.log(error);*/
    }).catch((error) => {
      console.log(error);

    //shell.exec('pm2 restart app');

  });

}

module.exports.commands = commands;
