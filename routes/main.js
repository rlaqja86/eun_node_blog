var express = require('express');
var router = express.Router();
var path = require('path');
var isDu = require(path.join(__dirname, '../user_defined_modules/isDuplication.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
    var _path = path.join(__dirname, '../public/uploads/');
    var _name = "image1.jpg";
    var result = isDu(_path, _name);

    function function2() {
        console.log(result);
    }
    setTimeout(function2, 4000);

    res.render('main', { title: "main" });
});

module.exports = router;