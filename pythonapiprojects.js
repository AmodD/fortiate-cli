'use strict';

// NOTE : When you add a new project here
// THEN add it in microservices.js too
// AND do neccessary changes in dockerfiles.js

const pythonapiprojects = [];

pythonapiprojects.push('preprocessor');
pythonapiprojects.push('labeller');
pythonapiprojects.push('nano-modeller');
pythonapiprojects.push('transactions-predictor');

module.exports.pythonapiprojects = pythonapiprojects;
