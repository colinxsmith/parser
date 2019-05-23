var test = require("./build/Release/PARSER");
console.log(test);
Object.keys(test).forEach(function (key) {
    exports[key] = test[key];
});
console.log(exports);
var DATA = new test.StringMap();

var line_len = 5000, read = '';
for (let i = 0; i < line_len; ++i) {
    read += 'a';
}
var fwords = new test.StringVector(), space = ' ';
test.Parser('paritysplit.log', 'n alpha', read, line_len, fwords, DATA, space);
console.log(test.getv(DATA,'alpha'));
let vec = Array(+test.gets(DATA, 'n'));
console.log(vec);
console.log(DATA.size(), fwords.size());
console.log(test.gets(DATA, 'n'));
test.getvec(DATA, 'alpha', vec);
console.log(vec);
console.log(test.getv(DATA, 'alpha'));
console.log(test.getv(DATA, 'n'));
for (let i = 0; i < fwords.size();i++) {
    console.log(i,test.getvvec(fwords, i)); // get from vector of strings
}
console.log('alpha 2 is ',test.getvvec(test.getvv(DATA,'alpha'),2)); // Get item 2 from vector of doubles or strings in item alpha in the DATA map