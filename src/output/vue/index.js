
const query = require('./queryList.template.js');
const generateQuery = require('./generate.list.js');

const generateQueryFileContent = async (dataConfig ={}, templateConfig = query) => {
  return generateQuery.generateFileContent(dataConfig, templateConfig);
};

exports.generateQueryFileContent = generateQueryFileContent;



