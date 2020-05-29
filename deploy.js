'use strict';
const logSymbols = require('log-symbols');
const shell = require('shelljs');

module.exports = {
  commands: function(program) {
    program
    .command('deploy <deployment> <container>') // exception fortiate deploy dev
    .description('deployment of fortiate containers')
    .action(async(deployment, container) => {

      const fdeploypath = process.env.FORTIATE_HOME + '/deploy';
      shell.cd(fdeploypath);

      let cmdmain = 'docker-compose -f docker-compose.' + deployment + '.yml -p ' + deployment + ' ';

      const dc = await execdockercompose(cmdmain, container);

      if (dc.code !== 0) {
        console.error(dc.stderr);
        console.log(logSymbols.error, deployment + ' deployment failed');
        process.exit(1);
      } else {
        if (container !== 'down') console.log(logSymbols.success, deployment + ' deployed');

        const ps = shell.exec(cmdmain + ' ps | grep alarm', {silent: true});
        if (container === 'alarm' || (container === 'all' && ps.stdout.includes('alarm'))) await seeding(cmdmain, deployment);

        process.exit(0);
      }

    });// eoa
  }, // eof

};// eome

async function seeding(cmdmain, deployment){

  console.log(logSymbols.info, 'About to start alarm seeding for ' + deployment);
  await new Promise(r => setTimeout(r, 30000)); // 30 seconds wait for mysql sysusr db to be up and ready

  const cmd = cmdmain + 'exec -T alarm php artisan migrate:refresh --seed';
  const seeding = shell.exec(cmd);

  if (seeding.code !== 0){
    console.error(seeding.stderr);
    console.log(logSymbols.error, deployment + ' seeding failed');
    process.exit(1);
  } else {
    console.log(logSymbols.success, deployment + ' seeding is done');
  }
}

async function execdockercompose(cmdmain, container){
  let cmd = '';
  if (container === 'all') cmd = cmdmain + 'up -d';
  else if (container === 'down') cmd = cmdmain + 'down';
  else cmd = cmdmain + 'up -d --build --force-recreate --no-deps ' + container;

  return shell.exec(cmd);

}
