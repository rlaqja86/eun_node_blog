var express = require('express');
var router = express.Router();
var queryString = require('querystring')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/local";

/* GET home page. */
router.post('/save', function(req, res, next) {
    var http = require('http');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var categoryName = req.param('name');
        db.collection("category").save(createCategory(categoryName));
        res.redirect('/categoryBuilder');
    });
});


/* GET home page. */
router.get('/', function(req, res, next) {
    var http = require('http');
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/local";
    MongoClient.connect(url, function(err, db) { 
        if (err) throw err; 
        var query = { categoryName: "메인메뉴" }
        db.collection("category").find().toArray(function(err, result) {
            res.status(200).render('admin', { categories: result });  
            db.close(); 
        });
    });
});

//임시적으로 카테고리 생성해주는것
//실제로는 web에서 등록된 값을 해당 함수에 넣어주면 됨!
function createCategory(categoryName) {
    var category = require('../bin/domain/Category');
    category.name = categoryName;
    return category;
}


module.exports = router;