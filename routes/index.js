var express = require('express');
var request = require('request');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();

var DB_CONSTANT = require(path.join(__dirname, '../bin/domain/DB_CONSTANT'));
var DB_URL = DB_CONSTANT.url;
var PROJECT_COLLECTION_NAME = DB_CONSTANT.mainCollection;
var PROJECT_PART = 10; // 한페이지에 보여줄 프로젝트수, 관리자가 정한다
var totalPageNum = 1;

var EMPTY_PROJECT = [{
    "name": "등록된 프로젝트가 없습니다",
    "date": "2017-01-01",
    "site": "대한민국 서울",
    "description": "프로젝트를 등록해주세요",
    "images": {
        "name": "작품명",
        "description": "작품설명",
        "image": "emptyImage.jpg",
        "isMain": true
    }
}];

// 데이터베이스 조회 후 최근프로젝트순으로 정렬된 배열(result)을 projects변수에 담아 index.jade로 넘긴다
// images는 원래 배열이지만 index페이지를 구성할 때는 isMain이 true인 객체 하나만 가져온다.
router.get('/', function(req, res, next) {
    try {
        MongoClient.connect(DB_URL, function(err, db) {
            db.collection(PROJECT_COLLECTION_NAME).count(function(err, totalProjectNum) {
                totalPageNum = Math.ceil(totalProjectNum / PROJECT_PART);
                db.close();
                var result = EMPTY_PROJECT;
                request('http://localhost:3000/page/1', function(error, response, data) {
                    if (totalProjectNum > 0 && !error && response.statusCode === 200) {
                        result = JSON.parse(data);
                    } else {
                        console.log('error:', error);
                        console.log('statusCode:', response && response.statusCode);
                    }
                    res.render('index', { title: "hellomate", projects: result, totalPageNum: totalPageNum });
                });
            });
        });
    } catch (ex) {
        console.log(ex);
    }
});

router.get('/getProjectList/:page', function(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');

    var page = req.params.page;
    request('http://localhost:3000/page/' + page, function(error, response, data) {
        if (!error && response.statusCode === 200) {
            result = JSON.parse(data);
        } else {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            result = '';
        }
        res.render('project_list', { projects: result, totalPageNum: totalPageNum });
    });
});

router.get('/resetDB', function(req, res, next) {
    try {
        MongoClient.connect(DB_URL, function(err, db) {
            db.collection(PROJECT_COLLECTION_NAME).drop();
            db.close(); 
            res.redirect('/');
        });
    } catch (ex) {
        console.log(ex);
    }
});

router.get('/sampleDB', function(req, res, next) {
    try {
        MongoClient.connect(DB_URL, function(err, db) {
            db.collection(PROJECT_COLLECTION_NAME).insert(
                [{
                    "name": "sample1",
                    "date": "2017-01-01",
                    "site": "대한민국 서울",
                    "description": "샘플1",
                    "images": [{
                        "name": "작품명123",
                        "description": "작품설명123",
                        "image": "sample1.jpg",
                        "isMain": true
                    }, {
                        "name": "작품명weq",
                        "description": "작품설명qwe",
                        "image": "sample2.jpg",
                        "isMain": false
                    }]
                }, {
                    "name": "sample2",
                    "date": "2017-01-01",
                    "site": "대한민국 서울",
                    "description": "샘플2",
                    "images": [{
                        "name": "작품명112",
                        "description": "작품설명111",
                        "image": "sample2.jpg",
                        "isMain": true
                    }, {
                        "name": "작품명1212",
                        "description": "작품설명12211",
                        "image": "sample3.jpg",
                        "isMain": false
                    }]
                }, {
                    "name": "sample3",
                    "date": "2017-01-01",
                    "site": "대한민국 서울",
                    "description": "샘플3",
                    "images": [{
                        "name": "작품명",
                        "description": "작품설명123123",
                        "image": "sample3.jpg",
                        "isMain": true
                    }, {
                        "name": "작품명sfdg",
                        "description": "작품설명32134",
                        "image": "sample4.jpg",
                        "isMain": false
                    }]
                }, {
                    "name": "sample4",
                    "date": "2017-01-01",
                    "site": "대한민국 서울",
                    "description": "샘플3",
                    "images": [{
                        "name": "작품명agrre",
                        "description": "작품설명rve",
                        "image": "sample4.jpg",
                        "isMain": true
                    }, {
                        "name": "작품명rvvv",
                        "description": "작품설명vwwv",
                        "image": "sample5.jpg",
                        "isMain": false
                    }]
                }, {
                    "name": "sample5",
                    "date": "2017-01-01",
                    "site": "대한민국 서울",
                    "description": "샘플5",
                    "images": [{
                        "name": "작품명svasdv",
                        "description": "작품설명sdvsv",
                        "image": "sample5.jpg",
                        "isMain": true
                    }, {
                        "name": "작품명rtgrtgr",
                        "description": "작품설명scccc",
                        "image": "sample6.jpg",
                        "isMain": false
                    }]
                }, {
                    "name": "sample6",
                    "date": "2017-01-01",
                    "site": "대한민국 서울",
                    "description": "샘플6",
                    "images": [{
                        "name": "작품명wfwf23",
                        "description": "작품설명32f23f",
                        "image": "sample6.jpg",
                        "isMain": true
                    }, {
                        "name": "작품명23232",
                        "description": "작품설명23r32r",
                        "image": "sample7.jpg",
                        "isMain": false
                    }]
                }, {
                    "name": "sample7",
                    "date": "2017-01-01",
                    "site": "대한민국 서울",
                    "description": "샘플7",
                    "images": [{
                        "name": "작품명r23r23",
                        "description": "작품설명r2r23",
                        "image": "sample7.jpg",
                        "isMain": true
                    }, {
                        "name": "작품명r2r3",
                        "description": "작품설명2r323r",
                        "image": "sample1.jpg",
                        "isMain": false
                    }]
                }]
            );
            db.close(); 

            setTimeout(function() {
                res.redirect('/');
            }, 500);
        });
    } catch (ex) {
        console.log(ex);
    }
});

router.get('/page/:page', function(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    var page = req.params.page;

    if (page <= totalPageNum && page > 0) {
        try {
            MongoClient.connect(DB_URL, function(err, db) {
                db.collection(PROJECT_COLLECTION_NAME).aggregate([
                    { $unwind: "$images" },
                    { $match: { "images.isMain": true } },
                    { $sort: { "date": -1, "name": 1 } }
                ]).skip((page - 1) * PROJECT_PART).limit(PROJECT_PART).toArray(function(err, result) {
                    res.json(result);
                    db.close(); 
                });
            });
        } catch (ex) {
            console.log(ex);
        }
    } else {
        res.send(404);
    }
});
module.exports = router;