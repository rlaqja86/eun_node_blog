var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:27017/local";
var CATEGORY_COLLECTION_NAME = "projects";

var sampleDate = "2017-01-01";
var sampleObject = [{
        "name": "작품명1",
        "description": "작품설명1",
        "image": "thumbnail.jpg"
    },
    {
        "name": "작품명2",
        "description": "작품설명2",
        "image": "image1.jpg"
    },
    {
        "name": "작품명3",
        "description": "작품설명3",
        "image": "image2.jpg"
    },
    {
        "name": "작품명4",
        "description": "작품설명4",
        "image": "image3.jpg"
    }
];

// 프로젝트명으로 데이터베이스 조회한다.
// images배열 전체와 date을 받아서 project.jade에 object, date로 넘긴다. 
router.get('/:projectName', function(req, res, next) {
    var projectName = req.params.projectName;

    try {
        MongoClient.connect(DB_URL, function(err, db) {
            db.collection(CATEGORY_COLLECTION_NAME).find({ 'name': projectName }).toArray(function(err, result) {
                console.log(result[0].images);
                res.render('project', { title: result[0].name, object: result[0].images, date: result[0].date });
                db.close(); 
            });
        });
    } catch (ex) {
        console.log(ex);
    }
});

module.exports = router;