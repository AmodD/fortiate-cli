'use strict';
module.exports = {
  commands: function(program, shell, logSymbols, deployerlocation) {
    program
    .command('deployer')
    .description('deployment of fortiate microservices')
    .action(() => {
      this.cdToPath(shell, logSymbols, deployerlocation);
      shell.exec('node app --color always');
      //      if (shell.exec('node deploy --color always').code !== 0) {
      //        shell.echo('Error: Deployer');
      //        shell.exit(1);
      //      }
    });


  },
  cdToPath: function(shell, logSymbols, path) {

    if (shell.cd(path).code !== 0) {
      const msg = 'Deployer does not exist!';
      console.log(logSymbols.warning, msg);
      // shell.exit(1);
      return msg;
    }

    return '';

  },

};
