'use strict';

var spawn = require('child_process').spawn;
const logSymbols = require('log-symbols');

module.exports = {
  commands: async function(program) {

    program
    .command('install <tool> [branch]')
    .description('installs and updates fortiate tools with respect to the given branch')
    .action((tool, branch) => {

      let branchpath = '';
      if (typeof branch !== 'undefined') branchpath = '.git#' + branch;

      try {

        await spawn('npm', ['install', 'github:fortiate/fortiate-' + tool + branchpath, '-g'], {
          cwd: __dirname,
          stdio: 'inherit',
        });// eos

        if(tool === 'build') shell.exec('pm2 restart app');
        // shell.exec("npm install github:fortiate/fortiate-"+ value +" -g");

      } catch (err){
        console.error(err);
        console.log(logSymbols.error, 'Error installing fortiate-' + tool);
      }


    });

  },

};
