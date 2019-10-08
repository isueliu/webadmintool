
const directory = require('./directory');
const querylist = require('./querylist');

const exportFrontFile = async (baseConfig, dataConfig) => {
  const targetDirectory = await directory.prepareDirectory(baseConfig, dataConfig);
  const exportQueryList = await querylist.exportQueryList(dataConfig, targetDirectory);
};

exports.exportFrontFile = exportFrontFile;
