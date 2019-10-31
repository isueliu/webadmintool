
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

const exportQueryLib = async (dataConfig, directoryBase='./') => {
  console.log(directoryBase);
  let dataLib = await exportQueryData(dataConfig, directoryBase);
  let contrLib = await exportQueryControl(dataConfig, directoryBase);
  return [dataLib, contrLib];
};

const exportQueryData = async (dataConfig, directoryBase='./') => {
  const dataFilePath = path.resolve(directoryBase, util.fileNameBase("data", dataConfig.nameAppend.toLowerCase(), 'js', ''));
  console.log(dataFilePath);
  const hasTheFile = await util.checkPathExist(dataFilePath);
  if (hasTheFile) {
    console.log('the file', hasTheFile, 'will be replaced');
  }
  const fileContent = await generateQueryLibDataFileInfo(dataConfig);
  return util.writeFile(dataFilePath, fileContent);
}; 

const generateQueryLibDataFileInfo = async (dataConfig) => {
  return vue.generateQueryLibDataContent(dataConfig);
};

const exportQueryControl = async (dataConfig, directoryBase='./') => {
  const contrFilePath = path.resolve(directoryBase, util.fileNameBase("contr", dataConfig.nameAppend.toLowerCase(), 'js', ''));
  console.log(contrFilePath);
  const hasTheFile = await util.checkPathExist(contrFilePath);
  if (hasTheFile) {
    console.log('the file', hasTheFile, 'will be replaced');
  }
  const fileContent = await generateQueryLibContrFileInfo(dataConfig);
  return util.writeFile(contrFilePath, fileContent);
}; 

const generateQueryLibContrFileInfo = async (contrConfig) => {
  return vue.generateQueryLibContrContent(contrConfig);
};

exports.exportQueryList = exportQueryList;
exports.exportQueryLib = exportQueryLib;

