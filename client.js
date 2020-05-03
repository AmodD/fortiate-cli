'use strict';
module.exports = {
  commands: function(program) {

    program
    .command('client')
    .description('on-boarding of new client')
    .option('-l, --list', 'list all clients')
    .action((source, destination) => {
      console.log('client command called');
    });

  },

};

