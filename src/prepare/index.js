/**
 * input config = {configPath:'/the/path/of/config.json',targetPath:'/the/directory/of/target'}
 * return prepared boolean: true / false
**/

const fs = require('fs');

const checkFileExist = async (pathToCheck) => {
  const checkFilePromise = new Promise((resolve, reject) => {
    fs.stat(pathToCheck, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
  return checkFilePromise;
};

const createDirectory = async (targetPath) => {
  const createDirectoryPromise = new Promise((resolve, reject) => {
    fs.mkdir(targetPath, {recursive:true}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
  return createDirectoryPromise;
};

const prepareEnv = async (config) => {
  const hasJson = await checkFileExist(config.configPath);
  const hasTarget = await checkFileExist(config.targetPath);
  if (!hasTarget) {
    const preparedTarget = await createDirectory(config.targetPath);
    console.log(hasJson, preparedTarget);
    return hasJson && preparedTarget;
  }
  return hasJson;
};

const readFileAsync = async (configPath) => {
  const readJsonPromise = new Promise((resolve, reject) => {
    fs.readFile(configPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
  return readJsonPromise;
};

exports.prepareEnv = prepareEnv;
exports.readFileAsync = readFileAsync;


