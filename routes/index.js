var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:27017/local";
var CATEGORY_COLLECTION_NAME = "projects";

var emptyObject = [{
    "name": "등록된 프로젝트가 없습니다",
    "date": "2017-01-01",
    "site": "대한민국 서울",
    "description": "프로젝트를 등록해주세요",
    "images": {
        "name": "등록된 작품이 없습니다",
        "description": "작품을 등록해주세요",
        "image": "thumbnail.jpg",
        "isMain": true
    }
}];

var PROJECT_PART = 3; // 한페이지에 보여줄 프로젝트수, 관리자가 정한다 
var PAGE_PART = 5; // 끊어서 보여줄 페이지수, 관리자가 정한다
var totalProjectNum = 0;
var totalPageNum = 0;

// 데이터베이스 조회 후 가장 최근 등록순으로 정렬된 배열오브젝트를 받는다.
// 조회할 개수는 한페이지에 표시할 프로젝트수로 정한다.
// index.jade에 object로 넘긴다.
router.get('/', function(req, res, next) {
    try {
        MongoClient.connect(DB_URL, function(err, db) {

            db.collection(CATEGORY_COLLECTION_NAME).count(function(err, result) {
                totalProjectNum = result;
                totalPageNum = Math.ceil(totalProjectNum / PROJECT_PART);

                console.log(totalProjectNum);
                console.log(totalPageNum);
            });
            db.collection(CATEGORY_COLLECTION_NAME).aggregate([{ $unwind: "$images" }, { $match: { "images.isMain": true } }, { $sort: { "date": -1, "name": 1 } }]).limit(PROJECT_PART).toArray(function(err, result) {
                if (totalProjectNum != 0) {
                    console.log(result);
                    res.render('index', { title: "eunhye", object: result, totalPageNum: totalPageNum });
                } 
                else {
                    console.log(emptyObject.images);
                    res.render('index', { title: "eunhye", object: emptyObject, totalPageNum: totalPageNum });
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

                db.collection(CATEGORY_COLLECTION_NAME).aggregate([{ $unwind: "$images" }, { $match: { "images.isMain": true } }, { $sort: { "date": -1, "name": 1 } }]).skip((page - 1) * PROJECT_PART).limit(PROJECT_PART).toArray(function(err, result) {
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