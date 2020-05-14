'use strict';

const logSymbols = require('log-symbols');
const shell = require('shelljs');

module.exports = {
  commands: function(program) {

    program
    .command('build <microservice> [deployment]')
    .description('builds source code')
    .action((microservice, deployment) => {
      if (microservice === 'all') console.log(logSymbols.info, 'Not implemented yet');
      else if (microservice === 'core') {

        shell.cd('/usr/local/lib/node_modules/fortiate/core');
        shell.exec('rm -rf fpf');
        shell.exec('git clone git@github.com:fortiate/fpf.git', {silent: true});
        shell.exec('docker rmi php-fortiate', {silent: true});
        shell.exec('docker rmi python-fortiate', {silent: true});
        shell.exec('docker build --file php-fortiate.docker -t php-fortiate .');
        shell.exec('docker build --file python-fortiate.docker -t python-fortiate .');
        shell.exec('rm -rf fpf');

      } else if (microservice !== '' && deployment !== '') {
        try {
          const fdeploypath = process.env.FORTIATE_HOME + '/' + 'deploy';
          shell.cd(fdeploypath);
          shell.exec('docker-compose -f docker-compose.' + deployment + '.yml build ' + microservice);
        } catch (err){
          console.error(err);
        }
      } else console.log(logSymbols.info, 'Not implemented yet');

    });

  },

};
