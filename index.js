const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  // psst, the promise should be around here...
  return new Promise(function(resolve, reject){
    fs.readFile(fileName, "utf8", (err, data)=> {
      if(err){
        reject (err);
      }
      else{
        sleep.sleep(5);
        let parsedData = JSON.parse(data);
        resolve(parsedData)
      }
    })
  })
}


function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
    .then(function(parent_data){
      return readFilePromise(childrenFileName)
      .then(function(children_data){
        for(let i = 0; i < parent_data.length; i++){
          parent_data[i].children = [];
          for(let k = 0; k < children_data.length; k++){
            if(parent_data[i].last_name === children_data[k].family){
              parent_data[i].children.push(children_data[k].full_name);
            }
          }
        }
        sleep.sleep(5);
        return parent_data;
      })
    })
    .then(function(parent_data){
      console.log(parent_data)
    })
    .catch(function(err){
      console.log("Terjadi error pada proses pembacaan data");
      console.log(err);
    })

}

console.log("Notification : Data sedang diproses !");

matchParentsWithChildrens('./parents.json', './childrens.json');

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');