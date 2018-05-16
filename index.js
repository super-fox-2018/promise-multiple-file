const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise(function(resolve,reject){
    fs.readFile(file,'utf8',function(err,data){
      if(err){
        reject(err)
      }else{
        let readData = JSON.parse(data)
        resolve(readData)
      } 
    })
  })


}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
    readFilePromise(parentFileName)
    .then(function(parent){
      // console.log(data)
      return readFilePromise(childrenFileName)
      .then(function(child){
        // console.log(child)
        for(let i=0;i<parent.length;i++){
          parent[i].child = []
        }

        for(let i=0;i<parent.length;i++){
          
          for(let j=0;j<child.length;j++){
            if(parent[i].last_name === child[j].family){
              parent[i].child.push(child[j].full_name)
            }
          }
        }
        console.log(parent)
      })
    })
  
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');