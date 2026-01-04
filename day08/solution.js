const fs = require('fs');
const path = require('path');

// Read input file
const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

// Use a regex to split by \r\n, \n, or \r, and filter out any empty strings
const input = fileContent.trim().split(/\r?\n|\r|\n/g);

// Part 1
function part1(input) {

    var mapOfDistances = new Map();
    for (var i=0; i<input.length; i++) {
        var thisTriplet = input[i].split(',').map(Number);
        for (var j=i+1; j<input.length; j++) {
            var otherTriplet = input[j].split(',').map(Number);
            var distance = Math.sqrt(
                (thisTriplet[0]-otherTriplet[0])*(thisTriplet[0]-otherTriplet[0]) + 
                (thisTriplet[1]-otherTriplet[1])*(thisTriplet[1]-otherTriplet[1]) + 
                (thisTriplet[2]-otherTriplet[2])*(thisTriplet[2]-otherTriplet[2]));
            mapOfDistances.set(`${i},${j}`,distance);
        }
    }

    var sortedDistances = [...mapOfDistances.entries()].sort((a, b) => a[1] - b[1]);
    var mapOfConnections = new Map();
    var setOfSets = new Set();

    var iterations = 1000;
    for (var i=0; i<iterations; i++) {
        if (i > sortedDistances.length-1) {
            console.log('hrmmm');
            break;
        }
        var nextShorted = sortedDistances[i];
        var pair = nextShorted[0].split(',').map(Number);
        if ((mapOfConnections.has(pair[0])) && (mapOfConnections.has(pair[1]))) {
            if (mapOfConnections.get(pair[0]) === mapOfConnections.get(pair[1])) {
                // already connected... try again with the next one
                continue;
            }
            else {                
                // merge sets together                
                var firstSet = mapOfConnections.get(pair[0]);
                var secondSet = mapOfConnections.get(pair[1]);
                for (element of secondSet) {
                    firstSet.add(element);
                    mapOfConnections.set(element,firstSet);                    
                }
                setOfSets.delete(secondSet);                
            }
        }
        else if (mapOfConnections.has(pair[0])) {
            // add to the set
            mapOfConnections.get(pair[0]).add(pair[1]);
            mapOfConnections.set(pair[0],mapOfConnections.get(pair[0]));
            mapOfConnections.set(pair[1], mapOfConnections.get(pair[0]));
        }
        else if (mapOfConnections.has(pair[1])) {
            // add to the set
            mapOfConnections.get(pair[1]).add(pair[0]);
            mapOfConnections.set(pair[1],mapOfConnections.get(pair[1]));
            mapOfConnections.set(pair[0], mapOfConnections.get(pair[1]));
        }
        else {
            var newSet = new Set();
            newSet.add(pair[0]);
            newSet.add(pair[1]);
            setOfSets.add(newSet);
            mapOfConnections.set(pair[0],newSet);
            mapOfConnections.set(pair[1],newSet);
        }        
    }

    var sizeArray = new Array();
    for (theSet of setOfSets) {
        sizeArray.push(theSet.size);
    }
    sizeArray.sort((a, b) => b - a);
    var maxLengths = sizeArray.slice(0,3);
    
    console.log('hi');
    return maxLengths[0] * maxLengths[1] * maxLengths[2];
}


// Part 2
function part2(input) {

    var mapOfDistances = new Map();
    for (var i=0; i<input.length; i++) {
        var thisTriplet = input[i].split(',').map(Number);
        for (var j=i+1; j<input.length; j++) {
            var otherTriplet = input[j].split(',').map(Number);
            var distance = Math.sqrt(
                (thisTriplet[0]-otherTriplet[0])*(thisTriplet[0]-otherTriplet[0]) + 
                (thisTriplet[1]-otherTriplet[1])*(thisTriplet[1]-otherTriplet[1]) + 
                (thisTriplet[2]-otherTriplet[2])*(thisTriplet[2]-otherTriplet[2]));
            mapOfDistances.set(`${i},${j}`,distance);
        }
    }

    var sortedDistances = [...mapOfDistances.entries()].sort((a, b) => a[1] - b[1]);
    var mapOfConnections = new Map();
    var setOfSets = new Set();

    var iterations = 999999999999;
    for (var i=0; i<iterations; i++) {
        if (i > sortedDistances.length-1) {
            console.log('hrmmm');
            break;
        }
        var nextShorted = sortedDistances[i];
        var pair = nextShorted[0].split(',').map(Number);
        if ((mapOfConnections.has(pair[0])) && (mapOfConnections.has(pair[1]))) {
            if (mapOfConnections.get(pair[0]) === mapOfConnections.get(pair[1])) {
                // already connected... try again with the next one
                continue;
            }
            else {                
                // merge sets together                
                var firstSet = mapOfConnections.get(pair[0]);
                var secondSet = mapOfConnections.get(pair[1]);
                for (element of secondSet) {
                    firstSet.add(element);
                    mapOfConnections.set(element,firstSet);                    
                }
                setOfSets.delete(secondSet);                
            }
        }
        else if (mapOfConnections.has(pair[0])) {
            // add to the set
            mapOfConnections.get(pair[0]).add(pair[1]);
            mapOfConnections.set(pair[0],mapOfConnections.get(pair[0]));
            mapOfConnections.set(pair[1], mapOfConnections.get(pair[0]));
        }
        else if (mapOfConnections.has(pair[1])) {
            // add to the set
            mapOfConnections.get(pair[1]).add(pair[0]);
            mapOfConnections.set(pair[1],mapOfConnections.get(pair[1]));
            mapOfConnections.set(pair[0], mapOfConnections.get(pair[1]));
        }
        else {
            var newSet = new Set();
            newSet.add(pair[0]);
            newSet.add(pair[1]);
            setOfSets.add(newSet);
            mapOfConnections.set(pair[0],newSet);
            mapOfConnections.set(pair[1],newSet);
        }        
        if (setOfSets.values().next().value.size === 1000) {
            return input[pair[0]].split(',').map(Number)[0] * input[pair[1]].split(',').map(Number)[0];
        }
    }

    console.log('hi');
    return 0;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
