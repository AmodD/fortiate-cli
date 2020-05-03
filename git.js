'use strict';
module.exports = {
  commands: function(program, shell) {


    program
    .command('git <command> [action]')
    .description('git commands shortcuts')
    .action((command, action) => {
      if (command === 'status') shell.exec('git status');
      if (command === 'add') shell.exec('git add .');
      if (command === 'commit') shell.exec('git commit -m "' + action + '"');
    });


  },

};
