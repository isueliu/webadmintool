
const fs = require('fs');
const path = require('path');

const util = require('./util');

const exportQueryList = async (dataConfig, directoryBase='./') => {
  const queryListFilePath = util.fileName(dataConfig.name, 'queryList', 'vue');
  console.log(queryListFilePath);
};

exports.exportQueryList = exportQueryList;
