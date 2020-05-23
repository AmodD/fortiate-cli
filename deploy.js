'use strict';
var spawn = require('child_process').spawn;
const logSymbols = require('log-symbols');
const shell = require('shelljs');

module.exports = {
  commands: function(program) {
    program
    .command('deploy [deployment] [container]')
    .description('deployment of fortiate containers')
    .action((deployment, container) => {

      let appjspath = '../fortiate-setup/app.js';
      const nvmdir = process.env.NVM_DIR;

      if (typeof nvmdir !== 'undefined'){
        const whichfortiate = shell.exec('which fortiate', {silent: true}).stdout;
        const fortiatepath = shell.exec('readlink -f ' + whichfortiate, {slient: true}).stdout;
        appjspath = fortiatepath.slice(0, -11) + 'deployer/app.js';
      }

      if (typeof container === 'undefined' && typeof deployment === 'undefined'){
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

      } else if (typeof container === 'undefined' && deployment !== ''){
        const fdeploypath = process.env.FORTIATE_HOME + '/deploy';
        shell.cd(fdeploypath);

        const cmd = 'docker-compose -f docker-compose.' + deployment + '.yml -p ' + deployment + ' up -d --build --force-recreate --no-deps';
        const dcua = shell.exec(cmd);

        if (dcua.code !== 0) {
          console.error(dcua.stderr);
          console.log(logSymbols.error, deployment + ' deployment failed');
          process.exit(1);
        } else {
          console.log(logSymbols.success, deployment + ' deployed');
          process.exit(0);
        }

      } else if (container !== '' && deployment !== ''){
        const fdeploypath = process.env.FORTIATE_HOME + '/deploy';

        shell.cd(fdeploypath);
        const cmd1 = 'docker-compose -f docker-compose.' + deployment + '.yml -p ' + deployment;
        const cmd2 = ' up -d --build --force-recreate --no-deps ' + container;
        const cmd = cmd1 + cmd2;
        const dcum = shell.exec(cmd);

        if (dcum.code !== 0) {
          console.error(dcum.stderr);
          console.log(logSymbols.error, container + ' deployment failed');
          process.exit(1);
        } else {
          console.log(logSymbols.success, container + ' deployed');
          process.exit(0);
        }

      } else console.log(logSymbols.info, 'Not implemented yet');
    });// eoa
  }, // eof

};// eome
