'use strict';

// NOTE : When you add a new microservice
// THEN add it in fortiate-setup/databases.js too
// AND do neccessary changes in fortiate-cli/dockerfiles.js

const listofdatabases = [];

listofdatabases.push('casesdb');
listofdatabases.push('complaincedb');
listofdatabases.push('consumersdb');
listofdatabases.push('merchantsdb');
listofdatabases.push('modelsdb');
listofdatabases.push('rulesdb');
listofdatabases.push('satsdb');
listofdatabases.push('transactionsdb');
listofdatabases.push('sysusersdb');

module.exports.listofdatabases = listofdatabases;
