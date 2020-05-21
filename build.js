'use strict';

const logSymbols = require('log-symbols');
const shell = require('shelljs');
let dockerfiles = require('./dockerfiles');
const ms = require('./microservices');

module.exports = {
  commands: function(program) {

    program
    .command('build <microservice> [tag]')
    .description('builds source code')
    .action((microservice, tag) => {

      if (microservice === 'all') all(microservice, tag);

      else if (microservice === 'core') core(tag);

      else if (microservice !== '') micro(microservice, tag);

      else console.log(logSymbols.info, 'Not implemented yet');

    });

  },

};

function all(microservice, tag) {

  core();

  const microservices = ms.listofmicroservices;

  let branchname = 'master';
  let server = process.env.FORTIATE_ENV;

  if (server === 'dev' || server === 'local') branchname = 'develop';

  microservices.forEach(project => {

    micro(project, branchname);

  });

}

function core(tag) {
  const wsphp = process.env.FORTIATE_HOME + '/build/workspaces/php-fortiate';
  const wspython = process.env.FORTIATE_HOME + '/build/workspaces/fpf';
  const dbphp = 'docker build --file php-fortiate.docker -t php-fortiate .';
  const dbpython = 'docker build --file python-fortiate.docker -t python-fortiate .';

  if (typeof tag === 'undefined'){

    shell.cd(wsphp);
    shell.exec(dbphp);
    shell.cd(wspython);
    shell.exec(dbpython);

  } else if (tag === 'python'){

    shell.cd(wspython);
    shell.exec(dbpython);

  } else if (tag === 'php'){

    shell.cd(wsphp);
    shell.exec(dbphp);

  } else {

    console.log(logSymbols.info, 'Hello future ! There aint no ' + tag + ' core image yet.');

  } // eo if else

} // eof


function micro(microservice, tag) {
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

}// eof


