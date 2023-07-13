const fs = require('fs');
const path = require('path');

let filePath = process.argv[2];

fs.readFile(path.resolve(filePath), (err, file) => {
    if (err) {
        throw err;
    } else {
        console.log(file.toString());
    }
});
