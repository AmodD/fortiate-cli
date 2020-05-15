'use strict';

function get(microservice){

  let container = microservice;

  if (microservice === ('preprocessor' || 'cleaner' || 'labeller' || 'separator' || 'csv_to_rupay')) container = 'file-processors';
  else if (microservice === 'rupay-packer') container = 'parser-packer';

  return container;

}

module.exports.get = get;
