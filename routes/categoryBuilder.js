var express = require('express');
var router = express.Router();
var queryString = require('querystring')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/local";
var http = require('http');

var multer = require('multer');
var _storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function(req, file, cb) {
        //cb(null, file.originalname + '-' + Date.now())
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: _storage });
var bodyParser = require('body-parser');


const CATEGORY_COLLECTION_NAME = "category"

/* save category. */
router.post('/save', upload.single('userfile'), function(req, res, next) {
    try {
        MongoClient.connect(url, function(err, db) {
            var categoryName = req.param('name');
            db.collection(CATEGORY_COLLECTION_NAME).save(createCategory(categoryName));
            res.redirect('/categoryBuilder');
        });
        db.close();
    } catch (excpetion) {
        console.log(exception);
    }

});

/* get admin main page */
router.get('/', function(req, res, next) {
    try {
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

function createCategory(categoryName) {
    var category = require('../bin/domain/Category');
    category.name = categoryName;
    return category;
}

module.exports = router;