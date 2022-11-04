const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//logger
const logger = require('./config/logger');

//response
const {globalResponseSet, resbuilder} = require('./src/common/resbuilder');

//routes
const test = require('./src/routes/Test/testRouter');


const app = express();

app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/test',test);


//api not found handling
app.use(function(req, res, next) {
    next(globalResponseSet.API_NOT_FOUND);
});

//use next for setting http status;
app.use(function(error, req, res, next) {
    logger.info(error);
    res.json(resbuilder(error));
});

// listen 시작
app.listen(process.env.PORT, () => {
    logger.info(`Server listening at port ${process.env.PORT}`);
});
