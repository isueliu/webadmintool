
const query = require('./queryList.template.js');
const contr = require('./lib.contr.template.js');
const datas = require('./lib.data.template.js');
const generateQuery = require('./generate.list.js');

const generateQueryFileContent = async (dataConfig ={}, templateConfig = query) => {
  return generateQuery.generateFileContent(dataConfig, templateConfig);
};

const generateQueryLibDataContent = async (dataConfig ={}, templateConfig = datas) => {
  return generateQuery.generateDataFileContent(dataConfig, templateConfig);
};

const generateQueryLibContrContent = async (dataConfig ={}, templateConfig = contr) => {
  return generateQuery.generateContrFileContent(dataConfig, templateConfig);
};

exports.generateQueryFileContent = generateQueryFileContent;
exports.generateQueryLibDataContent = generateQueryLibDataContent;
exports.generateQueryLibContrContent = generateQueryLibContrContent;




