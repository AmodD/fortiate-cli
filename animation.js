'use strict';
var inquirer = require('inquirer');
var cmdify = require('cmdify');

function start() {

  var ui = new inquirer.ui.BottomBar();

  var loader = ['/ Working...', '| Working...', '\\ Working...', '- Working...'];
  var i = 4;

  setInterval(() => {
    ui.updateBottomBar(loader[i++ % 4]);
  }, 300);

  var spawn = require('child_process').spawn;

  var cmd = spawn(cmdify('npm'), ['install', 'github:fortiate/fortiate-kafka', '-g'], {
    cwd: __dirname,
    stdio: 'inherit',
  });// eos


  //  cmd.stdout.pipe(ui.log);
  cmd.on('close', () => {
    ui.updateBottomBar('Installation done!\n');
    process.exit();
  });

}

function end() {
  process.exit();
}

module.exports.start = start;
module.exports.end = end;
