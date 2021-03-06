const express = require('express');
const path = require('path');
const display = require('./checklog');
const bodyParser = require('body-parser');
const ETL = require('/home/colin/CVARserver/cvarOpt');
const app = express();

const host = '10.2.70.36',
    port = 3000;
app
    .set('port', port)
    .set('host', host)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(express.static(path.join(__dirname, 'dist')))
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Cache-Control', 'max-age=6');
        next();
    })
    .get('/', (req, res) => {
        res
            .send('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Optimisation Server</title><base href="/"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/x-icon" href="favicon.ico"></head><body><svg width="1000" height="700"><path class="radarStroke" d="M36.38454589310788,-171.175830128416C48.247697982818714,-168.65423930965852,60.099266995252535,-164.80343110625518,71.17891253826502,-159.87045508745516C82.25855808127751,-154.93747906865514,93.05051383113631,-148.70674051139164,102.8624191511828,-141.5779740156158C112.6743244712293,-134.44920751983997,109.30546956817194,-118.81918511540282,130.050344458544,-117.09785611280019C150.79521934891608,-115.37652711019756,221.26757751123054,-141.75331368286413,227.33166849341518,-131.25000000000006C233.39575947559982,-120.746686317136,175.3166131523131,-72.90422717030926,166.43489035165186,-54.0779740156158C157.55316755099062,-35.25172086092235,160.98918947087108,-31.592814146227184,174.04133168944782,-18.292481071839354C187.09347390802455,-4.992147997451523,246.01548388607824,13.662281916135333,244.74774366311226,25.72402443071119C243.48000344014628,37.785766945287044,169.3375695466014,36.49031142073432,166.4348903516519,54.07797401561579C163.53221115670237,71.66563661049724,233.39575947559985,120.74668631713591,227.3316684934152,131.24999999999997C221.26757751123057,141.75331368286402,142.2233510863175,103.57836260889617,130.05034445854403,117.09785611280013C117.87733783077054,130.61734961670408,164.10553404682076,205.2381945276479,154.29362872677427,212.36696102342373C144.48172340672778,219.49572751919956,87.79838085278375,152.47099105925514,71.17891253826501,159.87045508745518C54.55944422374627,167.26991911565523,66.43997092937266,239.65882104053327,54.57681883966183,256.76374519262407C42.713666749951,273.8686693447149,15.160227455461643,276.7646525107014,3.214697847761803e-14,262.50000000000006C-15.160227455461579,248.2353474892987,-18.589817758541585,174.9582163565522,-36.384545893107834,171.175830128416C-54.17927402767408,167.3934439002798,-95.68872326438499,244.73865864998288,-106.76836880739748,239.80568263118283C-117.84801435040997,234.87270661238279,-88.14456117111303,152.27112375927956,-102.86241915118278,141.5779740156158C-117.58027713125253,130.88482427195206,-174.3306417974439,177.36811317180297,-195.07551668781596,175.64678416920037C-215.82039157818804,173.92545516659777,-204.3659578241672,142.49847268966158,-227.33166849341515,131.25000000000014C-250.2973791626631,120.00152731033869,-341.75150350396495,126.98220118592508,-332.8697807033037,108.15594803123165C-323.9880579026425,89.32969487653821,-191.27169323437764,40.3384923941595,-174.04133168944782,18.29248107183949C-156.810970144518,-3.7535302504805266,-203.01620326474887,-3.0453817188432843,-229.48761143372485,-24.120119902688455C-255.95901960270083,-45.19485808653363,-320.59956738816567,-83.00930134834627,-332.8697807033038,-108.15594803123153C-345.1399940184419,-133.3025947141168,-326.0746019938015,-163.75152731033856,-303.1088913245535,-175.00000000000003C-280.1431806553055,-186.2484726896615,-219.8780604541125,-169.4189573319631,-195.07551668781596,-175.64678416920037C-170.27297292151943,-181.87461100643765,-170.86635843337325,-205.83992138841978,-154.2936287267743,-212.36696102342373C-137.72089902017535,-218.89400065842767,-109.64187611585878,-195.09880816130664,-95.63913844822233,-214.80902197922398C-81.63640078058587,-234.51923579714133,-86.21705912899263,-337.2630809274652,-70.27720272095557,-330.62824393092785C-54.33734631291852,-323.9934069343905,-17.776958102343904,-201.57540230041863,0,-175C17.776958102343904,-148.42459769958137,24.52139380339704,-173.6974209471735,36.38454589310788,-171.175830128416" transform="translate(650,350)"style="stroke-width: 10px; stroke: rgb(255, 50, 50); fill: rgb(50,255,50);"></path></body></html>')
            .status(200);
    })
    .route('/opt')
    .get((req, res) => {
        const dd = new Date();
        const timest = `${dd.getDate()}-${dd.getMonth() + 1}-${dd.getFullYear()};${dd.toLocaleTimeString()}`;
        console.log('get opt', timest, display.parseFile);
        res
            .status(200)
            .json({
                n: display.n,
                w: display.w,
                names: display.names,
                initial: display.initial,
                file: display.parseFile,
                MCTR: display.MCTR,
                MCAR: display.MCAR,
                arisk: display.arisk,
                risk: display.risk,
                benchmark: display.benchmark,
                alpha: display.alpha,
                areturn: display.areturn,
                return: display.return,
                beta: display.beta,
                pbeta: display.pbeta,
                turnover: display.turnover,
                version: display.version,
                returnmessage: display.returnMessage,
                ogamma: display.ogamma,
                gamma: display.gamma
            });
    })
    .post((req, res) => {
        console.log('post opt', req.body);
        display.runOpt(req.body);
        const dd = new Date();
        const timest = `${dd.getDate()}-${dd.getMonth() + 1}-${dd.getFullYear()};${dd.toLocaleTimeString()}`;
        console.log('After opt', timest, display.parseFile);
        res
            .status(200)
            .json({
                n: display.n,
                w: display.w,
                names: display.names,
                initial: display.initial,
                file: display.parseFile,
                MCTR: display.MCTR,
                MCAR: display.MCAR,
                arisk: display.arisk,
                risk: display.risk,
                benchmark: display.benchmark,
                alpha: display.alpha,
                areturn: display.areturn,
                return: display.return,
                beta: display.beta,
                pbeta: display.pbeta,
                turnover: display.turnover,
                version: display.version,
                returnmessage: display.returnMessage,
                ogamma: display.ogamma,
                gamma: display.gamma
            });
    });
app.route('/etl')
    .post((req, res) => {
        const mock = false;
        var back = {};
        console.log(ETL);
        var dd = new Date();
        var timest = `${dd.getDate()}-${dd.getMonth() + 1}-${dd.getFullYear()};${dd.toLocaleTimeString()}`;
        console.log('Ready for ETL opt', timest, req.body);
        if (!mock) {
            ETL.optEtl(req.body);
            back.names = ETL.names;
            back.lower = req.body.lower;
            back.upper = req.body.upper;
            back.weights = ETL.weights;
            back.alpha = ETL.alpha;
            back.initial = ETL.initial;
            back.buy = ETL.buy;
            back.sell = ETL.sell;
            var send = [];
            back.names.forEach((d, i) => {
                send.push({
                    names: d,
                    lower: back.lower[i],
                    upper: back.upper[i],
                    weights: back.weights[i],
                    alpha: back.alpha[i],
                    initial: back.initial[i],
                    buy: back.buy[i],
                    sell: back.sell[i]
                });
            });
            back = {};
            back.port = send;
            back.ETL = ETL.CVAR;
            back.RISK = ETL.RISK;
            back.RETURN = ETL.RETURN;
            back.message = ETL.message;
            back.back = ETL.back;
            back.gamma = ETL.gamma;
            back.relEtl = ETL.relEtl;
        } else {
            back = {
                port: [{
                        names: 'stock1',
                        lower: 0,
                        upper: 1,
                        weights: 0.999989033265277,
                        alpha: -0.00006967888564560825,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock2',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.00019778336984659978,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock3',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.00013070801260032006,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock4',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.0005738216532726405,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock5',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.00021616590634767545,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock6',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.00013233548268475105,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock7',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.0002162746654549098,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock8',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.00012121205414678522,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock9',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.00002769519237474141,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock10',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.00008751751417240803,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock11',
                        lower: 0,
                        upper: 1,
                        weights: 0.000007246530287519801,
                        alpha: -0.00006194066595877637,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock12',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.0005301788133699578,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock13',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.0008032865539833658,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock14',
                        lower: 0,
                        upper: 1,
                        weights: 0.000002049417669651731,
                        alpha: -0.0008151024055437901,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock15',
                        lower: 0,
                        upper: 1,
                        weights: 9.666817502939082e-7,
                        alpha: -0.00026276604407914875,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock16',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.0009419526350551995,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock17',
                        lower: 0,
                        upper: 1,
                        weights: 0,
                        alpha: -0.0006309662652433158,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock18',
                        lower: 0,
                        upper: 1,
                        weights: -4.513529349440904e-8,
                        alpha: -0.0004669647078967842,
                        initial: 0.05263157894736842
                    },
                    {
                        names: 'stock19',
                        lower: 0,
                        upper: 1,
                        weights: 7.492456123255883e-7,
                        alpha: -0.0006914397336968808,
                        initial: 0.05263157894736842
                    }
                ],
                ETL: -0.00001593716199763101,
                RISK: 0.00008240211721500843,
                RETURN: -0.0000696809918286749,
                back: 0,
                message: 'Optimal Solution Found'
            }
        }

        console.log(back);
        res
            .status(200)
            .json(back);
    });
app.get('*', (req, res) => {
    res
        .status(200)
        .sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => console.log(`Running on http://${host}:${port}`));