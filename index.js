const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  // psst, the promise should be around here...
  return new Promise(function(resolve, reject){
    fs.readFile(fileName, function(err, data){
      // sleep.sleep(5);
      if(err){
        reject('File does not exists!');
      }else{
        data = JSON.parse(data);
        resolve(data);
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(function(dataParent){
    return readFilePromise(childrenFileName)
      .then(function(dataChildren){
        for(let indexParent = 0; indexParent<dataParent.length; indexParent++){
          let familyArr = [];
          for(let indexChild = 0; indexChild<dataChildren.length; indexChild++){
            if(dataChildren[indexChild].family == dataParent[indexParent].last_name && !familyArr.includes(dataChildren[indexChild])){
              familyArr.push(dataChildren[indexChild].full_name);
            }
          }
          dataParent[indexParent].childrens = familyArr;
        }
        return dataParent;
      })
      return dataParent;
  })
  .then(function(dataParent){
    console.log(dataParent);
  })
  .catch(function(message){
    console.log(message);
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
