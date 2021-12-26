'use strict';

// NOTE : When you add a new project here
// THEN add it in microservices.js too
// AND do neccessary changes in dockerfiles.js

const pythoneventprojects = [];

pythoneventprojects.push('preprocessor');
pythoneventprojects.push('load-in-memory');
pythoneventprojects.push('nano-modeller');
pythoneventprojects.push('transactions-predictor');
pythoneventprojects.push('transactions-modeller');
pythoneventprojects.push('propensity-modeller');
pythoneventprojects.push('watcher');
pythoneventprojects.push('cleaner');
pythoneventprojects.push('separator');
pythoneventprojects.push('labeller');
pythoneventprojects.push('csv-to-parsed-data');
pythoneventprojects.push('merchant-modeller');
pythoneventprojects.push('merchant-forecaster');
pythoneventprojects.push('velocity');
pythoneventprojects.push('allocation-engine');
pythoneventprojects.push('case-engine');

module.exports.pythoneventprojects = pythoneventprojects;
