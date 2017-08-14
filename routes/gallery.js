var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // var http = require('http');
    // var MongoClient = require('mongodb').MongoClient;
    // var url = "mongodb://localhost:27017/local";

    // MongoClient.connect(url, function(err, db) { 
    //     if (err) throw err; 
    //     var query = { categoryName: "메인메뉴" }
    //     db.collection("category").find(query).toArray(function(err, result) {
    //         if (err) throw err;   
    //         console.log(result[0].categoryName);
    //         res.render('gallery', { title: result[0].categoryName });   
    //         db.close(); 
    //     });
    // });
    res.render('gallery', { title: 'this is gallery' });
});

module.exports = router;