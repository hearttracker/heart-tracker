const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');


router.get('/doctor/newPatient1', (req, res) => {
const currentPatient = req.session.user.currentPatient
    res.render('doctor/newPatient1', {
      currentPatient
    })
});


router.post('/doctor/newPatient2', (req, res, next) => {
  let currentPatient = req.session.user.currentPatient
  currentPatient = req.body;
console.log("tag",req.session.user.currentPatient);
      res.render('doctor/newPatient2', {
        patient: req.session.user.currentPatient
      });
});

router.get("/doctor/newPatient2", (req,res,next) => {
  const currentPatient = req.session.user.currentPatient;
  res.render("doctor/newPatient2", {
    currentPatient
  })
})

router.post('/doctor/newPatient3', (req, res, next) => {
  let currentPatient = req.session.user.currentPatient
  currentPatient = Object.assign(req.session.user.currentPatient, req.body)
      res.render('doctor/newPatient3', {
        patient: req.session.user.currentPatient
      });
      console.log();
});

router.get("/doctor/newPatient3", (req,res,next) => {
  const currentPatient = req.session.user.currentPatient;
  res.render("doctor/newPatient3", {
    currentPatient
  })
})


module.exports = router;