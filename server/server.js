const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const pkg = require('../package.json');

const app = module.exports = express();
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/health', (req, res, next) => {
    res.json({
        res: 'ok',
        req: req.body
    });
    next(req, res);
});

app.listen(pkg.port, () => {
    /* eslint-disable no-console */
    console.log(
        `Listening at http://localhost:${pkg.port}`
    );
    /* eslint-enable no-console */
});