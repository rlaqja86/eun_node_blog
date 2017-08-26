var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('hi', { title: "hi" });
});

module.exports = router;