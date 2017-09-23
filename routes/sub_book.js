var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('sub_book', { title: "book" });
});

module.exports = router;