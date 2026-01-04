const fs = require('fs');
const path = require('path');

// Read input file
const fileContent = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

// Use a regex to split by \r\n, \n, or \r, and filter out any empty strings
const input = fileContent.trim().split(/\r?\n|\r|\n/g);


// Part 1
function part1(input) {

    // return a new light array applying the switchToApply
    function applySwitch(light, switchToApply) {
        var newlight = new Array();

        // copy array
        for (var i=0; i<light.length; i++) {
            newlight.push(light[i]);
        }

        // flip lights
        for (var i=0; i<switchToApply.length; i++) {
            newlight[switchToApply[i]] = !light[switchToApply[i]];
        }
        return newlight;
    }

    // assume same length heh
    function areLightsSame(light1, light2) {
        for (var i=0; i<light1.length; i++) {
            if (light1[i] !== light2[i]) return false;
        }
        return true;
    }

    // memory
    var memory = new Map();
    
    // recursive function
    function smallestCombineMatch(desiredLightBooleanArray, switchArray) {
        var memString = JSON.stringify(desiredLightBooleanArray)+'/'+JSON.stringify(switchArray);
        if (memory.has(memString)) {
            return memory.get(memString);
        }
        const emptyBooleans = Array(desiredLightBooleanArray.length).fill(false);

        // check if the answer is 1
        for (var i=0; i<switchArray.length; i++) {
            if (areLightsSame(desiredLightBooleanArray,applySwitch(emptyBooleans,switchArray[i]))) {
                return 1;
            }
        }

        // combine each with the rest
        var smallest = 999999999;
        for (var i=0; i<switchArray.length; i++) {
            // pretend to apply this
            var pretendLights = applySwitch(desiredLightBooleanArray,switchArray[i]);
            // then call recursively without this element to get the smallest 
            var newArray = [
                ...switchArray.slice(0,i),
                ...switchArray.slice(i+1)
            ];
            var nextSmallest = smallestCombineMatch(pretendLights, newArray) + 1;
            if (nextSmallest < smallest) {
                smallest = nextSmallest;
            }
        }
        memory.set(memString,smallest);
        return smallest;
    }

    var total = 0;
    for (var i = 0; i < input.length; i++) {        
        var desiredLightsString = input[i].match(/\[(.*?)\]/g)[0].slice(1, -1);
        var desiredLightBooleanArray = new Array();
        for (var j=0; j<desiredLightsString.length; j++) {
            if (desiredLightsString[j] === '#') {
                desiredLightBooleanArray.push(true);                
            }
            else {
                desiredLightBooleanArray.push(false);
            }
        }
        var switches = new Array();
        var matches = input[i].match(/\((.*?)\)/g);
        for (var j=0; j<matches.length; j++) {
            switches.push(matches[j].slice(1, -1).split(',').map(Number));
        }
        total += smallestCombineMatch(desiredLightBooleanArray,switches);
        console.log('new total: '+total);
    }

    console.log('hi');
    return total;
}

// Part 2
function part2(input) {

    // return a new joltage array applying the switchToApply
    function applySwitch(joltages, switchToApply) {
        var newJoltages = new Array();

        // copy array
        for (var i=0; i<joltages.length; i++) {
            newJoltages.push(joltages[i]);
        }

        // add joltage
        for (var i=0; i<switchToApply.length; i++) {
            newJoltages[switchToApply[i]]++;
        }
        return newJoltages;
    }

    // assume same length heh
    function areLightsSame(light1, light2) {
        for (var i=0; i<light1.length; i++) {
            if (light1[i] !== light2[i]) return false;
        }
        return true;
    }

    function areAnyJoltagesTooBig(desiredJoltage, pretendJoltage) {
        for (var i=0; i<desiredJoltage.length; i++) {
            if (pretendJoltage[i] > desiredJoltage[i]) return true;
        }
        return false;
    }

    // memory
    var memory = new Map();
    
    // recursive function
    function smallestCombineMatch(currentJoltage, desiredJoltage, switchArray) {
        var smallest = 999999999;

        //var memString = JSON.stringify(currentJoltage)+'/'+JSON.stringify(desiredJoltage)+'/'+JSON.stringify(switchArray);
        //var memString = currentJoltage.join('/') + ' ' + desiredJoltage.join('/')+' '+switchArray.join('/');
        var memString = currentJoltage.join('/');
        if (memory.has(memString)) {
            return memory.get(memString);
        }
        

        // check if the answer is 1
        for (var i=0; i<switchArray.length; i++) {
            if (areLightsSame(desiredJoltage,applySwitch(currentJoltage,switchArray[i]))) {
                memory.set(memString,1);
                return 1;
            }            
        }

        // combine each with the rest, including this one 
        for (var i=0; i<switchArray.length; i++) {

            // apply this
            var pretendLights = applySwitch(currentJoltage,switchArray[i]);

            // skip if too big (avoid infinity)
            if (areAnyJoltagesTooBig(desiredJoltage, pretendLights)) {
                continue;
            }

            // then call recursively WITH this element to get the smallest 
            var nextSmallest = smallestCombineMatch(pretendLights, desiredJoltage, switchArray) + 1;
            if (nextSmallest < smallest) {
                smallest = nextSmallest;
            }
        }
        memory.set(memString,smallest);
        return smallest;
    }


    var total = 0;
    for (var i = 0; i < input.length; i++) {        
        var desiredJoltageArray = input[i].match(/\{(.*?)\}/g)[0].slice(1, -1).split(',').map(Number);
        var switches = new Array();
        var matches = input[i].match(/\((.*?)\)/g);
        for (var j=0; j<matches.length; j++) {
            switches.push(matches[j].slice(1, -1).split(',').map(Number));
        }
        const emptyJoltage = Array(desiredJoltageArray.length).fill(0);
        total += smallestCombineMatch(emptyJoltage,desiredJoltageArray,switches);
        console.log('new total: '+total);
    }

    console.log('hi');
    return total;
}

//console.log('Part 1:', part1(input));
console.log('Part 2:', part2(input));
