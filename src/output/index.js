
const directory = require('./directory');
const querylist = require('./querylist');

const exportFrontFile = async (baseConfig, dataConfig) => {
  const targetDirectory = await directory.prepareDirectory(baseConfig, dataConfig);
  const exportQueryList = await querylist.exportQueryList(dataConfig, targetDirectory[0]);
  const exportQueryLib = await querylist.exportQueryLib(dataConfig, targetDirectory[1]);
  return [targetDirectory, exportQueryList, exportQueryLib];
};

exports.exportFrontFile = exportFrontFile;
