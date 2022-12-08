const {Op, ValidationErrorItemOrigin} = require('sequelize');

const logger = require('../../../config/logger');
const db = require('../../../db/models');

exports.paramValidate = (list) => {
    console.log(list);
    for (let i of list) {
        if(i === '' || i===undefined || i===null){
            return false;
        }
    }
    return true;
}