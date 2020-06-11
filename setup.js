'use strict';
var spawn = require('child_process').spawn;
const logSymbols = require('log-symbols');
const shell = require('shelljs');

module.exports = {
  commands: function(program) {
    program
    .command('setup')
    .description('setting up fortiate on a host')
    .action(() => {

      try {

        const nvmdir = process.env.NVM_DIR;
        if (nvmdir === '') {
          console.log(logSymbols.error, 'NVM DIR not set in rc file');
          process.exit(1);
        }

        const appjspath = nvmdir + '/versions/node/v12.16.3/lib/node_modules/@fortiate/fortiate-setup/app.js';

        if (shell.test('-f', appjspath)) {
          spawn('node', [appjspath], {
            cwd: __dirname,
            stdio: 'inherit',
          });// eos
        } else {
          console.log(logSymbols.warning, 'fortiate-setup does not exist!');
        }
      } catch (err){
        console.error(err);
      }
    });// eoa
  }, // eof

};// eome
