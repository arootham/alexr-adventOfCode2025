const fs = require('fs');
const path = require('path');

// Read input file
const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

// Use a regex to split by \r\n, \n, or \r, and filter out any empty strings
const input = fileContent.trim().split(/\r?\n|\r|\n/g).filter(line => line.length > 0);



// Part 1
function part1(input) {
    var adjacent = [
        [-1, -1], 
        [-1, 0], 
        [-1, 1], 
        [0, -1], 
        [0, 1], 
        [1, -1], 
        [1, 0], 
        [1, 1], 

    ];
    var moveableCount = 0;
    for (var i=0; i<input.length; i++)  {
        for (var j=0; j<input[i].length; j++) {
            if (input[i][j] !== '@') continue;
            var adjCount = 0;
            adjacent.forEach((direction) => {
                var adji = i+direction[0];
                var adjj = j+direction[1];
                if (((adji >= 0) && (adjj >= 0)) && ((adji<input.length) && (adjj<input[i].length))){
                    if(input[adji][adjj] === '@') adjCount++;
                }
            });
            if (adjCount < 4) moveableCount++;
        }
    }
    return moveableCount;
}

// Part 2
function part2(input) {
    var adjacent = [
        [-1, -1], 
        [-1, 0], 
        [-1, 1], 
        [0, -1], 
        [0, 1], 
        [1, -1], 
        [1, 0], 
        [1, 1], 

    ];
    var totalRemoved = 0;
    function removeIteration(input) {
        var removedThisTime = 0;
        for (var i=0; i<input.length; i++)  {
            for (var j=0; j<input[i].length; j++) {
                if (input[i][j] !== '@') continue;
                var adjCount = 0;
                adjacent.forEach((direction) => {
                    var adji = i+direction[0];
                    var adjj = j+direction[1];
                    if (((adji >= 0) && (adjj >= 0)) && ((adji<input.length) && (adjj<input[i].length))){
                        if(input[adji][adjj] === '@') adjCount++;
                    }
                });
                if (adjCount < 4) {
                    removedThisTime++;
                    
                    // input[i][j] = 'x';   // doesn't work
                    var newStr = input[i].substring(0,j) + 'x' + input[i].substring(j+1);
                    input[i] = newStr;
                }
            }
        }
        return removedThisTime;
    }
    while (1) {
        var now = removeIteration(input);
        if (now) {
            totalRemoved += now;
        }
        else
        {
            break;
        }
    }
    return totalRemoved;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
