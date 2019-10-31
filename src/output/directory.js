
const fs = require('fs');
const path = require('path');

const util = require('./util');

const prepareDirectory = async (baseConfig, dataConfig) => {
  const pathOfTarget = path.resolve(baseConfig.targetPath, dataConfig.name);
  const libOfTarget = path.resolve(pathOfTarget, 'lib');
  const preparePromise = util.checkPathExist(libOfTarget).then((hasTheDirect) => {
    if (hasTheDirect) {
      return [pathOfTarget, libOfTarget];
    }
    let libBase = new Promise((resolve, reject) => {
      fs.mkdir(libOfTarget, { recursive:true }, (err) => {
        resolve(!err && libOfTarget);
      });
    });
    return Promise.all([pathOfTarget, libBase]);
  });
  return preparePromise;
};

exports.prepareDirectory = prepareDirectory;
