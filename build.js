'use strict';

const logSymbols = require('log-symbols');
const shell = require('shelljs');
let dockerfiles = require('./dockerfiles');

module.exports = {
  commands: function(program) {

    program
    .command('build <microservice> [tag]')
    .description('builds source code')
    .action((microservice, tag) => {

      if (microservice === 'all') console.log(logSymbols.info, 'Not implemented yet');
      else if (microservice === 'core') {
        shell.cd(process.env.FORTIATE_HOME + '/config/dockerfiles');
        shell.exec('rm -rf fpf');
        shell.exec('git clone git@github.com:fortiate/fpf.git', {silent: true});

        if (typeof tag === 'undefined'){
          // shell.exec('docker rmi php-fortiate', {silent: true});
          // shell.exec('docker rmi python-fortiate', {silent: true});
          shell.exec('docker build --file php-fortiate.docker -t php-fortiate .');
          shell.exec('docker build --file python-fortiate.docker -t python-fortiate .');
        } else if (tag === 'python'){
          // shell.exec('docker rmi python-fortiate', {silent: true});
          shell.exec('docker build --file python-fortiate.docker -t python-fortiate .');
        } else if (tag === 'php'){
          // shell.exec('docker rmi php-fortiate', {silent: true});
          shell.exec('docker build --file php-fortiate.docker -t php-fortiate .');
        } else console.log(logSymbols.info, 'Hello future ! There aint no ' + tag + ' core image yet.');

        shell.exec('rm -rf fpf');
      } else if (microservice !== '') {
        const fwsmspath = process.env.FORTIATE_HOME + '/build/workspaces/' + microservice;
        const dockerfilelist = dockerfiles.getlist(microservice);
        let dbft = '';
        let cd = '';
        let tagname = 'master';
        if (typeof tag !== 'undefined') tagname = tag;

        if (Array.isArray(dockerfilelist) && dockerfilelist.length) {
          dockerfilelist.forEach(dockerfile => {
            if (dockerfile === '') {
              console.error('dockerfile does not exist for ' + microservice);
              process.exit(1);
            } else {

              cd = shell.cd(fwsmspath, {silent: true});
              if (cd.code !== 0) {
                console.error(cd.stderr);
                process.exit(1);
              }

              dbft = shell.exec('docker build ' + dockerfile + ':' + tagname + ' .', {silent: true});
              if (dbft.code !== 0) {
                console.error(dbft.stderr);
                process.exit(1);
              }
            }
          });
        } else {

          console.error(microservice + ' is not dockerized!');
          process.exit(0);

        }

      } else console.log(logSymbols.info, 'Not implemented yet');

    });

  },

};
