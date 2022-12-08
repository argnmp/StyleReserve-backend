const funcService = require('./funcService.js');
const {globalResponseSet, resbuilder} = require('../../common/resbuilder');
const logger = require('../../../config/logger');
const axios = require('axios');
const cheerio = require('cheerio');

exports.vendorSearch = async (req, res, next) => {
    const keyword = req.body.keyword;
    if(!funcService.paramValidate([keyword])){
        res.send(resbuilder(globalResponseSet.PARAMETER_ERROR));
        return;
    }
    const searchResult = await axios.get(`https://www.musinsa.com/search/musinsa/integration?type=&q=${keyword}`);
    console.log(keyword);
    const $ = cheerio.load(searchResult.data);
    const resData = [];
    $('.li_inner').each(function(index, item){
        if(index < 10){
            resData.push({
                brand_name: $(this).find('.article_info > .item_title > a').text(),
                name: $(this).find('.article_info > .list_info > a').attr('title'),
                img_url: $(this).find('.list_img > a > img').attr('data-original'),
            })
        }
    });

    res.send(resbuilder(globalResponseSet.API_SUCCESS, resData));
    return;
}
