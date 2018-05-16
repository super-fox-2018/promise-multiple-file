const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, 'utf8', (err, data) => {
      sleep.sleep(5);
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
     .then(function(parentList) {
      return readFilePromise(childrenFileName)
       .then(function(childrenList) {
        return getChildren(parentList, childrenList);
      });
    })
     .then(function(parentListWithChildren) {
      console.log(parentListWithChildren);
    })
     .catch(function(error) {
      console.log('File Not Found!');
    });
}

function getChildren(parentList, childrenList) {
  return new Promise(function(resolve, reject) {
    for (let i = 0; i < parentList.length; i++) {
      let parent = parentList[i];
      parent.children = [];
      for (let j = 0; j < childrenList.length; j++) {
        let children = childrenList[j];
        if (children.family === parent.last_name) {
          parent.children.push(children.full_name);
        }
      }
    }
    resolve(parentList);
  });
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
// console.log('Notification : Data sedang diproses !');

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
