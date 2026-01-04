const fs = require('fs');
const path = require('path');

// Read input file
const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

// Use a regex to split by \r\n, \n, or \r, and filter out any empty strings
const input = fileContent.trim().split(/\r?\n|\r|\n/g);

// Part 1
function part1(input) {

    var sourceIndexMap = new Map();    
    for (var i=0; i<input.length; i++) {
        sourceIndexMap.set(input[i].slice(0,3),i);
    }

    var memory = new Map();
    function pathsToOut(startIndex) {
        if (memory.has(startIndex)) {
            return memory.get(startIndex);
        }
        var destinations = input[startIndex].substring(5).split(' ');

        // check to see if this is the way out
        for (var i = 0; i<destinations.length; i++) {
            if (destinations[i] === 'out') {
                memory.set(startIndex, 1);
                return 1;
            }
        }

        // recurse
        var totalPaths = 0;
        for (var i = 0; i<destinations.length; i++) {
            totalPaths += pathsToOut(sourceIndexMap.get(destinations[i]));
        }
        return totalPaths;
    }

    return pathsToOut(sourceIndexMap.get('you'));
}

// Part 2
function part2(input) {

    var sourceIndexMap = new Map();    
    for (var i=0; i<input.length; i++) {
        sourceIndexMap.set(input[i].slice(0,3),i);
    }

    var memory = new Map();
    function pathsToOut(startIndex, foundDac, foundFft) {
        var memString = startIndex.toString() + (foundDac ? "1" : "0") + (foundFft ? "1" : "0");
        if (memory.has(memString)) {
            return memory.get(memString);
        }

        if (sourceIndexMap.get('dac') === startIndex) {
            foundDac = true;
        }
        if (sourceIndexMap.get('fft') === startIndex) {
            foundFft = true;
        }

        var destinations = input[startIndex].substring(5).split(' ');

        // check to see if this is the way out -- out is always first/only
        if (destinations[0] === 'out') {
            if (foundDac && foundFft) {
                return 1;
            }
            else {
                return 0;
            }
        }

        // recurse
        var totalPaths = 0;
        for (var i = 0; i<destinations.length; i++) {
            totalPaths += pathsToOut(sourceIndexMap.get(destinations[i]), foundDac, foundFft);
        }        
        memory.set(memString, totalPaths);
        return totalPaths;
    }

    return pathsToOut(sourceIndexMap.get('svr'), false, false);
}

//console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
