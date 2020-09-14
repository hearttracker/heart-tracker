const express = require('express');
const router  = express.Router();
const {isLoggedIn} = require('./middlewares');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/overview', isLoggedIn(), (req, res, next) => {
  const doctor = Doctor.findById(req.session.user._id)
  .then(doctor => {
    console.log(doctor);
    res.render('doctor/overview', {
      doctor: doctor
    });
  })
  .catch(err => next(err));
});

router.get('/addPatient', (req, res, next) => {

})

module.exports = router;
