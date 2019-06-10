const express = require('express');
const display = require('./checklog');
const bodyParser = require('body-parser');
const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control", "max-age=6");
    next();
});
const host = 'localhost', port = 3000;
app
    .set('port', port)
    .set('host', host)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .get('/', function (req, res) {
        res.send('GET request to homepage');
        console.log('In get');
    })
    .post('/', function (req, res) {
        res.send('POST request to the homepage');
        console.log('In post');
    })
    .route('/opt')
    .get(function (req, res) {
        console.log('get opt', display.parseFile);
        res
            .status(200)
            .json({ n: display.n, w: display.w, names: display.names, initial: display.initial, file: display.parseFile });
    })
    .post(function (req, res) {
        console.log('post opt', req.body);
        display.runOpt(req.body);
        console.log('After opt', display.parseFile);
        res
            .status(200)
            .json({ n: display.n, w: display.w, names: display.names, initial: display.initial, file: display.parseFile });
    });

app.listen(port, () => console.log(`Running on http://${host}:${port}`));