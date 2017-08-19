var express = require('express');
var router = express.Router();

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

// 데이터베이스 조회 후 가장 최근 등록순으로 정렬된 배열오브젝트를 받는다.
// 조회할 개수는 한페이지에 표시할 프로젝트수로 정한다.
// index.jade에 object로 넘긴다.
router.get('/', function(req, res, next) {
    res.render('index', { title: "eunhye", object: sampleObject });
});

module.exports = router;