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
    .option('-s, --save', 'Save image as tar.gz')
    .option('-p, --push', 'Push image to respective deployment server')
    .description('builds source code')
    .action(async(microservice, tag, optObj) => {

      if (microservice === 'all') await all(tag);

      else if (microservice === 'core') await core(tag);

      else if (microservice !== '') await micro(microservice, tag);

      else console.log(logSymbols.info, 'Not implemented yet');

      if (typeof optObj.save !== 'undefined' && optObj.save) await save(microservice, tag);
      if (typeof optObj.push !== 'undefined' && optObj.push) await push(microservice, tag);

    });

  },

};

async function all(tag) {

  await core();

  const microservices = ms.listofmicroservices;

  let branchname = 'master';

  if (tag === 'dev') branchname = 'develop';

  microservices.forEach(async(repo) => {
    await micro(repo, branchname);
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


async function micro(repo, branchname) {

  await mavenbuild(repo, branchname);

  await dockerbuild(repo, branchname);

}// eof

async function mavenbuild(repo, branchname) {

  const fwsmspath = process.env.FORTIATE_HOME + '/build/workspaces/' + repo;

  const cd = shell.cd(fwsmspath, {silent: true});
  if (cd.code !== 0) {
    console.error(cd.stderr);
    console.log(logSymbols.error, repo);
    // process.exit(1);
  }

  if (jp.includes(repo)) {
    console.log(logSymbols.info, 'Maven ' + repo);
    shell.exec('git checkout ' + branchname);
    shell.exec('git pull ');
    const mcp = shell.exec('./mvnw clean package', {silent: true});
    if (mcp.code !== 0){
      console.error(mcp.stderr);
      console.log(logSymbols.error, repo);
      // process.exit(1);
    } else console.log(logSymbols.success, repo);
  }

}


async function dockerbuild(repo, branchname) {
  const fwsmspath = process.env.FORTIATE_HOME + '/build/workspaces/' + repo;

  const cd = shell.cd(fwsmspath, {silent: true});
  if (cd.code !== 0) {
    console.error(cd.stderr);
    console.log(logSymbols.error, repo);
    // process.exit(1);
  }

  const dockerfilelist = dockerfiles.getlist(repo);
  let tagname = 'master';

  console.log(logSymbols.info, 'Docker image for ' + repo);
  if (typeof branchname !== 'undefined') tagname = branchname;

  if (Array.isArray(dockerfilelist) && dockerfilelist.length) {
    dockerfilelist.forEach(dockerfile => {
      if (dockerfile === '') {
        console.error('dockerfile does not exist for ' + repo);
        console.log(logSymbols.error, repo);
        // process.exit(1);
      } else {

        shell.exec('git checkout ' + branchname);
        shell.exec('git pull ');
        const dbft = shell.exec('docker build ' + dockerfile + ':' + tagname + ' .', {silent: true});
        if (dbft.code !== 0) {
          console.error(dbft.stderr);
          console.log(logSymbols.error, repo);
          // process.exit(1);
        } else console.log(logSymbols.success, repo);
      }
    });
  } else {
    console.error(repo + ' is not dockerized!');
    console.log(logSymbols.error, repo);
    // process.exit(0);
  }

}

async function save(repo, tag) {

  shell.cd(process.env.FORTIATE_HOME + '/build');
  const ds = shell.exec('docker save ' + repo + ':' + tag + ' | gzip > ' + repo + '_' + tag + '.tar.gz ', {silent: false});
  if (ds.code !== 0) console.error(ds.stderr);
  else console.log(logSymbols.success, 'saved image ' + repo);

}


async function push(repo, tag) {

  shell.cd(process.env.FORTIATE_HOME + '/build');

  const scp = shell.exec('scp ' + repo + '_' + tag + '.tar.gz ' + ' root@' + tag + '.fortiate.com:/root/build');
  console.log(scp);
  if (scp.code !== 0) console.error(scp.stderr);
  else console.log(logSymbols.success, 'pushed image ' + repo);

}
