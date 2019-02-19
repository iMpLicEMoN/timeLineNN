var fs = require('fs'),
	som = require('node-som'),
	Stats = require('fast-stats').Stats;

function random_color() {
	var rint = Math.round(0xffffff * Math.random());
	return [(rint >> 16), (rint >> 8 & 255), (rint & 255)];
}

function random_userDay() {
	var from = Math.floor((Math.random()*143)+0);
	var length = Math.floor((Math.random()*48)+18);
	
	var day = []
	var k=144
	var p=from
	while (k>=0){
		
		if(length>0) {day[p]=1} else {day[p]=0;}
		p++
		if (p===144){p=0;}
		k--
		length--
	}

	return day;
}

function analyzeTrainingSet(somConfig, data) {
	var inputSpace = data;
	var network = new som(somConfig);
	network.train();

	var resultSpace = {
		groups: {},
		network: network
	};

	for (var i = 0; i <= inputSpace.length - 1; i++) {
		var inputVector = inputSpace[i];
		var group = network.classify(inputVector);
		if (!resultSpace.groups[group])
			resultSpace.groups[group] = {
				key: group,
				inputs: [],
				inputCount: 0
			};
		resultSpace.groups[group].inputCount++;
		resultSpace.groups[group].inputs.push(inputVector);
	}

	return resultSpace;
}



// generate a bunch of random RBG colors
var sampleColors = [];
for (var i = 0; i <= 1000; i++)
	sampleColors.push(random_color());


var timeLines = [];
for (var i = 0; i <= 200; i++){
	timeLines.push(random_userDay());

}

var result = analyzeTrainingSet({
	inputLength: 144,
	maxClusters: 1000,
	loggingEnabled: true,
	inputPatterns: 500,
	radiusReductionPoint: .023,
	alpha: 0.6,
	decayRate: .96,
	minAlpha: .55,
	scale: {
		min: 0,
		max: 1
	}
}, timeLines);

var pageContent = "<html><style>body{padding:100px}.color-block {width: 4px;height: 17px;float:left}h1{clear:both}</style><body>";

for (var groupKey in result.groups) {
	pageContent += "<div>" + groupKey + "</div><br/>";
	for (var i = 0; i <= result.groups[groupKey].inputs.length - 1; i++) {
		var input = result.groups[groupKey].inputs[i];
		pageContent += "<div>";
		for (var k = 0; k <= result.groups[groupKey].inputs[i].length - 1; k++) {
			
			block = input[k]
			//console.log(input)
			var color = block===1? '255,0,0':'0,0,0'
			pageContent += "<div class=\'color-block\' style=\'background-color:rgb("+color+")\'></div>";
		}

		pageContent += "</div><br/>";
	}
	pageContent += "<br/>"
}

pageContent += "</body>";

var fs = require('fs');
fs.writeFile("./color.html", pageContent, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("The file was saved!");
	}
});