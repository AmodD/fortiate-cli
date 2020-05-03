'use strict';
module.exports = {
  commands: function(program, shell) {

    program
    .command('logs [microservice]')
    .description('view logs of microservices')
    .option('-a, --applog', 'show the application internal logs')
    .option('-o, --object', 'show the fortiate json object')
    .action((microservice, option) => {
      if (option.object){
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
    }).on('--help', function() {
      console.log('');
      console.log('Examples:');
      console.log('');
      console.log('  $ fortiate logs preprocessor');
      console.log('  $ fortiate logs -a rupay-generator');
    });

  },

};
