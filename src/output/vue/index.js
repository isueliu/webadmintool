
const query = require('./queryList.template.js');
const contr = require('./lib.contr.template.js');
const datas = require('./lib.data.template.js');
const generateQuery = require('./generate.list.js');

const generateQueryFileContent = async (dataConfig ={}) => {
  return generateQuery.generateFileContent(dataConfig);
};

const generateQueryLibDataContent = async (dataConfig ={}) => {
  return generateQuery.generateDataFileContent(dataConfig);
};

const generateQueryLibContrContent = async (dataConfig ={}, templateConfig = contr) => {
  return generateQuery.generateContrFileContent(dataConfig, templateConfig);
};

exports.generateQueryFileContent = generateQueryFileContent;
exports.generateQueryLibDataContent = generateQueryLibDataContent;
exports.generateQueryLibContrContent = generateQueryLibContrContent;
