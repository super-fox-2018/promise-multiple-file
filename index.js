const fs = require('fs');
//var sleep = require('sleep');

function readFilePromise(file) {
  // psst, the promise should be around here...
  return new Promise((resolve,reject) => {
  	fs.readFile(file,function(err,data) {
  		if(err) {
  			
  			reject("file tidak ditemukan")
  		}else{
  			var parseFile = JSON.parse(data)
			resolve(parseFile)	
  		}
  		
		
  	})
  })
}

function matchParentsWithChildrens(parentFileName, childrenFileName) {
  // your code here... (p.s. readFilePromise function(s) should be around here..)
 	readFilePromise(parentFileName) 
	.then(dataParents => {
		 return readFilePromise(childrenFileName)
		.then(dataChildrens => {
			for(let i=0;i<dataParents.length;i++) {
  				dataParents[i].childrens=[]
  				for(let j=0;j<dataChildrens.length;j++) {
  					if(dataChildrens[j].family == dataParents[i].last_name){
  						dataParents[i].childrens.push(dataChildrens[j].full_name)
  					}
  				}
  			}
  			console.log(dataParents)
		})
		
	})
	
	.catch(err => {
		console.log(err)
	})	

}



 matchParentsWithChildrens('./parents.json', './childrens.json');
 console.log("Notification : Data sedang diproses !");

// for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');