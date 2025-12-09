const fs = require('fs');
const path = require('path');

// Read input file
const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

// Use a regex to split by \r\n, \n, or \r, and filter out any empty strings
const input = fileContent.trim().split(/\r?\n|\r|\n/g);

// Part 1
function part1(input) {
    var operations = input[input.length-1].trim().split(/\s+/);        
    var runningTotal = input[0].trim().split(/\s+/).map(Number);
    for (var i=1; i<input.length-1; i++) {
        var row = input[i].trim().split(/\s+/).map(Number);
        for (var j=0; j<row.length; j++) {
            if (operations[j] === '+') {
                runningTotal[j] += row[j];
            }
            else {
                runningTotal[j] = runningTotal[j]*row[j];
            }
        }
    }
    var total = 0;
    for (var x=0; x<runningTotal.length; x++) {
        total += runningTotal[x];
    }
    return total;
}

// Part 2
function part2(input) {    
    var total = 0;
    var numStrings = new Array();
    // going across    
    for (var i=0; i<input[0].length; i++) {
        numStrings[i] = '';

        // going down
        for (var j=0; j<input.length-1;j++) {
            if (input[j][i] !== ' ') {
                numStrings[i] = numStrings[i] + (input[j][i]); // add the digit
            }
        }
    }
    // going across, do the op
    var currentOp;
    var runningTotal=0;
    for (var i=0; i<input[0].length; i++) {
        if (numStrings[i] === '') {
            continue;
        }
        var opChar = input[input.length-1][i];        
        if (opChar !== ' ') {
            currentOp = opChar;
            // initialize running total
            total += runningTotal;
            runningTotal = (opChar === '+' ? 0 : 1); 
        }
        if (currentOp === '+') {
            runningTotal += Number(numStrings[i]);
        }
        else {
            runningTotal = runningTotal * Number(numStrings[i]);
        }
    }
    total += runningTotal; // one last time

    return total;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
