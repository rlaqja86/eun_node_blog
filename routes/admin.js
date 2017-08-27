var express = require('express'),
    router = express.Router(),
    queryString = require('querystring'),
    url = "mongodb://localhost:27017/local",
    http = require('http'),
    path = require('path'),
    multer = require('multer'),
    ObjectID = require('mongodb').ObjectID,
    MongoClient = require('mongodb').MongoClient,
    Image = require(path.join(__dirname, '../bin/domain/ProjectImage')),

    PROJECT_COLLECTION_NAME = "projects",
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
router.post('/save', upload.any(), function(req, res, next) {
    var project = createProject(req);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection(PROJECT_COLLECTION_NAME).save(project)
    });
    res.redirect('/admin')
});

/* get admin main page */
router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection(PROJECT_COLLECTION_NAME).find().toArray(function(err, result) {
            res.status(200).render('admin', { projects: result });  
            db.close(); 
        });
    });
});

router.get('/detail', function(req, res, next) {
    res.status(200).render('admin_detail', { result: "success" })
});

function createImages(req) {
    var images = new Array();
    for (var index = 0; index < req.files.length; index++) {
        var name = req.files[index].originalname,
            image = new Image();
        image._id = new ObjectID();
        image.name = req.param(name + '_name');
        image.description = req.param(name + '_description');
        image.image = req.files[index].filename;
        image.isMain = req.param(name + '_mainimage');
        images.push(image);
    }
    return images;
}

function createProject(req) {
    var project = require('../bin/domain/ProjectEntity');

    project._id = new ObjectID();
    project.name = req.param('projectname');
    project.images = createImages(req);
    project.site = req.param('projectsite');
    project.date = req.param('projectdate');
    project.description = req.param('projectdescription');

    return project;
}

module.exports = router;