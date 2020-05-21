'use strict';

const logSymbols = require('log-symbols');
const shell = require('shelljs');
let dockerfiles = require('./dockerfiles');
const ms = require('./microservices');
const jp = require('./javaprojects').javaprojects;

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

async function all(microservice, tag) {

  await core();

  const microservices = ms.listofmicroservices;

  let branchname = 'master';
  let server = process.env.FORTIATE_ENV;

  if (server === 'dev' || server === 'local') branchname = 'develop';

  microservices.forEach(project => {

    micro(project, branchname);

  });

}

async function core(tag) {
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

  console.log(logSymbols.success, 'Done building core images');

} // eof


async function micro(microservice, tag) {
  const fwsmspath = process.env.FORTIATE_HOME + '/build/workspaces/' + microservice;

  const cd = shell.cd(fwsmspath, {silent: true});
  if (cd.code !== 0) {
    console.error(cd.stderr);
    process.exit(1);
  }

  await mavenbuild(microservice);

  dockerbuild(microservice, tag);

}// eof

async function mavenbuild(microservice) {

  if (jp.includes(microservice)) {
    const mcp = shell.exec('./mvnw clean package', {silent: true});
    if (mcp.code !== 0){
      console.error(mcp.stderr);
      process.exit(1);
    }
  }

}


function dockerbuild(microservice, tag) {
  const dockerfilelist = dockerfiles.getlist(microservice);
  let tagname = 'master';

  if (typeof tag !== 'undefined') tagname = tag;

  if (Array.isArray(dockerfilelist) && dockerfilelist.length) {
    dockerfilelist.forEach(dockerfile => {
      if (dockerfile === '') {
        console.error('dockerfile does not exist for ' + microservice);
        process.exit(1);
      } else {

        const dbft = shell.exec('docker build ' + dockerfile + ':' + tagname + ' .', {silent: true});
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


}
