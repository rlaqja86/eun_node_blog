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
        "name": "프로젝트3",
        "date": "2017-12-09",
        "site": "서울시 서대문구",
        "description": "프로젝트설명3",
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
    }
]

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: "eunhye", object: sampleObject });
});
//this is test
module.exports = router;