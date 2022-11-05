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
    logging: false
  }
};