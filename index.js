const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(fileName) {
  // psst, the promise should be around here...
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) { reject(err) }
      else { resolve(JSON.parse(data)) }
    })
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(function(parentData) {
    return readFilePromise(childrenFileName)
    .then(function(childrenData) {
      return ([parentData, childrenData])
    })
  })
  .then(function (arrData) {
    let parents = arrData[0];
    let childrens = arrData[1];

    for (let i = 0; i < parents.length; i++) {
      console.log(`Processing parentData ID: ${parents[i].id}`);

      parents[i].children = [];
      for (let j = 0; j < childrens.length; j++) {
        if (parents[i].last_name === childrens[j].family) {
          parents[i].children.push(childrens[j].full_name)
        }
      }
      sleep.sleep(1);
    }
    console.log(`Processing output...`);
    sleep.sleep(5);
    processedOutput(parents);
  })
  .catch(function(errObj) {
    console.log(`Terjadi error pada proses pembacaan data.`)
    console.log(`Filepath:`, errObj.path)
    console.log(`Error message:`)
    console.log(errObj)
  })
}

function processedOutput(obj) {
  for (let i = 0; i < obj.length; i++) {
    let parent = obj[i];
    console.log(`Parent ID: ${parent.id}`);
    console.log(`First Name: ${parent.first_name}`);
    console.log(`Last Name: ${parent.last_name}`);
    console.log(`Age: ${parent.age}`);
    console.log(`Children: `);
    for (let j = 0; j < parent.children.length; j++) {
      let children = parent.children[j];
      console.log(` `, children);
    }
    console.log(``); 
  }
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// for Release 2
matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');