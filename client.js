'use strict';
module.exports = {
  commands: function(program) {

    program
    .command('client [action]')
    .description('on-boarding of new client')
    .option('-l, --list', 'list all clients')
    .action((action, cmdObj) => {
      program.help();
      console.log('client command called for action ' + action);
    });

  },

};

