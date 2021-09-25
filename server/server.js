const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
require('dotenv').config();

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

app.listen(process.env.PORT, () => {
    /* eslint-disable no-console */
    console.log(
        `Listening at http://localhost:${process.env.PORT}`
    );
    /* eslint-enable no-console */
});