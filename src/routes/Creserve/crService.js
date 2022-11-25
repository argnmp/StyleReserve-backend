const {Op, ValidationErrorItemOrigin} = require('sequelize');
const logger = require('../../../config/logger');
const db = require('../../../db/models');

//피라미터로 전달된 옷의 예약 날짜를 조회해서 해당월의 '누가/언제/메모' 반환 + 현재 날짜가 디폴트값임
exports.checkReservation = async (Clo_id,year=new Date().getFullYear(),month=new Date().getMonth()+1) => { 
    try {
        const data = await db.Creserves.findAll({ //해당 옷 예약된 일정 정보 확인
            attributes: ['description','reservation_date','user_id'],
            where: { clothes_id: Clo_id,
                     reservation_date : {
                        [Op.between] : [new Date(year, month -1, 1), new Date(year,month, 0)]
                    },
            },
            order: [
                ['reservation_date','asc']
            ]

        }); 
       // console.log(data);
        return data;
    } catch (e) {
        logger.error('checkReservation error', {message: e});
        throw e;

    }
}

//그옷이 그 날짜에 이미 예약되있나 확인해줌
exports.checkDuplicate = async (clothid,year,month,date)=>{
    data = await this.checkReservation(clothid,year,month); //그 옷 예약 데이터 조회하고
    length = data.length; //몇 개 예약돼있는지 센다음
    
    for(var i=0; i<length; i++){ // 예약된 것들 날짜랑
        var comparison = data[i].dataValues.reservation_date;
        if ((comparison.getFullYear() == year) && (comparison.getMonth()+1 == month) && (comparison.getDate()-1==date))
        {
            return true; //true면 중복을 찾았다는 뜻 
        }
    }
    return false; //false면 중복이 없다는 뜻

}

exports.createCreserve = async (user,text,date,clothid) => {  //이건 그냥 검사없이 DB에 옷 예약 추가 메소드
    try {
        await db.Creserves.create({
            description:text,
            reservation_date: date,
            styler_id: user.styler_id,
            user_id:user.id,
            clothes_id:clothid
        });
        
    } catch (e) {
        logger.error('createCreserve error', {message: e});
        throw e;

    }
}

//옷장에 옷 추가 메소드
exports.createCloth = async(stylerid,productN,brandN,Clothtype)=>{
    try {
        const Cloth = await db.Clothes.create({
            styler_id: stylerid,
            name: productN,
            brand_name: brandN,
            type : Clothtype,
        });
        console.log(Cloth);
        return Cloth;
    } catch (e) {
        logger.error('addCloth error', {message: e});
        throw e;

    }
}