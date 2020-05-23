'use strict';
var spawn = require('child_process').spawn;
const logSymbols = require('log-symbols');
const shell = require('shelljs');
let container = require('./container');

module.exports = {
  commands: function(program) {
    program
    .command('deploy [deployment] [microservice]')
    .description('deployment of fortiate microservices')
    .action((deployment, microservice) => {

      let appjspath = '../fortiate-setup/app.js';
      const nvmdir = process.env.NVM_DIR;

      if (typeof nvmdir !== 'undefined'){
        const whichfortiate = shell.exec('which fortiate', {silent: true}).stdout;
        const fortiatepath = shell.exec('readlink -f ' + whichfortiate, {slient: true}).stdout;
        appjspath = fortiatepath.slice(0, -11) + 'deployer/app.js';
      }

      if (typeof microservice === 'undefined' && typeof deployment === 'undefined'){
        try {
          if (shell.test('-f', appjspath)) {
            spawn('node', [appjspath], {
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

        const cmd = 'docker-compose -f docker-compose.' + deployment + '.yml -p ' + deployment + ' up --build --force-recreate --no-deps';
        const dcua = shell.exec(cmd);

        if (dcua.code !== 0) {
          console.error(dcua.stderr);
          console.log(logSymbols.error, deployment);
          process.exit(1);
        }

      } else if (microservice !== '' && deployment !== ''){
        const fdeploypath = process.env.FORTIATE_HOME + '/deploy';
        const containername = container.get(microservice);

        shell.cd(fdeploypath);
        const cmd1 = 'docker-compose -f docker-compose.' + deployment + '.yml -p ' + deployment;
        const cmd2 = 'up --build --force-recreate --no-deps ' + containername;
        const cmd = cmd1 + cmd2;
        const dcum = shell.exec(cmd);

        if (dcum.code !== 0) {
          console.error(dcum.stderr);
          console.log(logSymbols.error, containername);
          process.exit(1);
        }

      } else console.log(logSymbols.info, 'Not implemented yet');
    });// eoa
  }, // eof

};// eome
