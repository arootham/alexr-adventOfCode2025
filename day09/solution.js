const fs = require('fs');
const path = require('path');

// Read input file
const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

// Use a regex to split by \r\n, \n, or \r, and filter out any empty strings
const input = fileContent.trim().split(/\r?\n|\r|\n/g);

// Part 1
function part1(input) {
    var allPairs = new Array();    
    var biggestArea = 0;
    for (var i=0; i<input.length; i++) {
        var pair = input[i].split(',');
        for (var j=0; j<allPairs.length; j++) {
            var len = Math.abs(Number(pair[0]) - allPairs[j][0]) + 1;
            var wid = Math.abs(Number(pair[1]) - allPairs[j][1]) + 1;
            if (len*wid > biggestArea) biggestArea = len*wid;
        }
        allPairs.push([Number(pair[0]),Number(pair[1])]);
    }
    return biggestArea;
}

// Part 2
function part2(input) {
    return 0;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
