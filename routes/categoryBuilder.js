var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/save', function (req, res, next) {
    var http = require('http');
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/local";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var query = { categoryName: "메인메뉴" }
        db.collection("category").save(createCategory("n","testCategory","3",""));
    });
   // res.render('gallery', { title: 'this is gallery' });
});


/* GET home page. */
router.get('/', function (req, res, next) {
    var http = require('http');
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/local";
      MongoClient.connect(url, function(err, db) { 
        if (err) throw err; 
        var query = { categoryName: "메인메뉴" }
        db.collection("category").find().toArray(function(err, result) {
        console.log(JSON.stringify(result))
        console.log(result)
         res.status(200).render('admin', { categories: JSON.stringify(result)});  
         db.close(); 
        }); 
    });
});

//임시적으로 카테고리 생성해주는것
//실제로는 web에서 등록된 값을 해당 함수에 넣어주면 됨!
function createCategory(categoryId, categoryName, depth, childcategories) {
    var category = require('../bin/domain/Category');
    category.categoryId = categoryId;
    category.name = categoryName;
    category.depth = depth;
    category.childCategories = childcategories;
    console.log(category);
    return category;
}


module.exports = router;