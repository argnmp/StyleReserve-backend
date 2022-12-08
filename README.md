## StyleReserve-backend
This is a backend api server for StyleReserve application

## Response code
For all api requests, the backend server responds with one of these codes

```javascript
const globalResponseSet = {
    // COMMON
    API_SUCCESS: {code: 1, message: 'api call success', isSuccess: true},

    // INDEX
    INTERNAL_SERVER_ERROR: {code: 100, message: 'internal server error', isSuccess: false},
    API_NOT_FOUND: {code: 101, message: 'target api not found', isSuccess: false},

    // TEST
    SUCCESS_TEST: {code: 1000, message: 'response from successTest', isSuccess: true},
    FAIL_TEST: {code: 1001, message: 'response from errorTest', isSuccess: false},

    // AUTH
    REGISTER_SUCCESS: {code: 2000, message: 'user registeration success', isSuccess: true},
    REGISTER_FAIL: {code: 2001, message: 'user registeration fail', isSuccess: false},
    LOGIN_SUCCESS: {code: 2010, message: 'login success', isSuccess: true},
    LOGIN_FAIL: {code: 2011, message: 'email or password error', isSuccess: false},

    // MIDDLEWARE/authenticate
    NOT_AUTHENTICATED: {code: 3000, message: 'not authenticated', isSuccess: false},
    ACCESS_TOKEN_EXPIRED: {code: 3010, message: 'access token expired', isSuccess: false},
    ACCESS_TOKEN_INVALID: {code: 3011, message: 'access token invalid', isSuccess: false},
    REFRESH_TOKEN_EXPIRED: {code: 3020, message: 'refresh token expired', isSuccess: false},
    REFRESH_TOKEN_INVALID: {code: 3021, message: 'refresh token invalid', isSuccess: false},

    // Sreserve
    PARAMETER_ERROR: {code: 4000, message: 'parameter error', isSuccess: false},
    SRESERVE_NOT_EXISTS: {code: 4001, message: 'sreserve not exists', isSuccess: false},
    CREATE_SRESERVE_OVERLAP: {code: 4010, message: 'reservation exists', isSuccess: false},
    CREATE_SRMEMBER_VALIDATION_FAIL: {code: 4011, message: 'count exceeded or user is already on the reservation', isSuccess: false},
    CREATE_SRESERVE_FAIL: {code: 4012, message: 'create reservation failed', isSuccess: false},
    DELETE_SRESERVE_NOT_OWNER: {code: 4020, message: 'user is not sreserve owner', isSuccess: false},
    
    //Creserve
    CREATE_CRESERVE_OVERLAP: {code: 5000, message: 'reservation exists', isSuccess: false},
    PRODUCT_DOESNT_EXIST: {code: 5001, message: 'system failed to find the product', isSuccess: false},
}
```

## Apis
### Auth
#### 회원가입
```httpspec
POST /auth/local/signup
```
- request
```javascript
{
    email: "test@naver.com",
    password: "testpassword",
    nickname: "testaccount",
}
```

- response
1. 성공
```javascript
{code: 2000, message: 'user registeration success', isSuccess: true},
```
2. 실패
```javascript
{code: 2001, message: 'user registeration fail', isSuccess: false},
```

#### 로그인
```httpspec
POST /auth/signin
```
- request
```javascript
{
    email: "test@naver.com",
    password: "testpassword",
}
```

- response
```javascript
{
    access_token: "jwt token",
    refresh_token: "jwt token",
    email: "test@naver.com",
    nickname: "testaccount"
}
```

### Sreserve
#### user가 연결된 styler의 특정 달의 예약 일자 요청
```httpspec
POST /sr/getOverallReserves
```
- request
```javascript
{
    access_token: "jwt return from signin api",
    year: 2022,
    month: 11,
}
```

- response
1. 성공
```javascript
{
    code: 1, 
    message: 'api call success', 
    isSuccess: true
    data: [
        "2022-11-12T15:00:00.000Z",
        "2022-11-13T16:00:00.000Z",
        "2022-11-24T20:00:00.000Z"
    ]
},
```
2. 실패: globalResponseSet 참조

#### user가 연결된 styler의 특정 일자의 예약 데이터 요청
```httpspec
POST /sr/getDateReserves
```
- request
```javascript
{
    access_token: "jwt return from signin api",
    year: 2022,
    month: 11,
    date: 13,
}
```
- response
1. 성공
```javascript
{
    code: 1,
    message: "api call success",
    isSuccess: true,
    data: [
        {
            sreserve_id: 4,
            start_time: "2022-11-13T16:00:00.000Z",
            course: {
                course_id: 1,
                duration: 30
            },
            owner: {
                user_id: 2,
                nickname: "KimTaeHyeon"
            },
            members: [
                {
                    user_id: 1,
                    nickname: "xyz",
                    count: 1
                },
                {
                    user_id: 2,
                    nickname: "KimTaeHyeon",
                    count: 4
                }
            ],
            total_count: 5
        }
    ]
}
```

2. 실패: globalResponseSet 참조

#### user가 연결된 styler에 예약 추가
```httpspec
POST /sr/addReserve
```
- request
```javascript
{
    access_token: "jwt return from signin api",
    start_time: "timestamp using js new Date()",
    course_id: 5,
    count: 1,
}
```
- response
1. 성공
```javascript
{code: 1, message: 'api call success', isSuccess: true}
```
2. 실패: globalResponseSet 참조

#### user가 연결된 styler에 추가되어 있는 기존 예약에 함께 예약 추가
```httpspec
POST /sr/addMember
```
- request
```javascript
{
    access_token: "jwt return from signin api",
    sr_id: "sreserve_id received from /sr/getDateReserves"
    count: 1,
}
```
- response
1. 성공
```javascript
{code: 1, message: 'api call success', isSuccess: true}
```
2. 실패: globalResponseSet 참조

#### user가 연결된 styler의 예약 삭제 - 자신의 예약인 경우만 가능
```httpspec
POST /sr/deleteReserve
```
- request
```javascript
{
    access_token: "jwt return from signin api",
    sr_id: "sreserve_id received from /sr/getDateReserves"
}
```
- response
1. 성공
```javascript
{code: 1, message: 'api call success', isSuccess: true}
```
2. 실패: globalResponseSet 참조

### Op
#### 무신사 검색
10개의 무신사 검색 결과를 제공합니다.
```httpspec
POST /op/vendorSearch
```
- request
```javascript
{
    access_token: "jwt return from signin api",
    keyword: "노스페이스",
}
```
- response
1. 성공
```javascript
{
    "code": 1,
    "message": "api call success",
    "isSuccess": true,
    "data": [
        {
            "brand_name": "노스페이스",
            "name": "NJ1DN75A 남성 1996 에코 눕시 자켓",
            "img_url": "//image.msscdn.net/images/goods_img/20220412/2482269/2482269_1_220.jpg"
        },
        {
            "brand_name": "노스페이스",
            "name": "NJ1DN75B 남성 1996 에코 눕시 자켓",
            "img_url": "//image.msscdn.net/images/goods_img/20210823/2081549/2081549_1_220.jpg"
        },
        {
            "brand_name": "노스페이스",
            "name": "NC2DN72A 챌린지 에어 다운 코트",
            "img_url": "//image.msscdn.net/images/goods_img/20220816/2718029/2718029_1_220.jpg"
        },
        {
            "brand_name": "노스페이스",
            "name": "NJ1DN84A 로프티 다운 자켓",
            "img_url": "//image.msscdn.net/images/goods_img/20220816/2718006/2718006_1_220.jpg"
        },
        {
            "brand_name": "노스페이스",
            "name": "NC1DN51J 화이트라벨 고 프리 다운 코트",
            "img_url": "//image.msscdn.net/images/goods_img/20220811/2712600/2712600_1_220.jpg"
        },
        {
            "brand_name": "노스페이스",
            "name": "NJ3NN52L 화이트라벨 리버턴 온볼 자켓",
            "img_url": "//image.msscdn.net/images/goods_img/20221019/2875834/2875834_1_220.jpg"
        },
        {
            "brand_name": "노스페이스",
            "name": "NJ3NN71C 아스펜 온볼 자켓",
            "img_url": "//image.msscdn.net/images/goods_img/20220825/2741893/2741893_1_220.jpg"
        },
        {
            "brand_name": "노스페이스",
            "name": "NJ1DN66A 폴라 에어 다운 자켓",
            "img_url": "//image.msscdn.net/images/goods_img/20220816/2718013/2718013_1_220.jpg"
        },
        {
            "brand_name": "노스페이스",
            "name": "NC1DN00A 고 프리 다운 코트",
            "img_url": "//image.msscdn.net/images/goods_img/20211224/2282452/2282452_1_220.jpg"
        },
        {
            "brand_name": "노스페이스",
            "name": "NJ1DN51J 화이트라벨 노벨티 눕시 다운 자켓 프린트",
            "img_url": "//image.msscdn.net/images/goods_img/20221013/2859103/2859103_1_220.jpg"
        }
    ]
}
```
2. 실패: globalResponseSet 참조

### Creserve
#### 옷 데이터 추가
```httpspec
POST /cr/addCloth
```
- request
```javascript
{
    access_token: "jwt return from signin api",
    clothName: black,
    brand: Mod9,
    type:1,
    Utype:1,
    URL:https://image.msscdn.net/images/goods_img/20210903/2107115/2107115_1_220.jpg
}
```
- response
1. 성공
```javascript
{
    code: 1, 
    message: 'api call success', 
    isSuccess: true
    data: {
        "id": 16,
        "styler_id": 1,
        "name": "black",
        "brand_name": "mod9",
        "type": "1",
        "url_type": "1",
        "url": "https://image.msscdn.net/images/goods_img/20210903/2107115/2107115_1_220.jpg"
    }
},
```
2. 실패 : globalResponseSet 참조


#### 옷 일정추가 요청
```httpspec
POST /cr/addCreserve
```
- request
```javascript
{
    access_token: "jwt return from signin api",
    cloth_id:12,
    year:2022,
    month:11,
    date:4,
    description: to wear at a party,
}
```
1. 성공
```javascript
{
    "code": 1,
    "message": "api call success",
    "isSuccess": true
}
```
2. 실패 : globalResponseSet 참조

#### 해당 스타일러에 등록된 모든 옷 조회
```httpspec
POST /cr/clothes
```
- request
```javascript
{
    access_token: "jwt return from signin api",
}
```
1. 성공
```javascript
{
    "code": 1,
    "message": "api call success",
    "isSuccess": true,
    "data": [
        {
            "id": 1,
            "name": "1-옷1",
            "brand_name": "1-옷1브랜드",
            "type": 1,
            "styler_id": 1
        },
        {
            "id": 2,
            "name": "1-옷2",
            "brand_name": "1-옷2브랜드",
            "type": 1,
            "styler_id": 1
        },
        {
            "id": 3,
            "name": "1-옷3",
            "brand_name": "1-옷3브랜드",
            "type": 2,
            "styler_id": 1
        } // 이하 다수의 옷 정보들은 생략
    ]
}
```
2. 실패 : globalResponseSet 참조

#### 특정한 옷의 한 달 간 예약된 내역 모두 조회
```httpspec
POST /cr/checkReserve
```
- request
```javascript
{
    access_token: "jwt return from signin api",
    cloth_id:12,
    year:2022,
    month:11,
}
```
1. 성공
```javascript
{
    "code": 1,
    "message": "api call success",
    "isSuccess": true,
    "data": [
        {
            "description": "to wear at a party",
            "reservation_date": "2022-11-04T00:00:00.000Z",
            "clothes_id": 12,
            "user_id": 1,
            "Clothe": {
                "url_type": true,
                "url": "https://image.msscdn.net/images/goods_img/20221017/2870818/2870818_1_500.jpg?t=20221020233640"
            }
        },
        {
            "description": "11월 14일은 내가 입을거야",
            "reservation_date": "2022-11-13T00:00:00.000Z",
            "clothes_id": 13,
            "user_id": 1,
            "Clothe": {
                "url_type": true,
                "url": "https://image.msscdn.net/images/goods_img/20221017/2870818/2870818_1_500.jpg?t=20221020233640"
            }
        }
        //(이하 데이터 생략)
    ]
}
```
2. 실패 : globalResponseSet 참조

#### 특정한 달의 해당 유저의 옷 예약 정보 모두 조회
```httpspec
POST /cr/checkUserReserve
```
- request
```javascript
{
    access_token: "jwt return from signin api",
    year:2022
    month:11
}
```
1. 성공
```javascript
{
    "code": 1,
    "message": "api call success",
    "isSuccess": true,
    "data": [
        {
            "description": "can i do it?",
            "reservation_date": "2022-12-05T00:00:00.000Z",
            "clothes_id": 12,
            "user_id": 1,
            "Clothe": {
                "name": "2-옷6",
                "brand_name": "2-옷6브랜드",
                "type": 3,
                "url_type": true,
                "url": "https://image.msscdn.net/images/goods_img/20221017/2870818/2870818_1_500.jpg?t=20221020233640"
            }
        },
        {
            "description": "very great",
            "reservation_date": "2022-12-06T00:00:00.000Z",
            "clothes_id": 12,
            "user_id": 1,
            "Clothe": {
                "name": "2-옷6",
                "brand_name": "2-옷6브랜드",
                "type": 3,
                "url_type": true,
                "url": "https://image.msscdn.net/images/goods_img/20221017/2870818/2870818_1_500.jpg?t=20221020233640"
            }
        }
    ]
}
```
2. 실패 : globalResponseSet 참조

#### 해당 유저의 미래의 옷 예약 중 현재와 가장 가까운 예약을 한 개만 조회
```httpspec
POST /cr/nearReserve
```
- request
```javascript
{
    access_token: "jwt return from signin api",
}
```
1. 성공
```javascript
{
    "code": 1,
    "message": "api call success",
    "isSuccess": true,
    "data": {
        "description": "here is a new event",
        "reservation_date": "2022-12-04T00:00:00.000Z",
        "clothes_id": 12,
        "user_id": 1
    }
}
```
2. 실패 : globalResponseSet 참조

## Commit Rules
[https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

```shell
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
### types
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

### example
- feat: add jsonwebtoken for user verification

