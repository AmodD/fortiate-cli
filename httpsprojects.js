'use strict';

// NOTE : When you add a new project here
// THEN add it in microservices.js too
// AND do neccessary changes in dockerfiles.js

const httpsprojects = [];

httpsprojects.push('aim');
httpsprojects.push('alarm');
httpsprojects.push('care');
httpsprojects.push('login');
httpsprojects.push('metl');
httpsprojects.push('sats');
httpsprojects.push('notifier');
httpsprojects.push('api-gateway');
httpsprojects.push('fields-dbservice');
httpsprojects.push('setup-services');

module.exports.httpsprojects = httpsprojects;
