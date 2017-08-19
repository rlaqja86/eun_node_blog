var express = require('express'),
    router = express.Router(),
    queryString = require('querystring'),
    url = "mongodb://localhost:27017/local",
    http = require('http'),
    path = require('path'),
    multer = require('multer'),
    ObjectID = require('mongodb').ObjectID,
    MongoClient = require('mongodb').MongoClient,

    CATEGORY_COLLECTION_NAME = "category",
    NUMBER_COUNT_COLLECTION_NAME = "numberCount",
    FIRST_INDEX = 0,

    _storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, path.join(__dirname, '../public/uploads/'))
        },
        filename: function(req, file, callback) {
            callback(null, Date.now() + '-' + file.originalname)
        }
    }),
    upload = multer({ storage: _storage }),
    bodyParser = require('body-parser'),
    fs = require('fs');

/* save category. */

router.post('/save', upload.fields([{ name: 'thumbnailImage' }, { name: 'image' }]), function(req, res, next) {
    try {
        MongoClient.connect(url, function(err, db) {
            var imageName = req.files.image[FIRST_INDEX].filename;
            var thumbnailImageName = req.files.thumbnailImage[FIRST_INDEX].filename;
            var categoryName = req.param('categoryName');
            db.collection(CATEGORY_COLLECTION_NAME).save(createCategory(db, categoryName, imageName, thumbnailImageName));
            res.redirect('/categoryBuilder');
        });
    } catch (ex) {
        console.log(ex);
    }
});

/* get admin main page */
router.get('/', function(req, res, next) {
    try {
        MongoClient.connect(url, function(err, db) {
            db.collection(CATEGORY_COLLECTION_NAME).find().toArray(function(err, result) {
                res.status(200).render('admin', { categories: result });  
                db.close(); 
            });
        });
    } catch (ex) {
        console.log(ex);
    }
});

function createCategory(db, categoryName, imageFileName) {
    var category = require('../bin/domain/Category');
    category._id = new ObjectID();
    category.name = categoryName;
    category.imageFileName = imageFileName;

    return category;
}

module.exports = router;