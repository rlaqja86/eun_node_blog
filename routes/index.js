var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var DB_URL = "mongodb://localhost:27017/local";
var CATEGORY_COLLECTION_NAME = "projects";

var sampleObject = [{
        "name": "프로젝트1",
        "date": "2017-09-09",
        "site": "서울시 마포구",
        "description": "프로젝트설명1",
        "mainImage": "thumbnail.jpg",
        "thumbnailImage": "thumbnail.jpg",
        "images": [{
                "name": "작품명1",
                "description": "작품설명1",
                "image": "thumbnail.jpg"
            },
            {
                "name": "작품명2",
                "description": "작품설명2",
                "image": "thumbnail.jpg"
            }
        ]
    },
    {
        "name": "프로젝트2",
        "date": "2017-10-09",
        "site": "서울시 서대문구",
        "description": "프로젝트설명2",
        "mainImage": "image1.jpg",
        "thumbnailImage": "image1.jpg",
        "images": [{
                "name": "작품명1",
                "description": "작품설명1",
                "image": "thumbnail.jpg"
            },
            {
                "name": "작품명2",
                "description": "작품설명2",
                "image": "thumbnail.jpg"
            }
        ]
    },
    {
        "name": "프로젝트3",
        "date": "2017-12-09",
        "site": "서울시 서대문구",
        "description": "프로젝트설명3",
        "mainImage": "image2.jpg",
        "thumbnailImage": "image2.jpg",
        "images": [{
                "name": "작품명1",
                "description": "작품설명1",
                "image": "thumbnail.jpg"
            },
            {
                "name": "작품명2",
                "description": "작품설명2",
                "image": "thumbnail.jpg"
            }
        ]
    },
    {
        "name": "프로젝트4",
        "date": "2017-12-09",
        "site": "서울시 서대문구",
        "description": "프로젝트설명4",
        "mainImage": "image3.jpg",
        "thumbnailImage": "image3.jpg",
        "images": [{
                "name": "작품명1",
                "description": "작품설명1",
                "image": "thumbnail.jpg"
            },
            {
                "name": "작품명2",
                "description": "작품설명2",
                "image": "thumbnail.jpg"
            }
        ]
    }
];

var PROJECT_TOTAL = 7; // 프로젝트의 총 개수, 디비에서 받아온다
var PROJECT_PART = 3; // 한페이지에 보여줄 프로젝트수, 관리자가 정한다 
var PAGE_TOTAL = Math.ceil(PROJECT_TOTAL / PROJECT_PART); // 총 페이지수, 계산된다
var PAGE_PART = 5; // 끊어서 보여줄 페이지수, 관리자가 정한다

// 데이터베이스 조회 후 가장 최근 등록순으로 정렬된 배열오브젝트를 받는다.
// 조회할 개수는 한페이지에 표시할 프로젝트수로 정한다.
// index.jade에 object로 넘긴다.
router.get('/', function(req, res, next) {
    try {
        MongoClient.connect(DB_URL, function(err, db) {
            db.collection(CATEGORY_COLLECTION_NAME).find().limit(PROJECT_PART).toArray(function(err, result) {
                res.render('index', { title: "eunhye", object: result, pageTotal: PAGE_TOTAL, pagePart: PAGE_PART, projectPart: PROJECT_PART });
                db.close(); 
            });
        });
    } catch (ex) {
        console.log(ex);
    }
});

router.get('/page/:page', function(req, res, next) {
    var page = req.params.page;

    if (page <= PAGE_TOTAL && page > 0) {
        try {
            MongoClient.connect(DB_URL, function(err, db) {
                db.collection(CATEGORY_COLLECTION_NAME).find().skip((page - 1) * PROJECT_PART).limit(PROJECT_PART).toArray(function(err, result) {
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