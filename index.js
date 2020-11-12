const readline = require('readline');
const LosslessJSON = require('lossless-json');

// Compiles all the lines from
// STDIN and sends to `xjson`
function readJSONSequence(callback) {
    let lines = []
    let readLine = readline.createInterface({ input: process.stdin, output: process.stdout });
    readLine.on('line', (l) => lines.push(l));
    readLine.on('close', () => { callback(stringToJSONS(lines.join("\n"))) });
}

// string -> JSON[]
// Converts a string containing a sequence
// of valid JSON representation to JSON[]
function stringToJSONS(jsonSeqStr) {
    if (jsonSeqStr.trim().length === 0) {
        return [];
    } else {
        try {
            // Note to the reader: we're checking for error messages
            // from JSON.parse so first, we try to parse using that!
            JSON.parse(jsonSeqStr)
            return [LosslessJSON.parse(jsonSeqStr)];
        } catch (error) {
            let splitIdx = getLastNumInStr(error.toString());
            const [lhs, rhs] = splitByIndex(jsonSeqStr, splitIdx);
            // TERMINATION ARGUMENT: splitByIndex splits the input 
            // into two parts, therefore recursive calls are on 
            // smaller inputs.
            return [...stringToJSONS(lhs), ...stringToJSONS(rhs)]
        }
    }
}

// get the last number in a string
// ASSUMPTION: a last number exists.
function getLastNumInStr(str) {
    return parseInt(str.match(/\d+(?=\D*$)/)[0])
}

// splits input at index into a pair
// ASSUMPTION: 0-indexed and index within input.
function splitByIndex(input, index) {
    return [input.substr(0, index), input.substr(index)];
}


module.exports = readJSONSequence;
