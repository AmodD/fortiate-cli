'use strict';
var spawn = require('child_process').spawn;
const logSymbols = require('log-symbols');
const shell = require('shelljs');

module.exports = {
  commands: function(program, deployerlocation) {
    program
    .command('deployer')
    .description('deployment of fortiate microservices')
    .action(() => {
      try {
        if (shell.test('-f', deployerlocation)) {
          spawn('node', [deployerlocation], {
            cwd: __dirname,
            stdio: 'inherit',
          });// eos
        } else {
          console.log(logSymbols.warning, 'Deployer does not exist!');
        }
      } catch (err){
        console.error(err);
      }
    });// eoa
  }, // eof

};// eome
