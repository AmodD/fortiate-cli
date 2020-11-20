'use strict';

function getlist(microservice){

  let commandlist = [];

  if (microservice === 'aim') commandlist = ['--file app.docker -t aim', '--file web.docker -t aim-web-server'];
  else if (microservice === 'alarm') commandlist = ['--file app.docker -t alarm', '--file web.docker -t alarm-web-server'];
  else if (microservice === 'allocation-engine') commandlist = ['--file Dockerfile -t allocation-engine'];
  else if (microservice === 'care') commandlist = ['--file app.docker -t care', '--file web.docker -t care-web-server'];
  else if (microservice === 'cases-dbservice') commandlist = ['--file Dockerfile -t cases-dbservice'];
  else if (microservice === 'case-engine') commandlist = ['--file Dockerfile -t case-engine'];
  else if (microservice === 'consumers-dbservice') commandlist = ['--file Dockerfile -t consumers-dbservice'];
  else if (microservice === 'cleaner') commandlist = ['--file Dockerfile -t cleaner'];
  else if (microservice === 'csv-to-parsed-data') commandlist = ['--file Dockerfile -t csv-to-parsed-data'];
  else if (microservice === 'fields-dbservice') commandlist = ['--file app.docker -t fdb', '--file web.docker -t fdb-web-server'];
  else if (microservice === 'fpf') commandlist = ['--file Dockerfile -t python-fortiate-fpf'];
  else if (microservice === 'labeller') commandlist = ['--file event.docker -t labeller-event', '--file api.docker -t labeller-api'];
  else if (microservice === 'login') commandlist = ['--file app.docker -t login', '--file web.docker -t login-web-server'];
  else if (microservice === 'load-in-memory') commandlist = ['--file load-in-memory.docker -t load-in-memory'];
  else if (microservice === 'merchants-dbservice') commandlist = ['--file Dockerfile -t merchants-dbservice'];
  else if (microservice === 'merchant-modeller') commandlist = ['--file Dockerfile -t merchant-modeller'];
  else if (microservice === 'merchant-forecaster') commandlist = ['--file Dockerfile -t merchant-forecaster'];
  else if (microservice === 'metl') commandlist = ['--file app.docker -t metl', '--file web.docker -t metl-web-server'];
  else if (microservice === 'modelling-dbservice') commandlist = ['--file Dockerfile -t modelling-dbservice'];
  else if (microservice === 'myfinity-generator') commandlist = ['--file Dockerfile -t myfinity-generator'];
  else if (microservice === 'nano-modeller') commandlist = ['--file Dockerfile -t nano-modeller'];
  else if (microservice === 'notifier') commandlist = ['--file Dockerfile -t notifier'];
  else if (microservice === 'parser-packer') {
    commandlist.push('--file rupay-parser.docker -t rupay-parser');
    commandlist.push('--file rupay-packer.docker -t rupay-packer');
    commandlist.push('--file myfinity-parser.docker -t myfinity-parser');
    commandlist.push('--file myfinity-packer.docker -t myfinity-packer');
  } else if (microservice === 'php-fortiate') commandlist = ['--file php-fortiate.docker -t php-fortiate'];
  else if (microservice === 'python-fortiate') commandlist = ['--file Dockerfile -t python-fortiate'];
  else if (microservice === 'preprocessor') {
    commandlist.push('--file event.docker -t preprocessor-event');
    commandlist.push('--file api.docker -t preprocessor-api');
    commandlist.push('--file ui.docker -t preprocessor-ui');
  } else if (microservice === 'rules-dbservice') commandlist = ['--file Dockerfile -t rules-dbservice'];
  else if (microservice === 'rule-engine') commandlist = ['--file Dockerfile -t rule-engine'];
  else if (microservice === 'rupay-generator') commandlist = ['--file Dockerfile -t rupay-generator'];
  else if (microservice === 'sats') commandlist = ['--file app.docker -t sats', '--file web.docker -t sats-web-server'];
  else if (microservice === 'separator') commandlist = ['--file Dockerfile -t separator'];
  else if (microservice === 'tcp-interface') commandlist = ['--file Dockerfile -t tcp-interface'];
  else if (microservice === 'transactions-predictor') commandlist = ['--file Dockerfile -t transactions-predictor'];
  else if (microservice === 'transactions-modeller') commandlist = ['--file Dockerfile -t transactions-modeller'];
  else if (microservice === 'transactions-dbservice') commandlist = ['--file Dockerfile -t transactions-dbservice'];
  else if (microservice === 'txn-to-image-encoder') commandlist = ['--file image-encoder.docker -t txn-to-image-encoder'];
  else if (microservice === 'velocity') commandlist = ['--file Dockerfile -t velocity'];
  else if (microservice === 'watcher') commandlist = ['--file watcher.docker -t watcher'];
  else if (microservice === 'consumer-modeller') commandlist = ['--file Dockerfile -t consumer-modeller'];
  else if (microservice === 'sysusrdb') commandlist = ['--file Dockerfile -t sysusr-seeded'];
  else if (microservice === 'casesdb') commandlist = ['--file Dockerfile -t cases-seeded'];
  else if (microservice === 'consumersdb') commandlist = ['--file Dockerfile -t consumers-seeded'];
  else if (microservice === 'compliancedb') commandlist = ['--file Dockerfile -t compliance-seeded'];
  else if (microservice === 'merchantsdb') commandlist = ['--file Dockerfile -t merchants-seeded'];
  else if (microservice === 'modelsdb') commandlist = ['--file Dockerfile -t models-seeded'];
  else if (microservice === 'rulesdb') commandlist = ['--file Dockerfile -t rules-seeded'];
  else if (microservice === 'satsdb') commandlist = ['--file Dockerfile -t sats-seeded'];
  else if (microservice === 'transactionsdb') commandlist = ['--file Dockerfile -t transactions-seeded'];
  else if (microservice === 'fielddatadb') commandlist = ['--file Dockerfile -t fielddata-seeded'];
  else if (microservice === 'api-gateway') commandlist = ['--file Dockerfile -t api-gateway'];
  else if (microservice === 'propensitydb') commandlist = ['--file Dockerfile -t propensity-seeded'];
  else if (microservice === 'propensity-dbservice') commandlist = ['--file Dockerfile -t propensity-dbservice'];
  else if (microservice === 'setup-services') commandlist = ['--file app.docker -t ss', '--file web.docker -t ss-web-server''];

  return commandlist;

}

module.exports.getlist = getlist;
