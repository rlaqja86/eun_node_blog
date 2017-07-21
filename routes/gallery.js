var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/gallery', function(req, res, next) {
  res.render('main', { title: 'this is gallery' });
});

module.exports = router;
