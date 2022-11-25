const path = require('path');
require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../temp/db_development.sqlite'),
  },
  test: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../temp/db_test.sqlite')
  },
  production: {
    dialect: 'postgres',
    database: 'production_db',
    host: process.env.DB_ENDPOINT,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  }
};