const test = require("./build/Release/PARSER");
const opt = require("/home/colin/router/build/Release/OPT");
console.log(opt);
/*
extern "C"  short  Optimise_internalCVPAFblSaMSoft(dimen n,long nfac,char** stocknames,vector w_opt,dimen m,
									vector AAA,vector L,vector U,vector alpha,
									vector benchmark,vector QMATRIX,real gamma,vector Initial,
									real delta,vector buy,vector sell,real kappa,long basket,
									long trades,int revise,int costs,real min_holding,
									real min_trade,
									int m_LS,int Fully_Invested,real Rmin,real Rmax,
									int m_Round,vector min_lot,vector size_lot,int* shake,
									dimen ncomp,vector Composite,real LSValue,
									dimen npiece,vector hpiece,vector pgrad,
									dimen nabs,vector Abs_A,dimen mabs,dimen* I_A,vector Abs_U,
									vector FFC,vector FLOAD,vector SSV,
									double minRisk=-1,double maxRisk=-1,double* ogamma=0,
									vector mask=0,int log=0,char* logfile=0,
									int downrisk=0,double downfactor=3.0,
									long longbasket=-1,long shortbasket=-1,
									long tradebuy=-1,long tradesell=-1,
									double zetaS=1,double zetaF=1,double ShortCostScale=1,
									double LSValuel=0,vector Abs_L=0,vector shortalphacost=0,int never_slow=0,size_t*mem_kbytes=0,
									dimen soft_m=0,vector soft_l=0,vector soft_b=0,
                                    vector soft_L=0,vector soft_U=0,vector soft_A=0);
*/
const DATA = new test.StringMap();

const line_len = 50000;
let read = '';
for (let i = 0; i < line_len; ++i) {
    read += 'a';
}
const fwords = new test.StringVector(),
    space = ' ';
const keys = 'n nfac m A L soft_m soft_A soft_L soft_U soft_b soft_l U alpha shortalphacost bench Q SV FL FC gamma initial delta buy sell qbuy qsell kappa basket longbasket downrisk downfactor shortbasket tradebuy tradesell tradenum revise costs min_holding min_trade ls full minRisk maxRisk rmin rmax round min_lot size_lot ncomp Composites value valuel npiece hpiece pgrad nabs A_abs mabs I_A Abs_U Abs_L ShortCostScale mask issues five ten forty';
const scalars = 'n nfac m soft_m gamma delta kappa basket revise costs rmin longbasket downrisk downfactor shortbasket tradebuy tradesell tradenum value valuel npiece rmax minRisk maxRisk ls full min_trade min_holding round ncomp nabs mabs five ten forty ShortCostScale';
test.Parser('/SDrive/logFile.log', keys, read, line_len, fwords, DATA, space);
keys.split(' ').forEach(kk => {
    const sss = scalars.split(' ');
    if (sss.includes(kk)) {
        console.log('scalar', kk, +test.gets(DATA, kk));
    } else {
        console.log(kk, (test.getv(DATA, kk)) === undefined ? 'blank' : 'length ' + (test.getv(DATA, kk)).length);
    }
});

console.log(fwords.size(), keys.split(' ').length);

const n = +test.gets(DATA, 'n');
const nfac = +test.gets(DATA, 'nfac');
const names = test.getv(DATA, 'names');
const m = +test.gets(DATA, 'm');
const A = test.getv(DATA, 'A') === undefined ? [] : test.getv(DATA, 'A');
const L = test.getv(DATA, 'L') === undefined ? [] : test.getv(DATA, 'L');
const soft_m = +test.gets(DATA, 'soft_m');
const soft_A = test.getv(DATA, 'soft_A') === undefined ? [] : test.getv(DATA, 'soft_A');
const soft_L = test.getv(DATA, 'soft_L') === undefined ? [] : test.getv(DATA, 'soft_L');
const soft_U = test.getv(DATA, 'soft_U') === undefined ? [] : test.getv(DATA, 'soft_U');
const soft_b = test.getv(DATA, 'soft_b') === undefined ? [] : test.getv(DATA, 'soft_b');
const soft_l = test.getv(DATA, 'soft_l') === undefined ? [] : test.getv(DATA, 'soft_l');
const U = test.getv(DATA, 'U') === undefined ? [] : test.getv(DATA, 'U');
const alpha = test.getv(DATA, 'alpha') === undefined ? [] : test.getv(DATA, 'alpha');
const shortalphacost = test.getv(DATA, 'shortalphacost') === undefined ? [] : test.getv(DATA, 'shortalphacost');
const bench = test.getv(DATA, 'bench') === undefined ? [] : test.getv(DATA, 'bench');
const Q = test.getv(DATA, 'Q') === undefined ? [] : test.getv(DATA, 'Q');
const SV = test.getv(DATA, 'SV') === undefined ? [] : test.getv(DATA, 'SV');
const FL = test.getv(DATA, 'FL') === undefined ? [] : test.getv(DATA, 'FL');
const FC = test.getv(DATA, 'FC') === undefined ? [] : test.getv(DATA, 'FC');
const gamma = 0.5;//+test.gets(DATA, 'gamma');
const initial = test.getv(DATA, 'initial') === undefined ? [] : test.getv(DATA, 'initial');
const delta = 0.1;//+test.gets(DATA, 'delta');
const buy = test.getv(DATA, 'buy') === undefined ? [] : test.getv(DATA, 'buy');
const sell = test.getv(DATA, 'sell') === undefined ? [] : test.getv(DATA, 'sell');
const kappa = -1;//+test.gets(DATA, 'kappa');
const basket = +test.gets(DATA, 'basket');
const longbasket = +test.gets(DATA, 'longbasket');
const downrisk = +test.gets(DATA, 'downrisk');
const downfactor = +test.gets(DATA, 'downfactor');
const shortbasket = +test.gets(DATA, 'shortbasket');
const tradebuy = +test.gets(DATA, 'tradebuy');
const tradesell = +test.gets(DATA, 'tradesell');
const tradenum = -1;//+test.gets(DATA, 'tradenum');
const revise = 1;//+test.gets(DATA, 'revise');
const costs = 0;//+test.gets(DATA, 'costs');
const min_holding = -1;//+test.gets(DATA, 'min_holding');
const min_trade = -1;//+test.gets(DATA, 'min_trade');
const ls = +test.gets(DATA, 'ls');
const full = +test.gets(DATA, 'full');
const minRisk = +test.gets(DATA, 'minRisk');
const maxRisk = +test.gets(DATA, 'maxRisk');
const rmin = +test.gets(DATA, 'rmin');
const rmax = +test.gets(DATA, 'rmax');
const round = 1;//+test.gets(DATA, 'round');
const min_lot = test.getv(DATA, 'size_lot') === undefined ? [] : test.getv(DATA, 'size_lot');
const size_lot = test.getv(DATA, 'size_lot') === undefined ? [] : test.getv(DATA, 'size_lot');
const ncomp = +test.gets(DATA, 'ncomp');
const Composites = test.getv(DATA, 'Composites') === undefined ? [] : test.getv(DATA, 'Composites');
const value = +test.gets(DATA, 'value');
const valuel = +test.gets(DATA, 'valuel');
const npiece = +test.gets(DATA, 'npiece');
const hpiece = test.getv(DATA, 'hpiece') === undefined ? [] : test.getv(DATA, 'hpiece');
const pgrad = test.getv(DATA, 'pgrad') === undefined ? [] : test.getv(DATA, 'pgrad');
const nabs = +test.gets(DATA, 'nabs');
const A_abs = test.getv(DATA, 'A_abs') === undefined ? [] : test.getv(DATA, 'A_abs');
const mabs = +test.gets(DATA, 'mabs');
const I_A = test.getv(DATA, 'I_A') === undefined ? [] : test.getv(DATA, 'I_A');
const Abs_U = test.getv(DATA, 'Abs_U') === undefined ? [] : test.getv(DATA, 'Abs_U');
const Abs_L = test.getv(DATA, 'Abs_L') === undefined ? [] : test.getv(DATA, 'Abs_U');
const ShortCostScale = +test.gets(DATA, 'ShortCostScale');
const mask = test.getv(DATA, 'mask') === undefined ? [] : test.getv(DATA, 'mask');
const w = Array(n);
const ogamma = Array(1);
const shake = Array(n);
const log = 2;
const logfile = 'opt.log';
const zetaS = 1, zetaF = 1, never_slow = 0, mem_kbytes = [];
for (let i = 0; i < n; ++i) {
    L[i] = 0;
    min_lot[i] = 1e-3;
    size_lot[i] = 1e-3;
}
U[n] = 1;
const back = opt.Optimise_internalCVPAFblSaMSoft(n, nfac, names, w, m, A, L, U, alpha, bench, Q,
    gamma, initial, delta, buy, sell, kappa, basket, tradenum, revise, costs, min_holding, min_trade,
    ls, full, rmin, rmax, round, min_lot, size_lot, shake, ncomp, Composites, value,
    npiece, hpiece, pgrad, nabs, A_abs, mabs, I_A, Abs_U, FC, FL, SV, minRisk, maxRisk, ogamma,
    mask, log, logfile, downrisk, downfactor, longbasket, shortbasket, tradebuy, tradesell, zetaS,
    zetaF, ShortCostScale, valuel, Abs_L, shortalphacost, never_slow, mem_kbytes, soft_m, soft_l,
    soft_b, soft_L, soft_U, soft_A);
let turnover = 0;
if (initial != []) {
    w.forEach((d, i) => {
        turnover += Math.abs(d - initial[i]);
    });
}
turnover /= 2;
console.log(opt.Return_Message(back), turnover);
if (round) {
    size_lot.forEach((d, i) => {
        if (d === i) {
            console.log('Bound not set for stock ' + i);
        }
    });
}
if (initial != []) {
    initial.forEach((d, i) => {
        console.log('trade' + i + '    ' + (w[i] - d));
    });
}