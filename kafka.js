'use strict';
module.exports = {
  commands: function(program, shell) {

    program
    .command('kafka')
    .description('kafka related helper interface')
    .action((source, destination) => {
      console.log('kafka command called');
    });

  },

};
