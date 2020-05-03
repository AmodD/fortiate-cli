'use strict';
module.exports = {
  commands: function(program, logSymbols) {

    program
    .command('setup [subcommand]')
    .description('setting up a machine for fortiate installation')
    .option('-l, --linux', 'linux operating system')
    .option('-m, --mac', 'macintosh operating system')
    .option('-b, --bashrc', 'born again shell rc file')
    .option('-z, --zshrc', 'zshell rc file')
    .action((subcommand) => {
      console.log('setup command called ' + subcommand);
      console.log(logSymbols.success, 'Setup finished successfully!');
    });

  },

};
