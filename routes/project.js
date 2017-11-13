var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var DB_URL = "mongodb://localhost:27017/local";
var CATEGORY_COLLECTION_NAME = "projects";
var SAMPLE_PROJECT = [{
    "name": "샘플프로젝트",
    "date": "2017-01-01",
    "site": "대한민국 서울",
    "description": "이 프로젝트는 예시입니다",
    "images": [{
        "name": "작품1",
        "description": "작품1 설명",
        "image": "emptyImage.jpg",
        "isMain": "true"
    }, {
        "name": "작품2",
        "description": "작품2 설명",
        "image": "emptyImage.jpg",
        "isMain": "false"
    }, {
        "name": "작품3",
        "description": "작품3 설명",
        "image": "emptyImage.jpg",
        "isMain": "false"
    }]
}];

// 프로젝트명으로 데이터베이스를 조회 후 반환 된 배열의 첫 요소(result[0])를 project변수에 담아 project.jade로 넘긴다
// 프로젝트를 등록할 때 프로젝트명을 중복체크하겠지만 만약에 동일한 프로젝트명이 존재할경우 첫번째 요소가 사용된다
// result는 배열이지만 result[0]은 객체이다 (SAMPLE_PROJECT 참고)
router.get('/:projectID', function(req, res, next) {
    var projectID = new ObjectID(req.params.projectID);

    try {
        MongoClient.connect(DB_URL, function(err, db) {
            db.collection(CATEGORY_COLLECTION_NAME).find({ '_id': projectID }).toArray(function(err, result) {
                console.log(projectID);
                console.log(result);

                if (result.length != 0) {
                    res.render('project_detail', { project: result[0] });
                } else {
                    res.redirect('/');
                }
                db.close();
            });
        });
    } catch (ex) {
        console.log(ex);
    }
});

module.exports = router;