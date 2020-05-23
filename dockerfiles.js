'use strict';

function getlist(microservice){

  let commandlist = [];

  if (microservice === 'aim') commandlist = ['--file app.docker -t aim', '--file web.docker -t aim-web-server'];
  else if (microservice === 'alarm') commandlist = ['--file app.docker -t alarm', '--file web.docker -t alarm-web-server'];
  else if (microservice === 'allocation-engine') commandlist = ['--file Dockerfile -t allocation-engine'];
  else if (microservice === 'care') commandlist = ['--file app.docker -t care', '--file web.docker -t care-web-server'];
  else if (microservice === 'cases-dbservice') commandlist = ['--file Dockerfile -t cases-dbservice'];
  else if (microservice === 'case-engine') commandlist = ['--file Dockerfile -t case-engine'];
  else if (microservice === 'chp-dbservice') commandlist = ['--file Dockerfile -t chp-dbservice'];
  else if (microservice === 'cleaner') commandlist = ['--file Dockerfile -t cleaner'];
  else if (microservice === 'csv-to-rupay') commandlist = ['--file Dockerfile -t csv-to-rupay'];
  else if (microservice === 'fields-dbservice') commandlist = ['--file Dockerfile -t fields-dbservice'];
  else if (microservice === 'fpf') commandlist = ['--file Dockerfile -t python-fortiate'];
  else if (microservice === 'labeller') commandlist = ['--file event.docker -t labeller-event', '--file api.docker -t labeller-api'];
  else if (microservice === 'login') commandlist = ['--file app.docker -t login', '--file web.docker -t login-web-server'];
  else if (microservice === 'load-in-memory') commandlist = ['--file load-in-memory.docker -t load-in-memory'];
  else if (microservice === 'merchant-dbservice') commandlist = ['--file Dockerfile -t merchant-dbservice'];
  else if (microservice === 'merchant-modeller') commandlist = ['--file Dockerfile -t merchant-modeller'];
  else if (microservice === 'merchant-forecaster') commandlist = ['--file Dockerfile -t merchant-forecaster'];
  else if (microservice === 'metl') commandlist = ['--file app.docker -t metl', '--file web.docker -t metl-web-server'];
  else if (microservice === 'modelling-dbservice') commandlist = ['--file Dockerfile -t modelling-dbservice'];
  else if (microservice === 'myfinity-generator') commandlist = ['--file Dockerfile -t myfinity-generator'];
  else if (microservice === 'notifier') commandlist = ['--file Dockerfile -t notifier'];
  else if (microservice === 'parser-packer') {
    commandlist.push('--file rupay-parser.docker -t rupay-parser');
    commandlist.push('--file rupay-packer.docker -t rupay-packer');
    commandlist.push('--file myfinity-parser.docker -t myfinity-parser');
    commandlist.push('--file myfinity-packer.docker -t myfinity-packer');
  } else if (microservice === 'php-fortiate') commandlist = ['--file php-fortiate.docker -t php-fortiate'];
  else if (microservice === 'preprocessor') commandlist = ['--file event.docker -t preprocessor-event', '--file api.docker -t preprocessor-api'];
  else if (microservice === 'rules-dbservice') commandlist = ['--file Dockerfile -t rules-dbservice'];
  else if (microservice === 'rule-engine') commandlist = ['--file Dockerfile -t rule-engine'];
  else if (microservice === 'rupay-generator') commandlist = ['--file Dockerfile -t rupay-generator'];
  else if (microservice === 'sats') commandlist = ['--file app.docker -t sats', '--file web.docker -t sats-web-server'];
  else if (microservice === 'separator') commandlist = ['--file Dockerfile -t separator'];
  else if (microservice === 'tcp-interface') commandlist = ['--file Dockerfile -t tcp-interface'];
  else if (microservice === 'transaction-modeller') commandlist = ['--file Dockerfile -t transaction-modeller'];
  else if (microservice === 'transaction-predictor') commandlist = ['--file Dockerfile -t transaction-predictor'];
  else if (microservice === 'transactions-dbservice') commandlist = ['--file Dockerfile -t transactions-dbservice'];
  else if (microservice === 'txn-to-image-encoder') commandlist = ['--file image-encoder.docker -t txn-to-image-encoder'];
  else if (microservice === 'velocity') commandlist = ['--file Dockerfile -t velocity'];
  else if (microservice === 'watcher') commandlist = ['--file watcher.docker -t watcher'];

  return commandlist;

}

module.exports.getlist = getlist;
