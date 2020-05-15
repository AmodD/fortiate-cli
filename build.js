'use strict';

const logSymbols = require('log-symbols');
const shell = require('shelljs');
let container = require('./container');

module.exports = {
  commands: function(program) {

    program
    .command('build <microservice> [deployment]')
    .description('builds source code')
    .action((microservice, deployment) => {

      if (microservice === 'all') console.log(logSymbols.info, 'Not implemented yet');
      else if (microservice === 'core') {
        shell.cd(process.env.FORTIATE_HOME + '/config/dockerfiles');
        shell.exec('rm -rf fpf');
        shell.exec('git clone git@github.com:fortiate/fpf.git', {silent: true});

        if (typeof deployment === 'undefined'){
        // shell.exec('docker rmi php-fortiate', {silent: true});
        // shell.exec('docker rmi python-fortiate', {silent: true});
          shell.exec('docker build --file php-fortiate.docker -t php-fortiate .');
          shell.exec('docker build --file python-fortiate.docker -t python-fortiate .');
        } else if (deployment === 'python'){
          // shell.exec('docker rmi python-fortiate', {silent: true});
          shell.exec('docker build --file python-fortiate.docker -t python-fortiate .');
        } else if (deployment === 'php'){
          // shell.exec('docker rmi php-fortiate', {silent: true});
          shell.exec('docker build --file php-fortiate.docker -t php-fortiate .');
        } else console.log(logSymbols.info, 'Hello future ! There aint no ' + deployment + ' core image yet.');

        shell.exec('rm -rf fpf');
      } else if (microservice !== '' && typeof deployment !== 'undefined') {
        try {
          const fdeploypath = process.env.FORTIATE_HOME + '/' + 'deploy';
          let imagename = container.get(microservice);

          shell.cd(fdeploypath);
          shell.exec('docker-compose -f docker-compose.' + deployment + '.yml build ' + imagename);
        } catch (err){
          console.error(err);
        }
      } else console.log(logSymbols.info, 'Not implemented yet');

    });

  },

};
