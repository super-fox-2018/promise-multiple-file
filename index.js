const fs = require('fs');
var sleep = require('sleep');



function readDataPromise(fileName) {
	return new Promise(function (resolve, reject) {
		fs.readFile(fileName, 'utf8', function (err, data) {
			if (err) {
				reject(err)
			} else {
				resolve(JSON.parse(data))
			}
		})
	})
}

function match_data(parentFileName, childrenFileName) {
	//your code here... (p.s. readFilePromise function(s) should be around here..)
	readDataPromise(parentFileName)
		// .then(function (data) {
		// 	return data
		// })
		.then(function (parentData) {
			return readDataPromise(childrenFileName)
				.then(function (childrenData) {
					let hasil = [parentData, childrenData]
					return hasil
				})
		})
		.then(function (combinedata) {
			let parent = combinedata[0]
			let children = combinedata[1]

			for (var i = 0; i < parent.length; i++) {
				parent[i].children = []
				for (var j = 0; j < children.length; j++) {

					if (parent[i].last_name === children[j].family) {
						parent[i].children.push(children[j].full_name)
					}
				}
			}
			sleep.sleep(5)
			console.log(parent)
		})
		.catch(function (err) {
			console.log(err.message);
		})
}

match_data('./parents.json', './childrens.json')
console.log("Notification : Data sedang diproses !");

//
// // for Release 2
// matchParentsWithChildrens('./parents.json', './not_a_real_file.json');
// matchParentsWithChildrens('./not_a_real_file.json', './also_not_a_real_file.json');
