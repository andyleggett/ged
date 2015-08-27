var R = require('ramda');

//TODO: CONC and CONT

var lineSplit = /\s*(0|[1-9]+[0-9]*) (@[^@]+@ |)([A-Za-z0-9_]+)( [^\n\r]*|)/;
var lineClean = /[^\x20-\x7e]/g;
var atClean = /@@/g;
var tagClean = /[^\w.-]/g;
var treeRoot = { root: {tree: []}, level: 0};

var processTag = R.compose(R.replace(tagClean, ''), R.toUpper, R.trim);

var projectLine = function(linedata) {
    return (linedata.length > 0) ? {
        level: ~~linedata[1],
        pointer: R.trim(linedata[2] || ''),
        tag: processTag(linedata[3] || ''),
        data: R.trim(linedata[4] || '')
    } : undefined;
};

var createTree = function(acc, item){

	if (!acc.pointer){
		acc.pointer = acc.root;
	}

	if (item.level === acc.level){
		//acc.pointer.tree.push(item);
	} else if (item.level > acc.level){

	} else if (item.level < acc.level){

	}

	return acc;
};

var processLine = R.compose(projectLine, R.match(lineSplit), R.replace(atClean, '@'), R.replace(lineClean, ''));

var process = R.compose(R.reduce(createTree, treeRoot), R.filter(R.identity), R.map(processLine), R.split('\r\n'))

module.exports = process;