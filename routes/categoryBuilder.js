var express = require('express'),
    router = express.Router(),
    queryString = require('querystring'),
    url = "mongodb://localhost:27017/local",
    http = require('http'),
    path = require('path'),
    multer = require('multer'),
    ObjectID = require('mongodb').ObjectID,
    MongoClient = require('mongodb').MongoClient,

    PROJECT_COLLECTION_NAME = "project",
    NUMBER_COUNT_COLLECTION_NAME = "numberCount",
    FIRST_INDEX = 0,

    _storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, path.join(__dirname, '../uploads/'))
        },
        filename: function(req, file, callback) {
            callback(null, Date.now() + '-' + file.originalname)
        }
    }),
    upload = multer({ storage: _storage }),
    bodyParser = require('body-parser'),
    fs = require('fs');

/* save category. */
var type = upload.single('file');
router.post('/save', type, function(req, res, next) {
    try {
       /* MongoClient.connect(url, function(err, db) {
                        console.log(req.files)

            var image = req.files.image[FIRST_INDEX].filename;
            console.log(req.files)
            //var projectName = req.param('projectName');
            db.collection(PROJECT_COLLECTION_NAME).save(createProject(db, projectName, image));
            res.redirect('/categoryBuilder');
        });*/
        console.log(req)
    } catch (ex) {
        console.log(ex);
    }
});

/* get admin main page */
router.get('/', function(req, res, next) {
    try {
        MongoClient.connect(url, function(err, db) {
            db.collection(PROJECT_COLLECTION_NAME).find().toArray(function(err, result) {
                res.status(200).render('admin', { projects: result });  
                db.close(); 
            });
        });
    } catch (ex) {
        console.log(ex);
    }
});

function createProject(db, name, image) {
    var project = require('../bin/domain/ProjectEntity');
    var image = require('../bin/domain/ProjectImage');
    project._id = new ObjectID();
    project.name = name;
    project.image = image;

    return project;
}

module.exports = router;