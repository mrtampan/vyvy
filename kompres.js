let UglifyJS = require('uglify-js');
let fs = require('fs');

let options = { warnings: true };
let codingan = fs.readFileSync('vyvy.js', 'utf-8');

let result = UglifyJS.minify(codingan, options)


fs.writeFileSync('vyvy-min.js', result.code, 'utf8');

// console.log(result.error);
// console.log(result.warnings);
// console.log(result.code);