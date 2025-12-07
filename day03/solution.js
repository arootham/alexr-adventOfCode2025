const fs = require('fs');
const path = require('path');

// Read input file
const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

// Use a regex to split by \r\n, \n, or \r, and filter out any empty strings
const input = fileContent.trim().split(/\r?\n|\r|\n/g).filter(line => line.length > 0);

// Part 1 --- off by 1 because of CRLF
function part1(input) {
    var totalJoltage = 0;
    input.forEach((line) => {
        var highestNumberNotAtEnd = 0;
        var highestNumberNotAtEndPosition = -1;
        for (var i=0; i<(line.length-2); i++) {  // grr off by one?
            if (Number(line[i]) > highestNumberNotAtEnd) {
                highestNumberNotAtEnd = Number(line[i]);
                highestNumberNotAtEndPosition = i;
            }
        }
        var secondDigit = 0;        
        for (var i=highestNumberNotAtEndPosition+1; i<line.length-1; i++) {  // off by one??
            if (Number(line[i]) > secondDigit) {
                secondDigit = Number(line[i]);
            }
        }
        //console.log(highestNumberNotAtEnd*10 + secondDigit);
        totalJoltage += highestNumberNotAtEnd*10 + secondDigit;
    });    
    return totalJoltage;
}

// Part 2
function part2(input) {
    function highestInString(value) {
        var highest = 0;
        for (var i=0; i<value.length; i++) {
            //console.log(' '+Number(value[i]) + ' ' +Number(value[highest]) + ' index '+highest);
            if ((Number(value[i])) > (Number(value[highest]))) { 
                highest = i;
            }
        }
        return highest;
    };
    var totalJoltage = 0;
    input.forEach((line) => {
        var digitValuePosition = 0;
        var totalForLine = 0;
        for (var a=0; a<12; a++) {
            // console.log(line + ' line.length + ' + line.length + 'substr '+line.substring(digitValuePosition,line.length-12+a));
            digitValuePosition = digitValuePosition + highestInString(line.substring(digitValuePosition,line.length-11+a));            
            // console.log(' dvp ' + digitValuePosition + ' ' + line[digitValuePosition]);
            totalForLine += Number(line[digitValuePosition])*(10**(11-a));
            digitValuePosition++;
        }
        console.log('totalForLine: ' + totalForLine);
        totalJoltage += totalForLine;
    });    
    return totalJoltage;
}

console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
