const express = require('express');
const path = require('path');
const display = require('./checklog');
const bodyParser = require('body-parser');
const app = express();

const host = 'localhost', port = 3000;
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
        res.send('GET request to homepage');
        console.log('In get');
    })
    .route('/opt')
    .get((req, res) => {
        const dd = new Date();
        const timest = `${dd.getDate()}-${dd.getMonth()}-${dd.getFullYear()}:${dd.getHours()}:${dd.getMinutes()}:${dd.getSeconds()}`;
        console.log('get opt', timest, display.parseFile);
        res
            .status(200)
            .json({ n: display.n, w: display.w, names: display.names, initial: display.initial, file: display.parseFile });
    })
    .post((req, res) => {
        console.log('post opt', req.body);
        display.runOpt(req.body);
        const dd = new Date();
        const timest = `${dd.getDate()}-${dd.getMonth()}-${dd.getFullYear()}:${dd.getHours()}:${dd.getMinutes()}:${dd.getSeconds()}`;
        console.log('After opt', timest, display.parseFile);
        res
            .status(200)
            .json({ n: display.n, w: display.w, names: display.names, initial: display.initial, file: display.parseFile });
    });
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.listen(port, () => console.log(`Running on http://${host}:${port}`));