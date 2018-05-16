
const fs = require('fs');
// var sleep = require('sleep');

function readFilePromise(fileJson) {
  return new Promise(function(resolve, reject){
    fs.readFile(fileJson,'utf8',function(err, data){
      if(err){
        reject(err)
      }
      else{
        let arrData = JSON.parse(data)
        resolve(arrData)
      }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  let parentsData = readFilePromise(parentFileName)
  let childrensData =  readFilePromise(childrenFileName)
  Promise.all([parentsData,childrensData])
  .then(function(allData){
    let parents = allData[0]
    let childrens = allData[1]

    for(let obj of parents){
      obj.allChildrens = []
    }

    for(let obj1 of childrens){
      for(let obj2 of parents){
        if(obj1.family == obj2.last_name){
          obj2.allChildrens.push(obj1.full_name)
        }
      }
    }
    console.log(parents)
  })
  .catch(function(err){
    console.log('filenya gak ketemu cuy')
  })
}



matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
