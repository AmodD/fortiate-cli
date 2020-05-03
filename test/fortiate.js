'use strict';
var expect = require('chai').expect;
const shell = require('shelljs');


describe('fortiate command', function() {
  it('does not return command not found', function() {
    var result = shell.exec('fortiate', {silent: true}).stdout;
    expect(result).to.not.have.string('command not found');
  });

  it('runs from anywhere', function() {
    shell.cd('~');
    shell.mkdir('-p', 'globaltest');
    shell.cd('globaltest');
    var result = shell.exec('fortiate', {silent: true}).stdout;
    expect(result).to.not.have.string('command not found');
    shell.cd('..');
    shell.rm('-rf', 'globaltest');
  });

  it('shows some version', function() {
    var version = shell.exec('fortiate --version', {silent: true}).stdout;
    expect(version).to.have.string('0.');
  });
});

