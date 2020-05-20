'use strict';

function get(microservice){

  let container = microservice;

  if (microservice === 'rupay-packer') container = 'parser-packer';

  return container;

}

module.exports.get = get;
