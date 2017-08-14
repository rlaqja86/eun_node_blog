var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
// var upload = multer({ dest: '../uploads/' });
var _storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))

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
router.post('/upload', upload.fields([{ name: 'userfile1' }, { name: 'userfile2' }]), function(req, res) {
    console.log(req.files);
    console.log(req.files.userfile1[0].filename);
    console.log(req.files.userfile2[0].filename);

    //var fileName = req.file.filename;


    res.redirect('/main/upload');
});

router.get('/new', function(req, res) {
    fs.readdir(path.join(__dirname, '../data/'), function(err, fileList) {
        if (err) {
            console.log(err);
            res.status(500).send('dir read error');
        } else {
            res.render('new', { fileList: fileList });
        }
    });
});

router.get(['/', '/:fileName'], function(req, res) {
    fs.readdir(path.join(__dirname, '../data/'), function(err, fileList) {
        if (err) {
            console.log(err);
            res.status(500).send('dir read error');
        } else {
            var fileName = req.params.fileName;
            if (fileName) {
                //파일이름을 받았을 때

                fs.readFile(path.join(__dirname, '../data/') + fileName, 'utf8', function(err, fileContent) {
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
    fs.writeFile(path.join(__dirname, '../data/') + fileName, fileContent, function(err) {
        if (err) {
            console.log('error');
            res.status(500).send('file write error');
        } else {
            res.redirect('/main/' + fileName);
        }
    });
});



module.exports = router;