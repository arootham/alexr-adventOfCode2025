const fs = require('fs');
const path = require('path');

// Read input file
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

// Part 1
function part1(input) {
    var current = 50;
    var hitZeroCount = 0;
    input.forEach((line) => {
        
        var move = Number(line.substring(1))  * (line.substring(0,1) === 'L' ? -1 : 1);
        current = (current + move) % 100;
        if (current === 0) hitZeroCount++;
    });
    return hitZeroCount;
}

// Part 2
function part2(input) {
    var current = 50;
    var hitZeroCount = 0;
    input.forEach((line) => {        
        var move = Number(line.substring(1))  * (line.substring(0,1) === 'L' ? -1 : 1);
        // count for switching sign
        if ((current !==0) && (Math.sign((current)) !== Math.sign(current + move))) {
            hitZeroCount++;
        }

        // extra rotations
        //console.log((current + move) / 100);
        if (Math.floor(Math.abs((move) / 100))) {
            console.log('hi');
        }
        hitZeroCount += Math.floor(Math.abs((current + move) / 100));

        // move the dial
        current = (current + move) % 100;

        // count for exactly zero
        /*
        if (current === 0) {
            hitZeroCount++;
        }*/

    });
    return hitZeroCount;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
