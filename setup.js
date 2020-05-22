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

      let appjspath = '../fortiate-setup/app.js';
      const nvmdir = process.env.NVM_DIR;

      if (typeof nvmdir !== 'undefined'){
        const whichfortiate = shell.exec('which fortiate', {silent: true}).stdout;
        const fortiatepath = shell.exec('readlink -f ' + whichfortiate, {slient: true}).stdout;
        appjspath = fortiatepath.slice(0, -11) + 'setup/app.js';
      }

      try {
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
