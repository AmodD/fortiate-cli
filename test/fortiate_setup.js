'use strict';
var expect = require('chai').expect;
const shell = require('shelljs');

describe('setup command', function() {

  it('must have an option for os host, i.e mac linux', function() {
    var result = shell.exec('fortiate setup --help', {silent: true}).stdout;
    expect(result).to.have.string('-m');
    expect(result).to.have.string('--linux');
  });

  it('must have an option for rc file , i.e bashrc zshrc', function() {
    var result = shell.exec('fortiate setup --help', {silent: true}).stdout;
    expect(result).to.have.string('-b');
    expect(result).to.have.string('--zshrc');
  });

  it('must have a create and revert subcommand', function() {
    var result = shell.exec('fortiate setup --help', {silent: true}).stdout;
    expect(result).to.have.string('create', 'create subcommand does not exist');
    expect(result).to.have.string('revert', 'revert subcommand does not exist');
  });
});

describe('setup create command', function() {

  before(function() {
    // runs once before the first test in this block
  });

  // pending test below
  it('should display help if option not given');
  // pending test below
  it('must have options to create complete setup , adding only env variables , adding only aliases(shortcuts) , creatng directory structure');
  // pending test below
  it('should display setup created if option -a selected and execution is successful');
  // pending test below
  it('should display error message if option -a selected and execution fails ');
  // pending test below
  it('should display environmental variables set  if option -e selected and execution is successful');
  // pending test below
  it('should display error message if option -e selected and execution fails ');
  // pending test below
  it('should display alias aka short cuts added if option -s selected and execution is successful');
  // pending test below
  it('should display error message if option -s selected and execution fails ');
  // pending test below
  it('should have added env variables , aliases , directory structue for option -a');

  it('should have added fortiate environmental variables for option -e', function() {
    shell.cd('~');
    var result = shell.exec('cat .zshrc', {silent: true}).stdout;
    expect(result).to.have.string('FORTIATE_NEW', 'FORTIATE_NEW is not mentioned in zshrc');
  });

  // pending test below
  it('should have added fortiate aliases aka shortcuts for option -s');

  // pending test below
  it('should create project directory structure for option -d');


  after(function() {
    // runs once before the first test in this block
  });

});

describe('setup revert command', function() {

  // pending test below
  it('should display help if option not given');
  // pending test below
  it('must have options to revert complete setup , removing only env variables , removing only aliases(shortcuts) , deleting directory structure');
  // pending test below
  it('should display setup reverted if option -a selected and execution is successful');
  // pending test below
  it('should display error message if option -a selected and execution fails ');
  // pending test below
  it('should display environmental variables unset  if option -e selected and execution is successful');
  // pending test below
  it('should display error message if option -e selected and execution fails ');
  // pending test below
  it('should display alias aka short cuts removed if option -s selected and execution is successful');
  // pending test below
  it('should display error message if option -s selected and execution fails ');
  // pending test below
  it('should have removed env variables , aliases , directory structue for option -a');

  it('should have removed fortiate environmental variables for option -e');

  // pending test below
  it('should have removed fortiate aliases aka shortcuts for option -s');

  // pending test below
  it('should delete project directory structure for option -d');

});


