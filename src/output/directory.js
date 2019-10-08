
const fs = require('fs');
const path = require('path');

const util = require('./util');

const prepareDirectory = async (baseConfig, dataConfig) => {
  const pathOfTarget = path.resolve(baseConfig.targetPath, dataConfig.name);
  const preparePromise = util.checkPathExist(pathOfTarget).then((hasTheDirect) => {
    if (hasTheDirect) {
      return pathOfTarget;
    }
    return new Promise((resolve, reject) => {
      fs.mkdir(pathOfTarget, { recursive:true }, (err) => {
        resolve(!err && pathOfTarget);
      });
    });
  });
  return preparePromise;
}

exports.prepareDirectory = prepareDirectory;
