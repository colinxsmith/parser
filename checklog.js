const test = require("./build/Release/PARSER");
const opt = require("/home/colin/router/build/Release/OPT");
console.log(opt);
const DATA = new test.DoubleMap();

const line_len = 50000;
let read = '';
for (let i = 0; i < line_len; ++i) {
    read += 'a';
}
const fwords = new test.StringVector(), space = ' ';
const keys = 'n nfac m A L soft_m soft_A soft_L soft_U soft_b soft_l U alpha shortalphacost bench Q SV FL FC gamma initial delta buy sell qbuy qsell kappa basket longbasket downrisk downfactor shortbasket tradebuy tradesell tradenum revise costs min_holding min_trade ls full minRisk maxRisk rmin rmax round min_lot size_lot ncomp Composites value valuel npiece hpiece pgrad nabs A_abs mabs I_A Abs_U Abs_L ShortCostScale mask issues five ten forty';
const scalars = 'n nfac m soft_m gamma delta kappa basket revise costs rmin longbasket downrisk downfactor shortbasket tradebuy tradesell tradenum value valuel npiece rmax minRisk maxRisk ls full min_trade min_holding round ncomp nabs mabs five ten forty ShortCostScale';
test.Parser('/SDrive/logFile.log', keys, read, line_len, fwords, DATA, space);
keys.split(' ').forEach(kk => {
    const sss = scalars.split(' ');
    if (sss.includes(kk)) {
        console.log('scalar',kk, test.gets(DATA, kk));
    } else {
        console.log(kk, (test.getv(DATA, kk))===undefined?'blank':'length '+(test.getv(DATA, kk)).length);
    }
});
const L = test.getv(DATA, 'L');
const U = test.getv(DATA, 'U');
L.forEach((d, i) => {
    if (U[i] < L[i]) {
        console.log('Error in bound ', i);
    }
});
console.log(fwords.keys);