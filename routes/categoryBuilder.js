var express = require('express');
var router = express.Router();
var queryString = require('querystring')
var url = "mongodb://localhost:27017/local";
var http = require('http');

const CATEGORY_COLLECTION_NAME = "category"

/* save category. */
router.post('/save', function(req, res, next) {
    var MongoClient = require('mongodb').MongoClient;
     MongoClient.connect(url, function(err, db) {
         if (err) throw err;
         var categoryName = req.param('name');        
         db.collection(CATEGORY_COLLECTION_NAME).insert(createCategory(db, categoryName));
         db.close();
    });
    res.redirect('/categoryBuilder');
});

/* get admin main page */
router.get('/', function(req, res, next) {
    try {
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(url, function(err, db) {
        db.collection("category").find().toArray(function(err, result) {
        res.status(200).render('admin', { categories: result });  
        db.close(); 
    });    
});
    } catch (exception) {
        console.log(exception);
    }
});

function createCategory(db, categoryName) {
    var category = require('../bin/domain/Category');
    category._id = getCurrentIndexNumber(db);
    category.name = categoryName;
    return category;
}

function getCurrentIndexNumber(db) {
  db.collection('numberCount').findAndModify( 
      { query:{_id:'userid'}, update: {$inc:{seq:1}}, new: true },
        function(error, data) { 
           return data;  
    }
  )}

module.exports = router;