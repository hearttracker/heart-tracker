const express = require('express');
const router  = express.Router();
const {isLoggedIn} = require('./middlewares');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/overview', isLoggedIn(), (req, res, next) => {
  //check if user is logged in
  //render list of patients of req.session.user
  res.render('doctor/overview');
});

module.exports = router;
