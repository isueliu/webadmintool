
const query = require('./queryList.template.js');
const generateQuery = require('./generate.list.js');

const generateQueryFileContent = async (dataConfig ={}, templateConfig = query) => {
  return generateQuery.generateFileContent(dataConfig, templateConfig);
};

const generateQueryLibDataContent = async (dataConfig ={}, templateConfig = query) => {
  return generateQuery.generateDataFileContent(dataConfig, templateConfig);
};

const generateQueryLibContrContent = async (dataConfig ={}, templateConfig = query) => {
  return generateQuery.generateContrFileContent(dataConfig, templateConfig);
};

exports.generateQueryFileContent = generateQueryFileContent;
exports.generateQueryLibDataContent = generateQueryLibDataContent;
exports.generateQueryLibContrContent = generateQueryLibContrContent;




