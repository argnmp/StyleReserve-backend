const express = require('express');
const cookieParser = require('cookie-parser');

//logger
const logger = require('./config/logger');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


//404 error handling
app.use(function(req, res, next) {
    const error = {
        status: 404,
        data: {},
        message: 'Page Not Found'
    }
    next(error);
});

app.use(function(error, req, res, next) {
    res.status(error.status).json(error);
});

// listen 시작
app.listen(process.env.PORT, () => {
    logger.info(`Server listening at port ${process.env.PORT}`);
});
