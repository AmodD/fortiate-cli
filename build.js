'use strict';

const logSymbols = require('log-symbols');
const shell = require('shelljs');
let dockerfiles = require('./dockerfiles');
const ms = require('./microservices');
const jp = require('./javaprojects').javaprojects;

module.exports = {
  commands: function(program) {

    program
    .command('build <microservice> [branch]')
    .option('-s, --save', 'Save image as tar.gz')
    .option('-p, --push', 'Push image to respective deployment server')
    .description('builds source code')
    .action(async(microservice, branch, optObj) => {

      let tag = 'dev';

      if (typeof branch === 'undefined') branch = 'develop';

      if (branch !== 'develop') tag = 'test';

      let saveflag = false;
      let pushflag = false;

      if (typeof optObj.save !== 'undefined' && optObj.save) saveflag = true;
      if (typeof optObj.push !== 'undefined' && optObj.push) pushflag = true;

      if (microservice === 'all') await all(tag, branch, saveflag, pushflag);

      else if (microservice !== '') await micro(microservice, tag, branch, saveflag, pushflag);

      else console.log(logSymbols.info, 'Not implemented yet');

    });

  },

};

async function all(tag, branch, saveflag, pushflag) {

  const microservices = ms.listofmicroservices;

  microservices.forEach(async(repo) => {
    await micro(repo, tag, branch, saveflag, pushflag);
  });

}


async function micro(repo, tag, branch, saveflag, pushflag) {

  await mavenbuild(repo, branch);

  await dockerbuild(repo, tag, branch, saveflag, pushflag);

}// eof

async function mavenbuild(repo, branch) {


  if (jp.includes(repo)) {

    const fwsmspath = process.env.FORTIATE_HOME + '/build/workspaces/' + repo;

    const cd = shell.cd(fwsmspath, {silent: true});
    if (cd.code !== 0) {
      console.error(cd.stderr);
      console.log(logSymbols.error, repo);
      // process.exit(1);
    }

    shell.exec('git checkout ' + branch, {silent: true});
    shell.exec('git pull ', {silent: true});

    const mcp = shell.exec('./mvnw clean package', {silent: true});
    if (mcp.code !== 0){
      console.error(mcp.stderr);
      console.log(logSymbols.error, repo);
      // process.exit(1);
    } else console.log(logSymbols.success, repo + ' maven jar');
  }

}


async function dockerbuild(repo, tag, branch, saveflag, pushflag) {
  const fwsmspath = process.env.FORTIATE_HOME + '/build/workspaces/' + repo;

  const cd = shell.cd(fwsmspath, {silent: true});
  if (cd.code !== 0) {
    console.error(cd.stderr);
    console.log(logSymbols.error, repo);
    // process.exit(1);
  }

  const dockerfilelist = dockerfiles.getlist(repo);

  if (Array.isArray(dockerfilelist) && dockerfilelist.length) {
    dockerfilelist.forEach(async(dockerfile) => {
      if (dockerfile === '') {
        console.error('dockerfile does not exist for ' + repo);
        console.log(logSymbols.error, repo);
        // process.exit(1);
      } else {

        shell.exec('git checkout ' + branch, {silent: true});
        shell.exec('git pull ', {silent: true});
        console.log(logSymbols.success, repo + ' code pulled');

        if (repo === 'php-fortiate' || repo === 'python-fortiate' || repo === 'fpf') tag = 'latest';

        const dbft = shell.exec('docker build ' + dockerfile + ':' + tag + ' .', {silent: true});
        if (dbft.code !== 0) {
          console.error(dbft.stderr);
          console.log(logSymbols.error, repo);
          // process.exit(1);
        } else {
          // shell.exec('docker images | grep none | awk "{ print $3; }" | xargs docker rmi');
          console.log(logSymbols.success, repo + ' docker image ');
          if (saveflag) await saveimage(repo, tag);
        }
      } // if else dockerfile === ''
    });
  } else {
    console.error(repo + ' is not dockerized!');
    console.log(logSymbols.error, repo);
    // throw new Error("Can't build "+repo);
    // process.exit(0);
  }

}

async function saveimage(repo, tag, pushflag) {

  shell.cd(process.env.FORTIATE_HOME + '/build');
  const ds = shell.exec('docker save ' + repo + ':' + tag + ' | gzip > ' + repo + '_' + tag + '.tar.gz ', {silent: true});
  if (ds.code !== 0) {
    console.error(ds.stderr);
  } else {
    console.log(logSymbols.success, repo + ' image saved');
    if (pushflag) await pushimage(repo, tag);
  }

}


async function pushimage(repo, tag) {

  shell.cd(process.env.FORTIATE_HOME + '/build');

  const scp = shell.exec('scp ' + repo + '_' + tag + '.tar.gz ' + ' root@' + tag + '.fortiate.com:/root/build', {silent: true});
  if (scp.code !== 0) console.error(scp.stderr);
  else console.log(logSymbols.success, repo + ' image pushed');

}
