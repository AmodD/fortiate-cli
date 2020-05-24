'use strict';
const logSymbols = require('log-symbols');
const shell = require('shelljs');

module.exports = {
  commands: function(program) {
    program
    .command('deploy <deployment> <container>') // exception fortiate deploy dev
    .description('deployment of fortiate containers')
    .action((deployment, container) => {

      const fdeploypath = process.env.FORTIATE_HOME + '/deploy';
      shell.cd(fdeploypath);

      let cmd = 'docker-compose -f docker-compose.' + deployment + '.yml -p ' + deployment + ' ';

      if (container === 'all') cmd = cmd + 'up -d';
      else if (container === 'down') cmd = cmd + 'down';
      else cmd = cmd + 'up -d --build --force-recreate --no-deps ' + container;

      const dc = shell.exec(cmd);

      if (dc.code !== 0) {
        console.error(dc.stderr);
        console.log(logSymbols.error, deployment + ' deployment failed');
        process.exit(1);
      } else {
        console.log(logSymbols.success, deployment + ' deployed');
        process.exit(0);
      }

    });// eoa
  }, // eof

};// eome
