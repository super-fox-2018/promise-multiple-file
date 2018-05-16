const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  return new Promise((resolve, reject) =>{
    fs.readFile(file, 'utf8', (err, data)=>{
      if(err) reject(err);
      resolve(JSON.parse(data))
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  readFilePromise(parentFileName)
  .then(function(dataParent){
    return readFilePromise(childrenFileName)
    .then(function(dataChildren){
      return ([dataParent,dataChildren])
    })
  }).then(function(allData){
      let parentData = allData[0];
      let childrenData = allData[1]
      for (let i = 0; i < parentData.length; i++){
        let arrChildren = []
        for(let j = 0; j < childrenData.length; j++){
          if (parentData[i].last_name === childrenData[j].family){
            arrChildren.push(childrenData[j].full_name)
          }
        }
        parentData[i].children = arrChildren;
      }
      sleep.sleep(3)
      console.log(parentData)
  }).catch(function(err){
    console.log('Terjadi error pada proses pembacaan data..', err);
  })
}

// matchParentsWithChildrens('./parents.json', './childrens.json');
// console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');