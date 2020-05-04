'use strict';
// const commander = require('commander');
module.exports = {

  commands: function(program, shell, logSymbols) {

    program
    .command('setup')
    .arguments('[env]')
    .description('setting up a machine for fortiate')
    .option('-C, --create', 'create a fresh setup on the machine')
    .option('-R, --read', 'display the setup state of the machine')
    .option('-U, --update', 'upgrade the existing setup of the machine ')
    .option('-D, --delete', 'remove the setup from the machine')
    .option('-l, --linux', 'linux operating system')
    .option('-m, --mac', 'macintosh operating system')
    .option('-b, --bashrc', 'born again shell rc file')
    .option('-z, --zshrc', 'zshell rc file')
    .option('-e, --env', 'environmanetal variables')
    .option('-s, --shortcut', 'aliases aka shortcuts')
    .option('-d, --directory', 'project directory structure')
    .action((subcommand, options) => {
      shell.exec('fortiate setup --help');
    }).on('--help', function() {
      console.log('');
      console.log('Chaining of options provides a powerful functionality ');
      console.log('');
      console.log('  $ fortiate setup -C => creates a fresh setup');
      console.log('  $ fortiate setup -Us => updates shortcuts(aliases) in the bashrc file');
      console.log('  $ fortiate setup -Rez => reads and echos env variable values that set in zshrc file');
      console.log('  $ fortiate setup -Dd => deletes the fortiate directory structure');
    });


  },

};
