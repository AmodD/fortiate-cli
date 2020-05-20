'use strict';
const shell = require('shelljs');
module.exports = {
  commands: function(program) {

    program
    .command('git <command> [action...]')
    .description('git commands shortcuts')
    .action((command, action) => {
      if (command === 'status') shell.exec('git status');
      if (command === 'add') shell.exec('git add .');
      if (command === 'commit') shell.exec('git commit -m "' + action.toString().replace(/,/g, ' ') + '"');
      if (command === 'push') shell.exec('git push');
      if (command === 'merge') shell.exec('git merge --no-ff ' + action);
    });

  },

};
