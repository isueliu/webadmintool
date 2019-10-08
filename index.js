
/*
npm start -c "path/data.config.json" -o "path/of/the/target"
 */
const process = require('process');
const src = require('./src');

const baseConfig = src.argv.resolveArgv();

const main = async () => {
  const prepared = await src.prepare.prepareEnv(baseConfig);
  if (!prepared) {
    console.err('env can not be prepared');
    process.exit(1);
  }
  const dataConfig = await src.prepare.readFileAsync(baseConfig.configPath);
  src.output.exportFrontFile(baseConfig, dataConfig);
};

main();



