'use strict';
module.exports = {
  commands: function(program, shell) {

    program
    .command('installer')
    .description('installation of fortiate on a host')
    .action(() => {
      console.log('installer command called');
    });


  },

};
