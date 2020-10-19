'use strict';
const shell = require('shelljs');
var expect = require('chai').expect;

describe('build command', function() {
  // pending test below
  it('should not delete underlying repo on local, cli-45,46', async function() {
    // check first if this machine is local or a deployment server
    let localflag = false;
    if (process.env.FORTIATE_ENV === 'local') localflag = true;
    if (localflag){
      // creating a dummy test directory
      const fwstestpath = process.env.FORTIATE_HOME + '/build/workspaces_test';
      const fbuildpath = process.env.FORTIATE_HOME + '/build';
      shell.mkdir(fwstestpath);
      shell.cd(fwstestpath);
      // CODE TO PREVENT ASKING FOR SSH KEY PASSPHRASE AGAIN AND AGAIN
      shell.exec('ssh-add', {silent: true});
      // selecting consumers-dbservice randomly
      await gitclone(shell, 'git clone git@github.com:fortiate/consumers-dbservice.git');
      // creating a test file to check whether it persists
      shell.cd('consumers-dbservice');
      shell.touch('test.file');
      // fireing fortitae build command
      await fortiatebuild(shell);
      // now check if our test.file exists
      expect(shell.test('-f', 'test.file')).to.be.true;
      // rm -rf test directory
      shell.cd(fbuildpath);
      shell.rm('-rf', 'workspaces_test');
      expect(true, 'fortiate build does not delete repo on local').to.be.true;
    } else { expect(true, 'not a local machine').to.be.true; }
  }).timeout(60000); ;
});

async function fortiatebuild(shell) {
  shell.exec('fortiate build consumers-dbservice', {silent: true});
}

async function gitclone(shell, command) {
  shell.exec(command, {silent: true});
}
