var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/board', function(req, res, next) {
  res.render('board', { title: 'this is board' });
});

module.exports = router;
