
const fs = require('fs');
const path = require('path');

const util = require('./util');
const vue = require('./vue');

const exportQueryList = async (dataConfig, directoryBase='./') => {
  const queryListFilePath = path.resolve(directoryBase, util.fileName(dataConfig.name, dataConfig.nameAppend || 'QueryList', dataConfig.mode || 'vue'));
  console.log(queryListFilePath);
  const hasTheFile = await util.checkPathExist(queryListFilePath);
  if (hasTheFile) {
    console.log('the file', queryListFilePath, 'will be replaced');
  }
  const fileContent = await generateQueryListFileInfo(dataConfig);
  return util.writeFile(queryListFilePath, fileContent);
};

const generateQueryListFileInfo = async (dataConfig) => {
  return vue.generateQueryFileContent(dataConfig);
};

exports.exportQueryList = exportQueryList;
