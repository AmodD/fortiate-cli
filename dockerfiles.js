'use strict';

function getlist(microservice){

  let commandlist = [];

  if (microservice === 'aim') commandlist = ['--file app.docker', '--file web.docker'];
  else if (microservice === 'alarm') commandlist = ['--file app.docker', '--file web.docker'];
  else if (microservice === 'allocation-engine') commandlist = ['--file Dockerfile'];
  else if (microservice === 'care') commandlist = ['--file app.docker', '--file web.docker'];
  else if (microservice === 'cases-dbservice') commandlist = ['--file Dockerfile'];
  else if (microservice === 'case-engine') commandlist = ['--file Dockerfile'];
  else if (microservice === 'chp-dbservice') commandlist = ['--file Dockerfile'];
  else if (microservice === 'cleaner') commandlist = [''];
  else if (microservice === 'csv-to-rupay') commandlist = [''];
  else if (microservice === 'exporter') commandlist = ['--file event.docker'];
  else if (microservice === 'fields-dbservice') commandlist = ['--file Dockerfile'];
  else if (microservice === 'fpf') commandlist = [''];
  else if (microservice === 'labeller') commandlist = [''];
  else if (microservice === 'login') commandlist = ['--file app.docker', '--file web.docker'];
  else if (microservice === 'laod-in-memory') commandlist = ['--file load-in-memory.docker'];
  else if (microservice === 'merchant-dbservice') commandlist = ['--file Dockerfile'];
  else if (microservice === 'merchant-modeller') commandlist = ['--file model.docker'];
  else if (microservice === 'merchant-forecaster') commandlist = ['--file Dockerfile'];
  else if (microservice === 'metl') commandlist = ['--file app.docker', '--file web.docker'];
  else if (microservice === 'modeller') commandlist = ['--file Dockerfile'];
  else if (microservice === 'modelling-dbservice') commandlist = ['--file Dockerfile'];
  else if (microservice === 'myfinity-generator') commandlist = ['--file Dockerfile'];
  else if (microservice === 'notifier') commandlist = ['--file Dockerfile'];
  else if (microservice === 'parser-packer') commandlist = ['--file rupay-parser.docker', '--file rupay-packer.docker', '--file myfinity-parser.docker', '--file myfinity-packer.docker'];
  else if (microservice === 'preprocessor') commandlist = [''];
  else if (microservice === 'rules-dbservice') commandlist = ['--file Dockerfile'];
  else if (microservice === 'rules-generator') commandlist = ['--file Dockerfile'];
  else if (microservice === 'sats') commandlist = ['--file app.docker', '--file web.docker'];
  else if (microservice === 'separator') commandlist = [''];
  else if (microservice === 'tcp-interface') commandlist = ['--file Dockerfile'];
  else if (microservice === 'transaction-modeller') commandlist = ['--file Dockerfile'];
  else if (microservice === 'transaction-predictor') commandlist = ['--file Dockerfile'];
  else if (microservice === 'transaction-dbservice') commandlist = [''];
  else if (microservice === 'txn-to-image-encoder') commandlist = ['--file image-encoder.docker'];
  else if (microservice === 'velocity') commandlist = ['--file Dockerfile'];
  else if (microservice === 'watcher') commandlist = ['--file watcher.docker'];

  return commandlist;

}

module.exports.getlist = getlist;
