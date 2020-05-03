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

  it('should add environmental variables', function() {
    expect.fail('to be done');
  });

  it('should add aliases', function() {
    expect.fail('to be done');
  });

  it('should create project directory structure', function() {
    expect.fail('to be done');
  });

});

