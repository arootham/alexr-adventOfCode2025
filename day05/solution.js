const fs = require('fs');
const path = require('path');

// Read input file
const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

// Use a regex to split by \r\n, \n, or \r, and filter out any empty strings
const input = fileContent.trim().split(/\r?\n|\r|\n/g);


// Part 1
function part1(input) {
    var rangesParsed = false;
    var ranges = new Array();
    var freshIngrediants = 0;
    for (var i=0; i<input.length; i++) {
        if (input[i] === '') {
            rangesParsed = true;
            continue;
        }
        if (!rangesParsed) {
            ranges.push(input[i].split('-')); // hmm maybe later we need to do this smarter
        }
        else {
            for (var j=0; j<ranges.length; j++) {
                if ((Number(input[i]) >= Number(ranges[j][0])) && (Number(input[i]) <= Number(ranges[j][1]))) {
                    //console.log('Found '+input[i]+' in range '+Number(ranges[j][0])+'-'+Number(ranges[j][1]));
                    freshIngrediants++;
                    break;
                }
            }            
        }
    }
    return freshIngrediants;
}

// Part 2
function part2(input) {
    var countIngrediantIds = 0;
    var ranges = new Array();
    for (var i=0; i<input.length; i++) {
        if (input[i] === '') {
            break;
        }
        var currentRange = input[i].split('-');
        var currentBeg = Number(currentRange[0]);
        var currentEnd = Number(currentRange[1]);        
        var push = true;
        for (var j=0; j<ranges.length; j++) {                        
            // full underlap
            if ((currentBeg >= ranges[j][0]) && (currentEnd <= ranges[j][1])) {
                push = false;
                break; // consumed, move on ot the next input
            }
            // full overlap
            else if ((currentBeg<=ranges[j][0]) && (currentEnd >= ranges[j][1])) {
                // remove existing range
                ranges[j][0] = -1000;
                ranges[j][1] = -1001;                
            }

            // low merge
            else if ((currentBeg <= ranges[j][0]) && (currentEnd >= ranges[j][0])) {
                // reduce current
                currentEnd = ranges[j][0] - 1;
            }            
            // high merge
            else if ((currentBeg <= ranges[j][1]) && (currentEnd >= ranges[j][1])) {
                // reduce current
                currentBeg = ranges[j][1] + 1;
            }
            // else not overlapping
            else {
                // do nothing, this is just  here for debug
            }            
        }
        if (push) ranges.push([currentBeg,currentEnd]);
    }
    for (var x=0; x<ranges.length; x++) {
        countIngrediantIds += ranges[x][1] - ranges[x][0]+1;
    }
    return countIngrediantIds;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
