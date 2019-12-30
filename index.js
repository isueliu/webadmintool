
/*
npm start -c "path/data.config.json" -o "path/of/the/target"
 */
const process = require('process');
const src = require('./src');

const resolveArgv = async () => {
  return src.argv.resolveArgv();
};
const prepareConfig = async (baseConfig) => {
  const prepared = await src.prepare.prepareEnv(baseConfig);
  if (!prepared) {
    console.error('env can not be prepared');
    process.exit(1);
  }
  return src.prepare.readFileAsync(baseConfig.configPath);
};

const prepareTargetDirectory = async (baseConfig, dataConfig) => {
  return src.output.prepareTargetDirectory(baseConfig, dataConfig);
};
const defaultExportFile = async (targetDirctory, dataConfig) => {
  return src.output.exportFrontFile(targetDirctory, dataConfig);
};
const run = async (exportFile=defaultExportFile) => {
  const baseConfig = await resolveArgv();
  const dataConfig = await prepareConfig(baseConfig);
  const targetDirctory = await prepareTargetDirectory(baseConfig, dataConfig);
  return exportFile(targetDirctory, dataConfig);
};

run();

module.exports.run = run;
