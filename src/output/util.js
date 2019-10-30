
const fs = require('fs');

const checkPathExist = async (thePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(thePath, (err, stat) => {
      resolve(!err && thePath);
    });
  });
};

const fileName = (name="component", type='list', mode="vue", fileType="Component") => {
  return [name.substring(0, 1).toUpperCase(), name.substring(1), type.substring(0,1).toUpperCase(), type.substring(1), fileType, '.', mode].join('');
};

const writeFile = async (thePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(thePath, data, (err) => {
      resolve(!err);
    });
  });
};

exports.checkPathExist = checkPathExist;
exports.fileName = fileName;
exports.writeFile = writeFile;


