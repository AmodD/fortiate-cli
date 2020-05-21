'use strict';

// NOTE : When you add a new microservice
// THEN add it in fortiate-setup/microservices.js too
// AND do neccessary changes in fortiate-cli/dockerfiles.js

const listofmicroservices = [];

listofmicroservices.push('aim');
listofmicroservices.push('alarm');
listofmicroservices.push('allocation-engine');
listofmicroservices.push('care');
listofmicroservices.push('cases-dbservice');
listofmicroservices.push('case-engine');
listofmicroservices.push('chp-dbservice');
listofmicroservices.push('cleaner');
listofmicroservices.push('csv-to-rupay');
listofmicroservices.push('fields-dbservice');
listofmicroservices.push('fpf');
listofmicroservices.push('labeller');
listofmicroservices.push('login');
listofmicroservices.push('load-in-memory');
listofmicroservices.push('merchant-dbservice');
listofmicroservices.push('merchant-modeller');
listofmicroservices.push('merchant-forecaster');
listofmicroservices.push('metl');
listofmicroservices.push('modeller');
listofmicroservices.push('modelling-dbservice');
listofmicroservices.push('myfinity-generator');
listofmicroservices.push('notifier');
listofmicroservices.push('parser-packer');
listofmicroservices.push('php-fortiate');
listofmicroservices.push('preprocessor');
listofmicroservices.push('rule-engine');
listofmicroservices.push('rules-dbservice');
listofmicroservices.push('rupay-generator');
listofmicroservices.push('sats');
listofmicroservices.push('separator');
listofmicroservices.push('tcp-interface');
listofmicroservices.push('transaction-modeller');
listofmicroservices.push('transaction-predictor');
listofmicroservices.push('transactions-dbservice');
listofmicroservices.push('txn-to-image-encoder');
listofmicroservices.push('velocity');
listofmicroservices.push('watcher');


module.exports.listofmicroservices = listofmicroservices;
