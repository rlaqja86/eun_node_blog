var express = require('express');
var router = express.Router();
var multer = require('multer');
// var upload = multer({ dest: '../uploads/' });
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
var fs = require('fs');

router.get('/upload', function(req, res) {
    res.render('upload');
});
router.post('/upload', upload.single('userfile'), function(req, res) {
    console.log(req.file);

    // 이미지를 DB에 저장
    var http = require('http');
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/local";
    var fileName = req.file.filename;

    MongoClient.connect(url, function(err, db) { 
        if (err) throw err; 
        var query = { categoryName: "메인메뉴" }
        db.collection("category").find(query).toArray(function(err, result) {
            if (err) throw err;   
            console.log(result[0].categoryName);
            res.render('gallery', { title: result[0].categoryName });   
            db.close(); 
        });
    });



    res.redirect('/main');
});









router.get('/new', function(req, res) {
    fs.readdir('../data', function(err, fileList) {
        if (err) {
            console.log(err);
            res.status(500).send('dir read error');
        } else {
            res.render('new', { fileList: fileList });
        }
    });
});

router.get(['/', '/:fileName'], function(req, res) {
    fs.readdir('../data', function(err, fileList) {
        if (err) {
            console.log(err);
            res.status(500).send('dir read error');
        } else {
            var fileName = req.params.fileName;
            if (fileName) {
                //파일이름을 받았을 때
                fs.readFile('../data/' + fileName, 'utf8', function(err, fileContent) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('file read error');
                    } else {
                        res.render('main', { fileList: fileList, fileName: fileName, fileContent: fileContent });
                    }
                });
            } else {
                //파일이름을 못 받았을 때
                res.render('main', { fileList: fileList, fileName: 'welcom', fileContent: 'eun-hye\'s page' });
            }
        }
    });
});

router.post('/', function(req, res) {
    var fileName = req.body.fileName;
    var fileContent = req.body.fileContent;
    fs.writeFile('../data/' + fileName, fileContent, function(err) {
        if (err) {
            console.log('error');
            res.status(500).send('file write error');
        } else {
            res.redirect('/main/' + fileName);
        }
    });
});



module.exports = router;