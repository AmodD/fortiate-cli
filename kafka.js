'use strict';
var spawn = require('child_process').spawn;
const logSymbols = require('log-symbols');
const shell = require('shelljs');

module.exports = {
  commands: function(program, path) {
    program
    .command('kafka')
    .description('viewing kafka better')
    .action(() => {
      const appjspath = path + "kafka/app.js"
      try{
       if(shell.test('-f',appjspath)) {
        spawn('node', [appjspath,"2>app.log"], {
          cwd: __dirname,
          stdio: 'inherit'
        });//eos
       }//if check
       else console.log(logSymbols.warning, 'fortiate-kafka does not exist!');
      }//try
      catch(err){
        console.error(err); 
      }
    });//eoa
  },//eof

};//eome
