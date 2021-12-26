'use strict';

const logSymbols = require('log-symbols');
const shell = require('shelljs');
let dockerfiles = require('./dockerfiles');
const db = require('./databases');
const ms = require('./microservices');
const jp = require('./javaprojects').javaprojects;
const hp = require('./httpsprojects').httpsprojects;
const pu = require('./pythonuiprojects').pythonuiprojects;
const pa = require('./pythonapiprojects').pythonapiprojects;
const pe = require('./pythoneventprojects').pythoneventprojects;


module.exports = {
  commands: function(program) {

    program
    .command('build <microservice> [branch]')
    .option('-s, --save', 'Save image as tar.gz')
    .option('-p, --push', 'Push image to respective deployment server')
    .description('builds docker images')
    .action(async(microservice, branch, optObj) => {

      let saveflag = false;
      let localflag = false;
      let pushflag = false;

      // we are not implementing FORTIATE_ENV dev/test logic because
      // we may build on a build server
      if (process.env.FORTIATE_ENV === 'local') localflag = true;
      if (typeof optObj.save !== 'undefined' && optObj.save) saveflag = true;
      if (typeof optObj.push !== 'undefined' && optObj.push) pushflag = true;

      let tag = 'dev';

      if (typeof branch === 'undefined') branch = 'develop';

      if (branch !== 'develop') tag = 'test';

      if (localflag) tag = 'local';

      if (microservice === 'all') await all(tag, branch, localflag, saveflag, pushflag);

      else if (microservice !== '') await micro(microservice, tag, branch, localflag, saveflag, pushflag);

      else console.log(logSymbols.info, 'Not implemented yet');

    });

  },

};

async function all(tag, branch, localflag, saveflag, pushflag) {

  const microservices = ms.listofmicroservices;
  const databases = db.listofdatabases;

  databases.forEach(async(repo) => {
    await micro(repo, tag, branch, localflag, saveflag, pushflag);
  });

  microservices.forEach(async(repo) => {
    await micro(repo, tag, branch, localflag, saveflag, pushflag);
  });

}


async function micro(repo, tag, branch, localflag, saveflag, pushflag) {

  await builddb(repo, tag, branch, localflag, saveflag, pushflag);

  await buildws(repo, tag, branch, localflag, saveflag, pushflag);

}// eof


async function builddb(repo, tag, branch, localflag, saveflag, pushflag) {

  if (db.listofdatabases.includes(repo)) {

    const fhome = process.env.FORTIATE_HOME;
    const fdbconfigpath = process.env.FORTIATE_HOME + '/config/databases/' + repo;

    const cd = shell.cd(fhome, {silent: true});
    if (cd.code !== 0) {
      console.error(cd.stderr);
      console.log(logSymbols.error, repo);
      process.exit(1);
    }

    if (localflag){
      shell.cd(fdbconfigpath, {silent: true});
      shell.exec('git pull --all', {silent: true});
      const gc = shell.exec('git checkout ' + branch, {silent: true});
      if (gc.code !== 0){
        console.error(gc.stderr);
        console.log(logSymbols.error, 'CONFIG branch ' + branch + ' does not exist');
        process.exit(1);
      } else console.log(logSymbols.success, 'CONFIG code pulled');

    } else {
      shell.exec('rm -rf config', {silent: true});

      const gc = shell.exec('git clone -b ' + branch + ' git@github.com:fortiate/config.git', {silent: true});
      if (gc.code !== 0){
        console.error(gc.stderr);
        console.log(logSymbols.error, 'CONFIG branch ' + branch + ' does not exist');
        process.exit(1);
      } else console.log(logSymbols.success, 'CONFIG code pulled');
      shell.cd(fdbconfigpath, {silent: true});
    }

    const dockerfilelist = dockerfiles.getlist(repo);

    if (Array.isArray(dockerfilelist) && dockerfilelist.length) {
      dockerfilelist.forEach(async(dockerfile) => {
        if (dockerfile === '') {
          console.error('dockerfile does not exist for ' + repo);
          console.log(logSymbols.error, repo);
          process.exit(1);
        } else {

          tag = 'latest';

          const dbft = shell.exec('docker build ' + dockerfile + ':' + tag + ' .', {silent: true});
          if (dbft.code !== 0) {
            console.error(dbft.stderr);
            console.log(logSymbols.error, repo);
            process.exit(1);
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
      process.exit(1);
    }


  }// end of first if condition

} // end of function


async function buildws(repo, tag, branch, localflag, saveflag, pushflag) {

  if (ms.listofmicroservices.includes(repo)) {

    const fwspath = process.env.FORTIATE_HOME + '/build/workspaces/';
    const fwspathconsolidated = process.env.FORTIATE_HOME + '/build';
    const deppattern = process.env.FORTIATE_DEPPATTERN;

    // step 0 , pre check if setup has been run
    const cd = shell.cd(fwspath, {silent: true});
    if (cd.code !== 0) {
      console.error(cd.stderr);
      console.log(logSymbols.error, repo);
      process.exit(1);
    }

    // step 1 , get the code
    if (localflag){
      shell.cd(repo, {silent: true});
      shell.exec('git pull --all', {silent: true});
      const gc = shell.exec('git checkout ' + branch, {silent: true});
      if (gc.code !== 0){
        console.error(gc.stderr);
        console.log(logSymbols.error, repo + ' branch ' + branch + ' does not exist');
        process.exit(1);
      } else console.log(logSymbols.success, repo + ' code pulled');
    } else {
      shell.exec('rm -rf ' + repo, {silent: true});
      const gc = shell.exec('git clone -b ' + branch + ' git@github.com:fortiate/' + repo + '.git', {silent: true});
      if (gc.code !== 0){
        console.error(gc.stderr);
        console.log(logSymbols.error, repo + ' branch ' + branch + ' does not exist');
        process.exit(1);
      } else console.log(logSymbols.success, repo + ' code pulled');
      shell.cd(repo, {silent: true});
    }

    // step 2 build maven jar , if java project
    if (jp.includes(repo)) {
      const mcp = shell.exec('./mvnw clean package', {silent: true});
      if (mcp.code !== 0){
        console.error(mcp.stderr);
        console.log(logSymbols.error, repo);
        process.exit(1);
      } else console.log(logSymbols.success, repo + ' maven jar');
    }

    // step 3 , get certificates if https project
    if (hp.includes(repo)) {
      const certpath = process.env.FORTIATE_HOME + '/.certs/';
      const certfiles = ['keystore.p12', 'fullchain.pem', 'privkey.pem'];

      shell.mkdir('-p', 'certs');
      let cp = '';

      certfiles.forEach(cfile => {
        cp = shell.exec('cp ' + certpath + cfile + ' ' + 'certs/' + cfile);
        if (cp.code !== 0) {
          console.log(logSymbols.error, repo + ' failed copying certificate ' + cfile);
          console.log(cp.stderr);
        } else console.log(logSymbols.success, repo + cfile + ' certificate copied!');
      });
    }

    // STEP 4
    if(deppattern == 'consolidated') {
    // step 4.1 build consolidated docker image
    // step 0 , do a cd to come in build path because all consolidated docker files are kept in build parralel to workspaaces
          const cdc = shell.cd(fwspathconsolidated, {silent: true});
          if (cdc.code !== 0) {
            console.error(cdc.stderr);
            console.log(logSymbols.error, repo);
            process.exit(1);
          }

          if (hp.includes(repo)) {
            const dbftn = shell.exec('docker build --file nginx-web-server.docker -t nginx-web-server:' + tag + ' .', {silent: true});
            console.log(logSymbols.success, 'nginx-web-server docker image ');
            const dbfta = shell.exec('docker build --file php-app-server.docker -t php-app-server:' + tag + ' .', {silent: true});
            console.log(logSymbols.success, 'php-app-server docker image ');

          }

          if (jp.includes(repo)) {
            const dbftnjp = shell.exec('docker build --file java-dbservices.docker -t java-dbservices:' + tag + ' .', {silent: true});
            console.log(logSymbols.success, 'java-dbservices docker image ');

          }

          if (pu.includes(repo)) {
            const dbftnpu = shell.exec('docker build --file python-ui.docker -t python-ui:' + tag + ' .', {silent: true});
            console.log(logSymbols.success, 'python-ui docker image ');

          }

          if (pa.includes(repo)) {
            const dbftnpa = shell.exec('docker build --file python-api.docker -t python-api:' + tag + ' .', {silent: true});
            console.log(logSymbols.success, 'python-api docker image ');

          }

          if (pe.includes(repo)) {
            const dbftnpe = shell.exec('docker build --file python-event.docker -t python-event:' + tag + ' .', {silent: true});
            console.log(logSymbols.success, 'python-event docker image ');

          }

    }
    else {
    // step 4.2 build individual docker image
    const dockerfilelist = dockerfiles.getlist(repo);
    if (Array.isArray(dockerfilelist) && dockerfilelist.length) {
      dockerfilelist.forEach(async(dockerfile) => {
        if (dockerfile === '') {
          console.error('dockerfile does not exist for ' + repo);
          console.log(logSymbols.error, repo);
          process.exit(1);
        } else {

          if (repo === 'php-fortiate' || repo === 'python-fortiate' || repo === 'fpf') tag = 'latest';

          const dbft = shell.exec('docker build ' + dockerfile + ':' + tag + ' .', {silent: true});
          if (dbft.code !== 0) {
            console.error(dbft.stderr);
            console.log(logSymbols.error, repo);
            process.exit(1);
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
      process.exit(1);
    }

    }// end of step 4 if condition

  }// end of first if condition

}// end of function

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
