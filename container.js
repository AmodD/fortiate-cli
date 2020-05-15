'use strict';

function get(microservice){

  let container = microservice;

  if (microservice === 'preprocessor') container = 'file-processors';
  else if (microservice === 'cleaner') container = 'file-processors';
  else if (microservice === 'labeller') container = 'file-processors';
  else if (microservice === 'separator') container = 'file-processors';
  else if (microservice === 'csv_to_rupay') container = 'file-processors';
  else if (microservice === 'rupay-packer') container = 'parser-packer';

  return container;

}

module.exports.get = get;
