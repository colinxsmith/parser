const express = require('express');
const display = require('./checklog');
const app = express();
const host = 'localhost', port = 3000;
const bodyParser = require('body-parser');
app
    .set('port', port)
    .set('host', host)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .get('/', function (req, res) {
        res.send('Hello World');
        console.log('In get');
    })
    .post('/', function (req, res) {
        res.send('POST request to the homepage');
        console.log('In post');
    })
    .route('/opt')
    .get(function (req, res) {
        console.log('get opt', req.body);
        res
            .status(200)
            .json({ n: display.n, w: display.w });
    })
    .post(function (req, res) {
        console.log('post opt', req.body);
        display.runOpt();
        res
            .status(200)
            .json({ n: display.n, w: display.w });
    });

app.listen(port, () => console.log(`Running on http://${host}:${port}`));