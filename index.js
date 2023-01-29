const { buffer } = require('stream/consumers');

var fs = require('fs'),
    binary = fs.readFileSync('./image.raw');

function* hexFormatValues(buffer) {
    for (let x of buffer) {
        const hex = x.toString(16)
        yield hex.padStart(2, '0')
    }
}

let bytePosition = 0;
let currentValue = 0;
let values = []
for (let hex of hexFormatValues(binary)) {
    values.push(hex)
}

Object.defineProperty(Array.prototype, 'chunk_inefficient', {
    value: function (chunkSize) {
        var array = this;
        return [].concat.apply([],
            array.map(function (elem, i) {
                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            })
        );
    }
});

let chunk = values.chunk_inefficient(4)

let mergedChunks = chunk.map((byte) => {
    return (parseInt(byte[0]) +
        (parseInt(byte[1]) << 2) +
        (parseInt(byte[2]) << 4) +
        (parseInt(byte[3]) << 6))
})

console.log(mergedChunks)

console.log(Buffer.from(mergedChunks))

binary = fs.writeFileSync('./image.out', Buffer.from(mergedChunks));

