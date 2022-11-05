const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const process = require('process');
require('dotenv').config();

const { combine, timestamp, label, printf } = winston.format;
const logPath = `${process.cwd()}/logs`;
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        label({ label: 'StyleReserve' }),
        logFormat,
    ),
    transports: [
    ],
    exceptionHandlers: [
    ],
});

if (process.env.NODE_ENV === 'production'){
    logger.add(
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logPath,
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    );
    logger.exceptions.handle(
        new winstonDaily({
            level: `error`,
            datePattern: `YYYY-MM-DD`,
            dirname: logPath,
            filename: `%DATE%.unhandled.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ) 
} else {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            )
        })
    );
    logger.exceptions.handle(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            )
        }),
    ) 

}

module.exports = logger;
