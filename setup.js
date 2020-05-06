'use strict';
var spawn = require('child_process').spawn;
const logSymbols = require('log-symbols');
const shell = require('shelljs');

module.exports = {
  commands: function(program, path) {
    program
    .command('setup')
    .description('setting up fortiate on a host')
    .action(() => {
      const appjspath = path + "kafka/app.js"
      try{
       if(shell.test('-f',appjspath)) {
        spawn('node', [appjspath], {
          cwd: __dirname,
          stdio: 'inherit'
        });//eos
       }//if check
       else console.log(logSymbols.warning, 'fortiate-setup does not exist!');
      }//try
      catch(err){
        console.error(err); 
      }
    });//eoa
  },//eof

};//eome
