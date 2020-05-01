#!/usr/bin/env node

const { program } = require('commander');
program.version('0.1.0');


program
//  .command('deployer', 'start the fortiate deployer interface').alias('d')
    .option('-d, --debug', 'output extra debugging')
//  .option('-s, --small', 'small pizza size')
//  .option('-p, --pizza-type <type>', 'flavour of pizza');

program
  .command('deployer')
  .description('deployment of fortiate microservices')
  .action(() => {
    console.log('deployer command called');
  });

program
  .command('kafka')
  .description('kafka related helper interface')
  .action((source, destination) => {
    console.log('kafka command called');
  });

program
  .command('logs [microservice]')
  .description('view logs of microservices')
  .option("-a, --applog", "show the application internal logs")
  .action((microservice, options) => {
    console.log('logs command called');
  }).on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ fortiate logs preprocessor');
    console.log('  $ fortiate logs -a rupay-generator');
  });

program
  .command('client')
  .description('on-boarding of new client')
  .option("-l, --list", "list all clients")
  .action((source, destination) => {
    console.log('client command called');
  });

program.parse(process.argv);

if (program.debug) console.log(program.opts());
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);

if (!program.args.length) program.help();
