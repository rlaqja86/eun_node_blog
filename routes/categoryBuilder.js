var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var http = require('http');
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/local";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var query = { categoryName: "메인메뉴" }
        db.collection("category").save(createCategory("n","testCategory","3",""));
    });
    res.render('gallery', { title: 'this is gallery' });
});


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