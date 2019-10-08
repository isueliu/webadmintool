
const fs = require('fs');

const checkPathExist = async (thePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(thePath, (err, stat) => {
      resolve(!err && thePath);
    });
  });
};

const fileName = (name="component", type='list', mode="vue") => {
  return [name.substring(0, 1).toUpperCase(), name.substring(1), type.substring(0,1).toUpperCase(), type.substring(1), 'Component','.', mode].join('');
}

exports.checkPathExist = checkPathExist;
exports.fileName = fileName;

