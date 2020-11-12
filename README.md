# read-json-sequence

Read a sequence of valid JSON from STDIN


**`readJSONSequence`** internally reads in from STDIN and produces an array of JSON that the callback should accept and deal with.


## Example


Add the following to a file (say `index.js`):

```
// Read JSON from STDIN and get a JSON array as a result
const readJSONSequence = require("read-json-sequence")

// I use LossLessJSON library to parse JSON without risk of losing numeric information.
const LosslessJSON = require('lossless-json');

// Passing a callback to `readJSONSequence` to do whatever I want with it
readJSONSequence(printJSONArray)


function printJSONArray(jsons) {
	return console.log(LosslessJSON.stringify(jsonArr)
}

```

```
$ node index.js
```
Will consume user input until you press ^C. You can also pipe in from a file.


Let's say you give it:

```
1"hello"{
	
	"boy":"good"
}[]2
```

The result is an array of each JSON here but you can do whatever you want in the callback to readJSONSequence.

```
[1,"hello",{"boy":"good"},[],2]
```