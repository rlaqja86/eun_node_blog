var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/new', function(req, res) {
    fs.readdir('./data', function(err, fileList) {
        if (err) {
            console.log(err);
            res.status(500).send('dir read error');
        }
        res.render('new', { fileList: fileList });
    });
});

router.get(['/', '/:fileName'], function(req, res) {
    fs.readdir('./data', function(err, fileList) {
        if (err) {
            console.log(err);
            res.status(500).send('dir read error');
        }
        var fileName = req.params.fileName;
        if (fileName) {
            //파일이름을 받았을 때
            fs.readFile('./data/' + fileName, 'utf8', function(err, fileContent) {
                if (err) {
                    console.log(err);
                    res.status(500).send('file read error');
                }
                res.render('main', { fileList: fileList, fileName: fileName, fileContent: fileContent });
            });
        } else {
            //파일이름을 못 받았을 때
            res.render('main', { fileList: fileList, fileName: 'welcom', fileContent: 'eun-hye\'s page' });
        }
    });
});

router.post('/', function(req, res) {
    var fileName = req.body.fileName;
    var fileContent = req.body.fileContent;
    fs.writeFile('./data/' + fileName, fileContent, function(err) {
        if (err) {
            console.log('error');
            res.status(500).send('file write error');
        }
        res.redirect('/main/' + fileName);
    });
});



module.exports = router;