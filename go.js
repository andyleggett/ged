var fs = require('fs'), 
	R = require('ramda'),
	toTree = require('./totree');

fs.readFile('family-tree.ged', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  } else {
  	console.log(toTree(data));
  }
  
});