
const directory = require('./directory');
const querylist = require('./querylist');

const exportFrontFile = async (targetDirectory, dataConfig, exportPage = querylist.exportQueryList, exportLib = querylist.exportQueryLib) => {
  const exportQueryList = await exportPage(dataConfig, targetDirectory[0]);
  const exportQueryLib = await exportLib(dataConfig, targetDirectory[1]);
  return [exportQueryList, exportQueryLib];
};
const prepareTargetDirectory = async (baseConfig, dataConfig) => {
  return directory.prepareDirectory(baseConfig, dataConfig);
};

exports.prepareTargetDirectory = prepareTargetDirectory;
exports.exportFrontFile = exportFrontFile;
