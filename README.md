# read-json-sequence

Read a sequence of valid JSON from STDIN


**`readJSONSequence`** internally reads in from STDIN and produces an array of JSON that the callback should accept and deal with.

**Note:** The numbers are converted into "lossless numbers" so install the [`lossless-json`](https://www.npmjs.com/package/lossless-json) library and use their `stringify` method to convert the JSON array to a string. See Example below:


## Example

```
npm i lossless-json read-json-sequence
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
}[]2.00000000000000000000000000
```

The result is an array of each JSON here but you can do whatever you want in the callback to readJSONSequence.

```
[1,"hello",{"boy":"good"},[],2.00000000000000000000000000]
```