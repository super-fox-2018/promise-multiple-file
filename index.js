const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve,reject)=>{
    fs.readFile(file,'utf-8',(err,dataFound)=>{
      if(err) return reject('data \"'+file+'\" gak Ketemu');
      dataFound = JSON.parse(dataFound)
      resolve(dataFound)
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(function(parents){
    sleep.sleep(5)
    return readFilePromise(childrenFileName)
    .then(function(children){
      return {parents:parents, children:children}
    })
    .catch(function(err){
      console.log(err)
    })
  })
  .then(function(parents_n_children){
    for(let i = 0; i < parents_n_children.parents.length; i++){
      parents_n_children.parents[i]['children'] = []
      for(let j = 0; j < parents_n_children.children.length; j++){
        if(parents_n_children.parents[i]['last_name'] === parents_n_children.children[j]['family']){
          parents_n_children.parents[i]['children'].push(parents_n_children.children[j]['full_name'])
        }
      }
    }
    console.log(parents_n_children.parents)
  })
  .catch(function(err){
    console.log(err)
  })

}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');