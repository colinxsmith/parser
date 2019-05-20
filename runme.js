var test = require("./build/Release/PARSER");
console.log(test);
Object.keys(test).forEach(function (key) {
    exports[key] = test[key];
});
console.log(exports);
var DATA=new test.DoubleMap();

var line_len=5000,read = '';
for(let i =0;i<line_len;++i){
    read += 'a';
}
var fwords=new test.StringVector(),space=' ';
test.Parser('paritysplit.log','n alpha',read,line_len,fwords,DATA,space);
//  console.log(test.getv(DATA,'alpha'));
var vec=Array(test.geti(DATA,'n'));
console.log(DATA.size(),fwords.size());
console.log(test.geti(DATA,'n'));
test.getvec(DATA,'alpha',vec);
console.log(vec);
console.log(test.getv(DATA,'alpha'));