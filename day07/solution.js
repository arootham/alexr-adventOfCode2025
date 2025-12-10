const fs = require('fs');
const path = require('path');

// Read input file
const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

// Use a regex to split by \r\n, \n, or \r, and filter out any empty strings
const input = fileContent.trim().split(/\r?\n|\r|\n/g);

// Part 1
function part1(input) {
    // each tachyon is a col-pos
    var tachyons = new Set();
    tachyons.add(input[0].indexOf('S'));
    var splitCount = 0;

    // row by row
    for (var i = 0; i < input.length-1; i++) {
        var tachyonsToAdd = new Set();
        tachyons.forEach((tachyon) => {
            if (input[i+1][tachyon] === '^') {
                splitCount++;
                tachyonsToAdd.add(tachyon+1);
                tachyonsToAdd.add(tachyon-1);
                tachyons.delete(tachyon);
            }
        });
        tachyonsToAdd.forEach((tachyon) => {
            tachyons.add(tachyon);
        });

    }    
    return splitCount;
}

// Part 2
function part2(input) { 
    var curtain = new Array();
    var timelineCount = new Array();
    for (var j=0; j<input[0].length;j++) {
        if (input[0][j] === 'S') {
            timelineCount.push(1);
        }
        else {
            timelineCount.push(0);        
        }
    }
    curtain.push(timelineCount);
    for (var i=1; i<input.length; i++) {
        var timelineCount = new Array();
        for (var j=0; j<input[0].length; j++) {
            var thisCount = 0;
            if (input[i-1][j] !== '^') {
                thisCount += curtain[i-1][j];
            }
            if ((j !== input[0].length-1) && (input[i][j+1] === '^')) {
                thisCount += curtain[i-1][j+1];
            }
            if ((j !== 0) && input[i][j-1] === '^') {
                thisCount += curtain[i-1][j-1];
            }
            timelineCount.push(thisCount);
        }
        curtain.push(timelineCount);
    }

    var total = 0;
    for (var j=0; j<input[0].length; j++) {
        total += curtain[input.length-1][j];
    }

    return total;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
