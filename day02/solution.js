const fs = require('fs');
const path = require('path');

// Read input file
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split(',');

// Part 1
function part1(input) {
    var totalInvalidIds = 0;
    input.forEach((range) => {
        var beginEnd = range.split('-');
        var begin = Number(beginEnd[0]);
        var end = Number(beginEnd[1]);
        for(var i=begin; i<end; i++) {
            var iString = i.toString();
            if (iString.length % 2 === 0) {
                if ((iString.substring(0,iString.length/2)) === (iString.substring(iString.length/2))) {
                    totalInvalidIds += i;
                }
            }
        }
    });    
    return totalInvalidIds;
}

// Part 2
function part2(input) {
    var totalInvalidIds = 0;
    input.forEach((range) => {
        var beginEnd = range.split('-');
        var begin = Number(beginEnd[0]);
        var end = Number(beginEnd[1]);
        for(var i=begin; i<=end; i++) {
            var iString = i.toString();
            var maxFactor = Math.floor(iString.length/2);
            for (var j=1; j<=maxFactor; j++) {
                var pieces = iString.length/j;
                if (iString.length % pieces === 0) {
                    var isSymmetric = true;
                    var pieceLength = iString.length / pieces;
                    var firstPiece = iString.substring(0,pieceLength);
                    for (k=1; k<pieces; k++) {
                        if ((iString.substring(k*pieceLength,(k+1)*pieceLength)) !== firstPiece) {
                            isSymmetric = false;
                            break;
                        }
                    }
                    if (isSymmetric) 
                    {
                        totalInvalidIds += i;
                        console.log(i);
                        break;
                    }
                }
            }
        }
    });    
    return totalInvalidIds;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
