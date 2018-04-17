const express = require('express');
const router  = express.Router();
const logged = require('../middlewares/logged');
const admin = require('../middlewares/admin');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index',{user:req.user});
});

router.get('/specialpage', [logged('/pass/login'), admin('/')], (req, res, next) => {
  res.render('specialpage',{user:req.user});
});


module.exports = router;
