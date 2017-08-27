var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:27017/local";
var CATEGORY_COLLECTION_NAME = "projects";

var EMPTY_PROJECT = [{
    "name": "등록된 프로젝트가 없습니다",
    "date": "2017-01-01",
    "site": "대한민국 서울",
    "description": "프로젝트를 등록해주세요",
    "images": {
        "name": "작품명",
        "description": "작품설명",
        "image": "emptyImage.jpg",
        "isMain": "true"
    }
}];

var PROJECT_PART = 2; // 한페이지에 보여줄 프로젝트수, 관리자가 정한다
var totalProjectNum = 0;
var totalPageNum = 0;

// 데이터베이스 조회 후 최근프로젝트순으로 정렬된 배열(result)을 projects변수에 담아 index.jade로 넘긴다
// images는 원래 배열이지만 index페이지를 구성할 때는 isMain이 true인 객체만 가져온다.
router.get('/', function(req, res, next) {
    try {
        MongoClient.connect(DB_URL, function(err, db) {
            db.collection(CATEGORY_COLLECTION_NAME).count(function(err, count) {
                totalProjectNum = count;
                totalPageNum = Math.ceil(totalProjectNum / PROJECT_PART);

                if (totalProjectNum != 0) {
                    db.collection(CATEGORY_COLLECTION_NAME).aggregate([{ $unwind: "$images" }, { $match: { "images.isMain": "true" } }, { $sort: { "date": -1, "name": 1 } }]).limit(PROJECT_PART).toArray(function(err, result) {
                        res.render('index', { title: "hellomate", projects: result, totalPageNum: totalPageNum });
                    });
                } 
                else {
                    res.render('index', { title: "hellomate", projects: EMPTY_PROJECT, totalPageNum: totalPageNum });
                }
                db.close();
            });
        });
    } catch (ex) {
        console.log(ex);
    }
});

router.get('/page/:page', function(req, res, next) {
    var page = req.params.page;

    if (page <= totalPageNum && page > 0) {
        try {
            MongoClient.connect(DB_URL, function(err, db) {

                db.collection(CATEGORY_COLLECTION_NAME).aggregate([{ $unwind: "$images" }, { $match: { "images.isMain": "true" } }, { $sort: { "date": -1, "name": 1 } }]).skip((page - 1) * PROJECT_PART).limit(PROJECT_PART).toArray(function(err, result) {
                    res.json(result);
                    db.close(); 
                });
            });
        } catch (ex) {
            console.log(ex);
        }
    } else {
        res.redirect('/page/1');
    }
});

module.exports = router;