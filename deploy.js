'use strict';
var spawn = require('child_process').spawn;
const logSymbols = require('log-symbols');
const shell = require('shelljs');
let container = require('./container');

module.exports = {
  commands: function(program, deployerlocation) {
    program
    .command('deploy [deployment] [microservice]')
    .description('deployment of fortiate microservices')
    .action((deployment, microservice) => {
      if (typeof microservice === 'undefined' && typeof deployment === 'undefined'){
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
      } else if (typeof microservice === 'undefined' && deployment !== ''){
        const fdeploypath = process.env.FORTIATE_HOME + '/deploy';
        shell.cd(fdeploypath);
        shell.exec('docker-compose -f docker-compose.' + deployment + '.yml -p ' + deployment + ' up');
      } else if (microservice !== '' && deployment !== ''){
        const fdeploypath = process.env.FORTIATE_HOME + '/deploy';
        const containername = container.get(microservice);

        shell.cd(fdeploypath);
        shell.exec('docker-compose -f docker-compose.' + deployment + '.yml -p ' + deployment + ' up ' + containername);
      } else console.log(logSymbols.info, 'Not implemented yet');
    });// eoa
  }, // eof

};// eome
