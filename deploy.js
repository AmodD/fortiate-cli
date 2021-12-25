'use strict';
const logSymbols = require('log-symbols');
const shell = require('shelljs');
let email = require('./email');

module.exports = {
  commands: function(program) {
    program
    .command('deploy <deployment> <container>') // exception fortiate deploy dev
    .description('deployment of fortiate containers')
    .action(async(deployment, container) => {

      const fdeploypath = process.env.FORTIATE_HOME + '/deploy';
      const deployment_pattern = process.env.FORTIATE_DEPPATTERN;
      shell.cd(fdeploypath);

      let cmdmain = '';

//      if(deployment_pattern)
//        cmdmain = 'docker-compose -f docker-compose.' + deployment + '-' + deployment_pattern + '.yml -p ' + deployment + '-' + deployment_pattern + ' ';
//      else
        cmdmain = 'docker-compose -f docker-compose.' + deployment + '.yml -p ' + deployment + ' ';

      const dc = await execdockercompose(cmdmain, container);

      if (dc.code !== 0) {
        console.error(dc.stderr);
        console.log(logSymbols.error, deployment + ' deployment failed');
        process.exit(1);
      } else {
        if (container !== 'down') console.log(logSymbols.success, deployment + ' deployed');
        if (container === 'all' && process.env.FORTIATE_ENV !== 'local') await email.success(process.env.FORTIATE_ENV + ' machine up', '');
        if (container === 'down' && process.env.FORTIATE_ENV !== 'local') await email.failure(process.env.FORTIATE_ENV + ' machine down', '');

        // process.exit(0);
      }

    });// eoa
  }, // eof

};// eome

async function execdockercompose(cmdmain, container){
  let cmd = '';
  if (container === 'all') cmd = cmdmain + 'up -d';
  else if (container === 'down') cmd = cmdmain + 'down';
  else cmd = cmdmain + 'up -d --build --force-recreate --no-deps ' + container;

  return shell.exec(cmd);

}
