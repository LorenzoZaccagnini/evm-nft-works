'use strict';

const fs = require('fs');
let jsonData = null;

fs.readFile('./metadata/metadata.json', (err, rawData) => {
    if (err) throw err;
    let jsonData = JSON.parse(rawData);
    console.log(jsonData);
    jsonData.forEach((json, index) => {
        fs.writeFileSync('./jsonFolder/' + index + '.json', JSON.stringify(json));
    });
});






