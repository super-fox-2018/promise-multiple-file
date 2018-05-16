const fs = require('fs');
var sleep = require('sleep');

function readFilePromise() {
  return new Promise(function(resolve, reject){
    fs.readFile('./parents.json', function(err, dataParent){
      sleep.sleep(2)
      if(err){
        reject(err)
      }
      else{
        let data = JSON.parse(dataParent)
        resolve(data)
      }
    })
  })
}

function readFilePromiseChildrens() {
  return new Promise(function(resolve, reject){
    fs.readFile('./childrens.json', function(err, dataChildrens){
      sleep.sleep(2)
      if(err){
        reject(err)
      }
      else{
        let dataChil = JSON.parse(dataChildrens)
        resolve(dataChil)
      }
    })
  })
}

// untuk liat hasil readfile diatas
// readFilePromise()
// .then(function(data){
//   console.log(data)
// })

// readFilePromiseChildrens()
// .then(function(dataChil){
//   console.log(dataChil)
// })
// .catch(function(err){
//   console.log("Data tidak ditemukan")
// })

// Release 1
function matchParentsWithChildrens(dataFileParents, dataFileChildrens) {
  return new Promise(function(resolve, reject){
    fs.readFile(dataFileParents, (err, data) => {
      sleep.sleep(2)
      if(err){
        reject(err)
      }
      else{
        let parents = JSON.parse(data)
        fs.readFile(dataFileChildrens, (err, dataChil) => {
          if(err){
            reject(err)
          }
          else{
            let childrens = JSON.parse(dataChil)
            for(var i = 0; i < parents.length; i++){
              let arrChildrens = [];
              for(var j = 0; j < childrens.length; j++){
                if(childrens[j].family === parents[i].last_name){
                  arrChildrens.push(childrens[j].full_name);
                }
                parents[i].childrens = arrChildrens
              }
            }
            resolve(parents)
          }
        })
      }
    })
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json')
.then(function(parents){
  console.log(parents)
})
.catch(function(err){
  console.log("Data tidak ditemukan")
})
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json')
.then(function(parents){
  console.log(parents)
})
.catch(function(err){
  console.log("Data tidak ditemukan")
})

matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json')
.catch(function(err){
  console.log("Data tidak ditemukan")
})
