'use strict';
var inquirer = require('inquirer');
const logSymbols = require('log-symbols');
var cmdify = require('cmdify');
const shell = require('shelljs');

function duringexecution(action){
  var ui = new inquirer.ui.BottomBar();

  var loader = ['/ Working...', '| Working...', '\\ Working...', '- Working...'];
  var i = 4;

  console.log("heer 1");
  try {

  setInterval(() => {
    ui.updateBottomBar(loader[i++ % 4]);
  }, 300);

  var spawn = require('child_process').spawn;
  console.log("heer 2");

  //var cmd = spawn(cmdify('npm'), ['-g', 'install', 'inquirer'], { stdio: 'pipe' });
//  var cmd = spawn(cmdify('npm'), ['-g', 'install', 'github:fortiate/fortiate-kafka'], { stdio: 'pipe' });
    var cmd = spawn("npm install github:fortiate/fortiate-kafka -g");  
  //var cmd = spawn(cmdify(action), [], { stdio: 'pipe' });
  console.log("heer 3");
  cmd.stdout.pipe(ui.log);
  console.log("heer 4");
  cmd.on('close', () => {
  console.log("heer 5");
    ui.updateBottomBar('Done!\n');
    process.exit();
  });
  console.log("heer 6");
  }
  catch(err){
    console.error(err);
  }

}

module.exports.duringexecution = duringexecution;
