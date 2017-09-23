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
    idGenerator = require(path.join(__dirname, '../bin/domain/autoIncrement/idGenerator')),
    autoIncrement = require("mongodb-autoincrement"),

    PROJECT_COLLECTION_NAME = "projects",
    NUMBER_COUNT_COLLECTION_NAME = "counters", //todo id 조회를 위한 컬렉션 추가
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

/* save project. */
router.post('/save', upload.any(), function(req, res, next) { 
    try {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            autoIncrement.getNextSequence(db, PROJECT_COLLECTION_NAME, function (err, autoIndex) {
                var project = createProject(req, autoIndex);
                db.collection(PROJECT_COLLECTION_NAME).save(project, function(err, document) {
                    if(err) throw err
                        res.redirect('/admin')
                });
                db.close();
            });
        });
    } catch(e) {
        console.log("save error : " + e);
    }      
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

router.get('/detail/:projectId', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var projectId = req.params.projectId;
        var query = `{"projectId":${projectId}}`;
        db.collection(PROJECT_COLLECTION_NAME).findOne(JSON.parse(query), function(err, document) {
            if (err) throw err;
                console.log(query)
                console.log(document)
                res.status(200).render('admin_detail', { document: document })
             });
        });    
});

router.get('/delete/:projectId', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var projectId = req.params.projectId;
        var query = `{"projectId":${projectId}}`;
        console.log(query)
        db.collection(PROJECT_COLLECTION_NAME).remove(JSON.parse(query), function(err, document) {
            if (err) throw err;
                res.redirect('/admin')
             });
        });    
});

router.get('/add', function(req, res, next) {  
    res.status(200).render('admin_detail', { document: "" })
});


function createImages(req) {
    try {
        var images = new Array();
        if (req.body.images instanceof Array ) {
          for (var index = 0; index < req.body.images.length; index ++) {
            var entity = JSON.parse(req.body.images[index]);
            images.push(
                extractImage(new ObjectID(), entity.name, entity.description, req.files[index].filename, entity.isMain));
            }
            return images;
        } else {
            var entity = JSON.parse(req.body.images);
            images.push(extractImage(new ObjectID(), entity.name, entity.description, req.files[0].filename, entity.isMain));
            return images;
        } 
    } catch (e) {
        console.log("error occured at createImage : " + e);
    }
}

function extractImage(id, name, description, filename, isMain) {
    image = new Image();
    image._id = id;
    image.name = name;
    image.description = description;
    image.image = filename;
    image.isMain = isMain;

    return image;
}

function createProject(req, autoIndex) {
    console.log("AUTOINDEX : " + autoIncrement)
    var project = require('../bin/domain/ProjectEntity');
    var projectIdId;
    project.projectId = autoIndex;
    project._id = new ObjectID();        
    project.name = req.body.projectname;
    project.site = req.body.projectsite;
    project.date = req.body.projectdate;
    project.description = req.body.projectdescription;
    project.images = createImages(req); 
    return project;
}

function specialCharRemove(selector) {
    var pattern = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi;
    if (pattern.test(selector)) {
        selector = selector.replace(pattern, "");
    }
    return selector
}

function getNextSequence(name) {
    MongoClient.connect(url, function(err, db) {
        if (err) 
            console.log("error occured at getNextSequenc : " + err);{
        }
        db.collection(NUMBER_COUNT_COLLECTION_NAME).findAndModify( 
            {"_id" : name},
            [['_id','asc']],
            { $inc: { seq: 1 } },
            { 
                new: true, 
                upsert: true
            }, function(err, doc) {
               return doc.value.seq;
            });
        db.close();
    });
}
    module.exports = router;