'use strict';
const logSymbols = require('log-symbols');
const shell = require('shelljs');

module.exports = {
  commands: function(program) {
    program
    .command('logs <deployment> <container>') // exception fortiate deploy dev
    .option('-a, --applog', 'Shows the app.log content')
    .description('logs of deployed fortiate containers')
    .action((deployment, container, optobj) => {

      let applogflag = false;
      if (typeof optobj.applog !== 'undefined' && optobj.applog) applogflag = true;

      const fdeploypath = process.env.FORTIATE_HOME + '/deploy';
      shell.cd(fdeploypath);

      let cmd = 'docker-compose -f docker-compose.' + deployment + '.yml -p ' + deployment + ' ';

      if (applogflag) cmd = cmd + 'exec -T ' + container + ' cat app.log';
      else if (container === 'all') cmd = cmd + 'logs';
      else cmd = cmd + 'logs ' + container;

      const dc = shell.exec(cmd);

      if (dc.code !== 0) {
        console.log(logSymbols.error, deployment + ' logs could not be shown');
        process.exit(1);
      } else {
        process.exit(0);
      }

    });// eoa
  }, // eof

};// eome
