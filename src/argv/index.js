
/**
reolve the arv
output a json of base config
npm start -c "path/data.config.json" -o "path/of/the/target"
**/
const process = require('process');
const path = require('path');

const ConfigPathToken = '-c';
const TargetPathToken = '-o';
const DefaultConfigFile = './data.config.json';
const DefaultTargetDirectory = './src';

const resolveHome = (inputPath) => {
  if (inputPath.startsWith('~')) {
    let resolvedPath = path.resolve(process.env.HOME || '', inputPath.substring(2));
    return resolvedPath;
  }
  return path.resolve(inputPath);
};

const resolveArgv = function() {
  const baseConfig = {
    configPath:path.resolve(DefaultConfigFile),
    targetPath:path.resolve(DefaultTargetDirectory)
  };
  const argvMap = process.argv.reduce((sum, cur, idx) => {
    sum[cur]= idx;
    return sum;
  },{});
  if (argvMap[ConfigPathToken]) {
    baseConfig.configPath = resolveHome(process.argv[argvMap[ConfigPathToken] + 1]);
  }
  if (argvMap[TargetPathToken]) {
    baseConfig.targetPath = resolveHome(process.argv[argvMap[TargetPathToken] + 1]);
  }
  return baseConfig;
};

exports.resolveArgv = resolveArgv;
