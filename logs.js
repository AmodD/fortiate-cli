'use strict';
const shell = require('shelljs');

function createcommand(program) {
  program
  .command('logs [microservice]')
  .description('view logs of microservices')
  .option('-a, --applog', 'show the application internal logs')
  .option('-o, --object', 'show the fortiate json object', fjo)
  .action((microservice, option) => {
    dockerlogs(givecontainername(microservice));
  }).on('--help', function() {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ fortiate logs preprocessor');
    console.log('  $ fortiate logs -a rupay-generator');
    console.log('');
    console.log('Alias or shortcuts:');
    console.log('');
    console.log('  $ flp');
    console.log('  $ flrga');
  });

}

function dockerlogs(container) {
  shell.cd(process.env.FORTIATE_HOME + '/deploy/TV');
  shell.exec('docker-compose logs ' + container);
}

function givecontainername(microservice) {
  let container = microservice;
  if (microservice === 'preprocessor') container = 'python-group';
  if (microservice === 'cleaner') container = 'python-group';
  if (microservice === 'labeller') container = 'python-group';
  if (microservice === 'csv-to-rupay') container = 'python-group';
  if (microservice === 'velocity') container = 'python-group';
  if (microservice === 'txn-to-image-encoder') container = 'python-group';
  if (microservice === 'case-engine') container = 'python-group';
  if (microservice === 'allocation-engine') container = 'python-group';

  return container;
}

function fjo() {
  const fjo = {
    id: '12818212812',
    token: 'F9182938192',
    payload: {
      parameters: {
        client: 'ABC Company Ltd',
        clientid: '478893',
      },
      data: { },
    },
  };
  console.log(JSON.stringify(fjo, null, 4));
}

module.exports.createcommand = createcommand;

