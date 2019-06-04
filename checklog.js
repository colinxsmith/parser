const parseObj = require("./build/Release/PARSER");
const optObj = require("../router/build/Release/OPT");
// console.log(opt);

const DATA = new parseObj.StringMap();

const line_len = 50000;
let read = '';
for (let i = 0; i < line_len; ++i) {
    read += 'a';
}
const fwords = new parseObj.StringVector(),
    space = ' ';
const keys = 'n nfac m A L names soft_m soft_A soft_L soft_U soft_b soft_l U qbuy qsell alpha shortalphacost bench Q SV FL FC gamma initial delta buy sell qbuy qsell kappa basket longbasket downrisk downfactor shortbasket tradebuy tradesell tradenum revise costs min_holding min_trade ls full minRisk maxRisk rmin rmax round min_lot size_lot ncomp Composites value valuel npiece hpiece pgrad nabs A_abs mabs I_A Abs_U Abs_L ShortCostScale mask issues five ten forty';
const scalars = 'n nfac m soft_m gamma delta kappa basket revise costs rmin longbasket downrisk downfactor shortbasket tradebuy tradesell tradenum value valuel npiece rmax minRisk maxRisk ls full round ncomp nabs mabs five ten forty ShortCostScale';
parseObj.Parser('run.log', keys, read, line_len, fwords, DATA, space);
keys.split(' ').forEach(kk => {
    const sss = scalars.split(' ');
    if (sss.includes(kk)) {
        console.log('scalar\t', kk, +parseObj.gets(DATA, kk));
    } else {
        console.log(kk, (parseObj.getv(DATA, kk)) === undefined ? 'blank' : 'length ' + (parseObj.getv(DATA, kk)).length);
    }
});

console.log('Keywords in data file\t', fwords.size(), 'number searched by parser\t', keys.split(' ').length);
parseObj.printvvec(fwords);
const n = +parseObj.geti(DATA, 'n');
const nfac = +parseObj.geti(DATA, 'nfac');
const names = parseObj.getv(DATA, 'names');
const m = +parseObj.geti(DATA, 'm');
const A = parseObj.getv(DATA, 'A') === undefined ? [] : parseObj.getv(DATA, 'A');
const L = parseObj.getv(DATA, 'L') === undefined ? [] : parseObj.getv(DATA, 'L');
const qbuy = parseObj.getv(DATA, 'qbuy') === undefined ? [] : parseObj.getv(DATA, 'qbuy');
const qsell = parseObj.getv(DATA, 'qsell') === undefined ? [] : parseObj.getv(DATA, 'qsell');
const soft_m = +parseObj.geti(DATA, 'soft_m');
const soft_A = parseObj.getv(DATA, 'soft_A') === undefined ? [] : parseObj.getv(DATA, 'soft_A');
const soft_L = parseObj.getv(DATA, 'soft_L') === undefined ? [] : parseObj.getv(DATA, 'soft_L');
const soft_U = parseObj.getv(DATA, 'soft_U') === undefined ? [] : parseObj.getv(DATA, 'soft_U');
const soft_b = parseObj.getv(DATA, 'soft_b') === undefined ? [] : parseObj.getv(DATA, 'soft_b');
const soft_l = parseObj.getv(DATA, 'soft_l') === undefined ? [] : parseObj.getv(DATA, 'soft_l');
const U = parseObj.getv(DATA, 'U') === undefined ? [] : parseObj.getv(DATA, 'U');
const alpha = parseObj.getv(DATA, 'alpha') === undefined ? [] : parseObj.getv(DATA, 'alpha');
const shortalphacost = parseObj.getv(DATA, 'shortalphacost') === undefined ? [] : parseObj.getv(DATA, 'shortalphacost');
const bench = parseObj.getv(DATA, 'bench') === undefined ? [] : parseObj.getv(DATA, 'bench');
const Q = parseObj.getv(DATA, 'Q') === undefined ? [] : parseObj.getv(DATA, 'Q');
const SV = parseObj.getv(DATA, 'SV') === undefined ? [] : parseObj.getv(DATA, 'SV');
const FL = parseObj.getv(DATA, 'FL') === undefined ? [] : parseObj.getv(DATA, 'FL');
const FC = parseObj.getv(DATA, 'FC') === undefined ? [] : parseObj.getv(DATA, 'FC');
const gamma = +parseObj.gets(DATA, 'gamma');
const initial = parseObj.getv(DATA, 'initial') === undefined ? [] : parseObj.getv(DATA, 'initial');
const issues = parseObj.getv(DATA, 'issues') === undefined ? [] : parseObj.getv(DATA, 'issues');
const delta = +parseObj.gets(DATA, 'delta');
const buy = parseObj.getv(DATA, 'buy') === undefined ? [] : parseObj.getv(DATA, 'buy');
const sell = parseObj.getv(DATA, 'sell') === undefined ? [] : parseObj.getv(DATA, 'sell');
const kappa = +parseObj.gets(DATA, 'kappa');
const basket = +parseObj.geti(DATA, 'basket');
const longbasket = +parseObj.geti(DATA, 'longbasket');
const downrisk = +parseObj.gets(DATA, 'downrisk');
const downfactor = +parseObj.gets(DATA, 'downfactor');
const shortbasket = +parseObj.geti(DATA, 'shortbasket');
const tradebuy = +parseObj.geti(DATA, 'tradebuy');
const tradesell = +parseObj.geti(DATA, 'tradesell');
const tradenum = +parseObj.geti(DATA, 'tradenum');
const revise = +parseObj.geti(DATA, 'revise');
const costs = +parseObj.geti(DATA, 'costs');
const five = +parseObj.gets(DATA, 'five');
const ten = +parseObj.gets(DATA, 'ten');
const forty = +parseObj.gets(DATA, 'forty');

let notV = 0;
let min_holding = parseObj.getv(DATA, 'min_holding') === undefined ? [] : parseObj.getv(DATA, 'min_holding');
let  min_trade = parseObj.getv(DATA, 'min_trade') === undefined ? [] : parseObj.getv(DATA, 'min_trade');

if (!(min_holding.length === 0 || min_holding.length > 1)) {
    min_holding = +parseObj.gets(DATA, 'min_holding');
    notV++;
}
if (!(min_trade.length === 0 || min_trade.length > 1)) {
    min_trade = +parseObj.gets(DATA, 'min_trade');
    notV++;
}

const ls = +parseObj.geti(DATA, 'ls');
const full = +parseObj.gets(DATA, 'full');
const minRisk = +parseObj.gets(DATA, 'minRisk');
const maxRisk = +parseObj.gets(DATA, 'maxRisk');
const rmin = +parseObj.gets(DATA, 'rmin');
const rmax = +parseObj.gets(DATA, 'rmax');
const round = +parseObj.geti(DATA, 'round');
const min_lot = parseObj.getv(DATA, 'size_lot') === undefined ? [] : parseObj.getv(DATA, 'size_lot');
const size_lot = parseObj.getv(DATA, 'size_lot') === undefined ? [] : parseObj.getv(DATA, 'size_lot');
const ncomp = +parseObj.geti(DATA, 'ncomp');
const Composites = parseObj.getv(DATA, 'Composites') === undefined ? [] : parseObj.getv(DATA, 'Composites');
const value = +parseObj.gets(DATA, 'value');
const valuel = +parseObj.gets(DATA, 'valuel');
const npiece = +parseObj.geti(DATA, 'npiece');
const hpiece = parseObj.getv(DATA, 'hpiece') === undefined ? [] : parseObj.getv(DATA, 'hpiece');
const pgrad = parseObj.getv(DATA, 'pgrad') === undefined ? [] : parseObj.getv(DATA, 'pgrad');
const nabs = +parseObj.gets(DATA, 'nabs');
const A_abs = parseObj.getv(DATA, 'A_abs') === undefined ? [] : parseObj.getv(DATA, 'A_abs');
const mabs = +parseObj.gets(DATA, 'mabs');
const I_A = parseObj.getv(DATA, 'I_A') === undefined ? [] : parseObj.getv(DATA, 'I_A');
const Abs_U = parseObj.getv(DATA, 'Abs_U') === undefined ? [] : parseObj.getv(DATA, 'Abs_U');
const Abs_L = parseObj.getv(DATA, 'Abs_L') === undefined ? [] : parseObj.getv(DATA, 'Abs_U');
const ShortCostScale = +parseObj.gets(DATA, 'ShortCostScale');
const mask = parseObj.getv(DATA, 'mask') === undefined ? [] : parseObj.getv(DATA, 'mask');
const w = Array(n);
const ogamma = Array(1);
const shake = Array(n);
const log = 2;
const logfile = 'opt.log';
const zetaS = 1,
    zetaF = 1,
    never_slow = 0,
    mem_kbytes = [1];
let back;
if (notV === 2) {
    back = optObj.Optimise_internalCVPAFblSaMSoftQ(n, nfac, names, w, m, A, L, U, alpha, bench, Q,
        gamma, initial, delta, buy, sell, kappa, basket, tradenum, revise, costs, min_holding, min_trade,
        ls, full, rmin, rmax, round, min_lot, size_lot, shake, ncomp, Composites, value,
        npiece, hpiece, pgrad, nabs, A_abs, mabs, I_A, Abs_U, FC, FL, SV, minRisk, maxRisk, ogamma,
        mask, log, logfile, downrisk, downfactor, longbasket, shortbasket, tradebuy, tradesell, zetaS,
        zetaF, ShortCostScale, valuel, Abs_L, shortalphacost, never_slow, mem_kbytes, soft_m, soft_l,
        soft_b, soft_L, soft_U, soft_A, qbuy, qsell, five, ten, forty, issues);
} else {
    back = optObj.Optimise_internalCVPAFblSaMSoftQV(n, nfac, names, w, m, A, L, U, alpha, bench, Q,
        gamma, initial, delta, buy, sell, kappa, basket, tradenum, revise, costs, min_holding, min_trade,
        ls, full, rmin, rmax, round, min_lot, size_lot, shake, ncomp, Composites, value,
        npiece, hpiece, pgrad, nabs, A_abs, mabs, I_A, Abs_U, FC, FL, SV, minRisk, maxRisk, ogamma,
        mask, log, logfile, downrisk, downfactor, longbasket, shortbasket, tradebuy, tradesell, zetaS,
        zetaF, ShortCostScale, valuel, Abs_L, shortalphacost, never_slow, mem_kbytes, soft_m, soft_l,
        soft_b, soft_L, soft_U, soft_A, qbuy, qsell, five, ten, forty, issues);
}
if (round) {
    size_lot.forEach((d, i) => {
        if (d === i) {
            console.log('Bound not set for stock\t' + i);
        }
    });
}
const rootEps = Math.sqrt(Math.abs((4 / 3 - 1) * 3 - 1));/* 1.4901161193847656e-8*/
let holdings = 0,
    minhold = 1e9;
if (initial.length) {
    let trades = 0,
        turnover = 0
    mintrade = 1e9;
    initial.forEach((d, i) => {
        turnover += Math.abs(d - w[i]);
        if (Math.abs(d - w[i]) > rootEps) {
            trades++;
            mintrade = Math.min(mintrade, Math.abs(d - w[i]));
        }
    });
    turnover *= 0.5;
    console.log('Turnover\t', turnover);
    console.log('Number of trades\t', trades);
    console.log('Minimum trade\t', mintrade);
}
w.forEach(d => {
    if (Math.abs(d) > rootEps) {
        holdings++;
        minhold = Math.min(minhold, Math.abs(d));
    }
});
console.log('Number of holdings\t', holdings);
console.log('Minimum holding\t', minhold);
console.log('gamma back\t', ogamma[0]);
console.log(optObj.Return_Message(back), mem_kbytes[0], 'kbytes');

const arisk = [1], risk = [1], brisk = [1], pbeta = [1], Rrisk = [1];
optObj.Get_RisksC(n, nfac, Q, w, bench, arisk, risk, Rrisk, brisk,
    pbeta, ncomp, Composites);

console.log('Absolute Risk\t', arisk[0]);
if (maxRisk >= 0 && minRisk >= 0) {
    console.log('min risk\t', minRisk, 'risk\t', risk[0], 'max risk\t', maxRisk, 'gamma\t', gamma, ogamma[0]);
} else {
    console.log('Relative Risk\t', risk[0], 'gamma\t', gamma);
}
const absReturn = optObj.ddotvec(n, w, alpha);
console.log('Absolute Return\t', absReturn);
let benchReturn = 0;
if (bench.length) {
    benchReturn = optObj.ddotvec(n, bench, alpha);
}
console.log('Relative Return\t', absReturn - benchReturn);
if (buy.length && sell.length) {
    const tcost = [1], utility = [1], gradutility = Array(n), utility_per_stock = Array(n),
        cost_per_stock = Array(n);
    optObj.MarginalUtilitybSaQ(n, nfac, names, w, bench, initial, Q, gamma, kappa,
        npiece, hpiece, pgrad, buy, sell, alpha, tcost, utility,
        gradutility, utility_per_stock, cost_per_stock,
        ncomp, Composites, ShortCostScale, shortalphacost, qbuy, qsell);
    console.log('Total transaction cost\t', tcost[0], '( Total utility\t', utility[0], ')');
    if (kappa < 0 || Math.abs(kappa - gamma) <= rootEps) {
        console.log('Relative Profit\t', absReturn - benchReturn - tcost[0]);
    }
}

const rreturn = Array(1), areturn = Array(1), Rreturn = Array(1), breturn = Array(1), srisk = Array(1);
const MCAR = Array(n), MCTR = Array(n), MCRR = Array(n), MCBR = Array(n);
const FMCRR = Array(n + nfac), FMCTR = Array(n + nfac), FMCAR = Array(n + nfac), FMCBR = Array(n + nfac), FMCSR = Array(n + nfac);
const beta = Array(n);
const FX = Array(nfac), RFX = Array(nfac), AFX = Array(nfac), BFX = Array(nfac), SFX = Array(nfac);
optObj.PropertiesCA(n, nfac, names, w, bench, alpha, rreturn, areturn, Rreturn, breturn, Q, risk, arisk, Rrisk, brisk,
    srisk, pbeta, MCAR, MCTR, MCRR, MCBR, FMCRR, FMCTR, FMCAR, FMCBR, FMCSR, beta, FX, RFX, AFX, BFX, SFX,
    FL, FC, SV, ncomp, Composites);

console.log('Absolute risk\t', arisk[0], optObj.ddotvec(n, w, MCTR));
console.log('Relative risk\t', risk[0], optObj.ddotvec(n, w, MCAR) - (bench.length ? optObj.ddotvec(n, bench, MCAR) : 0));
console.log('Residual risk\t', Rrisk[0], optObj.ddotvec(n, w, MCRR) - (bench.length ? pbeta[0] * optObj.ddotvec(n, bench, MCRR) : 0));
console.log('Portfolio beta\t', pbeta[0], optObj.ddotvec(n, w, beta));

const fr = optObj.ddotvec(nfac, FMCTR, FX);
console.log('Absolute Factor Risk\t', fr);
let nfr = 0;
for (let i = nfac; i < n + nfac; ++i) {
    nfr += FMCTR[i] * w[i - nfac];
}
console.log('Absolute Non-factor Risk\t', nfr);
console.log('Absolute risk\t', Math.sqrt(fr * fr + nfr * nfr));

const afr = optObj.ddotvec(nfac, FMCAR, AFX);
console.log('Active Factor Risk\t', afr);
let anfr = 0;
for (let i = nfac; i < n + nfac; ++i) {
    anfr += FMCAR[i] * (w[i - nfac] - (bench.length ? bench[i - nfac] : 0));
}
console.log('Active Non-factor Risk\t', anfr);
console.log('Active risk\t', Math.sqrt(afr * afr + anfr * anfr));

const Rfr = optObj.ddotvec(nfac, FMCRR, RFX);
console.log('Residual Factor Risk\t', Rfr);
let Rnfr = 0;
for (let i = nfac; i < n + nfac; ++i) {
    Rnfr += FMCRR[i] * (w[i - nfac] - (bench.length ? pbeta[0] * bench[i - nfac] : 0));
}
console.log('Residual Non-factor Risk\t', Rnfr);
console.log('Residual risk\t', Math.sqrt(Rfr * Rfr + Rnfr * Rnfr));
