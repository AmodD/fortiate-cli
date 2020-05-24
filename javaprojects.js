'use strict';

// NOTE : When you add a new project here
// THEN add it in microservices.js too
// AND do neccessary changes in dockerfiles.js

const javaprojects = [];

javaprojects.push('chp-dbservice');
javaprojects.push('merchant-dbservice');
javaprojects.push('parser-packer');
javaprojects.push('rupay-generator');
javaprojects.push('notifier');
javaprojects.push('rules-dbservice');
javaprojects.push('cases-dbservice');
javaprojects.push('modelling-dbservice');
javaprojects.push('transactions-dbservice');
javaprojects.push('myfinity-generator');

module.exports.javaprojects = javaprojects;
