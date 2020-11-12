# read-json-sequence

Read a sequence of valid JSON from STDIN


**`readJSONSequence`** internally reads in from STDIN and produces an array of JSON that the callback should accept and deal with.


## Example

```
npm i  lossless-json read-json-sequence
```


Add the following to a file (say `index.js`):

```
const readJSONSequence = require("read-json-sequence")

// Parse JSON without risk of losing numeric information.
const LosslessJSON = require('lossless-json');

readJSONSequence(printJSONArray)

// JSON[] -> void
function printJSONArray(jsonArr) {
	return console.log(LosslessJSON.stringify(jsonArr))
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