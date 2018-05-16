const fs = require('fs');
var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve,reject)=>{
  	fs.readFile(file,(err,data)=>{
  		if (err) {
  			reject(err)
  		}
  		else{
  			data = JSON.parse(data)
  			resolve(data)
  		}
  	})
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
  readFilePromise(parentFileName)
  .then(parentsJson=>{
  	return readFilePromise(childrenFileName)
  	.then(childrenJson=>[parentsJson,childrenJson])
  	})
  .then(dataBoth=>{
  	let parentData = dataBoth[0]
  	let childrenData = dataBoth[1]
  	for(var i=0;i<parentData.length;i++){
  		parentData[i].childrens = []
  	}
  	for(var i=0;i<childrenData.length;i++){
  		for(var j=0;j<parentData.length;j++){
  			if (childrenData[i].family===parentData[j].last_name) {
  				parentData[j].childrens.push(childrenData[i].full_name)
  			}
  		}
  	}
  	console.log(parentData)
  })
}

matchParentsWithChildrens('./parents.json', './childrens.json');
console.log("Notification : Data sedang diproses !");

// // for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');