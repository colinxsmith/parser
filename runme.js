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
DATA['n']=0;
DATA['nsect']=5;
DATA['alpha']=[1,2,3,4,5];
fwords[0]='n';
fwords[1]='nsect';
test.Parser('paritysplit.log','n nsect nfac alpha sectors SV FL FC BFGS DiffGrad',read,line_len,fwords,DATA,space);
console.log(test.getv(DATA,'alpha'));

console.log(DATA,fwords);