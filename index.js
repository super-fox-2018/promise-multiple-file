const fs = require('fs');
var { sleep } = require('sleep');

function readFilePromise(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, 'utf8', (err, outputString) => {
      if (err) return reject(err);
      sleep(5);
      const outputData = JSON.parse(outputString);
      resolve(outputData);
    });
  });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
    .then(parentData => {
      return readFilePromise(childrenFileName)
        .then(childrenData => [parentData, childrenData]);
    })
    .then(readData => {
      const parentData = readData[0];
      const childrenData = readData[1];
      for (let i = 0; i < parentData.length; i += 1) {
        const parent = parentData[i];
        parent.children = [];
        for (let j = 0; j < childrenData.length; j += 1) {
          const child = childrenData[j];
          if (child.family === parent.last_name) {
            parent.children.push(child.full_name);
          }
        }
      }

      console.log(parentData);
    })
    .catch(err => console.log('File Not found!'));
}

// matchParentsWithChildrens('./parents.json', './children.json');
// console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');